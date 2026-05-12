"use client";
import React, { useState, useEffect, useRef } from 'react';
import EngineeringDataViz from '@/components/EngineeringDataViz';
import { PageWrapper } from '@/components/PageWrapper';

const RetroTerminal = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const index = useRef(0);

  // 1. Detect when the user scrolls to this section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Typing animation logic with 5s delay repeat
  useEffect(() => {
    if (!isVisible) return;

    let repeatTimer: NodeJS.Timeout;

    const startTyping = () => {
      setDisplayedText("");
      index.current = 0;

      const typingInterval = setInterval(() => {
        if (index.current < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index.current));
          index.current++;
        } else {
          clearInterval(typingInterval);
          // Wait 5 seconds after text is finished, then restart
          repeatTimer = setTimeout(startTyping, 5000);
        }
      }, 30);
    };

    startTyping();

    return () => clearTimeout(repeatTimer);
  }, [isVisible, text]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-black p-8 font-mono text-[#33ff33] min-h-[200px] border-2 border-green-900 shadow-[0_0_15px_rgba(34,197,94,0.2)] my-8 rounded-lg"
    >
      {/* CRT Scanline Effect */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />

      <pre className="relative z-20 whitespace-pre-wrap [text-shadow:0_0_8px_rgba(51,255,51,0.8)] leading-relaxed">
        {displayedText}
        <span className="inline-block w-3 h-5 bg-[#33ff33] animate-pulse ml-1 align-middle" />
      </pre>
    </div>
  );
};

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-300 font-mono selection:bg-emerald-500/30 overflow-x-hidden">

      {/* 2. Fixed Grid - This ensures the background stays consistent while scrolling */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      <PageWrapper className="relative z-10 max-w-[1400px] md:px-16 pb-12">

        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between border-b border-white/5 pb-8 mb-16 w-full">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
            <span className="text-xs tracking-[0.4em] uppercase font-black text-white italic">System.Status // Online</span>
          </div>
          <div className="hidden md:block text-[10px] text-slate-500 tabular-nums tracking-[0.2em] uppercase">
            Node_ID: {Math.random().toString(36).substring(7).toUpperCase()} // DATA_STREAM_ACTIVE
          </div>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20">

          {/* Left Column: Post Content */}
          <div className="xl:col-span-8">
            <section className="space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-[10px] uppercase font-bold tracking-[0.3em]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Historical_Archive_001
                </div>
                <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter leading-[0.85] uppercase">
                  The Source Code <br /> of the Web
                </h1>
                <p className="text-slate-400 text-xl md:text-3xl font-light leading-snug max-w-2xl">
                  Deconstructing the 1990 Hypertext Project structural foundations.
                </p>
              </div>
              <div className="mt-4 text-slate-500 font-mono text-sm md:text-base uppercase tracking-wider">
                by Syahmi Saadon <br />
                Universiti Teknologi Malaysia
              </div>

              <article className="prose prose-invert prose-emerald max-w-none border-t border-white/10 pt-16">
                <div className="text-xl leading-relaxed text-slate-300 space-y-8">
                  <p>
                    The first web page wasn't about style; it was about <strong>interconnectedness</strong>.
                    The <a href="https://line-mode.cern.ch/www/hypertext/WWW/TheProject.html" target="_blank" rel="noreferrer" className="text-emerald-400 decoration-emerald-500/50 underline underline-offset-8 hover:text-white transition-all">CERN Line Mode Browser</a> was the
                    minimum viable product that changed the trajectory of human information exchange.
                  </p>

                  <RetroTerminal text="Welcome to the CERN Line Mode Browser simulation. This is how the web began: simple, textual, and revolutionary." />

                  {/* Component Integration */}
                  <div className="py-4">
                    <EngineeringDataViz />
                  </div>

                  <p className="text-slate-400 border-l-2 border-white/10 pl-8 py-4 italic">
                    As a Mechanical Engineer, I find beauty in this lack of "fluff." It is pure utility.
                    In my transition toward **AI and Data Science**, I aim to maintain this same ethos:
                    building systems that are as functional as a precision-machined gear.
                  </p>
                </div>
              </article>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="xl:col-span-4 space-y-10">

            {/* The Hack Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500/50 to-transparent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#050914] p-8 rounded-2xl border border-red-500/20 shadow-2xl">
                <div className="flex items-center gap-3 text-red-500 mb-6 font-black text-[10px] uppercase tracking-[0.2em]">
                  <span className="p-2 bg-red-500/10 rounded-md">!</span>
                  Security Breach Detected
                </div>
                <h3 className="text-white font-bold mb-4 text-xl tracking-tight">LinkedIn Compromise</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  A recent breach of my digital identity served as the ultimate catalyst.
                  Resetting my career trajectory toward security-first AI and Machine Learning.
                </p>
              </div>
            </div>

            {/* Research Progress */}
            <div className="p-8 border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-xl">
              <h3 className="text-white font-black mb-8 text-[11px] uppercase tracking-[0.3em] border-b border-white/10 pb-4 italic">Active_Research.bin</h3>
              <ul className="space-y-8">
                {[
                  { label: 'Neural Networks', status: '82%', color: 'bg-emerald-500' },
                  { label: 'Mech Analysis', status: 'Applied', color: 'bg-blue-500' },
                  { label: 'Data Science', status: 'Learning', color: 'bg-purple-500' }
                ].map((item) => (
                  <li key={item.label} className="flex flex-col gap-3">
                    <div className="flex justify-between text-[11px] uppercase font-bold tracking-widest">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="text-white">{item.status}</span>
                    </div>
                    <div className="w-full h-[1px] bg-white/10 relative">
                      <div className={`h-full ${item.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} style={{ width: item.status === '82%' ? '82%' : '100%' }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </main>

        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.4em] font-black">
            <a href="#" className="hover:text-emerald-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
          </div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.1em]">
            &lt;/&gt; Built for Structural Integrity // 2024
          </div>
        </footer>
      </PageWrapper>
    </div>
  );
}
