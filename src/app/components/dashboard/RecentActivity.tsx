'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ActivityItem } from '@/types/user';

function formatRelativeTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

function getActivityIcon(type: string, productId: string): React.ReactNode {
    if (type === 'analysis_complete') {
        return (
            <div className="p-2 bg-green-600/20 rounded-full">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
        );
    }

    if (productId === 'susa') {
        return (
            <div className="p-2 bg-blue-600/20 rounded-full">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            </div>
        );
    }

    // Default: viewer/3D
    return (
        <div className="p-2 bg-purple-600/20 rounded-full">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        </div>
    );
}

interface ActivityItemRowProps {
    activity: ActivityItem;
}

function ActivityItemRow({ activity }: ActivityItemRowProps) {
    const content = (
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
            {getActivityIcon(activity.type, activity.productId)}
            <div className="flex-grow min-w-0">
                <p className="text-white text-sm font-medium truncate">{activity.title}</p>
                {activity.description && (
                    <p className="text-gray-400 text-xs mt-0.5">{activity.description}</p>
                )}
            </div>
            <span className="text-gray-500 text-xs whitespace-nowrap">
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
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">{t('title')}</h2>
            {activities.length === 0 ? (
                <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-gray-500">{t('empty')}</p>
                </div>
            ) : (
                <div className="space-y-1">
                    {activities.map((activity, index) => (
                        <ActivityItemRow key={`${activity.projectId}-${index}`} activity={activity} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecentActivity;
