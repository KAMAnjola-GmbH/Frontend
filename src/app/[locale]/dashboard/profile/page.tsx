'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useUser } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useUserProfile } from '@/hooks/useUserProfile';
import Skeleton from '@/app/components/ui/Skeleton';

function ProfilePage() {
    const t = useTranslations('profile');
    const { user } = useUser();
    const {
        profile,
        isLoading,
        isSaving,
        error,
        updateProfile,
        uploadAvatar,
        deleteAvatar,
    } = useUserProfile();

    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [preferredLanguage, setPreferredLanguage] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initialize form when profile loads
    React.useEffect(() => {
        if (profile && !isInitialized) {
            setDisplayName(profile.displayName || '');
            setBio(profile.bio || '');
            setPreferredLanguage(profile.preferredLanguage || '');
            setIsInitialized(true);
        }
    }, [profile, isInitialized]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);

        const success = await updateProfile({
            displayName: displayName.trim() || undefined,
            bio: bio.trim() || undefined,
            preferredLanguage: preferredLanguage || undefined,
        });

        if (success) {
            setSuccessMessage(t('saveSuccess'));
            setTimeout(() => setSuccessMessage(null), 3000);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSuccessMessage(null);
        const success = await uploadAvatar(file);

        if (success) {
            setSuccessMessage(t('avatarUpdated'));
            setTimeout(() => setSuccessMessage(null), 3000);
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDeleteAvatar = async () => {
        setSuccessMessage(null);
        const success = await deleteAvatar();

        if (success) {
            setSuccessMessage(t('avatarDeleted'));
            setTimeout(() => setSuccessMessage(null), 3000);
        }
    };

    // Get avatar URL - prefer custom avatar, fall back to Auth0
    const avatarUrl = profile?.avatarUrl || user?.picture;
    const displayedName = profile?.displayName || user?.name || user?.nickname || 'User';
    const userInitial = displayedName.charAt(0).toUpperCase();

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Decorative background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
                    <p className="text-gray-400 mt-1">{t('subtitle')}</p>
                </header>

                {/* Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                        {successMessage}
                    </div>
                )}

                {/* Avatar Section */}
                <section className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-4">{t('avatar')}</h2>

                    <div className="flex items-center gap-6">
                        {/* Avatar Preview */}
                        <div className="relative group">
                            {avatarUrl ? (
                                <div className="relative w-24 h-24 rounded-full border-2 border-blue-500/50 shadow-lg shadow-blue-500/20 overflow-hidden">
                                    <Image
                                        src={avatarUrl}
                                        alt={displayedName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/20">
                                    {userInitial}
                                </div>
                            )}

                            {/* Overlay on hover */}
                            <button
                                onClick={handleAvatarClick}
                                disabled={isSaving}
                                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                            >
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* Avatar Actions */}
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleAvatarClick}
                                disabled={isSaving}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                            >
                                {isSaving ? t('uploading') : t('uploadAvatar')}
                            </button>

                            {profile?.avatarUrl && (
                                <button
                                    onClick={handleDeleteAvatar}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    {t('removeAvatar')}
                                </button>
                            )}

                            <p className="text-xs text-gray-500 mt-1">
                                {t('avatarHint')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Profile Form */}
                <form onSubmit={handleSubmit}>
                    <section className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">{t('profileInfo')}</h2>

                        <div className="space-y-4">
                            {/* Display Name */}
                            <div>
                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">
                                    {t('displayName')}
                                </label>
                                <input
                                    id="displayName"
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder={user?.name || t('displayNamePlaceholder')}
                                    maxLength={100}
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">{t('displayNameHint')}</p>
                            </div>

                            {/* Bio */}
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                                    {t('bio')}
                                </label>
                                <textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder={t('bioPlaceholder')}
                                    maxLength={500}
                                    rows={3}
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {bio.length}/500
                                </p>
                            </div>

                            {/* Preferred Language */}
                            <div>
                                <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
                                    {t('preferredLanguage')}
                                </label>
                                <select
                                    id="language"
                                    value={preferredLanguage}
                                    onChange={(e) => setPreferredLanguage(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">{t('languageAuto')}</option>
                                    <option value="en">English</option>
                                    <option value="de">Deutsch</option>
                                    <option value="pl">Polski</option>
                                </select>
                            </div>

                            {/* Auth0 Info (read-only) */}
                            <div className="pt-4 border-t border-slate-700">
                                <h3 className="text-sm font-medium text-gray-400 mb-3">{t('accountInfo')}</h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">{t('email')}</span>
                                        <span className="text-gray-300">{user?.email || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">{t('userId')}</span>
                                        <span className="text-gray-300 font-mono text-xs">{profile?.userId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">{t('memberSince')}</span>
                                        <span className="text-gray-300">
                                            {profile?.createdAt
                                                ? new Date(profile.createdAt).toLocaleDateString()
                                                : '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg transition-all duration-200 font-medium shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? t('saving') : t('saveChanges')}
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
}

function ProfileSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Skeleton variant="text" width={200} height={32} className="mb-2" />
                    <Skeleton variant="text" width={300} height={20} />
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-6">
                    <Skeleton variant="text" width={100} height={24} className="mb-4" />
                    <div className="flex items-center gap-6">
                        <Skeleton variant="circular" width={96} height={96} />
                        <div>
                            <Skeleton variant="rectangular" width={120} height={36} className="rounded-lg mb-2" />
                            <Skeleton variant="text" width={180} height={14} />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                    <Skeleton variant="text" width={150} height={24} className="mb-4" />
                    <div className="space-y-4">
                        <div>
                            <Skeleton variant="text" width={100} height={16} className="mb-1" />
                            <Skeleton variant="rectangular" height={40} className="rounded-lg" />
                        </div>
                        <div>
                            <Skeleton variant="text" width={50} height={16} className="mb-1" />
                            <Skeleton variant="rectangular" height={80} className="rounded-lg" />
                        </div>
                        <div>
                            <Skeleton variant="text" width={120} height={16} className="mb-1" />
                            <Skeleton variant="rectangular" height={40} className="rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withPageAuthRequired(ProfilePage, {
    returnTo: '/dashboard/profile',
});
