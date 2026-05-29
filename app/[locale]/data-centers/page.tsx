'use client';

import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function InfraVisual() {
  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 9] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[-6, 4, 10]} intensity={1.8} color="#f472b6" />
        <Stars radius={110} depth={14} count={90} factor={2.8} saturation={0} fade />
        <mesh rotation={[0.2, 1.1, 0.4]}>
          <boxGeometry args={[3.5, 2.8, 3.5]} />
          <meshBasicMaterial color="#f472b6" wireframe transparent opacity={0.25} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default function DataCentersPillar() {
  const themes = ["Colocation & hyperscale", "Power & cooling", "Edge computing", "SEA market", "Sustainability", "Connectivity"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <InfraVisual />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16">
        <Link href="/portfolio" className="inline-flex items-center text-xs tracking-[2px] text-pink-400 hover:text-pink-300 mb-8 font-mono">← BACK TO PORTFOLIO</Link>

        <div className="flex items-center gap-5 mb-6">
          <span className="text-6xl">🏢</span>
          <div>
            <div className="text-pink-400 text-sm tracking-[4px] font-mono">PILLAR 05 • DIGITAL FOUNDATION</div>
            <h1 className="text-[72px] leading-[0.82] font-black tracking-[-4.5px]">Data Centers</h1>
          </div>
        </div>

        <p className="max-w-2xl text-2xl text-zinc-300">The physical backbone of the digital economy. Power, cooling, connectivity, and the rise of Southeast Asia as a strategic hub.</p>

        <div className="mt-8 flex gap-4">
          <Link href="/blog" className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium tracking-widest">INFRASTRUCTURE WRITING</Link>
          <Link href="/portfolio" className="px-8 py-3 rounded-full border border-white/20 text-sm tracking-widest hover:bg-white/5">ALL PILLARS</Link>
        </div>
      </div>

      <div className="border-y border-white/10 bg-black/30">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 py-8 text-center">
          <div><div className="text-5xl font-black tracking-tighter text-pink-400">7</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">INFRASTRUCTURE NOTES</div></div>
          <div><div className="text-5xl font-black tracking-tighter text-pink-400">1</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">MAJOR PROJECT</div></div>
          <div><div className="text-5xl font-black tracking-tighter text-pink-400">SEA</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">RISING HUB</div></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-xs tracking-[3px] text-pink-400 font-mono mb-4">CORE THEMES</div>
        <div className="flex flex-wrap gap-3">{themes.map((t, i) => <div key={i} className="px-5 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 text-sm text-pink-200">{t}</div>)}</div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20 text-lg text-zinc-300 leading-relaxed">
        Behind every AI model, every video call, and every transaction is concrete, steel, and megawatts. This pillar examines the physical layer that makes the digital world possible.
      </div>
    </div>
  );
}
