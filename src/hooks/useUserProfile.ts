'use client';

import { useState, useEffect, useCallback } from 'react';
import { userApi, ApiError } from '@/services/api';
import type { UserProfile, UpdateProfileDto } from '@/types/user';

interface UseUserProfileReturn {
    profile: UserProfile | null;
    isLoading: boolean;
    isSaving: boolean;
    error: string | null;
    updateProfile: (data: UpdateProfileDto) => Promise<boolean>;
    uploadAvatar: (file: File) => Promise<boolean>;
    deleteAvatar: () => Promise<boolean>;
    refetch: () => void;
}

export function useUserProfile(): UseUserProfileReturn {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await userApi.getProfile();
            setProfile(data);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.statusText);
            } else {
                setError('Failed to load profile');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const updateProfile = useCallback(async (data: UpdateProfileDto): Promise<boolean> => {
        setIsSaving(true);
        setError(null);

        try {
            const updated = await userApi.updateProfile(data);
            setProfile(updated);
            return true;
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.statusText);
            } else {
                setError('Failed to update profile');
            }
            return false;
        } finally {
            setIsSaving(false);
        }
    }, []);

    const uploadAvatar = useCallback(async (file: File): Promise<boolean> => {
        setIsSaving(true);
        setError(null);

        try {
            const updated = await userApi.uploadAvatar(file);
            setProfile(updated);
            return true;
        } catch (err) {
            if (err instanceof ApiError) {
                if (err.status === 400) {
                    setError('Invalid file. Please upload a JPEG, PNG, GIF, or WebP image (max 5MB).');
                } else {
                    setError(err.statusText);
                }
            } else {
                setError('Failed to upload avatar');
            }
            return false;
        } finally {
            setIsSaving(false);
        }
    }, []);

    const deleteAvatar = useCallback(async (): Promise<boolean> => {
        setIsSaving(true);
        setError(null);

        try {
            const updated = await userApi.deleteAvatar();
            setProfile(updated);
            return true;
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.statusText);
            } else {
                setError('Failed to delete avatar');
            }
            return false;
        } finally {
            setIsSaving(false);
        }
    }, []);

    return {
        profile,
        isLoading,
        isSaving,
        error,
        updateProfile,
        uploadAvatar,
        deleteAvatar,
        refetch: fetchProfile,
    };
}
