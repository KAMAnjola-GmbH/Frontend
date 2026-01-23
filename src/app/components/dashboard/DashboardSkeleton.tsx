'use client';

import React from 'react';
import Skeleton from '@/app/components/ui/Skeleton';

export function DashboardSkeleton() {
    return (
        <div className="space-y-6 p-6">
            {/* Header skeleton */}
            <div className="space-y-2">
                <Skeleton variant="text" width={300} height={32} />
                <Skeleton variant="text" width={200} height={20} />
            </div>

            {/* KPIs skeleton */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                <Skeleton variant="text" width={150} height={24} className="mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <Skeleton variant="text" width="60%" height={16} className="mb-3" />
                            <Skeleton variant="text" width={60} height={36} className="mb-2" />
                            <Skeleton variant="text" width="40%" height={14} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Products skeleton */}
                <div className="lg:col-span-2 bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                    <Skeleton variant="text" width={150} height={24} className="mb-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <Skeleton variant="rectangular" width={40} height={40} />
                                </div>
                                <Skeleton variant="text" width="70%" height={20} className="mb-1" />
                                <Skeleton variant="text" width="90%" height={14} className="mb-3" />
                                <div className="flex justify-between">
                                    <Skeleton variant="text" width={60} height={14} />
                                    <Skeleton variant="text" width={60} height={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar skeleton */}
                <div className="space-y-6">
                    {/* Activity skeleton */}
                    <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                        <Skeleton variant="text" width={150} height={24} className="mb-4" />
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex items-start gap-3 p-2">
                                    <Skeleton variant="circular" width={32} height={32} />
                                    <div className="flex-grow">
                                        <Skeleton variant="text" width="80%" height={16} className="mb-1" />
                                        <Skeleton variant="text" width="50%" height={12} />
                                    </div>
                                    <Skeleton variant="text" width={40} height={12} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Subscription skeleton */}
                    <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                        <Skeleton variant="text" width={180} height={24} className="mb-4" />
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Skeleton variant="text" width={60} height={16} />
                                <Skeleton variant="rectangular" width={80} height={28} />
                            </div>
                            <div>
                                <Skeleton variant="text" width="100%" height={8} />
                            </div>
                            <div>
                                <Skeleton variant="text" width="100%" height={8} />
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Skeleton variant="rectangular" className="flex-1" height={36} />
                                <Skeleton variant="rectangular" className="flex-1" height={36} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick actions skeleton */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                <Skeleton variant="text" width={150} height={24} className="mb-4" />
                <div className="flex flex-wrap gap-3">
                    <Skeleton variant="rectangular" width={160} height={40} />
                    <Skeleton variant="rectangular" width={180} height={40} />
                    <Skeleton variant="rectangular" width={140} height={40} />
                </div>
            </div>
        </div>
    );
}

export default DashboardSkeleton;
