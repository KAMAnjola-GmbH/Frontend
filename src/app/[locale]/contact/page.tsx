'use client';

import { useState } from 'react';
import Footer from '@/app/components/ui/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual form submission to backend
    // For now, simulate a submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-full overflow-y-auto bg-gray-900">
      {/* Header */}
      <section className="py-16 md:py-20 bg-slate-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white" data-i18n-key="contact_title">
            Kontakt
          </h1>
          <p className="text-gray-400 mt-4 text-lg" data-i18n-key="contact_subtitle">
            Haben Sie Fragen? Wir freuen uns von Ihnen zu horen.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="grow py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6" data-i18n-key="contact_form_title">
                Nachricht senden
              </h2>

              {submitted ? (
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-6">
                  <h3 className="text-green-400 font-semibold text-lg mb-2" data-i18n-key="contact_success_title">
                    Nachricht gesendet!
                  </h3>
                  <p className="text-gray-300" data-i18n-key="contact_success_message">
                    Vielen Dank fur Ihre Nachricht. Wir werden uns so schnell wie moglich bei Ihnen melden.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2" data-i18n-key="contact_name">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                      placeholder="Ihr Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2" data-i18n-key="contact_email">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                      placeholder="ihre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2" data-i18n-key="contact_subject">
                      Betreff *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    >
                      <option value="" data-i18n-key="contact_select_subject">Bitte wahlen...</option>
                      <option value="general" data-i18n-key="contact_subject_general">Allgemeine Anfrage</option>
                      <option value="support" data-i18n-key="contact_subject_support">Technischer Support</option>
                      <option value="sales" data-i18n-key="contact_subject_sales">Vertrieb & Preise</option>
                      <option value="partnership" data-i18n-key="contact_subject_partnership">Partnerschaft</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2" data-i18n-key="contact_message">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition resize-none"
                      placeholder="Ihre Nachricht..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span data-i18n-key="contact_sending">Wird gesendet...</span>
                      </span>
                    ) : (
                      <span data-i18n-key="contact_send">Nachricht senden</span>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6" data-i18n-key="contact_info_title">
                Kontaktinformationen
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium" data-i18n-key="contact_email_label">E-Mail</h3>
                    <a href="mailto:info@r0sita.com" className="text-cyan-400 hover:text-cyan-300 transition">
                      info@r0sita.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium" data-i18n-key="contact_address_label">Adresse</h3>
                    <p className="text-gray-400">
                      r0sita GmbH<br />
                      Musterstrasse 123<br />
                      12345 Berlin<br />
                      Deutschland
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium" data-i18n-key="contact_hours_label">Geschaftszeiten</h3>
                    <p className="text-gray-400" data-i18n-key="contact_hours">
                      Montag - Freitag: 09:00 - 18:00<br />
                      Samstag & Sonntag: Geschlossen
                    </p>
                  </div>
                </div>
              </div>
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
