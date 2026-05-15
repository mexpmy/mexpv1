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
    title: "Meridian Health",
    category: "Healthcare / Workflow Design",
    year: "Mar 19, 2026",
    tags: ["Product", "Design System", "Development"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070",
    color: "bg-[#F2F2F2]",
    textColor: "text-black"
  },
  {
    id: "02",
    title: "StyleBook",
    category: "SaaS / Transformation",
    year: "Mar 2, 2026",
    tags: ["AI", "Mobile App", "Brand"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070",
    color: "bg-[#EBEBEB]",
    textColor: "text-black"
  },
  {
    id: "03",
    title: "Homestead",
    category: "Proptech / 0 -> 1",
    year: "Jan 2, 2025",
    tags: ["Real Estate", "Web App", "UI/UX"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1973",
    color: "bg-[#E0E0E0]",
    textColor: "text-black"
  },
  {
    id: "04",
    title: "North Light",
    category: "Strategy / Enterprise",
    year: "Dec 15, 2024",
    tags: ["Consulting", "Enterprise", "Strategy"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
    color: "bg-[#D6D6D6]",
    textColor: "text-black"
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
  
  // Each card starts scaling down only after its "active" period
  // Active period for card i is roughly [i/total, (i+1)/total]
  const start = (index + 1) * (1 / projects.length);
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ 
          scale,
          top: `calc(5vh + ${index * 40}px)` // Visible "tabs" effect
        }} 
        className={cn(
          "relative h-[75vh] w-full max-w-7xl mx-auto rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row",
          project.color,
          project.textColor
        )}
      >
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-sm opacity-50 uppercase tracking-widest">{project.id} / Selected Works</span>
              <span className="font-mono text-sm opacity-50">{project.year}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">{project.title}</h2>
            <p className="text-lg md:text-xl opacity-70 mb-8 max-w-md">{project.category}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <Chip key={tag} variant="flat" size="sm" className="bg-black/5 border-none font-medium">
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
          
          <button className="w-fit px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform active:scale-95">
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
    <main className="bg-white text-black">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        {/* "Hey there" staggered greeting — Nudge Folio style */}
        <div className="mb-10 overflow-hidden">
          <motion.p
            className="font-mono text-sm uppercase tracking-[0.3em] text-zinc-400 mb-6"
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
                className="inline-block text-[13vw] md:text-[10vw] font-bold tracking-tighter leading-none text-black"
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
            className="mt-4 text-zinc-400 font-mono text-sm tracking-widest uppercase"
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
          <p className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.1] text-zinc-900">
            A specialized digital laboratory where engineering precision meets creative exploration. Architecting high-performance web experiences.
          </p>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
            <div>
              <p className="text-black font-black mb-3 italic">Location</p>
              <p>Johor, MY</p>
            </div>
            <div>
              <p className="text-black font-black mb-3 italic">Focus</p>
              <p>Full-Stack / AI</p>
            </div>
            <div>
              <p className="text-black font-black mb-3 italic">Current Status</p>
              <p>Available for Hire</p>
            </div>
            <div>
              <p className="text-black font-black mb-3 italic">Contact</p>
              <p>syahmi@mymexp.com</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Works Section */}
      <section ref={container} className="relative px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-end mb-24">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 mb-4 block">Portfolio</span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">FEATURED WORKS</h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 hidden md:block italic tracking-widest">↓ SCROLL TO EXPLORE</p>
        </div>
        
        <div className="relative">
          {projects.map((project, i) => {
            const targetScale = 1 - ( (projects.length - i) * 0.05);
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
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-zinc-400 mb-8 block">Start a conversation</span>
          <h2 className="text-7xl md:text-[12vw] font-bold tracking-tighter leading-[0.8] mb-16">
            LET&apos;S CREATE<br />THE FUTURE
          </h2>
          <a 
            href="mailto:syahmi@mexp.dev" 
            className="group relative inline-block text-2xl md:text-5xl font-medium"
          >
            <span>syahmi@mymexp.com</span>
            <div className="absolute -bottom-2 left-0 w-0 h-1 bg-black transition-all duration-500 group-hover:w-full" />
          </a>
        </motion.div>
      </section>
      
      {/* Scroll indicator for the works section */}
      <div className="h-[20vh]" /> 
    </main>
  );
}
