// /app/products/page.tsx
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useTranslations } from 'next-intl';

export default function Page() {
  const { user, isLoading } = useUser();
  const t = useTranslations('products');
  const tCommon = useTranslations('common');

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <p>{tCommon('loading')}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{t('welcome', { name: user?.name || '' })}</h1>
      <h2>{t('more_coming')}</h2>
    </div>
  );
}
