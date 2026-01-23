'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import type { Subscription } from '@/types/user';

interface SubscriptionCardProps {
    subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
    const t = useTranslations('dashboard.subscription');

    const projectsPercent = subscription.projectsLimit > 0
        ? Math.min(100, Math.round((subscription.projectsUsed / subscription.projectsLimit) * 100))
        : 0;

    const storagePercent = subscription.storageLimitMb > 0
        ? Math.min(100, Math.round((subscription.storageUsedMb / subscription.storageLimitMb) * 100))
        : 0;

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString();
    };

    return (
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">{t('title')}</h2>

            <div className="space-y-4">
                {/* Plan info */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t('plan')}</span>
                    <span className="text-white font-medium px-3 py-1 bg-blue-600/20 text-blue-400 rounded">
                        {subscription.plan}
                    </span>
                </div>

                {subscription.validUntil && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">{t('validUntil')}</span>
                        <span className="text-white">{formatDate(subscription.validUntil)}</span>
                    </div>
                )}

                {/* Projects usage */}
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-400 text-sm">{t('projectsUsed')}</span>
                        <span className="text-gray-300 text-sm">
                            {subscription.projectsUsed} / {subscription.projectsLimit}
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all ${
                                projectsPercent >= 90 ? 'bg-red-500' :
                                projectsPercent >= 70 ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${projectsPercent}%` }}
                        />
                    </div>
                </div>

                {/* Storage usage */}
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-400 text-sm">{t('storageUsed')}</span>
                        <span className="text-gray-300 text-sm">
                            {subscription.storageUsedMb} MB / {subscription.storageLimitMb} MB
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all ${
                                storagePercent >= 90 ? 'bg-red-500' :
                                storagePercent >= 70 ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${storagePercent}%` }}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <button
                        className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors text-sm"
                        onClick={() => {/* TODO: Navigate to account management */}}
                    >
                        {t('manage')}
                    </button>
                    <button
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors text-sm"
                        onClick={() => {/* TODO: Navigate to upgrade page */}}
                    >
                        {t('upgrade')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionCard;
