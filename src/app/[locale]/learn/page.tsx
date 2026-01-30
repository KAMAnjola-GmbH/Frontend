'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Footer from '@/app/components/ui/Footer';

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div className="border-b border-slate-700/50 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-5 flex items-center justify-between text-left hover:text-blue-400 transition-colors"
            >
                <span className="text-lg font-medium text-white pr-4">{question}</span>
                <ChevronDownIcon isOpen={isOpen} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                <p className="text-gray-400 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
}

export default function LearnPage() {
    const t = useTranslations('learn');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const faqItems = t.raw('faq.items') as Array<{ question: string; answer: string }>;
    const susaTutorials = t.raw('tutorials.categories.susaAnalytics.items') as Array<{ title: string; description: string }>;
    const viewerTutorials = t.raw('tutorials.categories.modelViewer.items') as Array<{ title: string; description: string }>;

    return (
            <div className="flex flex-col min-h-full overflow-y-auto bg-gray-900">

        <div className="flex flex-col min-h-screen bg-slate-900">
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-b from-slate-800 to-slate-900">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {t('hero.subtitle')}
                    </p>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-12 bg-slate-900 border-b border-slate-800">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link
                            href="/products/susa"
                            className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-colors"
                        >
                            <div className="p-2 bg-emerald-500/20 rounded-lg">
                                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-white">SuSa Analyzer</div>
                                <div className="text-sm text-gray-400">Try it now</div>
                            </div>
                        </Link>

                        <Link
                            href="/products/viewer"
                            className="flex items-center gap-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition-colors"
                        >
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-white">3D Viewer</div>
                                <div className="text-sm text-gray-400">Try it now</div>
                            </div>
                        </Link>

                        <Link
                            href="/contact"
                            className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-colors"
                        >
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-white">Contact</div>
                                <div className="text-sm text-gray-400">Get help</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Tutorials Overview */}
            <section className="py-16 bg-slate-900">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">{t('tutorials.title')}</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* SuSa Analytics */}
                        <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    {t('tutorials.categories.susaAnalytics.title')}
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {susaTutorials.map((tutorial, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/20">
                                        <div className="flex-shrink-0 w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-medium">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">{tutorial.title}</div>
                                            <div className="text-gray-500 text-sm">{tutorial.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3D Viewer */}
                        <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    {t('tutorials.categories.modelViewer.title')}
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {viewerTutorials.map((tutorial, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/20">
                                        <div className="flex-shrink-0 w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-medium">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">{tutorial.title}</div>
                                            <div className="text-gray-500 text-sm">{tutorial.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">{t('faq.title')}</h2>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        {faqItems.map((item, idx) => (
                            <FAQItem
                                key={idx}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openFaqIndex === idx}
                                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="py-16 bg-slate-900">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">{t('support.title')}</h2>
                    <p className="text-gray-400 mb-6">{t('support.subtitle')}</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
                    >
                        {t('support.contact')}
                    </Link>
                    <p className="mt-4 text-gray-500 text-sm">{t('support.email')}</p>
                </div>
            </section>

            <Footer />
        </div>
        </div>
    );
}
