"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { PortfolioScene } from "@/components/PortfolioScene";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ─── Data ─────────────────────────────────────────────────────────
const PILLARS = [
  {
    id: "business",
    label: "Business",
    angle: -90,
    color: "#38bdf8",
    glow: "#38bdf820",
    icon: "📈",
    tagline: "Building ventures with purpose",
    href: "/business",
    description:
      "Exploring the intersection of technology and entrepreneurship. From idea validation to scaling — documenting the real journey of building a business from the ground up in Malaysia and beyond.",
    themes: ["Venture building", "Product thinking", "Bootstrapping", "Go-to-market", "Finance & ops"],
    stats: { posts: 12, projects: 3 },
  },
  {
    id: "engineering",
    label: "Engineering",
    angle: -18,
    color: "#a3e635",
    glow: "#a3e63520",
    icon: "⚙️",
    tagline: "Craft, systems & deep technical work",
    href: "/engineering",
    description:
      "A software & systems engineering log. From architecture decisions and low-level code to DevOps, infrastructure and the craft of writing clean, maintainable systems.",
    themes: ["Software architecture", "Systems design", "DevOps & CI/CD", "Open source", "Career growth"],
    stats: { posts: 18, projects: 6 },
  },
  {
    id: "aiml",
    label: "AI / ML",
    angle: 54,
    color: "#c084fc",
    glow: "#c084fc20",
    icon: "🤖",
    tagline: "Intelligence, data & the future of machines",
    href: "/ai-ml",
    description:
      "Deep dives into artificial intelligence, machine learning and data science. From foundational math to production ML systems, LLMs, agents and the broader implications of AI on society.",
    themes: ["Machine learning", "LLMs & agents", "Data science", "MLOps", "AI research"],
    stats: { posts: 24, projects: 5 },
  },
  {
    id: "oilgas",
    label: "Oil & Gas",
    angle: 126,
    color: "#fb923c",
    glow: "#fb923c20",
    icon: "🛢️",
    tagline: "Heavy industry through an engineer's lens",
    href: "/oil-gas",
    description:
      "Observations and analysis from the oil & gas world — upstream operations, industrial simulation, SCADA systems, HSE, and how digital transformation is reshaping one of the world's oldest industries.",
    themes: ["Upstream operations", "Industrial simulation", "SCADA & telemetry", "HSE", "Digital oilfield"],
    stats: { posts: 9, projects: 2 },
  },
  {
    id: "datacenters",
    label: "Data Centers",
    angle: 198,
    color: "#f472b6",
    glow: "#f472b620",
    icon: "🏢",
    tagline: "The backbone of the digital economy",
    href: "/data-centers",
    description:
      "Covering the infrastructure that powers everything — colocation, hyperscale, edge computing, power & cooling, and Malaysia's growing role as a regional data center hub in Southeast Asia.",
    themes: ["Colocation & hyperscale", "Power & cooling", "Edge computing", "SEA market", "Sustainability"],
    stats: { posts: 7, projects: 1 },
  },
];



// ─── Cursor glow ──────────────────────────────────────────────────
function CursorGlow({ color }: { color: string }) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      style={{
        left: sx, top: sy,
        width: 320, height: 320,
        x: "-50%", y: "-50%",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        transition: "background 0.4s ease",
      }}
    />
  );
}

