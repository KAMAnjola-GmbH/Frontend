// /app/products/page.tsx
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Page() {
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome, {useUser.name}</h1>
      <h2>Lorem Ipsum</h2>
      
    </div>
  );
}