"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadialMenu } from "@/components/RadialMenu";
import OilRigScene from "@/components/OilRigScene";

const appDetails: Record<string, {
  name: string;
  version: string;
  status: string;
  description: string;
  color: string;
  stack: string[];
  features: string[];
}> = {
  network: { name: "Network Visualizer", version: "v1.2.0", status: "Active", description: "Real-time network topology visualization and monitoring...", color: "#38bdf8", stack: ["Python", "PyQt6", "WebSocket", "pyqtgraph"], features: ["Live node mapping", "Traffic analysis", "Security alerts", "Connection logs"] },
  study: { name: "Study Lab", version: "v0.9.0", status: "Active", description: "AI-powered study and research dashboard...", color: "#a3e635", stack: ["Python", "Tkinter", "REST API", "Agents"], features: ["Agent controller", "Motion commands", "Activity log", "Server state"] },
  rig: { 
    name: "Oil Rig", 
    version: "v0.4.0", 
    status: "In Development", 
    description: "Industrial simulation and telemetry platform for oil rig operations. Digital Twin with real-time visualization.", 
    color: "#fb923c", 
    stack: ["Three.js", "GSAP", "React Three Fiber", "Post-processing"], 
    features: ["Interactive Digital Twin", "Pulsing Beacons", "Selective Bloom", "Scroll Navigation"] 
  },
  workshop: { name: "Moto Spec", version: "v1.0.0", status: "Active", description: "Cinematic motorcycle specification showcase...", color: "#f472b6", stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"], features: ["Bike specs", "Spec comparison", "Cinematic UI"] },
  settings: { name: "Settings", version: "v1.0.0", status: "System", description: "Global configuration hub...", color: "#94a3b8", stack: ["Next.js", "Config", "Auth"], features: ["Profile settings", "Notifications"] },
};

export default function AppsPage() {
  const [entered, setEntered] = useState(false);
  const [entering, setEntering] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const handleEnter = () => {
    setEntering(true);
    setTimeout(() => {
      setEntered(true);
      setEntering(false);
    }, 800);
  };

  const app = selectedApp ? appDetails[selectedApp as keyof typeof appDetails] : null;

  return (
    <div className="relative w-full h-screen bg-zinc-950 overflow-hidden">
      
      {/* === ENTRY SCREEN === */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="entry"
            className="absolute inset-0 z-50 flex flex-col items-center justify-center cursor-pointer select-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleEnter}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[520px] h-[520px] rounded-full opacity-10" 
                   style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }} />
            </div>

            <motion.div className="relative z-10 text-center px-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-cyan-400 text-[11px] tracking-[0.5em] font-mono mb-6">MEXP CONSTRUCTION • AI INFRASTRUCTURE</div>
              
              <h1 className="text-[clamp(3.2rem,11vw,8.5rem)] font-black leading-[0.82] tracking-tighter mb-4">
                <span className="block text-white">SEMI-SUB</span>
                <span className="block bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">DIGITAL TWIN</span>
              </h1>

              <div className="w-px h-16 bg-gradient-to-b from-transparent via-zinc-700 to-transparent mx-auto mb-8" />

              <motion.div 
                className="text-sm tracking-[0.4em] uppercase text-zinc-400 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
              >
                CLICK TO INITIALIZE SCAN
              </motion.div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 text-xs font-mono tracking-widest">
              POWERED BY LOCAL LLM • RTX 3050
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flash Effect */}
      <AnimatePresence>
        {entering && (
          <motion.div
            key="flash"
            className="absolute inset-0 z-40 bg-zinc-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.7 }}
          />
        )}
      </AnimatePresence>

      {/* === NEXUS COMMAND MENU === */}
      {entered && !selectedApp && (
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full opacity-5" style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }} />
          </div>

          <motion.div className="z-10 flex flex-col items-center gap-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-zinc-600 font-black tracking-[0.3em] uppercase text-sm">NEXUS COMMAND</h1>
            <RadialMenu onSelect={(id) => setSelectedApp(id)} />
            <p className="text-zinc-700 text-xs tracking-widest uppercase font-medium">Select a system to explore</p>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-700 text-[10px] font-mono tracking-widest">
            POWERED BY MEXP · 2026
          </div>
        </motion.div>
      )}

      {/* === OIL RIG FULLSCREEN === */}
      <AnimatePresence>
        {selectedApp === "rig" && (
          <motion.div
            key="oil-rig"
            className="absolute inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <OilRigScene />
            
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-6 right-6 z-[60] px-6 py-3 border border-orange-500/50 hover:border-orange-400 text-orange-400 font-mono text-xs tracking-widest transition-all hover:bg-black/50"
            >
              ✕ RETURN TO NEXUS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MODAL FOR OTHER APPS === */}
      <AnimatePresence>
        {app && selectedApp !== "rig" && (
          <>
            <motion.div className="absolute inset-0 z-30 bg-black/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedApp(null)} />
            
            <motion.div className="absolute inset-y-0 right-0 z-40 w-full max-w-md overflow-y-auto" 
              style={{ backgroundColor: "#09090b", borderLeft: `1px solid ${app.color}30` }} 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Your existing modal content */}
              <div className="h-[2px] w-full" style={{ backgroundColor: app.color }} />
              {/* ... rest of your modal code ... */}
              {/* (Keep your full modal JSX here) */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}