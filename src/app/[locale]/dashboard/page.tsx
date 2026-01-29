'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useUser } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useDashboard } from '@/hooks/useDashboard';
import {
    BusinessKpis,
    ProductCards,
    RecentActivity,
    SubscriptionCard,
    QuickActions,
    DashboardSkeleton,
} from '@/app/components/dashboard';

function DashboardPage() {
    const t = useTranslations('dashboard');
    const { user, isLoading: isUserLoading } = useUser();
    const { dashboardData, isLoading: isDashboardLoading, error, refetch } = useDashboard();

    const isLoading = isUserLoading || isDashboardLoading;

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
                    <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 max-w-md">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">{t('error.title')}</h2>
                        <p className="text-gray-400 mb-6">{error}</p>
                        <button
                            onClick={refetch}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl transition-all duration-200 font-medium shadow-lg shadow-blue-500/25"
                        >
                            {t('error.retry')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!dashboardData) {
        return null;
    }

    const { kpis, products, recentActivity, subscription } = dashboardData;

    // Dane użytkownika z Auth0
    const userName = user?.name || user?.nickname || 'User';
    const userPicture = user?.picture;
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header with welcome message */}
                <header className="mb-10">
                    <div className="flex items-center gap-4 mb-2">
                        <Link href="/dashboard/profile" className="group relative">
                            {userPicture ? (
                                <div className="relative w-14 h-14 rounded-full border-2 border-blue-500/50 shadow-lg shadow-blue-500/20 overflow-hidden group-hover:border-blue-400 transition-colors">
                                    <Image
                                        src={userPicture}
                                        alt={userName}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20 group-hover:from-blue-400 group-hover:to-purple-500 transition-colors">
                                    {userInitial}
                                </div>
                            )}
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                {t('welcome', { name: userName })}
                            </h1>
                            <p className="text-gray-400">{t('subtitle')}</p>
                        </div>
                    </div>
                </header>

                {/* KPIs Section */}
                <section className="mb-8">
                    <BusinessKpis kpis={kpis} />
                </section>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Products (takes 2 columns on large screens) */}
                    <div className="lg:col-span-2">
                        <ProductCards products={products} />
                    </div>

                    {/* Sidebar (activity + subscription) */}
                    <div className="space-y-6">
                        <RecentActivity activities={recentActivity} />
                        <SubscriptionCard subscription={subscription} />
                    </div>
                </div>

                {/* Quick actions */}
                <section>
                    <QuickActions />
                </section>
            </div>
        </div>
    );
}

export default withPageAuthRequired(DashboardPage, {
    returnTo: '/dashboard',
});
