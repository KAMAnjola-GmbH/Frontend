// app/products/susa/layout.tsx
import React from 'react';
import SusaSidebar from '@/app/components/susa/Sidebar'; // The wrapper we made earlier
import { SusaProjectProvider } from '@/app/context/SusaProjectContext';

export default function SusaLayout({ children }: { children: React.ReactNode }) {
  return (
    <SusaProjectProvider>
      <div className="flex h-full min-h-0">
        
        
        {/* Specific Sidebar for Susa */}
        <div className="w-64 flex-none h-full border-r border-gray-800">
          <SusaSidebar />
        </div>

        <main className="flex-1 relative flex flex-col min-w-0 overflow-hidden">
           {children}
        </main>

      </div>
    </SusaProjectProvider>
  );
}