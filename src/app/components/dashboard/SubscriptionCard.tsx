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

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('de-DE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getPlanColor = (plan: string) => {
        switch (plan) {
            case 'Enterprise':
                return 'from-purple-500 to-pink-500';
            case 'Professional':
                return 'from-blue-500 to-cyan-500';
            default:
                return 'from-slate-500 to-slate-600';
        }
    };

    return (
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                {t('title')}
            </h2>

            <div className="space-y-5">
                {/* Plan badge */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{t('plan')}</span>
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r ${getPlanColor(subscription.plan)} shadow-lg`}>
                        {subscription.plan}
                    </span>
                </div>

                {subscription.validUntil && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{t('validUntil')}</span>
                        <span className="text-white text-sm">{formatDate(subscription.validUntil)}</span>
                    </div>
                )}

                {/* Projects usage */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{t('projectsUsed')}</span>
                        <span className="text-white font-medium">
                            {subscription.projectsUsed} / {subscription.projectsLimit}
                        </span>
                    </div>
                    <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                                projectsPercent >= 90
                                    ? 'bg-gradient-to-r from-red-500 to-red-400'
                                    : projectsPercent >= 70
                                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                                        : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                            }`}
                            style={{ width: `${projectsPercent}%` }}
                        />
                    </div>
                    {projectsPercent >= 80 && (
                        <p className="text-xs text-amber-400 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            {projectsPercent >= 90 ? 'Limit fast erreicht!' : 'Limit bald erreicht'}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-2">
                    <button
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl transition-all duration-200 font-medium text-sm shadow-lg shadow-blue-500/20"
                        onClick={() => {/* TODO: Navigate to upgrade page */}}
                    >
                        {t('upgrade')}
                    </button>
                    <button
                        className="w-full px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-gray-300 rounded-xl transition-colors text-sm"
                        onClick={() => {/* TODO: Navigate to account management */}}
                    >
                        {t('manage')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionCard;
