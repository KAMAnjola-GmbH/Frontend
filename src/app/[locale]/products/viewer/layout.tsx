// app/[locale]/products/viewer/layout.tsx
'use client';

import React, { useState } from 'react';
import ViewerSidebar from '@/app/components/viewer/Sidebar';
import ViewerErrorBoundary from '@/app/components/viewer/ViewerErrorBoundary';
import { ViewerProjectProvider } from '@/app/context/ViewerProjectContext';

export default function ViewerLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ViewerProjectProvider>
            <div className="flex h-full min-h-0 relative">
                {/* Mobile Sidebar Toggle Button */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden fixed bottom-4 left-4 z-30 p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-lg transition"
                    aria-label="Open sidebar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </button>

                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar - Desktop: always visible, Mobile: drawer */}
                <div
                    className={`
                        fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
                        w-72 lg:w-64 flex-none h-full border-r border-gray-800
                        transform transition-transform duration-300 ease-in-out
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    `}
                >
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden absolute top-2 right-2 p-2 text-gray-400 hover:text-white z-10"
                        aria-label="Close sidebar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <ViewerErrorBoundary>
                        <ViewerSidebar />
                    </ViewerErrorBoundary>
                </div>

                {/* Main content with error boundary */}
                <main className="flex-1 relative flex flex-col min-w-0 overflow-hidden">
                    <ViewerErrorBoundary>
                        {children}
                    </ViewerErrorBoundary>
                </main>
            </div>
        </ViewerProjectProvider>
    );
}
