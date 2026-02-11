// components/viewer/TrameViewer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTranslations } from 'next-intl';

interface TrameViewerProps {
    className?: string;
}

/**
 * TrameViewer component that embeds the Trame VTK service.
 *
 * Authentication flow:
 * - Development: Direct access to localhost:8081
 * - Production: Traefik validates JWT via ForwardAuth before allowing access
 *
 * The Trame service (kitware/trame Docker image) handles multi-user automatically,
 * spawning a new process for each browser connection.
 */
const TrameViewer: React.FC<TrameViewerProps> = ({ className = '' }) => {
    const t = useTranslations('viewer');
    const { user, isLoading: isUserLoading } = useUser();
    const [isLaunched, setIsLaunched] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);

    // Determine Trame URL based on environment
    const getTrameUrl = () => {
        // In production, use the /vtk path which goes through Traefik with auth
        if (typeof window !== 'undefined') {
            const isProd = window.location.hostname !== 'localhost';
            if (isProd) {
                return `${window.location.origin}/vtk`;
            }
        }
        // Development: direct access
        return process.env.NEXT_PUBLIC_TRAME_URL || 'http://localhost:8081';
    };

    const handleLaunch = () => {
        setIsLaunched(true);
        setIframeKey(prev => prev + 1);
    };

    const handleRefresh = () => {
        setIframeKey(prev => prev + 1);
    };

    // Not logged in
    if (!isUserLoading && !user) {
        return (
            <div className={`flex items-center justify-center h-full bg-gray-900 ${className}`}>
                <div className="text-center p-8">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        {t('trame.loginRequired', { defaultValue: 'Login Required' })}
                    </h3>
                    <p className="text-gray-400 mb-4">
                        {t('trame.loginDescription', { defaultValue: 'Please log in to access the VTK visualization service.' })}
                    </p>
                    <a
                        href="/auth/login"
                        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                    >
                        {t('trame.login', { defaultValue: 'Log In' })}
                    </a>
                </div>
            </div>
        );
    }

    // Loading user state
    if (isUserLoading) {
        return (
            <div className={`flex items-center justify-center h-full bg-gray-900 ${className}`}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Viewer launched - show iframe
    if (isLaunched) {
        return (
            <div className={`flex flex-col h-full ${className}`}>
                {/* Header with controls */}
                <div className="shrink-0 flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <span className="text-white font-medium">
                            {t('trame.title', { defaultValue: 'VTK Remote Rendering' })}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                            {user?.name || user?.email}
                        </span>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {t('trame.refresh', { defaultValue: 'Refresh' })}
                    </button>
                </div>

                {/* Trame iframe */}
                <div className="flex-1 min-h-0">
                    <iframe
                        key={iframeKey}
                        src={getTrameUrl()}
                        className="w-full h-full border-0"
                        title="VTK Remote Rendering"
                        allow="fullscreen"
                    />
                </div>
            </div>
        );
    }

    // Ready to launch
    return (
        <div className={`flex items-center justify-center h-full bg-gray-900 ${className}`}>
            <div className="text-center p-8 max-w-md">
                <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                    {t('trame.readyTitle', { defaultValue: 'VTK Remote Rendering' })}
                </h3>
                <p className="text-gray-400 mb-6">
                    {t('trame.readyDescription', { defaultValue: 'Server-side rendering for complex scientific visualizations. Each user gets their own isolated rendering process.' })}
                </p>
                <button
                    onClick={handleLaunch}
                    className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition flex items-center gap-3 mx-auto"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('trame.launch', { defaultValue: 'Launch VTK Viewer' })}
                </button>
                <p className="text-xs text-gray-500 mt-4">
                    {t('trame.note', { defaultValue: 'A new rendering session will be created for you.' })}
                </p>
            </div>
        </div>
    );
};

export default TrameViewer;
