'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/app/components/ui/Footer';

export default function ImprintPage() {
  const t = useTranslations('imprint');

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
      <main className="flex-grow py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-invert max-w-none">
            {/* Company Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('company')}
              </h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-white">r0sita GmbH</strong><br />
                  Musterstrasse 123<br />
                  12345 Berlin<br />
                  Deutschland
                </p>
              </div>
            </section>

            {/* Represented by */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('represented')}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Geschäftsführer: [Name des Geschäftsführers]
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('contact')}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Telefon: +49 (0) 30 123456789<br />
                E-Mail:{' '}
                // eslint-disable-next-line @next/next/no-html-link-for-pages
                <a href="mailto:info@r0sita.com" className="text-cyan-400 hover:text-cyan-300 transition">
                  info@r0sita.com
                </a>
              </p>
            </section>

            {/* Registration */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('register')}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Eintragung im Handelsregister<br />
                Registergericht: Amtsgericht Berlin-Charlottenburg<br />
                Registernummer: HRB XXXXX
              </p>
            </section>

            {/* VAT ID */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('vat')}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE XXXXXXXXX
              </p>
            </section>

            {/* Responsible for Content */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('responsible')}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                [Name des Verantwortlichen]<br />
                Musterstrasse 123<br />
                12345 Berlin
              </p>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('dispute')}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('dispute_text')}{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t('dispute_note')}
              </p>
            </section>

            {/* Liability for Content */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('liability_content')}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t('liability_content_text')}
              </p>
            </section>

            {/* Liability for Links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('liability_links')}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t('liability_links_text')}
              </p>
            </section>

            {/* Copyright */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('copyright')}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t('copyright_text')}
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
