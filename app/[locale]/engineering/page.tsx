'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function EngineeringVisual() {
  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 9] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[-5, 8, -3]} intensity={1.5} color="#a3e635" />
        <Stars radius={90} depth={15} count={80} factor={2.5} saturation={0} fade />
        <mesh rotation={[0.4, 0.6, 0]}>
          <octahedronGeometry args={[2.4]} />
          <meshBasicMaterial color="#a3e635" wireframe transparent opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default function EngineeringPillar() {
  const themes = [
    "Software architecture", "Systems design", "DevOps & CI/CD", 
    "Open source", "Career growth", "Reliability engineering"
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <EngineeringVisual />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16">
        <Link href="/portfolio" className="inline-flex items-center text-xs tracking-[2px] text-lime-400 hover:text-lime-300 mb-8 font-mono">
          ← BACK TO PORTFOLIO
        </Link>

        <div className="flex items-center gap-5 mb-6">
          <span className="text-6xl">⚙️</span>
          <div>
            <div className="text-lime-400 text-sm tracking-[4px] font-mono">PILLAR 02 • SYSTEMS CRAFT</div>
            <h1 className="text-[72px] leading-[0.82] font-black tracking-[-4.5px]">Engineering</h1>
          </div>
        </div>

        <p className="max-w-2xl text-2xl text-zinc-300">
          The craft of building reliable, maintainable systems. From low-level decisions to large-scale infrastructure.
        </p>

        <div className="mt-8 flex gap-4">
          <Link href="/blog" className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium tracking-widest">READ TECHNICAL WRITING</Link>
          <Link href="/portfolio" className="px-8 py-3 rounded-full border border-white/20 text-sm tracking-widest hover:bg-white/5">EXPLORE PILLARS</Link>
        </div>
      </div>

      <div className="border-y border-white/10 bg-black/30">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 py-8 text-center">
          <div><div className="text-5xl font-black tracking-tighter text-lime-400">18</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">DEEP TECHNICAL POSTS</div></div>
          <div><div className="text-5xl font-black tracking-tighter text-lime-400">6</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">MAJOR SYSTEMS</div></div>
          <div><div className="text-5xl font-black tracking-tighter text-lime-400">∞</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">ITQAN</div></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-xs tracking-[3px] text-lime-400 font-mono mb-4">CORE THEMES</div>
        <div className="flex flex-wrap gap-3">
          {themes.map((t, i) => (
            <div key={i} className="px-5 py-2 rounded-full border border-lime-500/20 bg-lime-500/5 text-sm text-lime-200">{t}</div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20 text-lg text-zinc-300 leading-relaxed">
        This is where I write about the unglamorous but critical parts of building software: architecture decisions that age well, 
        the discipline of clean abstractions, and what it actually takes to run reliable systems in production.
      </div>
    </div>
  );
}
