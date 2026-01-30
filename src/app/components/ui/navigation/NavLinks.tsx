'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ProductsDropdown from './ProductsDropdown';

export default function NavLinks() {
  const t = useTranslations('nav');

  return (
    <ul className="lg:flex items-center space-x-6 font-semibold text-base text-cyan-300">
      <ProductsDropdown />
      <li>
        <Link href="/solutions" className="hover:text-white transition">
          {t('solutions')}
        </Link>
      </li>
      <li>
        <Link href="/dashboard" className="hover:text-white transition">
          {t('workbench')}
        </Link>
      </li>
      <li>
        <Link href="/learn" className="hover:text-white transition">
          {t('learn')}
        </Link>
      </li>
    </ul>
  );
}
