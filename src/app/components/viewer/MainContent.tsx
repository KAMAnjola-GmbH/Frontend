// components/viewer/MainContent.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useViewerContext } from '@/app/context/ViewerProjectContext';
import ModelCanvas from './ModelCanvas';
import ViewerControls from './ViewerControls';
import StressSimulation from './StressSimulation';

const MainContent: React.FC = () => {
    const t = useTranslations('viewer');
    const {
        currentProject,
        modelBlobUrl,
        isLoadingModel,
        cameraResetTrigger,
    } = useViewerContext();

    // No project selected
    if (!currentProject) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-900/50">
                <div className="text-center p-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto mb-4 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                    </svg>
                    <p className="text-gray-400 text-lg">{t('select_project')}</p>
                </div>
            </div>
        );
    }

    // Loading model
    if (isLoadingModel) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-900/50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4" />
                    <p className="text-gray-400">{t('loading_model')}</p>
                </div>
            </div>
        );
    }

    // Model loaded
    return (
        <div className="h-full flex flex-col">
            {/* Header with project name and controls */}
            <div className="shrink-0 px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-gray-900/50">
                <div>
                    <h1 className="text-xl font-bold text-white">
                        {currentProject.name || currentProject.originalFileName}
                    </h1>
                    <p className="text-sm text-gray-400">
                        {t('project_id')}: {currentProject.id}
                    </p>
                </div>
                <ViewerControls />
            </div>

            {/* 3D Canvas */}
            <div className="flex-1 min-h-0 relative">
                {modelBlobUrl ? (
                    <ModelCanvas modelUrl={modelBlobUrl} resetTrigger={cameraResetTrigger} />
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500">{t('no_model')}</p>
                    </div>
                )}
            </div>

            {/* Stress Simulation Panel */}
            <StressSimulation />
        </div>
    );
};

export default MainContent;
