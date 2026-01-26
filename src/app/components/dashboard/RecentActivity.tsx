'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ActivityItem } from '@/types/user';

function formatRelativeTime(timestamp: string, locale: string = 'de'): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMinutes < 1) return locale === 'de' ? 'gerade eben' : 'just now';
    if (diffMinutes < 60) return `${diffMinutes}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', { day: 'numeric', month: 'short' });
}

function getActivityIcon(type: string, productId: string): { icon: React.ReactNode; bgColor: string } {
    if (type === 'analysis_complete') {
        return {
            bgColor: 'bg-emerald-500/20',
            icon: (
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ),
        };
    }

    if (productId === 'susa') {
        return {
            bgColor: 'bg-emerald-500/20',
            icon: (
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        };
    }

    // Default: viewer/3D
    return {
        bgColor: 'bg-purple-500/20',
        icon: (
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
    };
}

interface ActivityItemRowProps {
    activity: ActivityItem;
    isLast: boolean;
}

function ActivityItemRow({ activity, isLast }: ActivityItemRowProps) {
    const { icon, bgColor } = getActivityIcon(activity.type, activity.productId);

    const content = (
        <div className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            {/* Icon with timeline line */}
            <div className="relative flex flex-col items-center">
                <div className={`p-2 rounded-lg ${bgColor}`}>
                    {icon}
                </div>
                {!isLast && (
                    <div className="w-px h-full bg-slate-700/50 absolute top-10 left-1/2 -translate-x-1/2" />
                )}
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0 pt-0.5">
                <p className="text-white text-sm font-medium truncate group-hover:text-blue-300 transition-colors">
                    {activity.title}
                </p>
                {activity.description && (
                    <p className="text-gray-500 text-xs mt-0.5">{activity.description}</p>
                )}
            </div>

            {/* Timestamp */}
            <span className="text-gray-600 text-xs whitespace-nowrap pt-1">
                {formatRelativeTime(activity.timestamp)}
            </span>
        </div>
    );

    if (activity.projectUrl) {
        return (
            <Link href={activity.projectUrl} className="block">
                {content}
            </Link>
        );
    }

    return content;
}

interface RecentActivityProps {
    activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
    const t = useTranslations('dashboard.activity');

    return (
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('title')}
            </h2>

            {activities.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                        <svg className="w-7 h-7 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-sm">{t('empty')}</p>
                </div>
            ) : (
                <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                    {activities.map((activity, index) => (
                        <ActivityItemRow
                            key={`${activity.projectId}-${index}`}
                            activity={activity}
                            isLast={index === activities.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecentActivity;
