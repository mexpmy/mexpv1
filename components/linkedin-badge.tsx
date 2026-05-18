'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';

export default function LinkedInBadge() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Wait for component mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Clear old script elements and re-inject pristine scripts on theme change
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    // Remove any previously appended LinkedIn scripts to clean memory space
    const existingScript = document.getElementById('linkedin-profile-js');
    if (existingScript) {
      existingScript.remove();
    }

    // Create a fresh script tag instance manually
    const script = document.createElement('script');
    script.id = 'linkedin-profile-js';
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;

    // If LinkedIn's engine is already running globally, execute an immediate re-parse
    script.onload = () => {
      if ((window as any).IN?.parse) {
        (window as any).IN.parse();
      }
    };

    document.body.appendChild(script);

    // If the script was already cached, kick off an immediate parsing cycle
    if ((window as any).IN?.parse) {
      (window as any).IN.parse();
    }

  }, [resolvedTheme, mounted]);

  if (!mounted) {
    return <div className="h-[280px] w-full max-w-md rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-100/50 dark:bg-white/[0.02]" />;
  }

  return (
    // Re-introducing a targeted dynamic key to force a clean, unrendered DOM snapshot for the script hook
    <div 
      key={`${resolvedTheme}-badge`} 
      ref={containerRef} 
      className="w-full flex justify-center xl:justify-start my-4 min-h-[280px]"
    >
      <div 
        className="badge-base LI-profile-badge" 
        data-locale="en_US" 
        data-size="large" 
        data-theme={resolvedTheme === 'dark' ? 'dark' : 'light'} 
        data-type="HORIZONTAL" 
        data-vanity="syahmisaadon" 
        data-version="v1"
      >
        <a 
          className="badge-base__link LI-simple-link text-xs text-zinc-400 dark:text-slate-500 hover:text-emerald-500 transition-colors" 
          href="https://my.linkedin.com/in/syahmisaadon?trk=profile-badge"
          target="_blank"
          rel="noopener noreferrer"
        >
          Syahmi Saadon
        </a>
      </div>
    </div>
  );
}