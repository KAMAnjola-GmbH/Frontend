'use client';

import { useState, useEffect, useCallback } from 'react';

export type ConsentCategories = {
  necessary: boolean;    // Always true - required for site to function
  analytics: boolean;    // Google Analytics, Vercel Speed Insights, etc.
  marketing: boolean;    // Ad tracking, remarketing pixels
};

export type ConsentState = {
  consented: boolean;           // Has user made a choice?
  timestamp: string | null;     // When consent was given
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

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentState;
        setConsent(parsed);
      }
    } catch (error) {
      console.error('Failed to load cookie consent:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save consent to localStorage
  const saveConsent = useCallback((newConsent: ConsentState) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
      setConsent(newConsent);
    } catch (error) {
      console.error('Failed to save cookie consent:', error);
    }
  }, []);

  // Accept all cookies
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

  // Accept only necessary cookies
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

  // Accept custom selection
  const acceptCustom = useCallback((categories: Partial<ConsentCategories>) => {
    const newConsent: ConsentState = {
      consented: true,
      timestamp: new Date().toISOString(),
      categories: {
        necessary: true, // Always true
        analytics: categories.analytics ?? false,
        marketing: categories.marketing ?? false,
      },
    };
    saveConsent(newConsent);
  }, [saveConsent]);

  // Reset consent (for settings page)
  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      setConsent(DEFAULT_CONSENT);
    } catch (error) {
      console.error('Failed to reset cookie consent:', error);
    }
  }, []);

  // Check if specific category is allowed
  const isAllowed = useCallback((category: keyof ConsentCategories): boolean => {
    return consent.categories[category];
  }, [consent.categories]);

  return {
    consent,
    isLoaded,
    showBanner: isLoaded && !consent.consented,
    acceptAll,
    acceptNecessaryOnly,
    acceptCustom,
    resetConsent,
    isAllowed,
  };
}

export type UseCookieConsentReturn = ReturnType<typeof useCookieConsent>;
