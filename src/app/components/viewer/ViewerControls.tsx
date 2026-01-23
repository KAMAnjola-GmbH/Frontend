// components/viewer/ViewerControls.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useViewerContext } from '@/app/context/ViewerProjectContext';

const ViewerControls: React.FC = () => {
    const t = useTranslations('viewer');
    const { resetCamera, currentProjectId, runStressSimulation, isSimulating } = useViewerContext();

    const handleRunSimulation = () => {
        if (currentProjectId) {
            runStressSimulation(currentProjectId);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* Reset Camera Button */}
            <button
                onClick={resetCamera}
                className="px-3 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition flex items-center gap-2 text-sm"
                title={t('reset_camera')}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                </svg>
                <span className="hidden sm:inline">{t('reset_camera')}</span>
            </button>

            {/* Run Stress Simulation Button */}
            <button
                onClick={handleRunSimulation}
                disabled={isSimulating || !currentProjectId}
                className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title={t('run_simulation')}
            >
                {isSimulating ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        <span className="hidden sm:inline">{t('simulating')}</span>
                    </>
                ) : (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        <span className="hidden sm:inline">{t('run_simulation')}</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default ViewerControls;
