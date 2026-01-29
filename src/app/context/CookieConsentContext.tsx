'use client';

import React, { createContext, useContext } from 'react';
import { useCookieConsent, UseCookieConsentReturn } from '@/hooks/useCookieConsent';

const CookieConsentContext = createContext<UseCookieConsentReturn | null>(null);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const cookieConsent = useCookieConsent();

  return (
    <CookieConsentContext.Provider value={cookieConsent}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext(): UseCookieConsentReturn {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsentContext must be used within CookieConsentProvider');
  }
  return context;
}
