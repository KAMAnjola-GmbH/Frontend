// components/viewer/ViewerErrorBoundary.tsx
'use client';

import React, { ReactNode } from 'react';
import ErrorBoundary from '@/app/components/ui/ErrorBoundary';
import { useTranslations } from 'next-intl';

interface ViewerErrorBoundaryProps {
    children: ReactNode;
}

/**
 * Viewer-specific Error Boundary with translated fallback UI.
 */
const ViewerErrorBoundary: React.FC<ViewerErrorBoundaryProps> = ({ children }) => {
    const t = useTranslations('common');

    const fallback = (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 bg-red-900/20 border border-red-500/50 rounded-lg m-6">
            <svg
                className="w-16 h-16 text-red-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
            <h3 className="text-xl font-semibold text-red-400 mb-2">
                {t('error_title')}
            </h3>
            <p className="text-gray-400 text-center mb-6 max-w-md">
                {t('error_description')}
            </p>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition font-medium"
            >
                {t('reload_page')}
            </button>
        </div>
    );

    return (
        <ErrorBoundary fallback={fallback}>
            {children}
        </ErrorBoundary>
    );
};

export default ViewerErrorBoundary;
