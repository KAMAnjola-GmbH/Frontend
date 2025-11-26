// app/page.tsx
'use client';

import React from 'react';
import Footer from '@/app/components/ui/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-slate-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden shrink-0">
        
        {/* VIDEO LAYER (Background) */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            id="bg-video" 
            className="w-full h-full object-cover"
          >
            <source src="/R0sitavideobg.mp4" type="video/mp4" />
          </video>
          {/* Overlay for text readability */}
        </div>

        {/* TEXT LAYER (Foreground) */}
        {/* z-10 ensures this sits on top of the video */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-2xl" data-i18n-key="herotext">
            Visualize, Simulate, and Optimize <br />
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-lg" data-i18n-key="hero_description">
            Our platform brings your physical assets into the digital world, enabling real-time monitoring, predictive analytics, and advanced simulations.
          </p>
        </div>
      </section>

      {/* --- NEXT SECTIONS --- */}
      {/* shrink-0: Prevents compression */}
      {/* relative z-10: Forces this section to sit ON TOP of any background layers */}
      <section className="relative z-10 shrink-0 py-20 bg-slate-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">More Sections Coming Soon</h2>
          <p className="text-gray-400 mt-4">Features, solutions, and documentation will be detailed here.</p>
        </div>
      </section>

      <section className="relative z-10 shrink-0 py-20 bg-slate-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">...</h2>
        </div>
      </section>

      {/* --- FOOTER --- */}
      {/* Wrapped in a shrink-0 div to ensure it doesn't get crushed at the bottom */}
      <div className="shrink-0 relative z-10">
        <Footer />
      </div>
      
    </div>
  );
}