'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ProductSummary } from '@/types/user';

const productStyles: Record<string, { gradient: string; iconBg: string; borderColor: string }> = {
    susa: {
        gradient: 'from-emerald-500/20 to-teal-500/10',
        iconBg: 'bg-emerald-500/20 text-emerald-400',
        borderColor: 'border-emerald-500/30 hover:border-emerald-400/50',
    },
    viewer: {
        gradient: 'from-purple-500/20 to-pink-500/10',
        iconBg: 'bg-purple-500/20 text-purple-400',
        borderColor: 'border-purple-500/30 hover:border-purple-400/50',
    },
    monitoring: {
        gradient: 'from-blue-500/20 to-cyan-500/10',
        iconBg: 'bg-blue-500/20 text-blue-400',
        borderColor: 'border-blue-500/30',
    },
    forecasting: {
        gradient: 'from-amber-500/20 to-orange-500/10',
        iconBg: 'bg-amber-500/20 text-amber-400',
        borderColor: 'border-amber-500/30',
    },
};

const iconMap: Record<string, React.ReactNode> = {
    'chart-bar': (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    'cube': (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    ),
    'activity': (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    'trending-up': (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
};

interface ProductCardProps {
    product: ProductSummary;
}

function ProductCard({ product }: ProductCardProps) {
    const t = useTranslations('dashboard.products');
    const isComingSoon = product.status === 'coming_soon';
    const icon = iconMap[product.icon] || iconMap['cube'];
    const styles = productStyles[product.productId] || productStyles.viewer;

    const cardContent = (
        <div
            className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 h-full flex flex-col
                ${isComingSoon
                    ? 'bg-slate-800/30 border-slate-700/50 opacity-70'
                    : `bg-gradient-to-br ${styles.gradient} ${styles.borderColor} hover:shadow-lg hover:shadow-slate-900/50 cursor-pointer`
                }`}
        >
            <div className="p-5 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${styles.iconBg}`}>
                        {icon}
                    </div>
                    {isComingSoon && (
                        <span className="text-xs px-2.5 py-1 bg-slate-700/50 text-slate-400 rounded-full font-medium">
                            {t('comingSoon')}
                        </span>
                    )}
                    {!isComingSoon && product.itemCount > 0 && (
                        <span className="text-xs px-2.5 py-1 bg-white/10 text-white/80 rounded-full font-medium">
                            {product.itemCount} {t('items')}
                        </span>
                    )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-1.5">{product.name}</h3>
                <p className="text-gray-400 text-sm flex-grow leading-relaxed">{product.description}</p>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-white/5">
                    {!isComingSoon ? (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">
                                {product.itemCount === 0 ? t('noItems') || 'Keine Elemente' : ''}
                            </span>
                            <span className="text-sm font-medium text-white flex items-center gap-1 group-hover:gap-2 transition-all">
                                {t('open')}
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    ) : (
                        <span className="text-sm text-slate-500">{t('learnMore')}</span>
                    )}
                </div>
            </div>
        </div>
    );

    if (isComingSoon) {
        return cardContent;
    }

    return (
        <Link href={product.url} className="block h-full">
            {cardContent}
        </Link>
    );
}

interface ProductCardsProps {
    products: ProductSummary[];
}

export function ProductCards({ products }: ProductCardsProps) {
    const t = useTranslations('dashboard.products');

    // Sortuj: aktywne najpierw, potem coming soon
    const sortedProducts = [...products].sort((a, b) => {
        if (a.status === 'active' && b.status !== 'active') return -1;
        if (a.status !== 'active' && b.status === 'active') return 1;
        return 0;
    });

    return (
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {t('title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductCards;
