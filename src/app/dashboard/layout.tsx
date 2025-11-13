// app/layout.tsx
import type { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import { Auth0Provider } from "@auth0/nextjs-auth0";
import Navbar from '@/app/ui/components/navigation/Navbar'; // Import new Navbar component
import Footer from '@/app/ui/components/Footer'; // Import new Footer component
import './globals.css'; // This is where your Tailwind styles are imported

// Setup the Google Font

export const metadata: Metadata = {
  title: 'r0sita',
  description: 'Visualize, Simulate, and Optimize.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <Auth0Provider>
        <body className={`${inter.className} antialiased bg-slate-900 text-gray-200`}>
          <Navbar />
          <main>{children}</main>      
          <div id="notification-toast" className="hidden fixed top-5 right-5 z-50 border rounded-lg shadow-lg p-4 max-w-sm">
            <p id="notification-message" className="text-white font-medium"></p>
          </div>
          <Footer />
        </body>
      </Auth0Provider>
    </html>
  );
}