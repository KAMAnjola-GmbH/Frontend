/**
 * useDashboard Hook
 *
 * Manages dashboard data fetching and state.
 *
 * @example
 * const { dashboardData, isLoading, error, refetch } = useDashboard();
 */

import { useState, useEffect, useCallback } from 'react';
import { userApi, ApiError } from '@/services/api';
import type { DashboardData } from '@/types/user';

interface UseDashboardReturn {
    /** Dashboard data (null while loading) */
    dashboardData: DashboardData | null;
    /** Loading state */
    isLoading: boolean;
    /** Error message if fetch failed */
    error: string | null;
    /** Manually refetch dashboard data */
    refetch: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await userApi.getDashboard();
            setDashboardData(data);
        } catch (err) {
            console.error('[useDashboard] Failed to fetch dashboard:', err);
            if (err instanceof ApiError) {
                if (err.isUnauthorized()) {
                    setError('Unauthorized. Please log in again.');
                } else {
                    setError(`Failed to load dashboard (${err.status})`);
                }
            } else {
                setError('Failed to load dashboard. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    return {
        dashboardData,
        isLoading,
        error,
        refetch: fetchDashboard,
    };
}
