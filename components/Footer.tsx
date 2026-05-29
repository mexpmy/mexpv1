"use client";

import React from "react";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Imprint", href: "/imprint" },
    { label: "Security", href: "/security" },
  ];

  return (
    <footer className="relative z-20 border-t border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-8 gap-x-12">
          
          {/* Brand Block: Mission text + Logo side by side */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 max-w-2xl">
            <p className="text-sm text-zinc-400 leading-relaxed">
              Precision systems for the physical world. <br className="hidden md:block" />
              Built in Malaysia with Itqan.
            </p>

            {/* Bigger Logo placed right next to the text */}
            <img 
              src="/logo.png" 
              alt="MExp Logo" 
              className="h-14 sm:h-16 md:h-20 w-auto flex-shrink-0" 
            />
          </div>

          {/* Legal Links - right aligned on desktop */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400 md:justify-end md:items-center">
            {legalLinks.map((link) => (
              <NextLink
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </NextLink>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 md:mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center gap-2 md:gap-3 text-[11px] font-mono tracking-[0.08em] text-zinc-500">
          <div>© {currentYear} Syahmi Saadon — MExp. All rights reserved.</div>
          <div className="hidden md:block text-zinc-700">•</div>
          <div>Engineered with intention in Kuala Lumpur.</div>
        </div>
      </div>
    </footer>
  );
}
