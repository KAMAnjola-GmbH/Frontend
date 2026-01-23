// components/viewer/StressSimulation.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useViewerContext } from '@/app/context/ViewerProjectContext';

/**
 * Safely format a number value, handling undefined/null.
 */
function formatValue(value: number | undefined | null, fallback = 'N/A'): string {
    if (value === undefined || value === null || isNaN(value)) {
        return fallback;
    }
    return value.toFixed(2);
}

const StressSimulation: React.FC = () => {
    const t = useTranslations('viewer');
    const { stressResult, isSimulating } = useViewerContext();

    // Don't render if no simulation result and not simulating
    if (!stressResult && !isSimulating) {
        return null;
    }

    // Safely extract results with defaults (API returns snake_case)
    const results = stressResult?.results;
    const maxStress = results?.max_stress;
    const minStress = results?.min_stress;
    const averageStress = results?.average_stress;
    const unit = results?.unit || '';
    const simulationType = stressResult?.simulation_type || 'Stress Analysis';

    return (
        <div className="flex-shrink-0 border-t border-gray-700 bg-gray-900/80 px-6 py-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                </svg>
                {t('simulation_results')}
            </h3>

            {isSimulating ? (
                <div className="flex items-center gap-3 text-gray-400">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500" />
                    <span>{t('running_simulation')}</span>
                </div>
            ) : stressResult ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Simulation Type */}
                    <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                            {t('simulation_type')}
                        </p>
                        <p className="text-white font-semibold">{simulationType}</p>
                    </div>

                    {/* Max Stress */}
                    <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                            {t('max_stress')}
                        </p>
                        <p className="text-red-400 font-semibold">
                            {formatValue(maxStress)} {unit}
                        </p>
                    </div>

                    {/* Min Stress */}
                    <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                            {t('min_stress')}
                        </p>
                        <p className="text-green-400 font-semibold">
                            {formatValue(minStress)} {unit}
                        </p>
                    </div>

                    {/* Average Stress (only show if available) */}
                    {averageStress !== undefined && (
                        <div className="bg-gray-800 rounded-lg p-3">
                            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                                {t('avg_stress')}
                            </p>
                            <p className="text-indigo-400 font-semibold">
                                {formatValue(averageStress)} {unit}
                            </p>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default StressSimulation;
