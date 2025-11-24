'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductsDropdown() {
  const [activeMenu, setActiveMenu] = useState('default-content');
  const getPanelClass = (menu: string) => activeMenu === menu ? 'content-panel' : 'content-panel hidden';

  return (
    <li
      id="products-menu-item"
      className="relative group"
      onMouseLeave={() => setActiveMenu('default-content')}
    >
      <button className="hover:text-pink-400 transition flex items-center gap-1" data-i18n-key="products">
        Products
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* DROPDOWN PANEL */}
      <div className="absolute top-full left-0 w-3xl max-w-5xl opacity-0 group-hover:opacity-100 transform -translate-y-1 group-hover:translate-y-0 transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
        <div className="bg-[#0f172a]/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl overflow-hidden">
          <div className="flex text-white">
            
            {/* LEFT MENU */}
            <div className="w-1/3 bg-black/20">
              <ul className="p-2 space-y-1">
                {[
                  { id: 'analytik-content', name: 'Analytik' },
                  { id: 'integration-content', name: 'Technologies of Systems (ToS)' },
                  { id: 'ki-content', name: 'Technologies of Processes (ToP)' },
                  { id: 'te-te-content', name: 'Technologies of Technologies (ToT)' },
                ].map(({ id, name }) => (
                  <li key={id} onMouseEnter={() => setActiveMenu(id)}>
                    <Link href="products//" className="flex justify-between items-center w-full px-3 py-2.5 rounded-md text-sm font-semibold text-gray-300 hover:bg-pink-600/50 hover:text-white transition">
                      <span>{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT CONTENT PANELS */}
            <div className="w-2/3 p-6">
              <div className={getPanelClass('default-content')}>
                <h3 className="text-xl font-bold text-white">Explore Our Products</h3>
                <p className="text-gray-400 mt-2">Hover over a category on the left to discover our wide range of solutions.</p>
              </div>

              <div className={getPanelClass('analytik-content')}>
                <h3 className="text-xl font-bold text-white">Analytik</h3>
                <Link href="/products" className="block px-3 py-1.5 rounded-md hover:bg-pink-600 transition">Digital Twin Platform</Link>
                <Link href="/products" className="block px-3 py-1.5 rounded-md hover:bg-pink-600 transition">ParaView Viewer</Link>
                <Link href="products/susa" className="block px-3 py-1.5 rounded-md hover:bg-pink-600 transition">KPI Calculation</Link>
              </div>

              <div className={getPanelClass('integration-content')}>
                <h3 className="text-xl font-bold text-white">Technologies of Systems (ToS)</h3>
                <DropdownLink name="Plattform Systems Demonstrator (PSD)" />
                <DropdownLink name="Mission Systems Demonstrator (MSD)" />
                <DropdownLink name="Support Systems Demonstrator (SSD)" />
              </div>

              <div className={getPanelClass('ki-content')}>
                <h3 className="text-xl font-bold text-white">Technologies of Processes (ToP)</h3>
                <DropdownLink name="Smart Grids Systems Demonstrators (GSD)" />
                <DropdownLink name="Operations Technologies Demonstrators (OTD)" />
                <DropdownLink name="Smart Enterprise Engines (SEE)" />
              </div>

              <div className={getPanelClass('te-te-content')}>
                <h3 className="text-xl font-bold text-white">Technologies of Technologies (ToT)</h3>
                <DropdownLink name="AI Factory" />
                <DropdownLink name="OODA Ecosystems" />
                <DropdownLink name="R&D Digital Lab (SaaS)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function DropdownLink({ name }: { name: string }) {
  return (
    <Link href="products/kpi_calculation" className="block px-3 py-1.5 rounded-md hover:bg-pink-600 transition">
      {name}
    </Link>
  );
}
