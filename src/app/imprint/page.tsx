import Footer from '@/app/components/ui/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Impressum | r0sita',
  description: 'Impressum und rechtliche Angaben der r0sita GmbH.',
};

export default function ImprintPage() {
  return (
    <div className="flex flex-col min-h-full overflow-y-auto bg-gray-900">
      {/* Header */}
      <section className="py-16 md:py-20 bg-slate-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white" data-i18n-key="imprint_title">
            Impressum
          </h1>
          <p className="text-gray-400 mt-4 text-lg" data-i18n-key="imprint_subtitle">
            Angaben gemass 5 TMG
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-invert max-w-none">
            {/* Company Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="imprint_company">
                Angaben zum Unternehmen
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
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="imprint_represented">
                Vertreten durch
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Geschaftsfuhrer: [Name des Geschaftsfuhrers]
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="imprint_contact">
                Kontakt
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Telefon: +49 (0) 30 123456789<br />
                E-Mail:{' '}
                <a href="mailto:info@r0sita.com" className="text-cyan-400 hover:text-cyan-300 transition">
                  info@r0sita.com
                </a>
              </p>
            </section>

            {/* Registration */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="imprint_register">
                Registereintrag
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Eintragung im Handelsregister<br />
                Registergericht: Amtsgericht Berlin-Charlottenburg<br />
                Registernummer: HRB XXXXX
              </p>
            </section>

            {/* VAT ID */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="imprint_vat">
                Umsatzsteuer-ID
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemass 27 a Umsatzsteuergesetz:<br />
                DE XXXXXXXXX
              </p>
            </section>

            {/* Responsible for Content */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="imprint_responsible">
                Verantwortlich fur den Inhalt nach 55 Abs. 2 RStV
              </h2>
              <p className="text-gray-300 leading-relaxed">
                [Name des Verantwortlichen]<br />
                Musterstrasse 123<br />
                12345 Berlin
              </p>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="imprint_dispute">
                Streitschlichtung
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Die Europaische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
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
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            {/* Liability for Content */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="imprint_liability_content">
                Haftung fur Inhalte
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Als Diensteanbieter sind wir gemass 7 Abs.1 TMG fur eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach 8 bis 10 TMG sind wir als Diensteanbieter
                jedoch nicht verpflichtet, ubermittelte oder gespeicherte fremde Informationen zu uberwachen
                oder nach Umstanden zu forschen, die auf eine rechtswidrige Tatigkeit hinweisen. Verpflichtungen
                zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
                hiervon unberuhrt. Eine diesbezugliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis
                einer konkreten Rechtsverletzung moglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
                werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            {/* Liability for Links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="imprint_liability_links">
                Haftung fur Links
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Unser Angebot enthalt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
                haben. Deshalb konnen wir fur diese fremden Inhalte auch keine Gewahr ubernehmen. Fur die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
                verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mogliche
                Rechtverstosse uberpruft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
                erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
                konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            {/* Copyright */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4" data-i18n-key="imprint_copyright">
                Urheberrecht
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                deutschen Urheberrecht. Die Vervielfaltigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung ausserhalb der Grenzen des Urheberrechtes bedurfen der schriftlichen Zustimmung des
                jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur fur den privaten,
                nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber
                erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter
                als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
                werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
                werden wir derartige Inhalte umgehend entfernen.
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
