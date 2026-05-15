"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

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

const RADIUS = 155;
const CENTER = 190;

function polarToXY(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}

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

// ─── Radial Menu ──────────────────────────────────────────────────
function RadialMenu({ onSelect, activeColor }: { onSelect: (id: string) => void; activeColor: (c: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const size = CENTER * 2;

  return (
    <div className="relative select-none" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 pointer-events-none" width={size} height={size}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer orbit */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="#ffffff0a" strokeWidth="1" fill="none" />
        {/* Inner orbit */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.55} stroke="#ffffff05" strokeWidth="1" fill="none" strokeDasharray="4 6" />

        {/* Spokes */}
        {PILLARS.map((p) => {
          const { x, y } = polarToXY(p.angle, RADIUS);
          const isHov = hovered === p.id;
          return (
            <line key={p.id}
              x1={CENTER} y1={CENTER} x2={x} y2={y}
              stroke={isHov ? p.color + "60" : "#ffffff08"}
              strokeWidth={isHov ? "1.5" : "1"}
              style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
            />
          );
        })}

        {/* Tick marks on orbit */}
        {PILLARS.map((p) => {
          const outer = polarToXY(p.angle, RADIUS + 8);
          const inner = polarToXY(p.angle, RADIUS - 8);
          return (
            <line key={`tick-${p.id}`}
              x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke={hovered === p.id ? p.color + "80" : "#ffffff12"}
              strokeWidth="1"
              style={{ transition: "stroke 0.2s" }}
            />
          );
        })}
      </svg>

      {/* Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="flex flex-col items-center gap-0.5"
          animate={{ opacity: hovered ? 0.4 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[8px] font-black tracking-[0.5em] uppercase text-zinc-600">Marine Express</span>
          <span className="text-[26px] font-black tracking-tighter text-white leading-none">MEXP</span>
          <span className="text-[8px] tracking-[0.25em] uppercase text-zinc-700">5 pillars</span>
        </motion.div>
      </div>

      {/* Pillar nodes */}
      {PILLARS.map((p) => {
        const { x, y } = polarToXY(p.angle, RADIUS);
        const isHov = hovered === p.id;
        return (
          <motion.button
            key={p.id}
            onClick={() => onSelect(p.id)}
            onMouseEnter={() => { setHovered(p.id); activeColor(p.color); }}
            onMouseLeave={() => { setHovered(null); activeColor(""); }}
            animate={{ scale: isHov ? 1.15 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)" }}
            className="flex flex-col items-center gap-1.5 focus:outline-none"
          >
            {/* Pulse ring */}
            {isHov && (
              <motion.div
                className="absolute rounded-xl"
                style={{ inset: -6, border: `1px solid ${p.color}40` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl border transition-all duration-200"
              style={{
                backgroundColor: isHov ? p.color + "18" : "#18181b",
                borderColor: isHov ? p.color + "80" : "#3f3f46",
                boxShadow: isHov ? `0 0 24px ${p.color}25` : "none",
              }}
            >
              {p.icon}
            </div>
            <span
              className="text-[10px] font-black tracking-widest uppercase whitespace-nowrap transition-colors duration-200"
              style={{ color: isHov ? p.color : "#52525b" }}
            >
              {p.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Slide-in Panel ───────────────────────────────────────────────
function PillarPanel({ pillar, onClose }: { pillar: typeof PILLARS[0]; onClose: () => void }) {
  const total = pillar.stats.posts + pillar.stats.projects;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="absolute inset-y-0 right-0 z-40 w-full max-w-[420px] flex flex-col overflow-hidden"
        style={{ backgroundColor: "#09090b", borderLeft: `1px solid ${pillar.color}25` }}
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Color bar */}
        <div className="h-[2px] w-full flex-shrink-0" style={{ backgroundColor: pillar.color }} />

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* Hero section */}
          <div className="relative p-8 pb-6 overflow-hidden border-b border-zinc-800/60">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at top right, ${pillar.color}10 0%, transparent 60%)` }} />

            <div className="flex justify-between items-start mb-8">
              <motion.span
                className="text-3xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
              >
                {pillar.icon}
              </motion.span>
              <button onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-600 hover:text-white hover:border-zinc-600 transition-all text-sm">
                ✕
              </button>
            </div>

            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-2" style={{ color: pillar.color }}>
              MEXP Pillar
            </p>
            <h2 className="text-[2.5rem] font-black tracking-tighter text-white leading-none mb-2">
              {pillar.label}
            </h2>
            <p className="text-zinc-500 text-sm italic mb-5">{pillar.tagline}</p>

            {/* Stats row */}
            <div className="flex gap-3">
              {[
                { label: "Posts", value: pillar.stats.posts },
                { label: "Projects", value: pillar.stats.projects },
                { label: "Total", value: total },
              ].map(({ label, value }) => (
                <div key={label} className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-center">
                  <p className="text-xl font-black text-white leading-none mb-1">{value}</p>
                  <p className="text-[10px] tracking-widest uppercase text-zinc-600">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="px-8 py-6 border-b border-zinc-800/60">
            <p className="text-zinc-400 text-sm leading-relaxed">{pillar.description}</p>
          </div>

          {/* Themes */}
          <div className="px-8 py-6 border-b border-zinc-800/60">
            <p className="text-[10px] text-zinc-600 tracking-[0.4em] uppercase font-black mb-4">Topics I cover</p>
            <div className="flex flex-wrap gap-2">
              {pillar.themes.map((t, i) => (
                <motion.span key={t}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border"
                  style={{ borderColor: pillar.color + "35", color: pillar.color, backgroundColor: pillar.color + "0d" }}>
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          {/* About MEXP */}
          <div className="px-8 py-6 border-b border-zinc-800/60">
            <p className="text-[10px] text-zinc-600 tracking-[0.4em] uppercase font-black mb-3">About MEXP</p>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Marine Express (MEXP) is a personal brand and knowledge platform by a Malaysian engineer at the intersection of industry, technology and entrepreneurship. These five pillars represent where curiosity meets career — written for builders, thinkers and practitioners.
            </p>
          </div>

          {/* Actions */}
          <div className="px-8 py-6 flex flex-col gap-3">
            <a href={pillar.href}
              className="w-full py-3.5 rounded-xl text-xs font-black tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-200 border"
              style={{
                backgroundColor: pillar.color + "15",
                borderColor: pillar.color + "40",
                color: pillar.color,
              }}>
              Explore {pillar.label} →
            </a>
            <button onClick={onClose}
              className="w-full py-3.5 rounded-xl text-xs font-black tracking-[0.25em] uppercase border border-zinc-800 text-zinc-600 hover:border-zinc-600 hover:text-white transition-all duration-200">
              Close
            </button>
          </div>
        </div>
      </motion.div>
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
export default function DocsPage() {
  const [entered, setEntered] = useState(false);
  const [entering, setEntering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [glowColor, setGlowColor] = useState("");

  useEffect(() => setMounted(true), []);

  const handleEnter = () => {
    setEntering(true);
    setTimeout(() => { setEntered(true); setEntering(false); }, 700);
  };

  const activePillar = PILLARS.find((p) => p.id === selectedId) ?? null;
  if (!mounted) return null;

  return (
    <div className="relative w-full h-full bg-zinc-950 overflow-hidden">
      {glowColor && <CursorGlow color={glowColor} />}

      {/* Entry */}
      <AnimatePresence>
        {!entered && <EntryScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Flash */}
      <AnimatePresence>
        {entering && (
          <motion.div key="flash" className="absolute inset-0 z-40 bg-zinc-800"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.5, times: [0, 0.25, 1] }} />
        )}
      </AnimatePresence>

      {/* Main */}
      {entered && (
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />

          <motion.div className="z-10 flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}>
            <p className="text-zinc-700 text-[10px] tracking-[0.4em] uppercase font-black">MEXP Universe</p>
            <RadialMenu onSelect={(id) => setSelectedId(id)} activeColor={setGlowColor} />
            <p className="text-zinc-800 text-[10px] tracking-widest uppercase">Select a pillar to explore</p>
          </motion.div>

          <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-zinc-800 text-[10px] font-mono tracking-widest">
            mexp.dev · 2026
          </p>
        </motion.div>
      )}

      {/* Panel */}
      <AnimatePresence>
        {activePillar && (
          <PillarPanel key={activePillar.id} pillar={activePillar} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}