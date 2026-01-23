// components/ui/Skeleton.tsx
'use client';

import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'shimmer' | 'none';
}

/**
 * Skeleton loading placeholder component.
 * Shows animated placeholder while content is loading.
 */
const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    variant = 'text',
    width,
    height,
    animation = 'pulse',
}) => {
    const baseClasses = 'bg-gray-700';

    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-md',
    };

    const animationClasses = {
        pulse: 'animate-pulse',
        shimmer: 'animate-shimmer bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%]',
        none: '',
    };

    const style: React.CSSProperties = {
        width: width ?? (variant === 'text' ? '100%' : undefined),
        height: height ?? (variant === 'text' ? '1em' : undefined),
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
            style={style}
            aria-hidden="true"
        />
    );
};

/**
 * Skeleton for project list items.
 */
export const ProjectListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
    return (
        <ul className="space-y-2">
            {Array.from({ length: count }).map((_, i) => (
                <li
                    key={i}
                    className="p-3 bg-gray-800 rounded-lg flex justify-between items-center"
                >
                    <div className="flex-grow space-y-2">
                        <Skeleton variant="text" width="70%" height={16} />
                        <Skeleton variant="text" width="30%" height={12} />
                        <Skeleton variant="rectangular" width={80} height={20} className="mt-1" />
                    </div>
                    <Skeleton variant="circular" width={24} height={24} />
                </li>
            ))}
        </ul>
    );
};

/**
 * Skeleton for analysis report content.
 */
export const AnalysisReportSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header skeleton */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton variant="text" width={200} height={24} />
                    <Skeleton variant="text" width={150} height={16} />
                </div>
                <div className="flex gap-3">
                    <Skeleton variant="rectangular" width={100} height={32} />
                    <Skeleton variant="rectangular" width={100} height={32} />
                    <Skeleton variant="rectangular" width={100} height={32} />
                </div>
            </div>

            {/* Table skeleton */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="space-y-2">
                    <Skeleton variant="rectangular" height={32} />
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} variant="rectangular" height={28} />
                    ))}
                </div>
            </div>

            {/* Charts skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 h-[400px] flex flex-col"
                    >
                        <Skeleton variant="text" width="60%" height={24} className="mx-auto mb-4" />
                        <Skeleton variant="rectangular" className="flex-grow" />
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * Skeleton for mapping interface.
 */
export const MappingSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col bg-gray-800/50 border border-gray-700 rounded-lg p-6 h-full">
            <Skeleton variant="text" width={250} height={28} className="mb-2" />
            <Skeleton variant="text" width="80%" height={16} className="mb-6" />

            <div className="space-y-3 flex-grow">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md"
                    >
                        <div className="flex gap-4">
                            <Skeleton variant="text" width={60} height={20} />
                            <Skeleton variant="text" width={150} height={20} />
                        </div>
                        <Skeleton variant="rectangular" width={150} height={36} />
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-6">
                <Skeleton variant="rectangular" width={180} height={40} />
            </div>
        </div>
    );
};

export default Skeleton;
