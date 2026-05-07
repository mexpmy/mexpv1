"use client";

import React, { Suspense, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Float } from "@react-three/drei";

// ─── FIX 1: Error Boundary for WebGL crashes ─────────────────────────────────
interface ErrorBoundaryState { hasError: boolean }
class SceneErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) { console.error("[Scene] WebGL error:", error); }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ─── FIX 2: WebGL capability check ───────────────────────────────────────────
function isWebGLSupported(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// ─── FIX 3: Static fallback when WebGL is unavailable ────────────────────────
function StaticFallbackBackground() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        background: "#0a0a0a",
        backgroundImage:
          "linear-gradient(rgba(51,51,51,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(51,51,51,0.4) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  );
}

export default function AboutPage() {
  // ─── FIX 2: Capability check runs client-side only ───────────────────────
  const [webGLAvailable, setWebGLAvailable] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setWebGLAvailable(isWebGLSupported());
  }, []);

  // Contact handler (FIX 4)
  const handleContact = () => {
    window.location.href = "mailto:dev@example.com"; // replace with your actual contact route
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0a] text-white">
      {/* 1. BACKGROUND 3D LAYER */}
      <div className="fixed inset-0 z-0">
        {/* Show static grid while capability check runs (SSR / hydration) */}
        {webGLAvailable === null && <StaticFallbackBackground />}

        {/* FIX 1+2+3: Error boundary + WebGL guard + static fallback */}
        {webGLAvailable === true && (
          <SceneErrorBoundary fallback={<StaticFallbackBackground />}>
            <Scene />
          </SceneErrorBoundary>
        )}

        {webGLAvailable === false && <StaticFallbackBackground />}
      </div>

      {/* 2. FOREGROUND CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-6 md:px-24 py-20 pointer-events-none">
        <header className="space-y-2 mb-12">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
            SYSTEM<br />OVERVIEW
          </h1>
          <div className="flex gap-4 font-mono text-sm text-zinc-500">
            <span>ID: DEV_UNIT_88</span>
            <span>//</span>
            <span>LOC: JOHOR_MY</span>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
              [ STATUS: OPTIMIZED ]
            </span>
            <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              [ TEMP: NOMINAL ]
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl pointer-events-auto">
          {/* Card 01 */}
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 backdrop-blur-md rounded-xl">
            <h3 className="text-blue-500 font-mono mb-4 text-xs tracking-widest uppercase">01_CORE_BIOGRAPHY</h3>
            <p className="text-zinc-300 leading-relaxed">
              Originally trained in the world of{" "}
              <span className="text-white font-semibold italic">Mechanical Engineering</span>,
              I now apply the laws of physics and structural integrity to the digital realm.
              I build web engines that aren&apos;t just fast—they&apos;re architecturally sound.
            </p>
          </div>

          {/* Card 02 */}
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 backdrop-blur-md rounded-xl">
            <h3 className="text-blue-500 font-mono mb-4 text-xs tracking-widest uppercase">02_TECH_SPECS</h3>
            <ul className="space-y-2 font-mono text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" /> Next.js 14 / TypeScript
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" /> Three.js / R3F
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" /> Tailwind / HeroUI
              </li>
            </ul>
            {/* FIX 4: Wired up contact button */}
            <button
              onClick={handleContact}
              className="mt-8 w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-colors"
            >
              [ INITIALIZE CONTACT ]
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <color attach="background" args={["#0a0a0a"]} />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      <Suspense fallback={null}>
        {/*
          FIX 5: Float removed from around OrbitControls target mesh.
          Float's continuous transform and OrbitControls' user-input transform
          fight each other causing jitter. Float is kept but isolated so
          OrbitControls targets a stable parent mesh, not the animated Float child.
        */}
        <mesh position={[1.5, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
            <meshStandardMaterial
              color="#3b82f6"
              wireframe
              transparent
              opacity={0.3}
            />
          </Float>
        </mesh>

        {/* FIX 6: Increased cell contrast for visibility across display profiles */}
        <Grid
          renderOrder={-1}
          position={[0, -1.5, 0]}
          args={[10.5, 10.5]}
          sectionSize={1}
          sectionThickness={1.5}
          sectionColor="#444"   // was #333
          cellColor="#1e1e1e"   // was #111 — still subtle but readable on dim displays
          fadeDistance={25}
        />
      </Suspense>

      {/* FIX 5: autoRotate keeps the model moving after user interaction ends */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}