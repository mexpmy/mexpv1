'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Beaker, Anchor, Settings, Wrench, X, Globe, Shield, Zap, Database, FileText, Cpu, FlaskConical, PenTool, Layers, Box, Terminal, User, Bell, Sliders } from 'lucide-react';

const menuItems = [
  { 
    id: 'network', 
    label: 'Network', 
    icon: <Activity className="w-5 h-5" />, 
    color: '#38bdf8',
    gridItems: [
      { label: 'Status', icon: <Globe className="w-4 h-4" /> },
      { label: 'Security', icon: <Shield className="w-4 h-4" /> },
      { label: 'Traffic', icon: <Zap className="w-4 h-4" /> },
      { label: 'Nodes', icon: <Database className="w-4 h-4" /> },
    ]
  },
  { 
    id: 'study', 
    label: 'Study Lab', 
    icon: <Beaker className="w-5 h-5" />, 
    color: '#a3e635',
    gridItems: [
      { label: 'History', icon: <FileText className="w-4 h-4" /> },
      { label: 'Analysis', icon: <Cpu className="w-4 h-4" /> },
      { label: 'Research', icon: <FlaskConical className="w-4 h-4" /> },
      { label: 'Projects', icon: <Box className="w-4 h-4" /> },
    ]
  },
  { 
    id: 'rig', 
    label: 'Oil Rig', 
    icon: <Anchor className="w-5 h-5" />, 
    color: '#fb923c',
    gridItems: [
      { label: 'Simulation', icon: <Terminal className="w-4 h-4" /> },
      { label: 'Telemetry', icon: <Activity className="w-4 h-4" /> },
      { label: 'Control', icon: <Sliders className="w-4 h-4" /> },
      { label: 'Logs', icon: <Layers className="w-4 h-4" /> },
    ]
  },
  { 
    id: 'workshop', 
    label: 'Workshop', 
    icon: <Wrench className="w-5 h-5" />, 
    color: '#f472b6',
    gridItems: [
      { label: 'Tools', icon: <PenTool className="w-4 h-4" /> },
      { label: 'Blueprints', icon: <Layers className="w-4 h-4" /> },
      { label: 'Inventory', icon: <Box className="w-4 h-4" /> },
      { label: 'Builders', icon: <Cpu className="w-4 h-4" /> },
    ]
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: <Settings className="w-5 h-5" />, 
    color: '#94a3b8',
    gridItems: [
      { label: 'Profile', icon: <User className="w-4 h-4" /> },
      { label: 'Notify', icon: <Bell className="w-4 h-4" /> },
      { label: 'Display', icon: <Sliders className="w-4 h-4" /> },
      { label: 'Advanced', icon: <Terminal className="w-4 h-4" /> },
    ]
  },
];

export const RadialMenu = ({ onSelect }: { onSelect?: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(menuItems[0]);
  const [expandedItem, setExpandedItem] = useState<typeof menuItems[0] | null>(null);

  const radius = 90;

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* Center Toggle Button */}
      {!expandedItem && (
        <motion.button
          layoutId="menu-container"
          className="z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)] bg-zinc-950 border-2 border-zinc-800 text-white overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            key={active.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-center"
            style={{ color: active.color }}
          >
            {active.icon}
          </motion.div>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && !expandedItem && (
          <>
            {menuItems.map((item, index) => {
              const angle = (index * (360 / menuItems.length) - 90) * (Math.PI / 180);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.button
                  key={item.id}
                  layoutId={`item-${item.id}`}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ x, y, opacity: 1, scale: 1 }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30, 
                    delay: index * 0.05 
                  }}
                  className="absolute z-40 flex flex-col items-center group"
                  onClick={() => {
                    setActive(item);
                    setExpandedItem(item); onSelect?.(item.id);
                  }}
                >
                  <div 
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 shadow-xl transition-all group-hover:scale-110 group-hover:border-zinc-600"
                    style={{ 
                        color: item.color,
                        boxShadow: active.id === item.id ? `0 0 15px ${item.color}44` : ''
                    }}
                  >
                    {item.icon}
                  </div>
                  <motion.span 
                    className="absolute -bottom-6 whitespace-nowrap text-[10px] font-black text-zinc-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              );
            })}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-zinc-950/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedItem && (
          <motion.div
            layoutId={`item-${expandedItem.id}`}
            className="absolute z-[60] w-64 h-64 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-4 flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div style={{ color: expandedItem.color }}>{expandedItem.icon}</div>
                <span className="text-xs font-black uppercase tracking-wider text-zinc-200">
                  {expandedItem.label}
                </span>
              </div>
              <button 
                onClick={() => setExpandedItem(null)}
                className="p-1 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 p-3 flex-1">
              {expandedItem.gridItems.map((gridItem, idx) => (
                <motion.button
                  key={gridItem.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-colors group"
                >
                  <div className="text-zinc-400 group-hover:text-white transition-colors mb-1">
                    {gridItem.icon}
                  </div>
                  <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300">
                    {gridItem.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
