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
    gradient: string;
    iconBg: string;
}

function KpiCard({ title, value, weeklyChange, weeklyLabel, icon, gradient, iconBg }: KpiCardProps) {
    const showWeekly = weeklyChange !== undefined;

    return (
        <div className={`relative overflow-hidden rounded-2xl p-5 ${gradient} shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${iconBg}`}>
                        {icon}
                    </div>
                </div>

                <div className="text-4xl font-bold text-white mb-1 tracking-tight">{value}</div>
                <div className="text-white/80 text-sm font-medium mb-2">{title}</div>

                {showWeekly && (
                    <div className="flex items-center gap-1.5 text-sm">
                        <span className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                            weeklyChange > 0
                                ? 'bg-white/20 text-white'
                                : 'bg-white/10 text-white/60'
                        }`}>
                            {weeklyChange > 0 && (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            )}
                            {weeklyChange > 0 ? '+' : ''}{weeklyChange}
                        </span>
                        <span className="text-white/60">{weeklyLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

interface BusinessKpisProps {
    kpis: BusinessKpisType;
}

export function BusinessKpis({ kpis }: BusinessKpisProps) {
    const t = useTranslations('dashboard.kpis');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
                title={t('projects')}
                value={kpis.totalProjects}
                weeklyChange={kpis.projectsThisWeek}
                weeklyLabel={t('thisWeek')}
                gradient="bg-gradient-to-br from-blue-600 to-blue-700"
                iconBg="bg-white/20"
                icon={
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                gradient="bg-gradient-to-br from-emerald-600 to-emerald-700"
                iconBg="bg-white/20"
                icon={
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                gradient="bg-gradient-to-br from-purple-600 to-purple-700"
                iconBg="bg-white/20"
                icon={
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                }
            />
            <KpiCard
                title={t('alerts')}
                value={kpis.activeAlerts}
                weeklyLabel=""
                gradient={kpis.activeAlerts > 0
                    ? "bg-gradient-to-br from-amber-500 to-orange-600"
                    : "bg-gradient-to-br from-slate-600 to-slate-700"
                }
                iconBg="bg-white/20"
                icon={
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                }
            />
        </div>
    );
}

export default BusinessKpis;
