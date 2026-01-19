'use client';

import Footer from '@/app/components/ui/Footer';
import Link from 'next/link';
import { useCookieConsentContext } from '@/app/context/CookieConsentContext';

export default function PrivacyPolicyPage() {
  const { resetConsent } = useCookieConsentContext();

  return (
    <div className="flex flex-col min-h-full overflow-y-auto bg-gray-900">
      {/* Header */}
      <section className="py-16 md:py-20 bg-slate-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white" data-i18n-key="privacy_title">
            Datenschutzerklarung
          </h1>
          <p className="text-gray-400 mt-4 text-lg" data-i18n-key="privacy_subtitle">
            Informationen zum Schutz Ihrer personenbezogenen Daten
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
                <h3 className="text-lg font-semibold text-white mb-2" data-i18n-key="privacy_cookie_settings">
                  Cookie-Einstellungen andern
                </h3>
                <p className="text-gray-300 text-sm mb-4" data-i18n-key="privacy_cookie_settings_desc">
                  Sie konnen Ihre Cookie-Einstellungen jederzeit andern.
                </p>
                <button
                  onClick={resetConsent}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition text-sm font-medium"
                  data-i18n-key="privacy_manage_cookies"
                >
                  Cookie-Einstellungen verwalten
                </button>
              </div>
            </section>

            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="privacy_overview">
                1. Datenschutz auf einen Blick
              </h2>

              <h3 className="text-xl font-semibold text-white mb-3">Allgemeine Hinweise</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Die folgenden Hinweise geben einen einfachen Uberblick daruber, was mit Ihren personenbezogenen
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie personlich identifiziert werden konnen.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Datenerfassung auf dieser Website</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-white">Wer ist verantwortlich fur die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                konnen Sie dem{' '}
                <Link href="/imprint" className="text-cyan-400 hover:text-cyan-300 transition">
                  Impressum
                </Link>{' '}
                dieser Website entnehmen.
              </p>
            </section>

            {/* Responsible Party */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="privacy_responsible">
                2. Verantwortliche Stelle
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
              <p className="text-gray-300 leading-relaxed">
                Verantwortliche Stelle ist die naturliche oder juristische Person, die allein oder gemeinsam
                mit anderen uber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
              </p>
            </section>

            {/* Data Collection */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="privacy_collection">
                3. Datenerfassung auf dieser Website
              </h2>

              <h3 className="text-xl font-semibold text-white mb-3">Cookies</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem
                Endgerat speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver
                und sicherer zu machen.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Einige Cookies sind &quot;Session-Cookies&quot;. Solche Cookies werden nach Ende Ihrer Browser-Sitzung
                von selbst geloscht. Hingegen bleiben andere Cookies auf Ihrem Endgerat bestehen, bis Sie
                diese selbst loschen. Solche Cookies helfen uns, Sie bei Ruckkehr auf unserer Website
                wiederzuerkennen.
              </p>

              <h4 className="text-lg font-medium text-white mb-2">Wir verwenden folgende Arten von Cookies:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>
                  <strong className="text-white">Notwendige Cookies:</strong> Diese Cookies sind fur die
                  Grundfunktionen der Website erforderlich (z.B. Authentifizierung, Sicherheit).
                </li>
                <li>
                  <strong className="text-white">Analytische Cookies:</strong> Diese Cookies helfen uns zu
                  verstehen, wie Besucher mit unserer Website interagieren.
                </li>
                <li>
                  <strong className="text-white">Marketing Cookies:</strong> Diese Cookies werden verwendet,
                  um Werbung relevanter fur Sie zu gestalten.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-8">Server-Log-Dateien</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                Server-Log-Dateien, die Ihr Browser automatisch an uns ubermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-8">Kontaktformular</h3>
              <p className="text-gray-300 leading-relaxed">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                der Anfrage und fur den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
                wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="privacy_rights">
                4. Ihre Rechte
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft uber Herkunft, Empfanger und Zweck
                Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben ausserdem ein Recht,
                die Berichtigung oder Loschung dieser Daten zu verlangen.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz konnen Sie sich jederzeit an uns wenden.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Ihre Rechte im Uberblick:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong className="text-white">Auskunftsrecht:</strong> Sie konnen Auskunft uber Ihre verarbeiteten Daten verlangen.</li>
                <li><strong className="text-white">Berichtigungsrecht:</strong> Sie konnen die Berichtigung unrichtiger Daten verlangen.</li>
                <li><strong className="text-white">Loschungsrecht:</strong> Sie konnen die Loschung Ihrer Daten verlangen.</li>
                <li><strong className="text-white">Einschrankung:</strong> Sie konnen die Einschrankung der Verarbeitung verlangen.</li>
                <li><strong className="text-white">Datenubertragbarkeit:</strong> Sie konnen Ihre Daten in einem gangigen Format erhalten.</li>
                <li><strong className="text-white">Widerspruchsrecht:</strong> Sie konnen der Verarbeitung Ihrer Daten widersprechen.</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="privacy_security">
                5. Datensicherheit
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer)
                in Verbindung mit der jeweils hochsten Verschlusselungsstufe, die von Ihrem Browser unterstutzt
                wird. In der Regel handelt es sich dabei um eine 256-Bit-Verschlusselung. Diese Seite nutzt aus
                Sicherheitsgrunden und zum Schutz der Ubertragung vertraulicher Inhalte eine SSL-Verschlusselung.
                Eine verschlusselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von
                &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="privacy_changes">
                6. Anderungen dieser Datenschutzerklarung
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Wir behalten uns vor, diese Datenschutzerklarung anzupassen, damit sie stets den aktuellen
                rechtlichen Anforderungen entspricht oder um Anderungen unserer Leistungen in der
                Datenschutzerklarung umzusetzen. Fur Ihren erneuten Besuch gilt dann die neue Datenschutzerklarung.
              </p>
              <p className="text-gray-400 text-sm mt-4">
                Stand: Januar 2025
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
                <span data-i18n-key="back_home">Zuruck zur Startseite</span>
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
