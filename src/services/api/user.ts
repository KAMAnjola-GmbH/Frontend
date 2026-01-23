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
 */

import { apiClient } from './client';
import type { DashboardData, UserInfo } from '@/types/user';

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
     * @returns User profile (ID, name, email, avatar)
     */
    getProfile(): Promise<UserInfo> {
        return apiClient.get<UserInfo>('/user/profile');
    },
};
