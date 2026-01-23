'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ProductSummary } from '@/types/user';

const iconMap: Record<string, React.ReactNode> = {
    'chart-bar': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    'cube': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    ),
    'activity': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    'trending-up': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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

    const cardContent = (
        <div
            className={`bg-gray-800/50 border border-gray-700 rounded-lg p-4 transition-all h-full flex flex-col
                ${isComingSoon ? 'opacity-60' : 'hover:border-blue-500 hover:bg-gray-800/70 cursor-pointer'}`}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
                    {icon}
                </div>
                {isComingSoon && (
                    <span className="text-xs px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded">
                        {t('comingSoon')}
                    </span>
                )}
            </div>
            <h3 className="text-white font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-3 flex-grow">{product.description}</p>
            <div className="flex items-center justify-between">
                {!isComingSoon ? (
                    <>
                        <span className="text-gray-500 text-sm">{product.itemCount} {t('items')}</span>
                        <span className="text-blue-400 text-sm flex items-center">
                            {t('open')}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </>
                ) : (
                    <span className="text-blue-400 text-sm">{t('learnMore')}</span>
                )}
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

    return (
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">{t('title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductCards;
