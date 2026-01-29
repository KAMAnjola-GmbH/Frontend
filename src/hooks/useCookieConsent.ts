// src/hooks/useCookieConsent.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export type ConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentState = {
  consented: boolean;
  timestamp: string | null;
  categories: ConsentCategories;
};

const CONSENT_STORAGE_KEY = 'r0sita_cookie_consent';

const DEFAULT_CONSENT: ConsentState = {
  consented: false,
  timestamp: null,
  categories: {
    necessary: true,
    analytics: false,
    marketing: false,
  },
};

interface CookieConsentState {
    isLoaded: boolean;
    data: ConsentState;
}

export function useCookieConsent() {
  const [cookieState, setCookieState] = useState<CookieConsentState>({
    isLoaded: false,
    data: DEFAULT_CONSENT,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentState;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCookieState({
            isLoaded: true,
            data: parsed
        });
        return;
      }
    } catch (error) {
      console.error('Failed to load cookie consent:', error);
    }
    
    // If no storage found or error, just set loaded to true with defaults
    setCookieState(prev => ({ ...prev, isLoaded: true }));
  }, []);

  const saveConsent = useCallback((newConsent: ConsentState) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
      setCookieState({
          isLoaded: true,
          data: newConsent
      });
    } catch (error) {
      console.error('Failed to save cookie consent:', error);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const newConsent: ConsentState = {
      consented: true,
      timestamp: new Date().toISOString(),
      categories: {
        necessary: true,
        analytics: true,
        marketing: true,
      },
    };
    saveConsent(newConsent);
  }, [saveConsent]);

  const acceptNecessaryOnly = useCallback(() => {
    const newConsent: ConsentState = {
      consented: true,
      timestamp: new Date().toISOString(),
      categories: {
        necessary: true,
        analytics: false,
        marketing: false,
      },
    };
    saveConsent(newConsent);
  }, [saveConsent]);

  const acceptCustom = useCallback((categories: Partial<ConsentCategories>) => {
    const newConsent: ConsentState = {
      consented: true,
      timestamp: new Date().toISOString(),
      categories: {
        necessary: true,
        analytics: categories.analytics ?? false,
        marketing: categories.marketing ?? false,
      },
    };
    saveConsent(newConsent);
  }, [saveConsent]);

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      setCookieState({
          isLoaded: true,
          data: DEFAULT_CONSENT
      });
    } catch (error) {
      console.error('Failed to reset cookie consent:', error);
    }
  }, []);

  const isAllowed = useCallback((category: keyof ConsentCategories): boolean => {
    return cookieState.data.categories[category];
  }, [cookieState.data.categories]);

  return {
    consent: cookieState.data,
    isLoaded: cookieState.isLoaded,
    showBanner: cookieState.isLoaded && !cookieState.data.consented,
    acceptAll,
    acceptNecessaryOnly,
    acceptCustom,
    resetConsent,
    isAllowed,
  };
}

export type UseCookieConsentReturn = ReturnType<typeof useCookieConsent>;