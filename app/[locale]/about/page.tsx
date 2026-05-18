"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const projects = [
  {
    id: "01",
    title: "AI, ML & Data Science",
    category: "Predictive Maintenance & Operations Analytics",
    year: "Mar 19, 2026",
    tags: ["Product", "Design System", "Development"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    color: "bg-[#F2F2F2] dark:bg-zinc-900", 
    textColor: "text-black dark:text-zinc-100"
  },
  {
    id: "02",
    title: "Piping, Blasting & Painting, Mechanical & HVAC",
    category: "Heavy Industrial Infrastructure & Asset Integrity",
    year: "Mar 2, 2026",
    tags: ["AI", "Mobile App", "Brand"],
    // Clean, high-impact asset shots for Data Centers & Offshore Semi-Submersible Oil Rigs
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070", // Industrial enterprise server farm / data center corridor
    color: "bg-[#EBEBEB] dark:bg-[#1f1f23]", 
    textColor: "text-black dark:text-zinc-100"
  },
  {
    id: "03",
    title: "Nexus Control System Pulse",
    category: "Critical Environment Automation & Proptech 0 -> 1",
    year: "Jan 2, 2025",
    tags: ["Niche-Trend", "Web App", "UI/UX"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070",
    color: "bg-[#E0E0E0] dark:bg-[#18181b]", 
    textColor: "text-black dark:text-zinc-100"
  },
  {
    id: "04",
    title: "Finance",
    category: "Enterprise Fintech & Quant Strategy Platforms",
    year: "Dec 15, 2024",
    tags: ["Consulting", "Enterprise", "Strategy"],
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2070",
    color: "bg-[#D6D6D6] dark:bg-[#0f0f11]", 
    textColor: "text-black dark:text-zinc-100"
  }

];
const ProjectCard = ({ 
  project, 
  index, 
  progress, 
  targetScale 
}: { 
  project: typeof projects[0], 
  index: number, 
  progress: MotionValue<number>,
  targetScale: number
}) => {
  const container = useRef(null);
  const start = (index + 1) * (1 / projects.length);
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ 
          scale,
          top: `calc(5vh + ${index * 40}px)` 
        }} 
        className={cn(
          "relative h-[75vh] w-full max-w-7xl mx-auto rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row transition-colors duration-300",
          project.color,
          project.textColor
        )}
      >
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-sm opacity-50 uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{project.id} / Selected Works</span>
              <span className="font-mono text-sm opacity-50 text-zinc-500 dark:text-zinc-400">{project.year}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-zinc-900 dark:text-white">{project.title}</h2>
            <p className="text-lg md:text-xl opacity-70 mb-8 max-w-md text-zinc-600 dark:text-zinc-400">{project.category}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <Chip key={tag} variant="flat" size="sm" className="bg-black/5 dark:bg-white/10 text-current border-none font-medium">
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
          
          <button className="w-fit px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform active:scale-95">
            View Project
          </button>
        </div>
        
        <div className="flex-1 relative overflow-hidden h-1/2 md:h-full group">
          <Image
            removeWrapper
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={project.image}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default function AboutPage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <div className="relative min-h-screen bg-white text-black dark:bg-zinc-950 dark:text-white transition-colors duration-300">
      
      {/* Background Dot Grid Matrix Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none text-zinc-900 dark:text-white"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
          {/* "Hey there" staggered greeting — Nudge Folio style */}
          <div className="mb-10 overflow-hidden">
            <motion.p
              className="font-mono text-sm uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Creative Portfolio 2026
            </motion.p>
            <div className="flex flex-wrap gap-x-[0.05em] overflow-hidden">
              {"assalamualaikum, & hi!.".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-[13vw] md:text-[10vw] font-bold tracking-tighter leading-none text-black dark:text-white"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.05 + i * 0.04,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <motion.p
              className="mt-4 text-zinc-400 dark:text-zinc-500 font-mono text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              I&apos;m Syahmi — Engineer &amp; Builder
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.1] text-zinc-900 dark:text-slate-300">
              A specialized digital laboratory where engineering precision meets creative exploration. Architecting high-performance web experiences.
            </p>
            
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              <div>
                <p className="text-black dark:text-white font-black mb-3 italic">Location</p>
                <p>Johor, MY</p>
              </div>
              <div>
                <p className="text-black dark:text-white font-black mb-3 italic">Focus</p>
                <p>Mechanical, Piping, Blasting & Painting, HVAC, AI, ML & Data Science</p>
              </div>
              <div>
                <p className="text-emerald-600 dark:text-emerald-400 font-black mb-3 italic">Current Status</p>
                <p>Available for Hire</p>
              </div>
              <div>
                <p className="text-black dark:text-white font-black mb-3 italic">Contact</p>
                <p>syahmi@mymexp.com</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Featured Works Section - CRITICAL FIX HERE */}
        <section ref={container} className="relative px-6 md:px-12 lg:px-24">
          <div className="flex justify-between items-end mb-24">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-4 block">Portfolio</span>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white">FEATURED WORKS</h2>
            </div>
            <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500 hidden md:block italic tracking-widest">↓ SCROLL TO EXPLORE</p>
          </div>
          
          {/* This wrapper container holds the scrolling animation cards track.
            It must NOT have overflow hidden, and needs to be positioned relatively.
          */}
          <div className="relative">
            {projects.map((project, i) => {
              const targetScale = 1 - ((projects.length - i) * 0.05);
              return (
                <ProjectCard 
                  key={project.id} 
                  index={i} 
                  project={project} 
                  progress={scrollYProgress} 
                  targetScale={targetScale}
                />
              );
            })}
          </div>
        </section>

        {/* Footer / Contact Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-8 block">Start a conversation</span>
            <h2 className="text-7xl md:text-[12vw] font-bold tracking-tighter leading-[0.8] mb-16 text-zinc-900 dark:text-white">
              LET&apos;S CREATE<br />THE FUTURE
            </h2>
            <a 
              href="mailto:syahmi@mymexp.com" 
              className="group relative inline-block text-2xl md:text-5xl font-medium text-zinc-900 dark:text-white"
            >
              <span>syahmi@mymexp.com</span>
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-black dark:bg-white transition-all duration-500 group-hover:w-full" />
            </a>
          </motion.div>
        </section>
        
        {/* Extra bottom padding scroll buffer to complete the final card animation track */}
        <div className="h-[40vh]" /> 
      </div>
    </div>
  );
}