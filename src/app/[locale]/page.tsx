'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/app/components/ui/Footer';

// Icons for products
const ChartIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const CubeIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

// Icons for steps
const stepIcons = [
    <svg key="upload" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>,
    <svg key="analyze" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
    <svg key="visualize" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>,
    <svg key="export" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
];

// Icons for industries
const industryIcons = [
    <svg key="manufacturing" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>,
    <svg key="logistics" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>,
    <svg key="energy" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
];

export default function HomePage() {
    const t = useTranslations('home');

    const steps = t.raw('howItWorks.steps') as Array<{ title: string; description: string }>;
    const industries = t.raw('industries.items') as Array<{ title: string; description: string }>;
    const roadmapItems = t.raw('vision.roadmap') as string[];
    const susaFeatures = t.raw('products.susa.features') as string[];
    const viewerFeatures = t.raw('products.viewer.features') as string[];

    return (
        <div className="flex flex-col h-full w-full overflow-y-auto bg-slate-900">

            {/* === HERO SECTION === */}
            <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden shrink-0">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/R0sitavideobg.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30 z-10" />

                <div className="relative z-20 px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                        {t('hero_title')}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
                        {t('hero_description')}
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/products/susa"
                            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25"
                        >
                            {t('hero_cta')}
                        </Link>
                        <Link
                            href="/solutions"
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20"
                        >
                            {t('hero_cta_secondary')}
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* === PRODUCTS SECTION === */}
            <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative z-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{t('products.title')}</h2>
                        <p className="mt-3 text-gray-400 text-lg">{t('products.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* SuSa Card */}
                        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                                    <ChartIcon />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{t('products.susa.title')}</h3>
                                <p className="text-gray-400 mb-6">{t('products.susa.description')}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {susaFeatures.map((feature, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-emerald-500/10 text-emerald-300 text-sm rounded-full">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href="/products/susa"
                                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition"
                                >
                                    {t('products.susa.cta')}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Viewer Card */}
                        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                                <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                                    <CubeIcon />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{t('products.viewer.title')}</h3>
                                <p className="text-gray-400 mb-6">{t('products.viewer.description')}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {viewerFeatures.map((feature, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-purple-500/10 text-purple-300 text-sm rounded-full">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href="/products/viewer"
                                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition"
                                >
                                    {t('products.viewer.cta')}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === HOW IT WORKS === */}
            <section className="py-20 bg-slate-800 relative z-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{t('howItWorks.title')}</h2>
                        <p className="mt-3 text-gray-400 text-lg">{t('howItWorks.subtitle')}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative">
                                {/* Connector line */}
                                {idx < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                                )}
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-4 border border-cyan-500/20">
                                        {stepIcons[idx]}
                                    </div>
                                    <div className="text-cyan-400 text-sm font-medium mb-2">0{idx + 1}</div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-400 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === INDUSTRIES === */}
            <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative z-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{t('industries.title')}</h2>
                        <p className="mt-3 text-gray-400 text-lg">{t('industries.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {industries.map((industry, idx) => (
                            <div
                                key={idx}
                                className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                                    {industryIcons[idx]}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{industry.title}</h3>
                                <p className="text-gray-400 text-sm">{industry.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            href="/solutions"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition"
                        >
                            View all solutions
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* === VISION / ROADMAP === */}
            <section className="py-20 bg-slate-900 relative z-10 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto px-4 relative">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{t('vision.title')}</h2>
                        <p className="mt-3 text-gray-400 text-lg">{t('vision.subtitle')}</p>
                    </div>

                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 mb-8">
                        <p className="text-gray-300 text-lg text-center leading-relaxed">
                            {t('vision.description')}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {roadmapItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-4 bg-slate-800/20 border border-slate-700/30 rounded-xl"
                            >
                                <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <span className="text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CTA SECTION === */}
            <section className="py-20 bg-gradient-to-b from-slate-900 to-[#001e5f] relative z-10">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
                    <p className="text-gray-300 text-lg mb-8">{t('cta.subtitle')}</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/auth/login"
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-pink-500/25"
                        >
                            {t('cta.primary')}
                        </a>
                        <Link
                            href="/contact"
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20"
                        >
                            {t('cta.secondary')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* === FOOTER === */}
            <div className="shrink-0 relative z-10">
                <Footer />
            </div>
        </div>
    );
}
