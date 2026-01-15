// app/components/Footer.tsx
'use client';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001e5f] border-t border-gray-700 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        
        {/* Copyright Section */}
        <div data-i18n-key="copyright">
          &copy; {currentYear} KAMAnjola GmbH. All rights reserved.
        </div>

        {/* Links Section */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link 
            href="/contact" 
            className="hover:text-white transition-colors duration-200" 
            data-i18n-key="contacts"
          >
            Contacts
          </Link>
          <Link 
            href="/imprint" 
            className="hover:text-white transition-colors duration-200" 
            data-i18n-key="Imprint"
          >
            Imprint
          </Link>
          <Link 
            href="/privacy-policy" 
            className="hover:text-white transition-colors duration-200" 
            data-i18n-key="Privicy"
          >
            Data Policy
          </Link>
        </nav>

      </div>
    </footer>
  );
}