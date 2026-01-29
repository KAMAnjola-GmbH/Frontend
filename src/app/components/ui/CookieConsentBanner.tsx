'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useCookieConsentContext } from '@/app/context/CookieConsentContext';

export default function CookieConsentBanner() {
  const { showBanner, acceptAll, acceptNecessaryOnly, acceptCustom } = useCookieConsentContext();
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const t = useTranslations('cookie');

  if (!showBanner) return null;

  const handleSaveCustom = () => {
    acceptCustom({
      analytics: analyticsChecked,
      marketing: marketingChecked,
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-6">
          {!showSettings ? (
            // Main Banner View
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t('title')}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t('description')}{' '}
                  <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                    {t('privacy_link')}
                  </Link>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition"
                >
                  {t('settings')}
                </button>
                <button
                  onClick={acceptNecessaryOnly}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  {t('reject')}
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-sm text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition font-medium"
                >
                  {t('accept_all')}
                </button>
              </div>
            </div>
          ) : (
            // Settings View
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {t('settings_title')}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary Cookies - Always on */}
                <div className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="w-4 h-4 rounded accent-cyan-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">
                      {t('necessary')}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">
                      {t('necessary_desc')}
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      checked={analyticsChecked}
                      onChange={(e) => setAnalyticsChecked(e.target.checked)}
                      className="w-4 h-4 rounded accent-cyan-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">
                      {t('analytics')}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">
                      {t('analytics_desc')}
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      checked={marketingChecked}
                      onChange={(e) => setMarketingChecked(e.target.checked)}
                      className="w-4 h-4 rounded accent-cyan-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">
                      {t('marketing')}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">
                      {t('marketing_desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2 text-sm text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition font-medium"
                >
                  {t('save')}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
