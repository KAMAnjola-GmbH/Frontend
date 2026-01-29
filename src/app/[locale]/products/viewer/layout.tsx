// app/[locale]/products/viewer/layout.tsx
import React from 'react';
import ViewerSidebar from '@/app/components/viewer/Sidebar';
import ViewerErrorBoundary from '@/app/components/viewer/ViewerErrorBoundary';
import { ViewerProjectProvider } from '@/app/context/ViewerProjectContext';

export default function ViewerLayout({ children }: { children: React.ReactNode }) {
    return (
        <ViewerProjectProvider>
            <div className="flex h-full min-h-0">
                {/* Sidebar */}
                <div className="w-64 flex-none h-full border-r border-gray-800">
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
