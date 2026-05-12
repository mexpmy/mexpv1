'use client'; 

import React, { useState } from 'react';
import Controls from "@/components/Controls";
import { Hero } from "@/components/Hero";
import YearFilter from "@/components/YearFilter";
import { useTranslations } from 'next-intl';
import { EarthBackground } from '@/components/EarthBackground';

export default function Home() {
  const [activeYear, setActiveYear] = useState('2026');
  const t = useTranslations('Index');

  return (
    <main className="min-h-screen relative pt-16 px-6">
      {/* Full-screen 3D Earth background */}
      <EarthBackground />

      {/* All page content sits on top */}
      <div className="relative z-10">
        <Controls />
        <Hero />

        <YearFilter activeYear={activeYear} setActiveYear={setActiveYear} />

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {[1, 2].map((i) => (
              <div 
                key={i} 
                className="group cursor-pointer transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Card with semi-transparent background */}
                <div className="relative aspect-video w-full bg-black/60 backdrop-blur-md border-2 border-[#006FEE] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,111,238,0.15)] group-hover:shadow-[0_0_40px_rgba(0,111,238,0.3)] transition-shadow duration-500">
                  <div className="absolute bottom-6 right-6 bg-[#99ff99] text-black px-3 py-1 font-mono font-bold text-sm uppercase pointer-events-none">
                    #TECH-ANALYSIS
                  </div>
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-3xl font-black text-white leading-tight group-hover:text-[#006FEE] transition-colors drop-shadow-lg">
                    {t('title')} {activeYear}
                  </h3>
                  <div className="flex items-center gap-3 mt-4 text-gray-400 font-mono text-sm uppercase">
                    <span>Syahmi</span>
                    <span className="text-gray-700">•</span>
                    <span>Feb 06, {activeYear}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}