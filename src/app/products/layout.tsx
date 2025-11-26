// app/products/layout.tsx
import React from 'react';

// This layout is shared by ALL products (Susa, Optima, etc.)
// It just sets up the full-screen container.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {children}
    </div>
  );
};