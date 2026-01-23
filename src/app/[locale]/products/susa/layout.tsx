// app/products/susa/layout.tsx
import React from 'react';
import SusaSidebar from '@/app/components/susa/Sidebar';
import SusaErrorBoundary from '@/app/components/susa/SusaErrorBoundary';
import { SusaProjectProvider } from '@/app/context/SusaProjectContext';

export default function SusaLayout({ children }: { children: React.ReactNode }) {
  return (
    <SusaProjectProvider>
      <div className="flex h-full min-h-0">
        {/* Sidebar */}
        <div className="w-64 flex-none h-full border-r border-gray-800">
          <SusaErrorBoundary>
            <SusaSidebar />
          </SusaErrorBoundary>
        </div>

        {/* Main content with error boundary */}
        <main className="flex-1 relative flex flex-col min-w-0 overflow-hidden">
          <SusaErrorBoundary>
            {children}
          </SusaErrorBoundary>
        </main>
      </div>
    </SusaProjectProvider>
  );
}