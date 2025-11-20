'use client';

import Link from 'next/link';
import ProductsDropdown from './ProductsDropdown';

export default function NavLinks() {
  return (
    <ul className="lg:flex items-center space-x-6 font-semibold text-base text-cyan-300">
      <ProductsDropdown />
      <li><Link href="/" className="hover:text-white transition" data-i18n-key="solutions">Solutions</Link></li>
      <li><Link href="/" className="hover:text-white transition" data-i18n-key="workshop">Workshop</Link></li>
      <li><Link href="/" className="hover:text-white transition" data-i18n-key="workbench">MyWorkbench</Link></li>
      <li><Link href="/" className="hover:text-white transition" data-i18n-key="learn">Learn</Link></li>
    </ul>
  );
}
