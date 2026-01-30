'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Footer from '@/app/components/ui/Footer';

// Icons for industries
const ManufacturingIcon = () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
);

const LogisticsIcon = () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const EnergyIcon = () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

// Icons for workflow
const UploadIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const AnalyzeIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const VisualizeIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const ExportIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export default function SolutionsPage() {
    const t = useTranslations('solutions');

    const industries = [
        {
            key: 'manufacturing',
            icon: <ManufacturingIcon />,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
        },
        {
            key: 'logistics',
            icon: <LogisticsIcon />,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
        },
        {
            key: 'energy',
            icon: <EnergyIcon />,
            color: 'from-amber-500 to-orange-500',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20',
        },
    ];

    const workflowSteps = [
        { key: 'upload', icon: <UploadIcon /> },
        { key: 'analyze', icon: <AnalyzeIcon /> },
        { key: 'visualize', icon: <VisualizeIcon /> },
        { key: 'export', icon: <ExportIcon /> },
    ];

    const roadmapItems = t.raw('capabilities.roadmap.items') as Array<{ title: string; description: string }>;

    return (
            <div className="flex flex-col h-full w-full overflow-y-auto bg-slate-900">

        <div className="flex flex-col min-h-screen bg-slate-900">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        {t('hero.subtitle')}
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    >
                        {t('hero.cta')}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Industries Section */}
            <section className="py-20 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {t('industries.title')}
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            {t('industries.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {industries.map((industry) => (
                            <div
                                key={industry.key}
                                className={`relative p-8 rounded-2xl ${industry.bgColor} border ${industry.borderColor} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${industry.color} text-white mb-6`}>
                                    {industry.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {t(`industries.${industry.key}.title`)}
                                </h3>
                                <p className="text-gray-300 mb-6">
                                    {t(`industries.${industry.key}.description`)}
                                </p>
                                <ul className="space-y-2">
                                    {(t.raw(`industries.${industry.key}.capabilities`) as string[]).map((capability, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-400">
                                            <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {capability}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capabilities Section */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {t('capabilities.title')}
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            {t('capabilities.subtitle')}
                        </p>
                    </div>

                    {/* Available Now */}
                    <div className="mb-16">
                        <h3 className="text-xl font-semibold text-emerald-400 mb-8 flex items-center gap-2">
                            <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                            {t('capabilities.available.title')}
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* KPI Analyzer */}
                            <div className="p-8 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-emerald-500/10 rounded-xl">
                                        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">
                                            {t('capabilities.available.kpiAnalyzer.title')}
                                        </h4>
                                        <p className="text-gray-400 mt-1">
                                            {t('capabilities.available.kpiAnalyzer.description')}
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-2 mb-6">
                                    {(t.raw('capabilities.available.kpiAnalyzer.features') as string[]).map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/products/susa"
                                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                                >
                                    Try SuSa Analyzer
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>

                            {/* 3D Model Viewer */}
                            <div className="p-8 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-purple-500/10 rounded-xl">
                                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">
                                            {t('capabilities.available.modelViewer.title')}
                                        </h4>
                                        <p className="text-gray-400 mt-1">
                                            {t('capabilities.available.modelViewer.description')}
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-2 mb-6">
                                    {(t.raw('capabilities.available.modelViewer.features') as string[]).map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/products/viewer"
                                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                                >
                                    Try 3D Viewer
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Roadmap */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-400 mb-8 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            {t('capabilities.roadmap.title')}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {roadmapItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 bg-slate-800/30 border border-slate-700/30 rounded-xl opacity-75"
                                >
                                    <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                                    <p className="text-gray-500 text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="py-20 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {t('workflow.title')}
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            {t('workflow.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {workflowSteps.map((step, idx) => (
                            <div key={step.key} className="relative">
                                {/* Connector line */}
                                {idx < workflowSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent" />
                                )}

                                <div className="relative p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-center">
                                    <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white mb-4">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {t(`workflow.steps.${step.key}.title`)}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {t(`workflow.steps.${step.key}.description`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {t('integrations.title')}
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            {t('integrations.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {['erp', 'protocols', 'cloud'].map((category) => (
                            <div
                                key={category}
                                className="p-6 bg-slate-800/30 border border-slate-700/30 rounded-xl text-center"
                            >
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {t(`integrations.planned.${category}.title`)}
                                </h3>
                                <p className="text-gray-500">
                                    {t(`integrations.planned.${category}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-gray-500 italic">
                        {t('integrations.note')}
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600/20 via-slate-800 to-purple-600/20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t('cta.title')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10">
                        {t('cta.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/products/susa"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25"
                        >
                            {t('cta.tryNow')}
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 border border-slate-600"
                        >
                            {t('cta.contact')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
            </div>

    );
}
