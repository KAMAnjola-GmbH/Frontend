'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import NavLinks from './NavLinks';
import LanguageDropdown from './LanguageDropdown';
import AuthArea from './AuthArea';

export default function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#001e5f] border-b border-gray-700">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        
        {/* Logo + Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/r0sita-logo-200e.png"
              alt="Logo"
              width={35}
              height={20}
              className="drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]"
            />
          </Link>
          <NavLinks />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div className="text-pink-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <Link href="/" className="hover:text-white transition" data-i18n-key="contacts">Contacts</Link>
          <LanguageDropdown />

          <div className="w-px h-5 bg-gray-700"></div>

          <AuthArea user={user} isLoading={isLoading} />
        </div>
      </nav>
    </header>
  );
}
