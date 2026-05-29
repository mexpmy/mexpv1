'use client';

import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function IndustrialVisual() {
  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 10, -10]} intensity={2.2} color="#fb923c" />
        <Stars radius={80} depth={12} count={70} factor={3} saturation={0} fade />
        <mesh rotation={[1, 0.8, 0.3]}>
          <cylinderGeometry args={[1.6, 2.1, 3.8, 5, 1, true]} />
          <meshBasicMaterial color="#fb923c" wireframe transparent opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default function OilGasPillar() {
  const themes = ["Upstream operations", "Industrial simulation", "SCADA & telemetry", "HSE", "Digital oilfield", "Asset integrity"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <IndustrialVisual />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16">
        <Link href="/portfolio" className="inline-flex items-center text-xs tracking-[2px] text-orange-400 hover:text-orange-300 mb-8 font-mono">← BACK TO PORTFOLIO</Link>

        <div className="flex items-center gap-5 mb-6">
          <span className="text-6xl">🛢️</span>
          <div>
            <div className="text-orange-400 text-sm tracking-[4px] font-mono">PILLAR 04 • HEAVY INDUSTRY</div>
            <h1 className="text-[72px] leading-[0.82] font-black tracking-[-4.5px]">Oil &amp; Gas</h1>
          </div>
        </div>

        <p className="max-w-2xl text-2xl text-zinc-300">Heavy industry through an engineer’s lens. Digital transformation, simulation, and the realities of upstream operations.</p>

        <div className="mt-8 flex gap-4">
          <Link href="/blog" className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium tracking-widest">INDUSTRY WRITING</Link>
          <Link href="/apps" className="px-8 py-3 rounded-full border border-white/20 text-sm tracking-widest hover:bg-white/5">SEE DIGITAL TWIN</Link>
        </div>
      </div>

      <div className="border-y border-white/10 bg-black/30">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 py-8 text-center">
          <div><div className="text-5xl font-black tracking-tighter text-orange-400">9</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">FIELD REPORTS</div></div>
          <div><div className="text-5xl font-black tracking-tighter text-orange-400">2</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">SIMULATIONS</div></div>
          <div><div className="text-5xl font-black tracking-tighter text-orange-400">REAL</div><div className="text-xs tracking-[2px] text-zinc-500 mt-1">WORLD</div></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-xs tracking-[3px] text-orange-400 font-mono mb-4">CORE THEMES</div>
        <div className="flex flex-wrap gap-3">{themes.map((t, i) => <div key={i} className="px-5 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-sm text-orange-200">{t}</div>)}</div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20 text-lg text-zinc-300 leading-relaxed">
        Real operators, real constraints, real physics. This pillar bridges the gap between the clean world of software and the dirty, high-stakes world of energy infrastructure.
      </div>
    </div>
  );
}
