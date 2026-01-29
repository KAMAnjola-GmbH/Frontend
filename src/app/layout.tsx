import React from 'react';

// Root layout - minimal wrapper for locale routing
// All actual layout content is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
