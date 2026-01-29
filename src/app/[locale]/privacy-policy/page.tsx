'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/app/components/ui/Footer';
import { useCookieConsentContext } from '@/app/context/CookieConsentContext';

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacy');
  const { resetConsent } = useCookieConsentContext();

  return (
    <div className="flex flex-col min-h-full overflow-y-auto bg-gray-900">
      {/* Header */}
      <section className="py-16 md:py-20 bg-slate-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t('title')}
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="grow py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-invert max-w-none">

            {/* Cookie Settings Button */}
            <section className="mb-12">
              <div className="bg-cyan-900/30 border border-cyan-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t('cookie_settings')}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {t('cookie_settings_desc')}
                </p>
                <button
                  onClick={resetConsent}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition text-sm font-medium"
                >
                  {t('manage_cookies')}
                </button>
              </div>
            </section>

            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('overview')}
              </h2>

              <h3 className="text-xl font-semibold text-white mb-3">{t('overview_general')}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('overview_general_text')}
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">{t('overview_collection')}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-white">{t('overview_collection_who')}</strong><br />
                {t('overview_collection_who_text')}{' '}
                <Link href="/imprint" className="text-cyan-400 hover:text-cyan-300 transition">
                  {t('overview_collection_who_link')}
                </Link>.
              </p>
            </section>

            {/* Responsible Party */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('responsible')}
              </h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-4">
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-white">r0sita GmbH</strong><br />
                  Musterstrasse 123<br />
                  12345 Berlin<br />
                  Deutschland<br /><br />
                  E-Mail:{' '}
                  <a href="mailto:datenschutz@r0sita.com" className="text-cyan-400 hover:text-cyan-300 transition">
                    datenschutz@r0sita.com
                  </a>
                </p>
              </div>
            </section>

            {/* Data Collection */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('collection')}
              </h2>

              <h3 className="text-xl font-semibold text-white mb-3">{t('cookies')}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('cookies_text')}
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('cookies_session')}
              </p>

              <h4 className="text-lg font-medium text-white mb-2">{t('cookies_types')}</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>
                  <strong className="text-white">{t('cookies_necessary')}</strong> {t('cookies_necessary_desc')}
                </li>
                <li>
                  <strong className="text-white">{t('cookies_analytics')}</strong> {t('cookies_analytics_desc')}
                </li>
                <li>
                  <strong className="text-white">{t('cookies_marketing')}</strong> {t('cookies_marketing_desc')}
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-8">{t('server_logs')}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('server_logs_text')}
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-8">{t('contact_form')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('contact_form_text')}
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('rights')}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('rights_text')}
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('rights_contact')}
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">{t('rights_overview')}</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong className="text-white">{t('rights_access')}</strong> {t('rights_access_desc')}</li>
                <li><strong className="text-white">{t('rights_rectification')}</strong> {t('rights_rectification_desc')}</li>
                <li><strong className="text-white">{t('rights_erasure')}</strong> {t('rights_erasure_desc')}</li>
                <li><strong className="text-white">{t('rights_restriction')}</strong> {t('rights_restriction_desc')}</li>
                <li><strong className="text-white">{t('rights_portability')}</strong> {t('rights_portability_desc')}</li>
                <li><strong className="text-white">{t('rights_objection')}</strong> {t('rights_objection_desc')}</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('security')}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t('security_text')}
              </p>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('changes')}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t('changes_text')}
              </p>
              <p className="text-gray-400 text-sm mt-4">
                {t('last_updated')}
              </p>
            </section>

            {/* Back Link */}
            <div className="pt-8 border-t border-gray-700">
              <Link
                href="/"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>{t('back_home')}</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
}
