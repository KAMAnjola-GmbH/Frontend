'use client';

import Link from 'next/link';

export default function AuthArea({ user, isLoading }: { user: any, isLoading: boolean }) {
  if (isLoading) return <div className="font-semibold">Loading...</div>;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="font-semibold">{user.name}</span>
        <div className="w-7 h-7 rounded-full bg-gray-600">{/* icon */}</div>
        <Link
          href="/auth/logout"
          className="bg-gray-700 hover:bg-red-600 text-white font-semibold p-1.5 rounded-full transition"
          title="Logout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/auth/login" className="hover:text-white transition font-semibold">Sign in</Link>
      <Link href="/auth/login" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-1 px-3 rounded-md transition">
        Create account
      </Link>
    </div>
  );
}
