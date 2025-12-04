// /app/products/page.tsx
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Page() {
    const { user, isLoading } = useUser();

  
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome, {user?.name}</h1>
      <h2>More Products Comming</h2>
      
    </div>
  );
}