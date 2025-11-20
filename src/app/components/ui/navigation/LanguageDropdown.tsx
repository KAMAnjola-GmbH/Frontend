'use client';

export default function LanguageDropdown() {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1">
        English
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 w-52 opacity-0 group-hover:opacity-100 transform -translate-y-1 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-1.5">
          <button className="w-full text-left block px-3 py-1.5 rounded-sm hover:bg-pink-600 transition text-sm">English</button>
          <button className="w-full text-left block px-3 py-1.5 rounded-sm hover:bg-pink-600 transition text-sm">Deutsch</button>
        </div>
      </div>
    </div>
  );
}
