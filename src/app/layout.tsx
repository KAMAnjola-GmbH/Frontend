// app/layout.tsx
import type { Metadata } from 'next';
import React from 'react';
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import Navbar from '@/app/components/ui/navigation/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'r0sita',
  description: 'Visualize, Simulate, and Optimize.',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`h-full antialiased bg-gray-900 text-gray-200 flex flex-col`}>
        <Auth0Provider>
          
          <Navbar />

          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {children}
          </div>

        </Auth0Provider>
        
        
      </body>
    </html>
  );
}