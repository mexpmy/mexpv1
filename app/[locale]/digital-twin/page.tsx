'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CinematicRig from '@/components/CinematicRig';
import { CINEMATIC_PATH } from '@/components/CinematicRig';
import SimulationParticles from '@/components/SimulationParticles';

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
        (-rect.top + window.innerHeight * 0.15) / (rect.height - window.innerHeight * 0.7)
      ));  // Tighter mapping so the 6 shots feel denser and less "empty" while scrolling

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

          {/* Slim cinematic progress bar — prominent on mobile too */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 transition-opacity"
            style={{ opacity: scrollProgress > 0.01 ? 1 : 0 }}
          >
            <div 
              className="h-full bg-emerald-400 transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* HERO — Ultra-premium, confident, and cinematic */}
      <div className="min-h-[100dvh] pt-16 relative flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/digital-twins/1.jpg" 
            alt="MExp Digital Twin - Semi-submersible offshore asset" 
            className="w-full h-full object-cover opacity-55" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[length:2.5px_2.5px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:pl-20 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs tracking-[4px] font-mono text-emerald-400 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              HIGH-FIDELITY DIGITAL TWINS FOR PHYSICAL ASSETS
            </div>

            <h1 className="text-[64px] md:text-[104px] font-black tracking-[-6.5px] leading-[0.82] mb-8">
              Digital Twins.<br />Engineered for<br />Reality.
            </h1>

            <p className="text-2xl md:text-[28px] text-zinc-300 max-w-3xl mb-12 leading-tight tracking-[-0.2px]">
              Scroll-driven cinematic experiences.<br />Real-time physics. Engineering-grade precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('cinematic-experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white text-black text-sm tracking-[3px] font-semibold hover:bg-white/95 active:bg-white transition-all active:scale-[0.985] shadow-2xl"
              >
                EXPERIENCE THE PROTOTYPE
                <span className="group-hover:translate-x-1 transition">↓</span>
              </button>

              <button 
                onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl border border-white/25 hover:bg-white/5 text-sm tracking-[3px] font-medium transition-all active:scale-[0.985] backdrop-blur"
              >
                EXPLORE THE TECHNOLOGY
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] tracking-[4px] text-white/35 font-mono z-10">
          <div>SCROLL TO BEGIN THE JOURNEY</div>
          <div className="h-px w-10 bg-white/15" />
        </div>
      </div>

      {/* CINEMATIC SCROLL EXPERIENCE - Reduced height to fix "long empty pages" feel */}
      <div id="cinematic-experience" className="relative min-h-[380vh] bg-black">
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
          
          {/* More dense overlays inside the cinematic scroll section */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Main left-side text blocks */}
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

            {/* Additional density elements */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:pl-12">
              {/* Subtle right-side floating labels during scroll */}
              {CINEMATIC_PATH.map((shot, index) => {
                const sectionStart = index / (CINEMATIC_PATH.length - 1);
                const isVisible = scrollProgress >= sectionStart - 0.08 && scrollProgress <= sectionStart + 0.18;
                return (
                  <div
                    key={`label-${index}`}
                    className={`absolute right-6 md:right-12 top-1/3 text-right transition-opacity duration-500 ${isVisible ? 'opacity-60' : 'opacity-0'}`}
                  >
                    <div className="text-[10px] tracking-[3px] text-white/50 font-mono mb-1">FOCUS</div>
                    <div className="text-sm text-white/70 tracking-tight">{shot.label.toUpperCase()}</div>
                  </div>
                );
              })}

              {/* Bottom subtle progress hint */}
              <div className="absolute bottom-12 left-6 md:left-12 text-[10px] tracking-[3px] text-white/40 font-mono">
                SCROLL TO EXPLORE RIG SYSTEMS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why It Matters — Premium, clear, and confident */}
      <div className="border-t border-white/10 bg-black py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="text-emerald-400 text-xs tracking-[4px] font-mono mb-4">THE PROBLEM</div>
            <h2 className="text-5xl md:text-6xl font-black tracking-[-2.8px] leading-[0.9]">
              Most digital twins<br />are just pretty pictures.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 text-lg">
            <div>
              <p className="text-zinc-400">
                Traditional simulations and static models fail when real physics, degradation, and operational complexity enter the picture. 
                Decisions are made with incomplete or outdated information.
              </p>
            </div>
            <div className="space-y-6 text-zinc-300">
              <div className="flex gap-4">
                <div className="mt-1.5 h-px w-8 bg-white/30 flex-shrink-0" />
                <p>Real-time structural and hydrodynamic behavior is rarely modeled accurately.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1.5 h-px w-8 bg-white/30 flex-shrink-0" />
                <p>Teams operate on fragmented data instead of a single source of truth.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1.5 h-px w-8 bg-white/30 flex-shrink-0" />
                <p>Stakeholders cannot intuitively understand complex system states.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="border-t border-white/10 bg-zinc-950 py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-emerald-400 text-xs tracking-[4px] font-mono mb-3">CAPABILITIES</div>
            <h3 className="text-4xl font-black tracking-tighter">What a True Digital Twin Delivers</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="group relative rounded-2xl overflow-hidden border border-white/10">
              <img src="/images/digital-twins/3.jpg" alt="Digital twin data visualization" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black p-8 flex flex-col justify-end">
                <div className="text-emerald-400 text-xs tracking-[3px] mb-2">REAL-TIME SIMULATION</div>
                <h4 className="text-3xl font-bold tracking-tight mb-2">Live Physics & Degradation</h4>
                <p className="text-zinc-300">Structural, hydrodynamic, and operational simulation that updates with real sensor data.</p>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden border border-white/10">
              <img src="/images/digital-twins/4.jpg" alt="Subsea BOP digital twin" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black p-8 flex flex-col justify-end">
                <div className="text-emerald-400 text-xs tracking-[3px] mb-2">OPERATIONAL INTELLIGENCE</div>
                <h4 className="text-3xl font-bold tracking-tight mb-2">Predictive & Prescriptive</h4>
                <p className="text-zinc-300">From component-level health to full asset optimization — with clear recommended actions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Rig Elements — Cards (Ultra-premium + simulation) */}
      <div className="bg-zinc-950 py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-emerald-400 text-xs tracking-[4px] font-mono mb-4">EXPLORE THE ASSET</div>
            <h3 className="text-5xl md:text-[52px] font-black tracking-[-2.4px] leading-none">The Digital Twin,<br />Element by Element</h3>
            <p className="mt-5 text-lg text-zinc-400 max-w-md mx-auto">Every critical system. Click any card to jump straight into the cinematic experience.</p>
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

              const isAdvancedElement = [1, 2, 3, 4].includes(index);

              const visualMap: { [key: number]: string } = {
                1: "/images/digital-twins/6.jpg",
                2: "/images/digital-twins/2.jpg",
                3: "/images/digital-twins/9.jpg",
                4: "/images/digital-twins/5.jpg",
              };

              const visualSrc = isAdvancedElement ? visualMap[index] : null;

              const [isHovered, setIsHovered] = useState(false);

              return (
                <motion.button
                  key={index}
                  onClick={handleJump}
                  onHoverStart={() => isAdvancedElement && setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  whileHover={{ scale: 1.012, y: -3 }}
                  whileTap={{ scale: 0.985 }}
                  className={`group text-left p-5 sm:p-6 rounded-3xl border border-white/10 bg-black/50 hover:bg-black/80 hover:border-emerald-400/40 active:border-emerald-400/60 transition-all duration-200 flex flex-col min-h-[210px] touch-manipulation overflow-hidden relative ${
                    isAdvancedElement ? "ring-1 ring-white/5" : ""
                  }`}
                >
                  {visualSrc && (
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-45 transition-opacity duration-300">
                      <img src={visualSrc} alt={shot.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
                      
                      {isAdvancedElement && isHovered && (
                        <SimulationParticles className="opacity-75" particleCount={75} color="#10b981" />
                      )}
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[10px] tracking-[3px] font-mono text-emerald-400/70">
                        SHOT {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] tracking-[2px] font-mono text-white/30 group-hover:text-emerald-400 transition-colors">
                        VIEW →
                      </div>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">
                      {shot.label}
                    </h4>

                    <p className="text-sm text-zinc-400 leading-relaxed flex-1 line-clamp-3">
                      {descriptions[index]}
                    </p>

                    {isAdvancedElement && (
                      <div className="mt-3 inline-flex self-start items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-2.5 py-0.5 text-[9px] tracking-[1.5px] text-emerald-400 font-mono">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                        </span>
                        PROTOTYPE IN ACTIVE DEVELOPMENT
                      </div>
                    )}

                    <div className="mt-auto pt-4 text-[10px] tracking-[2px] text-white/30 group-hover:text-emerald-400/70 transition-colors">
                      {isAdvancedElement ? "Tap to preview in 3D simulation" : "Tap to fly there in 3D"}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* How it Works — Beautiful Journey Section */}
      <div className="border-t border-white/10 bg-black py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-emerald-400 text-xs tracking-[4px] font-mono mb-4">THE JOURNEY</div>
            <h3 className="text-5xl md:text-[52px] font-black tracking-[-2.4px] leading-none">How a Living Digital Twin is Born</h3>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { num: "01", title: "Capture", desc: "Sensors + real-world data streams feed the twin continuously." },
              { num: "02", title: "Simulate", desc: "High-fidelity physics and degradation models run in real time." },
              { num: "03", title: "Visualize", desc: "Cinematic 3D + interactive data layers make complexity intuitive." },
              { num: "04", title: "Predict", desc: "AI surfaces risks, maintenance windows, and optimization opportunities." },
              { num: "05", title: "Act", desc: "Decisions flow back to operations with full audit trail and traceability." },
            ].map((step, i) => (
              <div key={i} className="group rounded-2xl border border-white/10 bg-zinc-950/60 p-6 hover:border-emerald-400/30 transition-all">
                <div className="text-emerald-400 font-mono text-sm tracking-[3px] mb-2">{step.num}</div>
                <h4 className="text-2xl font-semibold tracking-tight mb-3 group-hover:text-emerald-400 transition-colors">{step.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <img 
              src="/images/digital-twins/12.jpg" 
              alt="Digital twin journey flow" 
              className="rounded-2xl border border-white/10 mx-auto max-h-[380px] object-cover" 
            />
          </div>
        </div>
      </div>

      {/* Technology & Approach */}
      <div className="border-t border-white/10 bg-black py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <div className="text-emerald-400 text-xs tracking-[4px] font-mono mb-3">TECHNOLOGY</div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                  Built with production-grade<br />3D engineering tools
                </h3>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-8 text-lg text-zinc-300">
              <div>
                <div className="font-semibold text-white mb-2">Three.js + React Three Fiber (Current)</div>
                <p className="text-base text-zinc-400">High-performance WebGL foundation with custom cinematic camera systems, quality tiering for mobile/desktop, and scroll-synchronized animation.</p>
              </div>
              <div>
                <div className="font-semibold text-white mb-2">Threepipe Prototype (In Active Development)</div>
                <p className="text-base text-zinc-400">Experimental high-fidelity renderer featuring Catmull-Rom spline camera paths, cinematic vs free-orbit modes, SSAO, GBuffer, and progressive rendering. This work is currently informing our next-generation experiences.</p>
              </div>
              <div>
                <div className="font-semibold text-white mb-2">Future: NVIDIA Omniverse</div>
                <p className="text-base text-zinc-400">The end goal is a true collaborative, physics-accurate digital twin stage in Omniverse, with this web experience serving as the public-facing interaction layer and proof of concept.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Ambition — Honest & Aspirational (no misleading localhost links) */}
      <div className="border-t border-white/10 bg-zinc-950 py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <div className="text-emerald-400 text-xs tracking-[4px] font-mono mb-2">IN DEVELOPMENT</div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter">Pushing the Technical Edge</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
              <img src="/images/digital-twins/8.jpg" alt="Night rig" className="w-full h-72 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 p-6 flex flex-col justify-end">
                <div className="text-xs tracking-[3px] text-emerald-400 mb-1">SPLINE CAMERA</div>
                <h4 className="text-2xl font-semibold">Organic Cinematic Motion</h4>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
              <img src="/images/digital-twins/9.jpg" alt="ROV in moonpool" className="w-full h-72 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 p-6 flex flex-col justify-end">
                <div className="text-xs tracking-[3px] text-emerald-400 mb-1">MODE SWITCHING</div>
                <h4 className="text-2xl font-semibold">Cinematic vs Free Orbit</h4>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group md:col-span-2 lg:col-span-1">
              <img src="/images/digital-twins/10.jpg" alt="Data dashboard concept" className="w-full h-72 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 p-6 flex flex-col justify-end">
                <div className="text-xs tracking-[3px] text-emerald-400 mb-1">POST-PROCESSING</div>
                <h4 className="text-2xl font-semibold">SSAO • GBuffer • Progressive</h4>
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm text-zinc-400 max-w-2xl">
            We're actively developing a significantly more advanced prototype using Threepipe. 
            It features true Catmull-Rom spline camera choreography, seamless switching between scripted cinematic sequences and free exploration, 
            and higher-fidelity post-processing. This work is informing the next generation of our digital twin experiences.
          </p>
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

      {/* Strong Final CTA — Clear, confident, premium */}
      <div className="border-t border-white/10 bg-black py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="/images/digital-twins/11.jpg" 
            alt="Digital twin vision" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="text-emerald-400 text-xs tracking-[4px] font-mono mb-4">READY TO BUILD YOURS?</div>
          <h3 className="text-5xl md:text-6xl font-black tracking-[-2.5px] leading-none mb-6">
            Stop guessing.<br />Start seeing.
          </h3>
          <p className="text-xl text-zinc-300 max-w-lg mx-auto mb-10">
            Join the operators who are already using high-fidelity digital twins to make faster, safer, and more profitable decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 rounded-2xl bg-white text-black text-sm tracking-[3px] font-semibold hover:bg-white/90 active:scale-[0.985] transition-all shadow-xl">
              REQUEST EARLY ACCESS
            </button>
            <button 
              onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 rounded-2xl border border-white/30 hover:bg-white/5 text-sm tracking-[3px] font-medium active:scale-[0.985] transition-all backdrop-blur"
            >
              SEE HOW IT WORKS
            </button>
          </div>

          <p className="mt-6 text-xs tracking-[2px] text-white/40 font-mono">Limited partner slots available for 2026 deployments.</p>
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

      {/* Mobile progress indicator — refined */}
      {isMobile && scrollProgress > 0.02 && scrollProgress < 0.98 && (
        <div className="fixed bottom-3 left-3 right-3 z-40 flex items-center justify-between bg-zinc-950/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-[1.5px]">
          <div className="flex items-center gap-2 text-white/70">
            <span className="tabular-nums font-medium text-white/90">
              {String(activeIndex + 1).padStart(2, '0')}/{CINEMATIC_PATH.length}
            </span>
            <span className="text-emerald-400/70">—</span>
            <span>{CINEMATIC_PATH[activeIndex]?.label}</span>
          </div>
          <div className="w-12 h-[2px] bg-white/15 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-400 transition-all duration-100" 
              style={{ width: `${scrollProgress * 100}%` }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
