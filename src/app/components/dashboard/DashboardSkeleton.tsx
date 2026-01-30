'use client';

import React from 'react';
import Skeleton from '@/app/components/ui/Skeleton';

export function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header skeleton */}
                <div className="flex items-center gap-4 mb-10">
                    <Skeleton variant="circular" width={56} height={56} />
                    <div>
                        <Skeleton variant="text" width={280} height={32} className="mb-2" />
                        <Skeleton variant="text" width={200} height={20} />
                    </div>
                </div>

                {/* KPIs skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-slate-700/50 rounded-2xl p-5 animate-pulse">
                            <Skeleton variant="rectangular" width={48} height={48} className="rounded-xl mb-4" />
                            <Skeleton variant="text" width={60} height={40} className="mb-2" />
                            <Skeleton variant="text" width={80} height={16} className="mb-2" />
                            <Skeleton variant="text" width={100} height={14} />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Products skeleton */}
                    <div className="lg:col-span-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                        <Skeleton variant="text" width={150} height={24} className="mb-5" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <Skeleton variant="rectangular" width={52} height={52} className="rounded-xl" />
                                        <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
                                    </div>
                                    <Skeleton variant="text" width="70%" height={20} className="mb-2" />
                                    <Skeleton variant="text" width="90%" height={14} className="mb-1" />
                                    <Skeleton variant="text" width="60%" height={14} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar skeleton */}
                    <div className="space-y-6">
                        {/* Activity skeleton */}
                        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                            <Skeleton variant="text" width={150} height={24} className="mb-4" />
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-start gap-3 p-2">
                                        <Skeleton variant="rectangular" width={32} height={32} className="rounded-lg" />
                                        <div className="flex-grow">
                                            <Skeleton variant="text" width="80%" height={16} className="mb-1" />
                                            <Skeleton variant="text" width="50%" height={12} />
                                        </div>
                                        <Skeleton variant="text" width={30} height={12} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Subscription skeleton */}
                        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                            <Skeleton variant="text" width={180} height={24} className="mb-5" />
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Skeleton variant="text" width={50} height={16} />
                                    <Skeleton variant="rectangular" width={80} height={28} className="rounded-lg" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <Skeleton variant="text" width={100} height={14} />
                                        <Skeleton variant="text" width={60} height={14} />
                                    </div>
                                    <Skeleton variant="rectangular" height={8} className="rounded-full" />
                                </div>
                                <div className="space-y-2 pt-2">
                                    <Skeleton variant="rectangular" height={44} className="rounded-xl" />
                                    <Skeleton variant="rectangular" height={44} className="rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick actions skeleton */}
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                    <Skeleton variant="text" width={150} height={24} className="mb-5" />
                    <div className="flex flex-wrap gap-3">
                        <Skeleton variant="rectangular" width={170} height={48} className="rounded-xl" />
                        <Skeleton variant="rectangular" width={190} height={48} className="rounded-xl" />
                        <Skeleton variant="rectangular" width={160} height={48} className="rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardSkeleton;
