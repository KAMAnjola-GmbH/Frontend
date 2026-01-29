'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';

export default function LanguageDropdown() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const currentLanguageLabel = locale === 'en' ? 'English' : 'Deutsch';

  return (
    <div className="relative group">
      <button className="flex items-center gap-1">
        {currentLanguageLabel}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 w-32 opacity-0 group-hover:opacity-100 transform -translate-y-1 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
        <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-1.5">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`w-full text-left block px-3 py-1.5 rounded-md text-sm transition ${
                locale === loc
                  ? 'bg-cyan-600 text-white'
                  : 'hover:bg-pink-600 text-gray-300 hover:text-white'
              }`}
            >
              {t(loc)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
