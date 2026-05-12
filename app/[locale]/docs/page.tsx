"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadialMenu } from "@/components/RadialMenu";

const appDetails: Record<string, { name: string; version: string; status: string; description: string; color: string; stack: string[]; features: string[]; }> = {
  network: { name: "Network Visualizer", version: "v1.2.0", status: "Active", description: "Real-time network topology visualization and monitoring. Tracks nodes, traffic, security events and connection states across your infrastructure.", color: "#38bdf8", stack: ["Python", "PyQt6", "WebSocket", "pyqtgraph"], features: ["Live node mapping", "Traffic analysis", "Security alerts", "Connection logs"] },
  study: { name: "Study Lab", version: "v0.9.0", status: "Active", description: "AI-powered study and research dashboard. Controls the intelligence server, dispatches learning agents and tracks study sessions.", color: "#a3e635", stack: ["Python", "Tkinter", "REST API", "Agents"], features: ["Agent controller", "Motion commands", "Activity log", "Server state"] },
  rig: { name: "Oil Rig", version: "v0.4.0", status: "In Development", description: "Industrial simulation and telemetry platform for oil rig operations. Handles real-time sensor data, control systems and safety monitoring.", color: "#fb923c", stack: ["Python", "Simulation", "Telemetry", "Control"], features: ["Live simulation", "Telemetry feed", "Control panel", "Event logs"] },
  workshop: { name: "Moto Spec", version: "v1.0.0", status: "Active", description: "Cinematic motorcycle specification showcase. Features Malaysian supercub specs, side-by-side comparisons and an immersive entry experience.", color: "#f472b6", stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"], features: ["Bike specs", "Spec comparison", "Cinematic UI", "Slide-in modal"] },
  settings: { name: "Settings", version: "v1.0.0", status: "System", description: "Global configuration hub for the Nexus ecosystem. Manage profiles, notifications, display preferences and advanced system settings.", color: "#94a3b8", stack: ["Next.js", "Config", "Auth", "Storage"], features: ["Profile settings", "Notifications", "Display config", "Advanced options"] },
};

export default function DocsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const app = selectedApp ? appDetails[selectedApp] : null;
  if (!mounted) return null;

  return (
    <div className="relative h-[calc(100vh-64px)] bg-zinc-950 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }} />
      </div>

      <motion.div className="z-10 flex flex-col items-center gap-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-zinc-600 font-black tracking-[0.3em] uppercase text-sm">Nexus Command</h1>
        <RadialMenu onSelect={(id) => setSelectedApp(id)} />
        <p className="text-zinc-700 text-xs tracking-widest uppercase font-medium">Select a system to explore</p>
      </motion.div>

      <AnimatePresence>
        {app && (
          <>
            <motion.div className="absolute inset-0 z-30 bg-black/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedApp(null)} />
            <motion.div className="absolute inset-y-0 right-0 z-40 w-full max-w-md overflow-y-auto" style={{ backgroundColor: "#09090b", borderLeft: `1px solid ${app.color}30` }} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <div className="h-[2px] w-full" style={{ backgroundColor: app.color }} />
              <div className="p-8 border-b border-zinc-800">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: app.status === "Active" ? "#22c55e" : app.status === "System" ? "#94a3b8" : "#f59e0b" }} />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: app.status === "Active" ? "#22c55e" : app.status === "System" ? "#94a3b8" : "#f59e0b" }}>{app.status}</span>
                  </div>
                  <button onClick={() => setSelectedApp(null)} className="text-zinc-600 hover:text-white transition-colors text-xl">✕</button>
                </div>
                <div className="text-[10px] font-mono text-zinc-600 mb-2">{app.version}</div>
                <h2 className="text-4xl font-black tracking-tighter text-white leading-none mb-3">{app.name}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">{app.description}</p>
              </div>
              <div className="px-8 py-8 border-b border-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(ellipse at center, ${app.color} 0%, transparent 70%)` }} />
                <div className="text-[10px] text-zinc-600 tracking-[0.4em] uppercase font-black mb-4">Stack</div>
                <div className="flex flex-wrap gap-2">
                  {app.stack.map((s) => (<span key={s} className="text-xs font-black px-3 py-1.5 rounded-full border font-mono" style={{ borderColor: app.color + "40", color: app.color, backgroundColor: app.color + "10" }}>{s}</span>))}
                </div>
              </div>
              <div className="p-8">
                <div className="text-[10px] text-zinc-600 tracking-[0.4em] uppercase font-black mb-6">Features</div>
                {app.features.map((feature, i) => (
                  <motion.div key={feature} className="flex items-center gap-4 py-4 border-b border-zinc-800/50 last:border-0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: app.color }} />
                    <span className="text-zinc-300 text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-8 pt-0">
                <button onClick={() => setSelectedApp(null)} className="w-full py-4 rounded-xl text-xs font-black tracking-[0.3em] uppercase border border-zinc-800 text-zinc-600 hover:border-zinc-600 hover:text-white transition-all duration-300">Close</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
