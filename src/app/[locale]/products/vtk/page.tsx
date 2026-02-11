// app/[locale]/products/vtk/page.tsx
'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import TrameViewer from '@/app/components/viewer/TrameViewer';

type DataSource = 'none' | 'upload' | 'simulation' | 'realtime';

const VtkPage: React.FC = () => {
    const t = useTranslations('vtk');
    const [selectedSource, setSelectedSource] = useState<DataSource>('none');
    const [isViewerActive, setIsViewerActive] = useState(false);

    const dataSources = [
        {
            id: 'upload' as DataSource,
            title: t('sources.upload.title', { defaultValue: 'Upload Files' }),
            description: t('sources.upload.description', { defaultValue: 'Upload VTK, STL, OpenFOAM or other scientific data files' }),
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            ),
            available: true,
        },
        {
            id: 'simulation' as DataSource,
            title: t('sources.simulation.title', { defaultValue: 'Simulation Results' }),
            description: t('sources.simulation.description', { defaultValue: 'Visualize CFD, FEA, or other simulation outputs' }),
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            available: false, // Coming soon
        },
        {
            id: 'realtime' as DataSource,
            title: t('sources.realtime.title', { defaultValue: 'Real-time Data' }),
            description: t('sources.realtime.description', { defaultValue: 'Connect to live sensor data and IoT streams' }),
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            available: false, // Coming soon
        },
    ];

    const handleLaunchViewer = () => {
        setIsViewerActive(true);
    };

    const handleBackToSelection = () => {
        setIsViewerActive(false);
        setSelectedSource('none');
    };

    // Active viewer mode
    if (isViewerActive) {
        return (
            <div className="h-full flex flex-col">
                {/* Header */}
                <div className="shrink-0 px-6 py-4 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBackToSelection}
                            className="p-2 hover:bg-gray-700 rounded-lg transition"
                        >
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-white">
                                {t('title', { defaultValue: 'Scientific Visualization' })}
                            </h1>
                            <p className="text-sm text-gray-400">
                                {t('subtitle', { defaultValue: 'VTK Remote Rendering' })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trame Viewer */}
                <div className="flex-1 min-h-0">
                    <TrameViewer />
                </div>
            </div>
        );
    }

    // Data source selection
    return (
        <div className="h-full overflow-auto bg-gray-900">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {t('title', { defaultValue: 'Scientific Visualization' })}
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        {t('description', { defaultValue: 'Advanced 3D visualization powered by VTK. Server-side rendering for complex scientific data, simulations, and real-time monitoring.' })}
                    </p>
                </div>

                {/* Data Source Selection */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4">
                        {t('selectSource', { defaultValue: 'Select Data Source' })}
                    </h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {dataSources.map((source) => (
                            <button
                                key={source.id}
                                onClick={() => source.available && setSelectedSource(source.id)}
                                disabled={!source.available}
                                className={`
                                    p-6 rounded-xl border text-left transition relative
                                    ${selectedSource === source.id
                                        ? 'border-purple-500 bg-purple-500/10'
                                        : source.available
                                            ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                                            : 'border-gray-800 bg-gray-800/50 opacity-60 cursor-not-allowed'
                                    }
                                `}
                            >
                                {!source.available && (
                                    <span className="absolute top-3 right-3 text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded">
                                        {t('comingSoon', { defaultValue: 'Coming Soon' })}
                                    </span>
                                )}
                                <div className={`mb-3 ${selectedSource === source.id ? 'text-purple-500' : 'text-gray-400'}`}>
                                    {source.icon}
                                </div>
                                <h3 className="font-semibold text-white mb-1">{source.title}</h3>
                                <p className="text-sm text-gray-400">{source.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload Section (when upload is selected) */}
                {selectedSource === 'upload' && (
                    <div className="mb-8 p-6 rounded-xl border border-gray-700 bg-gray-800">
                        <h3 className="font-semibold text-white mb-4">
                            {t('upload.title', { defaultValue: 'Upload Scientific Data' })}
                        </h3>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition cursor-pointer">
                            <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-gray-400 mb-2">
                                {t('upload.dragDrop', { defaultValue: 'Drag and drop files here, or click to browse' })}
                            </p>
                            <p className="text-sm text-gray-500">
                                {t('upload.formats', { defaultValue: 'Supported: VTK, VTI, VTP, STL, OBJ, PLY, OpenFOAM' })}
                            </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                            {t('upload.note', { defaultValue: 'Note: File upload to VTK service is in development. For now, the viewer shows a demo scene.' })}
                        </p>
                    </div>
                )}

                {/* Launch Button */}
                <div className="text-center">
                    <button
                        onClick={handleLaunchViewer}
                        disabled={selectedSource === 'none'}
                        className={`
                            px-8 py-4 rounded-xl font-semibold text-lg transition flex items-center gap-3 mx-auto
                            ${selectedSource !== 'none'
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }
                        `}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('launch', { defaultValue: 'Launch VTK Viewer' })}
                    </button>
                    {selectedSource === 'none' && (
                        <p className="text-sm text-gray-500 mt-3">
                            {t('selectSourceFirst', { defaultValue: 'Please select a data source above' })}
                        </p>
                    )}
                </div>

                {/* Info Section */}
                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    <div className="p-6 rounded-xl border border-gray-700 bg-gray-800/50">
                        <h3 className="font-semibold text-white mb-2">
                            {t('info.serverSide.title', { defaultValue: 'Server-Side Rendering' })}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {t('info.serverSide.description', { defaultValue: 'Heavy computations run on our servers. Your browser displays the result via streaming, enabling visualization of datasets that would be impossible client-side.' })}
                        </p>
                    </div>
                    <div className="p-6 rounded-xl border border-gray-700 bg-gray-800/50">
                        <h3 className="font-semibold text-white mb-2">
                            {t('info.useCases.title', { defaultValue: 'Use Cases' })}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {t('info.useCases.description', { defaultValue: 'CFD simulations, FEA stress analysis, offshore wind farm monitoring, drone inspection data, real-time sensor visualization.' })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VtkPage;
