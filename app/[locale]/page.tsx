'use client'; 

import React, { useState } from 'react';
import Controls from "@/components/Controls";
import { Hero } from "@/components/Hero";
import YearFilter from "@/components/YearFilter";
import { useTranslations } from 'next-intl';
import { Canvas } from '@react-three/fiber';
import { Scene } from '@/components/Scene'; 
import { OrbitControls } from '@react-three/drei'; // Import this for interactivity

export default function Home() {
  const [activeYear, setActiveYear] = useState('2026');
  const t = useTranslations('Index');

  return (
    <main className="min-h-screen bg-background">
      <Controls />
      <Hero />

      <YearFilter activeYear={activeYear} setActiveYear={setActiveYear} />

      <section className="bg-background px-6 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className="group cursor-pointer transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* THE 3D CONTAINER */}
              <div className="relative aspect-video w-full bg-[#0d0d0d] border-2 border-[#006FEE] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,111,238,0.1)] group-hover:shadow-[0_0_40px_rgba(0,111,238,0.2)]">
                
                {/* 3D Earth replaces the old gradient div */}
                <Canvas camera={{ position: [0, 0, 6] }}>
                  <Scene />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
                
                <div className="absolute bottom-6 right-6 bg-[#99ff99] text-black px-3 py-1 font-mono font-bold text-sm uppercase pointer-events-none">
                  #TECH-ANALYSIS
                </div>
              </div>

              {/* Content */}
              <div className="mt-6">
                <h3 className="text-3xl font-black text-white leading-tight group-hover:text-[#006FEE] transition-colors">
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
    </main>
  );
}