// ─── Radial Menu (Perfect Circle) ──────────────────────────────────────────────────
function RadialMenu({ onSelect, activeColor }: { onSelect: (id: string) => void; activeColor: (c: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const size = 420; // Slightly larger for breathing room
  const center = size / 2;
  const radius = 158;

  // Perfect equal spacing for 5 pillars (72° apart)
  const startAngle = -90; // Start from top
  const angleStep = 360 / 5;

  const getPosition = (index: number) => {
    const angle = ((startAngle + index * angleStep) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  return (
    <div className="relative select-none" style={{ width: size, height: size }}>
      <style>{`
        @keyframes flow {
          to { stroke-dashoffset: -18; }
        }
        .pillar-node {
          transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .pillar-node:hover {
          transform: scale(1.08) translate(-50%, -50%);
        }
      `}</style>

      <svg className="absolute inset-0 pointer-events-none" width={size} height={size}>
        <defs>
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Subtle outer ring */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius + 22} 
          stroke="#ffffff08" 
          strokeWidth="1" 
          fill="none" 
        />

        {/* Connecting lines from center to each pillar (always visible, stronger on hover) */}
        {PILLARS.map((p, index) => {
          const pos = getPosition(index);
          const isHov = hovered === p.id;
          return (
            <g key={`line-${p.id}`}>
              {/* Main subtle line */}
              <line
                x1={center}
                y1={center}
                x2={pos.x}
                y2={pos.y}
                stroke={isHov ? p.color + "55" : "#ffffff12"}
                strokeWidth={isHov ? 1.5 : 1}
                style={{ transition: "stroke 0.2s ease, stroke-width 0.2s ease" }}
              />
              {/* Animated glow line on hover */}
              {isHov && (
                <line
                  x1={center}
                  y1={center}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={p.color + "40"}
                  strokeWidth="3"
                  strokeDasharray="4 8"
                  filter="url(#lineGlow)"
                  style={{ animation: "flow 900ms linear infinite" }}
                />
              )}
            </g>
          );
        })}

        {/* Very subtle inner ring */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius * 0.42} 
          stroke="#ffffff06" 
          strokeWidth="1" 
          fill="none" 
          strokeDasharray="2 4"
        />
      </svg>

      {/* Perfectly Centered Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="flex flex-col items-center text-center">
          <div className="text-[10px] font-mono tracking-[3px] text-zinc-500 mb-1">MARINE EXPRESS</div>
          <div className="text-4xl font-black tracking-[-1.5px] text-white">MEXP</div>
          <div className="text-[9px] tracking-[1.5px] text-zinc-600 mt-0.5">5 PILLARS</div>
        </div>
      </div>

      {/* Pillar Nodes - Perfectly Positioned */}
      {PILLARS.map((p, index) => {
        const pos = getPosition(index);
        const isHov = hovered === p.id;

        return (
          <motion.button
            key={p.id}
            onClick={() => onSelect(p.id)}
            onMouseEnter={() => {
              setHovered(p.id);
              activeColor(p.color);
            }}
            onMouseLeave={() => {
              setHovered(null);
              activeColor("");
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="pillar-node absolute flex flex-col items-center focus:outline-none z-20"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
            }}
            aria-label={`Select ${p.label} pillar`}
          >
            {/* Subtle glow ring on hover */}
            <div
              className="absolute rounded-2xl transition-all duration-300"
              style={{
                inset: isHov ? -8 : -4,
                border: `1px solid ${isHov ? p.color + "60" : "transparent"}`,
                boxShadow: isHov ? `0 0 20px ${p.color}25` : "none",
              }}
            />

            {/* Icon Container */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border transition-all duration-200 backdrop-blur-sm"
              style={{
                backgroundColor: isHov ? p.color + "15" : "rgba(24, 24, 27, 0.85)",
                borderColor: isHov ? p.color + "70" : "#27272a",
                color: isHov ? p.color : "#71717a",
              }}
            >
              {p.icon}
            </div>

            {/* Label */}
            <div
              className="mt-2.5 text-[11px] font-medium tracking-[0.5px] transition-all duration-200 text-center"
              style={{ 
                color: isHov ? p.color : "#52525b",
                textShadow: isHov ? `0 0 8px ${p.color}30` : "none"
              }}
            >
              {p.label}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Enhanced Slide-in Panel with deeper interactions ───────────────────────────────────────────────
function PillarPanel({ pillar, onClose }: { pillar: typeof PILLARS[0]; onClose: () => void }) {
  const total = pillar.stats.posts + pillar.stats.projects;
  const panelRef = useRef<HTMLDivElement>(null);

  // Deeper GSAP interaction
  useGSAP(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current, 
        { x: "110%", opacity: 0.6 }, 
        { x: "0%", opacity: 1, duration: 0.7, ease: "power3.out" }
      );
    }
  }, { dependencies: [pillar.id] });

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 z-30 bg-black/70 backdrop-blur-xl"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel - responsive (full on mobile) */}
      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 z-40 w-full md:w-[460px] flex flex-col overflow-hidden border-l"
        style={{ backgroundColor: "#09090b", borderColor: `${pillar.color}20` }}
      >
        {/* Color bar */}
        <div className="h-[3px] w-full flex-shrink-0" style={{ backgroundColor: pillar.color }} />

        <div className="flex-1 overflow-y-auto">
          {/* Hero with staggered entrance */}
          <motion.div 
            className="relative p-8 pb-6 overflow-hidden border-b border-white/10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at top right, ${pillar.color}12 0%, transparent 65%)` }} />

            <div className="flex justify-between items-start">
              <motion.span 
                className="text-4xl" 
                variants={{ hidden: { scale: 0.6, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                {pillar.icon}
              </motion.span>
              <button onClick={onClose} className="text-zinc-400 hover:text-white text-2xl leading-none">×</button>
            </div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              <div className="text-xs tracking-[3px] font-mono mb-1 mt-6" style={{ color: pillar.color }}>MEXP PILLAR</div>
              <h2 className="text-5xl font-black tracking-[-2.5px] leading-none">{pillar.label}</h2>
              <p className="mt-3 text-zinc-400 italic">{pillar.tagline}</p>
            </motion.div>

            {/* Stats with stagger */}
            <div className="flex gap-3 mt-8">
              {[{label:"Posts",v:pillar.stats.posts},{label:"Projects",v:pillar.stats.projects},{label:"Total",v:total}].map((s, i) => (
                <motion.div 
                  key={i} 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                  variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <div className="font-black text-3xl tracking-tighter">{s.v}</div>
                  <div className="text-[10px] text-zinc-500 tracking-widest mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="p-8 space-y-8 text-sm">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="text-xs tracking-[2px] text-zinc-500 mb-2">THE WORK</div>
              <p className="text-zinc-300 leading-relaxed">{pillar.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
            >
              <div className="text-xs tracking-[2px] text-zinc-500 mb-3">TOPICS I COVER</div>
              <div className="flex flex-wrap gap-2">
                {pillar.themes.map((theme, i) => (
                  <motion.div 
                    key={i} 
                    className="px-4 py-1 rounded-full text-xs border"
                    style={{ borderColor: pillar.color + "30", color: pillar.color }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.04 }}
                  >
                    {theme}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Deeper interaction: Direct link to dedicated pillar page */}
            <motion.div 
              className="pt-4 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link 
                href={pillar.href} 
                className="group inline-flex items-center gap-2 text-sm font-mono tracking-[1.5px] border-b border-white/30 hover:border-white pb-1 transition-colors"
              >
                ENTER FULL {pillar.label.toUpperCase()} ARCHIVE 
                <span className="group-hover:translate-x-0.5 transition">→</span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 text-[10px] text-zinc-500 tracking-widest">MEXP • 2026 • ITQAN</div>
      </div>
    </>
  );
}

// ─── Entry screen ─────────────────────────────────────────────────
function EntryScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      key="entry"
      className="absolute inset-0 z-50 flex flex-col items-center justify-center cursor-pointer select-none"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onClick={onEnter}
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Ambient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div className="w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, #38bdf812 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
      </div>

      <motion.div className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}>
        <p className="text-zinc-600 text-[10px] tracking-[0.7em] uppercase font-black mb-10">Marine Express</p>

        <h1 className="font-black tracking-tighter leading-[0.82] mb-8"
          style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}>
          <span className="block text-white">MEXP</span>
          <span className="block text-zinc-800">UNIVERSE</span>
        </h1>

        <p className="text-zinc-600 text-sm max-w-xs mx-auto leading-relaxed mb-10">
          Business · Engineering · AI/ML<br />Oil &amp; Gas · Data Centers
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
          <motion.p className="text-[11px] tracking-[0.5em] uppercase text-zinc-600 font-medium"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ repeat: Infinity, duration: 2.2 }}>
            Click to enter
          </motion.p>
        </div>
      </motion.div>

      {/* Footer labels */}
      <p className="absolute bottom-7 left-7 text-zinc-800 text-[10px] font-mono tracking-widest">MEXP · v1.0</p>
      <p className="absolute bottom-7 right-7 text-zinc-800 text-[10px] font-mono tracking-widest">5 PILLARS</p>
      <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-zinc-800 text-[10px] font-mono tracking-widest">mexp.dev · 2026</p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const t = useTranslations("Portfolio");
  const [entered, setEntered] = useState(false);
  const [entering, setEntering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [glowColor, setGlowColor] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleEnter = () => {
    setEntering(true);
    setTimeout(() => { setEntered(true); setEntering(false); }, 700);
  };

  const activePillar = PILLARS.find((p) => p.id === selectedId) ?? null;

  if (!mounted) return null;

  return (
    <div className="relative w-full min-h-screen bg-zinc-950 overflow-hidden text-white">
      <PortfolioScene 
        accentColor={glowColor || "#38bdf8"} 
        intensity={glowColor ? 1.8 : 1} 
      />
      {glowColor && <CursorGlow color={glowColor} />}

      {/* Entry Screen */}
      <AnimatePresence>
        {!entered && <EntryScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Flash Effect */}
      <AnimatePresence>
        {entering && (
          <motion.div key="flash" className="absolute inset-0 z-40 bg-zinc-800"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.6 }} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {entered && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16 pb-24">
          <div className="text-center mb-10">
            <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-black">MEXP UNIVERSE</p>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mt-2">{t('title')}</h1>
            <p className="text-zinc-400 mt-3 max-w-md mx-auto">{t('subtitle')}</p>
          </div>

          {/* Responsive Pillar Selection */}
          {isMobile ? (
            // Clean, modern mobile grid (2 columns)
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg px-2">
              {PILLARS.map((pillar, index) => (
                <motion.button
                  key={pillar.id}
                  onClick={() => setSelectedId(pillar.id)}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-4 text-left active:scale-[0.985] transition-all hover:bg-zinc-900 hover:border-white/20"
                  style={{ 
                    borderColor: selectedId === pillar.id ? pillar.color : undefined,
                    boxShadow: selectedId === pillar.id ? `0 0 0 1px ${pillar.color}20` : undefined
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 transition-all duration-200"
                    style={{ 
                      backgroundColor: selectedId === pillar.id ? pillar.color + "15" : "#18181b",
                      color: pillar.color 
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div 
                      className="font-semibold text-lg tracking-tight"
                      style={{ color: pillar.color }}
                    >
                      {pillar.label}
                    </div>
                    <div className="text-sm text-zinc-400 mt-0.5 line-clamp-2">
                      {pillar.tagline}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <RadialMenu onSelect={(id) => setSelectedId(id)} activeColor={setGlowColor} />
          )}

          <p className="mt-10 text-xs tracking-[2px] text-zinc-600 font-mono">SELECT A PILLAR TO EXPLORE DEEPLY</p>

          {/* Fun engagement: Random pillar button */}
          <button
            onClick={() => {
              const randomIndex = Math.floor(Math.random() * PILLARS.length);
              setSelectedId(PILLARS[randomIndex].id);
            }}
            className="mt-6 text-xs tracking-[2px] px-5 py-2 rounded-full border border-white/20 text-zinc-400 hover:text-white hover:border-white/40 transition-all active:scale-[0.985]"
          >
            SURPRISE ME →
          </button>

          {/* Prominent Explore CTA */}
          <button
            onClick={() => {
              // Open first pillar as default entry point
              setSelectedId(PILLARS[0].id);
            }}
            className="mt-8 px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm tracking-[1.5px] font-medium text-zinc-200 hover:text-white transition-all active:scale-[0.985]"
          >
            ENTER THE UNIVERSE
          </button>
        </div>
      )}

      {/* Enhanced Panel with deeper interactions */}
      <AnimatePresence>
        {activePillar && (
          <PillarPanel 
            key={activePillar.id} 
            pillar={activePillar} 
            onClose={() => setSelectedId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}