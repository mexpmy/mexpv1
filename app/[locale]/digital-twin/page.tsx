'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CinematicRig from '@/components/CinematicRig';
import { CINEMATIC_PATH } from '@/components/CinematicRig';

// Suppress noisy but harmless Three.js / postprocessing shader warnings in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('THREE.WebGLProgram: Program Info Log') ||
       message.includes('THREE.Clock: This module has been deprecated') ||
       message.includes('X4122'))
    ) {
      return; // suppress
    }
    originalWarn.apply(console, args);
  };
}

export default function DigitalTwinPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  // Track scroll progress for the cinematic experience
  useEffect(() => {
    const handleScroll = () => {
      const experience = document.getElementById('cinematic-experience');
      if (!experience) return;

      const rect = experience.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 
        (-rect.top + window.innerHeight * 0.3) / (rect.height - window.innerHeight * 0.6)
      ));  // Start the camera movement a bit earlier for smoother hero → journey transition

      setScrollProgress(progress);

      // Update active chapter
      const sectionProgress = progress * (CINEMATIC_PATH.length - 1);
      const newIndex = Math.min(Math.floor(sectionProgress + 0.5), CINEMATIC_PATH.length - 1);
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile + aggressive low-end device detection
  useEffect(() => {
    const checkCapabilities = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 4;
      const lowEnd = cores <= 4 || memory <= 4 || mobile;
      setIsLowEnd(lowEnd);
    };

    checkCapabilities();
    window.addEventListener('resize', checkCapabilities);
    return () => window.removeEventListener('resize', checkCapabilities);
  }, []);

  const quality = isLowEnd ? 'low' : isMobile ? 'medium' : 'high';

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
          <div className="font-mono text-xs tracking-[3px] text-white/70">MEXP DIGITAL TWIN</div>
          
          {/* Desktop Chapter Navigation + Progress */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[2px] text-white/60">
            {CINEMATIC_PATH.map((shot, index) => (
              <button
                key={index}
                onClick={() => {
                  const section = document.getElementById('cinematic-experience');
                  if (section) {
                    const progress = index / (CINEMATIC_PATH.length - 1);
                    const targetScroll = section.offsetTop + (progress * (section.offsetHeight - window.innerHeight));
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }
                }}
                className={`flex items-center gap-1.5 transition-all ${activeIndex === index ? 'text-white' : 'hover:text-white/80'}`}
              >
                {activeIndex === index && (
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                )}
                {shot.label}
              </button>
            ))}
            
            {/* Progress fraction */}
            <div className="ml-2 pl-4 border-l border-white/10 text-[10px] tracking-[2px] text-white/40 font-mono tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(CINEMATIC_PATH.length).padStart(2, '0')}
            </div>
          </div>

          {/* Slim cinematic progress bar — only visible during the scroll journey */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 transition-opacity"
            style={{ opacity: scrollProgress > 0.01 ? 1 : 0 }}
          >
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-white transition-all duration-[60ms] ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* HERO - Big cinematic 3D */}
      <div className="min-h-[100dvh] pt-16 relative flex items-center">
        <div className="max-w-7xl mx-auto px-8 md:pl-20 relative z-10">
          <div className="max-w-2xl">
            <div className="text-emerald-400 text-xs tracking-[4px] font-mono mb-4">MEXP • SEMI-SUBMERSIBLE</div>
            <h1 className="text-7xl md:text-[92px] font-black tracking-[-5.5px] leading-[0.82] mb-6">
              DIGITAL<br />TWIN
            </h1>
            <p className="text-2xl text-zinc-400 max-w-lg mb-10">
              A living, high-fidelity replica of the offshore asset.<br />
              Scroll to explore.
            </p>

            <button 
              onClick={() => document.getElementById('cinematic-experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 text-sm tracking-[3px] font-mono border-b border-white/40 pb-1 hover:border-white transition-colors"
            >
              START SCROLLING TO EXPLORE
              <span className="group-hover:translate-x-1 transition">↓</span>
            </button>
          </div>
        </div>

        {/* Full hero 3D */}
        <div className="absolute inset-0 z-0">
          <CinematicRig 
            progress={0} 
            quality={quality} 
            bloomIntensity={2.4}
            lightweight={isMobile} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
        </div>
      </div>

      {/* CINEMATIC SCROLL EXPERIENCE */}
      <div id="cinematic-experience" className="relative min-h-[600vh] bg-black">
        <div className="sticky top-0 h-screen">
          {/* 3D is now very dominant (almost full-screen) */}
          <div className="absolute inset-0">
            <CinematicRig 
              progress={scrollProgress} 
              quality={quality}
              bloomIntensity={isLowEnd ? 0 : scrollProgress > 0.78 ? 0.7 : 2.4}
              lightweight={isLowEnd}
            />
          </div>
          
          {/* Minimal elegant text — pushed to the side to give 3D maximum presence */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="max-w-7xl mx-auto h-full px-6 md:pl-12 flex items-center">
              {CINEMATIC_PATH.map((shot, index) => {
                const sectionStart = index / (CINEMATIC_PATH.length - 1);
                const isVisible = scrollProgress >= sectionStart - 0.1 && scrollProgress <= sectionStart + 0.22;

                return (
                  <div 
                    key={index}
                    className={`max-w-sm transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="text-[10px] tracking-[3px] text-emerald-400 font-mono mb-2 opacity-80">
                      SHOT {String(index + 1).padStart(2, '0')}
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-[-2px] leading-none mb-3">
                      {shot.label}
                    </h2>
                    <p className="text-base text-zinc-200">
                      {index === 0 && "Wide establishing view of the complete asset."}
                      {index === 1 && "Approaching the helideck — primary access point."}
                      {index === 2 && "The main crane: 100+ ton capacity."}
                      {index === 3 && "The moonpool — critical gateway for subsea operations."}
                      {index === 4 && "BOP Stack: the ultimate safety system."}
                      {index === 5 && "Final reveal — the complete digital twin."}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Rig Elements — Cards */}
      <div className="bg-zinc-950 py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-emerald-400 text-xs tracking-[4px] font-mono mb-3">EXPLORE THE ASSET</div>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">Key Elements of the Digital Twin</h3>
            <p className="mt-4 text-zinc-400 max-w-md mx-auto">Click any card to jump directly to that view in the cinematic experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CINEMATIC_PATH.map((shot, index) => {
              const descriptions = [
                "Full overview of the semi-submersible platform from a distance.",
                "Primary helicopter landing zone and personnel access point.",
                "Heavy-lift crane with 100+ ton operational capacity.",
                "Critical moonpool for ROV and subsea intervention operations.",
                "Blowout Preventer stack — the ultimate well control safety system.",
                "Final sweeping reveal showing the complete high-fidelity asset."
              ];

              const handleJump = () => {
                const section = document.getElementById('cinematic-experience');
                if (section) {
                  const progress = index / (CINEMATIC_PATH.length - 1);
                  const targetScroll = section.offsetTop + (progress * (section.offsetHeight - window.innerHeight));
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
              };

              return (
                <motion.button
                  key={index}
                  onClick={handleJump}
                  whileHover={{ scale: 1.015, y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="group text-left p-6 rounded-2xl border border-white/10 bg-black/40 hover:bg-black/60 hover:border-white/20 transition-all duration-200 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] tracking-[3px] font-mono text-emerald-400/70">
                      SHOT {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] tracking-[2px] font-mono text-white/30 group-hover:text-emerald-400/70 transition-colors">
                      JUMP TO VIEW →
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-emerald-400 transition-colors">
                    {shot.label}
                  </h4>

                  <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                    {descriptions[index]}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/10 text-[10px] tracking-[2px] text-white/40 group-hover:text-white/60 transition-colors">
                    Click to navigate in 3D
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* NVIDIA Omniverse Vision */}
      <div className="border-t border-white/10 py-20 px-8 md:pl-20 bg-zinc-950">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[4px] text-emerald-400 font-mono mb-4">THE ROADMAP</div>
          <h3 className="text-5xl font-black tracking-tighter mb-6">From Prototype to Production</h3>
          
          <div className="text-lg text-zinc-400 space-y-6">
            <p>
              This experience is a creative, lightweight prototype built with Three.js and GSAP to explore 
              the emotional and functional potential of a digital twin.
            </p>
            <p>
              Our production goal is to rebuild this inside <span className="text-white font-medium">NVIDIA Omniverse</span> — 
              unlocking true real-time multi-user collaboration, advanced physics, material accuracy, and 
              enterprise-scale simulation used by major energy companies today.
            </p>
            <p className="text-sm text-white/60">
              This is not the final Omniverse application. It is a proof of vision and interaction design.
            </p>
          </div>
        </div>
      </div>

      {/* Access / Login teaser */}
      <div id="login" className="py-20 px-8 border-t border-white/10 bg-black">
        <div className="max-w-md mx-auto text-center">
          <div className="text-xs tracking-[3px] text-white/50 mb-3">NEXT STEP</div>
          <h3 className="text-4xl font-bold tracking-tight mb-4">Request Early Access</h3>
          <p className="text-zinc-400 mb-8">
            This prototype demonstrates the direction. Partners can request access to the full 
            high-fidelity Omniverse digital twin.
          </p>
          <button className="px-10 py-4 border border-white/30 hover:bg-white/5 text-sm tracking-[2px]">
            REQUEST PARTNER ACCESS
          </button>
        </div>
      </div>

      {/* Floating link to the high-fidelity Threepipe prototype — only shown during local development (Hybrid work) */}
      {process.env.NODE_ENV === 'development' && (
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="flex items-center gap-2 bg-zinc-950/95 border border-white/15 hover:border-white/40 backdrop-blur-xl px-5 py-2.5 rounded-full text-xs font-mono tracking-[1.5px] transition-all active:scale-[0.985]">
            <span className="text-emerald-400">●</span>
            <span className="text-white/90 group-hover:text-white">HIGH-FIDELITY PROTOTYPE</span>
            <span className="text-[10px] px-1.5 py-px rounded bg-white/10 text-white/50">THREPIPE + SPLINE</span>
          </div>
          <div className="text-[10px] text-center text-white/30 mt-1 pr-1 tracking-widest">localhost:5173 (experimental)</div>
        </a>
      )}

      {/* Mobile progress indicator — shows during cinematic scroll */}
      {isMobile && scrollProgress > 0.02 && scrollProgress < 0.98 && (
        <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-[10px] font-mono tracking-[2px] text-white/60 border border-white/10">
          <div className="w-8 h-px bg-white/20">
            <div 
              className="h-full bg-emerald-400 transition-all" 
              style={{ width: `${scrollProgress * 100}%` }} 
            />
          </div>
          <span className="tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')}/{CINEMATIC_PATH.length}
          </span>
          <span className="text-white/40">· {CINEMATIC_PATH[activeIndex]?.label}</span>
        </div>
      )}
    </div>
  );
}
