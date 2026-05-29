"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadialMenu } from "@/components/RadialMenu";
import OilRigScene from "@/components/OilRigScene";
import NetworkVisualizerScene from "@/components/apps/NetworkVisualizerScene";
import StudyLabScene from "@/components/apps/StudyLabScene";
import WorkshopScene from "@/components/apps/WorkshopScene";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Apps");
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
      
      {/* === ENTRY SCREEN (Enhanced 3D Portal) === */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="entry"
            className="absolute inset-0 z-50 flex flex-col items-center justify-center cursor-pointer select-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleEnter}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Enhanced 3D radial glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[580px] h-[580px] rounded-full opacity-10" 
                   style={{ background: "radial-gradient(circle, #fb923c 0%, #38bdf8 45%, transparent 72%)" }} />
            </div>

            <motion.div 
              className="relative z-10 text-center px-6" 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-orange-400/80 text-[10px] tracking-[0.6em] font-mono mb-5">MEXP • MARINE SYSTEMS DIVISION</div>
              
              <h1 className="text-[clamp(3.4rem,12vw,9rem)] font-black leading-[0.78] tracking-[-4.2px] mb-2">
                <span className="block text-white">SEMI-SUB</span>
                <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-white bg-clip-text text-transparent">DIGITAL TWIN</span>
              </h1>

              <div className="text-[13px] text-zinc-400 tracking-[3px] font-light mb-10">INDUSTRIAL METAVERSE • 2026</div>

              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-xs tracking-[2px] text-white/70">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CLICK ANYWHERE TO ENTER THE NEXUS
              </div>
            </motion.div>

            <div className="absolute bottom-10 text-[10px] text-zinc-600 font-mono tracking-[1.5px]">
              POWERED BY LOCAL LLM + THREE.JS • RTX 3050
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

          <motion.div className="z-10 flex flex-col items-center gap-9" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center">
              <div className="text-[10px] tracking-[3.5px] text-orange-400/70 font-mono mb-1">MEXP NEXUS</div>
              <div className="text-zinc-300 font-semibold tracking-[1.5px] text-sm">COMMAND INTERFACE</div>
            </div>
            
            <RadialMenu onSelect={(id) => setSelectedApp(id)} />

            <div className="text-center text-[10px] text-zinc-500 tracking-[1.5px] font-mono">
              SELECT SYSTEM • REAL-TIME 3D TELEMETRY
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 font-mono tracking-[1.5px]">
            MEXP • KUALA LUMPUR • 2026
          </div>
        </motion.div>
      )}

      {/* === IMMERSIVE 3D LANDINGS (except OilRig which has its own) === */}
      <AnimatePresence>
        {/* Oil Rig - existing advanced scene */}
        {selectedApp === "rig" && (
          <motion.div key="oil-rig" className="absolute inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <OilRigScene />
            <button onClick={() => setSelectedApp(null)} className="absolute top-6 right-6 z-[60] px-6 py-3 border border-orange-500/50 hover:border-orange-400 text-orange-400 font-mono text-xs tracking-widest transition-all hover:bg-black/50">
              ✕ {t("return") || "RETURN TO NEXUS"}
            </button>
          </motion.div>
        )}

        {/* Network Visualizer - Three.js + GSAP */}
        {selectedApp === "network" && (
          <motion.div key="network" className="absolute inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <NetworkVisualizerScene />
            <button onClick={() => setSelectedApp(null)} className="absolute top-6 right-6 z-[60] px-6 py-3 border border-sky-500/50 hover:border-sky-400 text-sky-400 font-mono text-xs tracking-widest transition-all hover:bg-black/50">
              ✕ RETURN TO NEXUS
            </button>
          </motion.div>
        )}

        {/* Study Lab - Knowledge Graph 3D */}
        {selectedApp === "study" && (
          <motion.div key="study" className="absolute inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StudyLabScene />
            <button onClick={() => setSelectedApp(null)} className="absolute top-6 right-6 z-[60] px-6 py-3 border border-lime-500/50 hover:border-lime-400 text-lime-400 font-mono text-xs tracking-widest transition-all hover:bg-black/50">
              ✕ RETURN TO NEXUS
            </button>
          </motion.div>
        )}

        {/* Workshop - Mechanical Cinematic */}
        {selectedApp === "workshop" && (
          <motion.div key="workshop" className="absolute inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WorkshopScene />
            <button onClick={() => setSelectedApp(null)} className="absolute top-6 right-6 z-[60] px-6 py-3 border border-pink-500/50 hover:border-pink-400 text-pink-400 font-mono text-xs tracking-widest transition-all hover:bg-black/50">
              ✕ RETURN TO NEXUS
            </button>
          </motion.div>
        )}

        {/* Settings - keep as clean panel for now */}
        {selectedApp === "settings" && app && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="max-w-md w-full mx-4 p-8 border border-white/10 bg-zinc-950 rounded-2xl">
              <div className="text-white/60 text-xs tracking-[2px] mb-3">SYSTEM</div>
              <h2 className="text-4xl font-bold tracking-tighter mb-4">{app.name}</h2>
              <p className="text-zinc-400">{app.description}</p>
              <button onClick={() => setSelectedApp(null)} className="mt-8 text-xs tracking-widest border-b border-white/30 pb-1">CLOSE</button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}