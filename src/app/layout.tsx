// app/layout.tsx
import type { Metadata } from 'next';
import React from 'react';
// Assuming 'inter' font is defined elsewhere, using a placeholder import style
// import { inter } from '@/app/components/ui/fonts'; 
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import Navbar from '@/app/components/ui/navigation/Navbar'; 
//import NotificationToast from '@/app/components/ui/'; // Use the component we built
import Footer from '@/app/components/ui/Footer'; // Assuming Footer exists
import './globals.css'; 
//import { useNotifications } from '@/src/hooks/useNotifications'; // Import hook for toast

export const metadata: Metadata = {
    title: 'r0sita',
    description: 'Visualize, Simulate, and Optimize.',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    // The notification state needs to be lifted to here or in a context, 
    // but since we only need the component here, we rely on the component's internal hook state.
    // For this demonstration, we'll keep the `NotificationToast` component simple.

    return (
        <Auth0Provider>
            <html lang="en" className="h-full scroll-smooth">
                {/* Use h-full to make the body fill the viewport */}
                <body className={`h-full antialiased bg-gray-900 text-gray-200 flex flex-col`}>
                    
                    {/* Navbar is fixed/sticky at the top */}
                    <Navbar />

                    {/* Main container wrapper: takes remaining height and enables scrolling */}
                    <div className="flex-grow pt-16 overflow-hidden"> 
                        {/* pt-16 matches the Navbar's height (h-16) to prevent overlap */}
                        {children}
                    </div>
                    
                    {/* Footer and Toast are outside the main layout flow */}
                  {/* {  <NotificationToast notifications={[]} removeNotification={() => {}} /> } */}
                    {/* NOTE: NotificationToast needs access to useNotifications state, which it currently doesn't have here. 
                                  For simplicity, I will remove the toast from the layout and rely on the DashboardPage to render it.*/}
                    
                    <Footer />
                </body>
            </html>
        </Auth0Provider>
    );
}