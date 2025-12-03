'use client';

import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AuthArea({ user, isLoading }: { user: any, isLoading: boolean }) {
  if (isLoading) return <div className="font-semibold">Loading...</div>;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="font-semibold">{user.name}</span>
        <div style={{borderRadius: '30px', overflow: 'hidden'}}>

        <Image src={user.picture}
        alt='profile picture'
        width={30}
        height={30}/>
        </div>

        <a
          href="/auth/logout"
          className="bg-gray-700 hover:bg-red-600 text-white font-semibold p-1.5 rounded-full transition"
          title="Logout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <a href="/auth/login" className="hover:text-white transition font-semibold">Sign in</a>
      <a href="/auth/login" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-1 px-3 rounded-md transition">
        Create account
      </a>
    </div>
  );
}
