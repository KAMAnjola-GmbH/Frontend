'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import type { BusinessKpis as BusinessKpisType } from '@/types/user';

interface KpiCardProps {
    title: string;
    value: number;
    weeklyChange?: number;
    weeklyLabel: string;
    icon: React.ReactNode;
    variant?: 'default' | 'warning';
}

function KpiCard({ title, value, weeklyChange, weeklyLabel, icon, variant = 'default' }: KpiCardProps) {
    const borderColor = variant === 'warning' ? 'border-yellow-600' : 'border-gray-700';
    const showWeekly = weeklyChange !== undefined;

    return (
        <div className={`bg-gray-800/50 border ${borderColor} rounded-lg p-4 flex flex-col`}>
            <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">{title}</span>
                <span className="text-gray-500">{icon}</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{value}</div>
            {showWeekly && (
                <div className="text-sm">
                    <span className={weeklyChange > 0 ? 'text-green-500' : 'text-gray-500'}>
                        {weeklyChange > 0 ? '+' : ''}{weeklyChange}
                    </span>
                    <span className="text-gray-500 ml-1">{weeklyLabel}</span>
                </div>
            )}
        </div>
    );
}

interface BusinessKpisProps {
    kpis: BusinessKpisType;
}

export function BusinessKpis({ kpis }: BusinessKpisProps) {
    const t = useTranslations('dashboard.kpis');

    return (
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">{t('title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                    title={t('projects')}
                    value={kpis.totalProjects}
                    weeklyChange={kpis.projectsThisWeek}
                    weeklyLabel={t('thisWeek')}
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    }
                />
                <KpiCard
                    title={t('analyses')}
                    value={kpis.completedAnalyses}
                    weeklyChange={kpis.analysesThisWeek}
                    weeklyLabel={t('thisWeek')}
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                />
                <KpiCard
                    title={t('simulations')}
                    value={kpis.simulationRuns}
                    weeklyChange={kpis.simulationsThisWeek}
                    weeklyLabel={t('thisWeek')}
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    }
                />
                <KpiCard
                    title={t('alerts')}
                    value={kpis.activeAlerts}
                    weeklyLabel=""
                    variant={kpis.activeAlerts > 0 ? 'warning' : 'default'}
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    }
                />
            </div>
        </div>
    );
}

export default BusinessKpis;
