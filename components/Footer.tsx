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
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-y-10 gap-x-12">
          
          {/* Brand + Logo - Customized for better visual weight */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="MExp Logo" 
                className="h-9 w-auto sm:h-10 md:h-11 flex-shrink-0" 
              />
              <span className="font-mono text-lg tracking-[3px] text-white/80">MEXP</span>
            </div>
            
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Precision systems for the physical world.<br />
              Built in Malaysia with Itqan.
            </p>
          </div>

          {/* Legal + Secondary Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-3 text-sm text-zinc-400">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <NextLink
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </NextLink>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-[11px] font-mono tracking-[0.08em] text-zinc-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-2 gap-y-1">
            <div>© {currentYear} Syahmi Saadon — MExp. All rights reserved.</div>
            <div className="hidden sm:block text-zinc-700">•</div>
            <div>Engineered with intention in Kuala Lumpur.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
