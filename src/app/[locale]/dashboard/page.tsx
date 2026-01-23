'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useDashboard } from '@/hooks/useDashboard';
import {
    BusinessKpis,
    ProductCards,
    RecentActivity,
    SubscriptionCard,
    QuickActions,
    DashboardSkeleton,
} from '@/app/components/dashboard';

export default function DashboardPage() {
    const t = useTranslations('dashboard');
    const { dashboardData, isLoading, error, refetch } = useDashboard();

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
                <div className="text-center">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-white mb-2">{t('error.title')}</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={refetch}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
                    >
                        {t('error.retry')}
                    </button>
                </div>
            </div>
        );
    }

    if (!dashboardData) {
        return null;
    }

    const { user, kpis, products, recentActivity, subscription } = dashboardData;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    {t('welcome', { name: user.name || 'User' })}
                </h1>
                <p className="text-gray-400 mt-1">{t('subtitle')}</p>
            </div>

            {/* KPIs */}
            <BusinessKpis kpis={kpis} />

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            <QuickActions />
        </div>
    );
}
