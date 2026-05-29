'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Controls from "@/components/Controls";
import { Hero } from "@/components/Hero";
import YearFilter from "@/components/YearFilter";
import { useTranslations } from 'next-intl';
import { EarthBackground } from '@/components/EarthBackground';

interface PlaceCardProps {
  year: string;
  index: number;
  title: string;
  category: string;
  image: string;
  blogHref: string;
}

const PlaceCard = ({ year, index, title, category, image, blogHref }: PlaceCardProps) => {
  return (
    <Link href={blogHref} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-2xl"
      >
        {/* Visual Layer */}
        <div className="relative aspect-video w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.08]"
            style={{ backgroundImage: `url(${image})` }}
          />
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
          
          {/* Top badge */}
          <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono tracking-[1.5px] text-white/90 border border-white/20">
            FIELD REPORT
          </div>

          {/* Bottom right tech tag */}
          <div className="absolute bottom-5 right-5 bg-[#99ff99] text-black px-3 py-0.5 font-mono text-[10px] font-bold tracking-widest rounded">
            #{category}
          </div>

          {/* Subtle scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.08)_50%)] bg-[length:100%_6px] pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="font-mono text-[11px] text-[#006FEE] tracking-[1px] mb-1.5">TECH ANALYSIS — {year}</div>
          
          <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight tracking-tighter group-hover:text-[#006FEE] transition-colors">
            {title}
          </h3>

          <div className="mt-4 flex items-center gap-3 text-xs font-mono uppercase text-zinc-400">
            <span>Syahmi Saadon</span>
            <span className="text-zinc-700">•</span>
            <span>Feb 06, {year}</span>
          </div>
        </div>

        {/* Hover accent line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#006FEE] to-[#99ff99] transition-all duration-300 group-hover:w-full" />
      </motion.div>
    </Link>
  );
};

export default function Home() {
  const [activeYear, setActiveYear] = useState('2025');
  const t = useTranslations('Index');

  // Enhanced placecards with real imagery + direct blog deep links
  const placeCards = [
    {
      year: activeYear,
      index: 0,
      title: "Offshore Digital Twin Validation",
      category: "SIMULATION",
      image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1600",
      blogHref: `/blog?year=${activeYear}&tag=simulation`,
    },
    {
      year: activeYear,
      index: 1,
      title: "AI-Augmented Asset Integrity",
      category: "ML OPS",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",
      blogHref: `/blog?year=${activeYear}&tag=ml`,
    },
  ];

  return (
    <main className="min-h-screen relative pt-16 px-4 sm:px-6">
      <EarthBackground />

      <div className="relative z-10">
        <Controls />
        <Hero />

        <YearFilter activeYear={activeYear} setActiveYear={setActiveYear} />

        <section className="px-4 sm:px-6 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8">
            {placeCards.map((card, idx) => (
              <PlaceCard
                key={idx}
                year={card.year}
                index={card.index}
                title={card.title}
                category={card.category}
                image={card.image}
                blogHref={card.blogHref}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[1.5px] text-zinc-400 hover:text-white border-b border-white/30 hover:border-white pb-0.5 transition-colors"
            >
              VIEW COMPLETE ARCHIVE →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
