// app/components/Footer.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useCookieConsentContext } from '@/app/context/CookieConsentContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { resetConsent } = useCookieConsentContext();
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#001e5f] border-t border-gray-700 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">

        {/* Copyright Section */}
        <div>
          {t('copyright', { year: currentYear })}
        </div>

        {/* Links Section */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link
            href="/contact"
            className="hover:text-white transition-colors duration-200"
          >
            {t('contacts')}
          </Link>
          <Link
            href="/imprint"
            className="hover:text-white transition-colors duration-200"
          >
            {t('imprint')}
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-white transition-colors duration-200"
          >
            {t('privacy')}
          </Link>
          <button
            onClick={resetConsent}
            className="hover:text-white transition-colors duration-200"
          >
            {t('cookie_settings')}
          </button>
        </nav>

      </div>
    </footer>
  );
}
