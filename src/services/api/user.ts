/**
 * User API Service
 *
 * Handles user dashboard and profile endpoints.
 *
 * @example
 * import { userApi } from '@/services/api';
 *
 * const dashboard = await userApi.getDashboard();
 * const profile = await userApi.getProfile();
 * await userApi.updateProfile({ displayName: 'New Name' });
 */

import { apiClient } from './client';
import type { DashboardData, UserProfile, UpdateProfileDto } from '@/types/user';

export const userApi = {
    /**
     * Get aggregated dashboard data for the current user.
     * @returns Dashboard with KPIs, products, activity, and subscription info
     */
    getDashboard(): Promise<DashboardData> {
        return apiClient.get<DashboardData>('/user/dashboard');
    },

    /**
     * Get user profile information.
     * Creates a new profile if one doesn't exist.
     * @returns User profile with custom settings
     */
    getProfile(): Promise<UserProfile> {
        return apiClient.get<UserProfile>('/user/profile');
    },

    /**
     * Update user profile information.
     * @param data Profile fields to update
     * @returns Updated user profile
     */
    updateProfile(data: UpdateProfileDto): Promise<UserProfile> {
        return apiClient.put<UserProfile>('/user/profile', data);
    },

    /**
     * Upload a custom avatar image.
     * @param file Image file (JPEG, PNG, GIF, WebP; max 5MB)
     * @returns Updated user profile with new avatar URL
     */
    uploadAvatar(file: File): Promise<UserProfile> {
        return apiClient.upload<UserProfile>('/user/profile/avatar', file);
    },

    /**
     * Delete custom avatar and revert to Auth0 avatar.
     * @returns Updated user profile without custom avatar
     */
    deleteAvatar(): Promise<UserProfile> {
        return apiClient.delete<UserProfile>('/user/profile/avatar');
    },
};
