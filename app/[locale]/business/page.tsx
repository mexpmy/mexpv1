'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useTranslations } from 'next-intl';

function BusinessVisual() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 5]} intensity={1.2} color="#38bdf8" />
        <Stars radius={120} depth={20} count={120} factor={3} saturation={0} fade speed={0.4} />
        <mesh>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.25} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default function BusinessPillar() {
  const t = useTranslations('Common');

  const themes = [
    "Venture building", "Product thinking", "Bootstrapping", 
    "Go-to-market", "Finance & ops", "Southeast Asia markets"
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <BusinessVisual />

      <div className="relative z-10">
        {/* Hero */}
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
          <Link href="/portfolio" className="inline-flex items-center text-xs tracking-[2px] text-blue-400 hover:text-blue-300 mb-8 font-mono">
            ← BACK TO PORTFOLIO
          </Link>

          <div className="flex items-center gap-5 mb-6">
            <span className="text-6xl">📈</span>
            <div>
              <div className="text-blue-400 text-sm tracking-[4px] font-mono">PILLAR 01 • VENTURE CRAFT</div>
              <h1 className="text-[72px] leading-[0.82] font-black tracking-[-4.5px]">Business</h1>
            </div>
          </div>

          <p className="max-w-2xl text-2xl text-zinc-300">
            Building ventures with purpose at the intersection of technology and entrepreneurship.
          </p>

          <div className="flex gap-4 mt-8">
            <Link href="/blog" className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium tracking-widest hover:bg-white/90 transition">
              READ THE WRITING
            </Link>
            <Link href="/portfolio" className="px-8 py-3 rounded-full border border-white/20 text-sm tracking-widest hover:bg-white/5 transition">
              EXPLORE OTHER PILLARS
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="border-y border-white/10 bg-black/30">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 py-8 text-center">
            <div>
              <div className="text-5xl font-black tracking-tighter text-blue-400">12</div>
              <div className="text-xs tracking-[2px] text-zinc-500 mt-1">ESSAYS &amp; POSTS</div>
            </div>
            <div>
              <div className="text-5xl font-black tracking-tighter text-blue-400">3</div>
              <div className="text-xs tracking-[2px] text-zinc-500 mt-1">ACTIVE VENTURES</div>
            </div>
            <div>
              <div className="text-5xl font-black tracking-tighter text-blue-400">SE</div>
              <div className="text-xs tracking-[2px] text-zinc-500 mt-1">ASIA FOCUS</div>
            </div>
          </div>
        </div>

        {/* Themes */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-xs tracking-[3px] text-blue-400 font-mono mb-4">CORE THEMES</div>
          <div className="flex flex-wrap gap-3">
            {themes.map((theme, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02, y: -1 }}
                className="px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-sm text-blue-200"
              >
                {theme}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="max-w-3xl mx-auto px-6 pb-20">
          <div className="prose prose-invert max-w-none text-lg leading-relaxed text-zinc-300">
            <p>
              From validating ideas in Kuala Lumpur coffee shops to scaling across Southeast Asia, 
              this pillar documents the real, unfiltered journey of building technology businesses 
              in emerging markets — where capital is scarce, talent is abundant, and execution is everything.
            </p>
            <p className="mt-6">
              Expect stories of product-market fit in non-obvious verticals, lessons from failed pivots, 
              and frameworks for operating with limited resources but unlimited ambition.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 text-center text-xs text-zinc-500 tracking-widest">
          MORE WRITING COMING SOON • BUILT WITH ITQAN
        </div>
      </div>
    </div>
  );
}
