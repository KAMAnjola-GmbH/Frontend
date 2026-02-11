import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Auth0Provider } from '@auth0/nextjs-auth0/client';
import Navbar from '@/app/components/ui/navigation/Navbar';
import { CookieConsentProvider } from '@/app/context/CookieConsentContext';
import CookieConsentBanner from '@/app/components/ui/CookieConsentBanner';
import { routing } from '@/i18n/routing';
import '../globals.css';

export const metadata: Metadata = {
  title: 'r0sita',
  description: 'Visualize, Simulate, and Optimize.',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full scroll-smooth">
      <body className="h-full antialiased bg-gray-900 text-gray-200 flex flex-col">
        <Auth0Provider>
          <NextIntlClientProvider messages={messages}>
            <CookieConsentProvider>
              <Navbar />

              <div className="flex-1 flex flex-col min-h-0 overflow-auto">
                {children}
              </div>

              <CookieConsentBanner />
            </CookieConsentProvider>
          </NextIntlClientProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
