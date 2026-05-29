'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function NeuralVisual() {
  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 6, -8]} intensity={2} color="#c084fc" />
        <Stars radius={100} depth={18} count={140} factor={2} saturation={0} fade />
        <mesh>
          <dodecahedronGeometry args={[2.8]} />
          <meshBasicMaterial color="#c084fc" wireframe transparent opacity={0.22} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default function AIMLPillar() {
  const themes = ["Machine learning", "LLMs & agents", "Data science", "MLOps", "AI research", "Responsible AI"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <NeuralVisual />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16">
        <Link href="/portfolio" className="inline-flex items-center text-xs tracking-[2px] text-purple-400 hover:text-purple-300 mb-8 font-mono">← BACK TO PORTFOLIO</Link>

        <div className="flex items-center gap-5 mb-6">
          <span className="text-6xl">🤖</span>
          <div>
            <div className="text-purple-400 text-sm tracking-[4px] font-mono">PILLAR 03 • INTELLIGENCE</div>
            <h1 className="text-[72px] leading-[0.82] font-black tracking-[-4.5px]">AI / ML</h1>
          </div>
        </div>

        <p className="max-w-2xl text-2xl text-zinc-300">Deep dives into artificial intelligence, machine learning, LLMs, agents, and the future of intelligent systems.</p>

        <div className="mt-8 flex gap-4">
          <Link href="/blog" className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium tracking-widest">READ AI RESEARCH</Link>
          <Link href="/portfolio" className="px-8 py-3 rounded-full border border-white/20 text-sm tracking-widest hover:bg-white/5">OTHER PILLARS</Link>
        </div>
      </div>

      <div className="border-y border-white/10 bg-black/30">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 py-8 text-center">
          <div><div className="text-5xl font-black tracking-tighter text-purple-400">24</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">RESEARCH NOTES</div></div>
          <div><div className="text-5xl font-black tracking-tighter text-purple-400">5</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">PRODUCTION SYSTEMS</div></div>
          <div><div className="text-5xl font-black tracking-tighter text-purple-400">2026</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">FORWARD</div></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-xs tracking-[3px] text-purple-400 font-mono mb-4">CORE THEMES</div>
        <div className="flex flex-wrap gap-3">{themes.map((t, i) => <div key={i} className="px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-sm text-purple-200">{t}</div>)}</div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20 text-lg text-zinc-300 leading-relaxed">
        From foundational math to shipping production agents, this pillar explores how we build systems that actually think — and the responsibility that comes with it.
      </div>
    </div>
  );
}
