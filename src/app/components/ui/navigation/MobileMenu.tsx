'use client';

import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import LanguageDropdown from './LanguageDropdown';

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isLoading } = useUser();
    const t = useTranslations('nav');

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white transition"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-[#001e5f] z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <span className="text-white font-semibold">Menu</span>
                        <button
                            onClick={closeMenu}
                            className="p-2 text-gray-300 hover:text-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-1">
                            {/* Products - simplified for mobile */}
                            <li>
                                <div className="text-gray-400 text-xs uppercase tracking-wider mb-2 mt-4">
                                    {t('products')}
                                </div>
                                <Link
                                    href="/products/susa"
                                    onClick={closeMenu}
                                    className="block py-2 px-3 text-cyan-300 hover:bg-white/10 rounded-lg transition"
                                >
                                    SuSa Analytics
                                </Link>
                                <Link
                                    href="/products/viewer"
                                    onClick={closeMenu}
                                    className="block py-2 px-3 text-cyan-300 hover:bg-white/10 rounded-lg transition"
                                >
                                    3D Viewer
                                </Link>
                            </li>

                            <li className="pt-2">
                                <Link
                                    href="/solutions"
                                    onClick={closeMenu}
                                    className="block py-2 px-3 text-cyan-300 hover:bg-white/10 rounded-lg transition"
                                >
                                    {t('solutions')}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/dashboard"
                                    onClick={closeMenu}
                                    className="block py-2 px-3 text-cyan-300 hover:bg-white/10 rounded-lg transition"
                                >
                                    {t('workbench')}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/learn"
                                    onClick={closeMenu}
                                    className="block py-2 px-3 text-cyan-300 hover:bg-white/10 rounded-lg transition"
                                >
                                    {t('learn')}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    onClick={closeMenu}
                                    className="block py-2 px-3 text-cyan-300 hover:bg-white/10 rounded-lg transition"
                                >
                                    {t('contacts')}
                                </Link>
                            </li>
                        </ul>

                        {/* Language */}
                        <div className="mt-6 pt-4 border-t border-gray-700">
                            <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                                Language
                            </div>
                            <LanguageDropdown />
                        </div>
                    </nav>

                    {/* Auth Section */}
                    <div className="p-4 border-t border-gray-700">
                        {isLoading ? (
                            <div className="text-gray-400 text-center">Loading...</div>
                        ) : user ? (
                            <div className="space-y-3">
                                <Link
                                    href="/dashboard/profile"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition"
                                >
                                    {user.picture && (
                                        <div className="rounded-full overflow-hidden w-8 h-8">
                                            <Image
                                                src={user.picture}
                                                alt="Profile"
                                                width={32}
                                                height={32}
                                            />
                                        </div>
                                    )}
                                    <span className="text-white font-medium truncate">
                                        {user.name}
                                    </span>
                                </Link>
                                <a
                                    href="/auth/logout"
                                    className="block w-full text-center py-2 px-4 bg-gray-700 hover:bg-red-600 text-white rounded-lg transition"
                                >
                                    {t('logout')}
                                </a>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <a
                                    href="/auth/login"
                                    className="block w-full text-center py-2 px-4 text-white hover:bg-white/10 rounded-lg transition"
                                >
                                    {t('login')}
                                </a>
                                <a
                                    href="/auth/login"
                                    className="block w-full text-center py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition"
                                >
                                    Create account
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
