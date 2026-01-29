// app/[locale]/dashboard/layout.tsx
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full overflow-y-auto">
            {children}
        </div>
    );
}
