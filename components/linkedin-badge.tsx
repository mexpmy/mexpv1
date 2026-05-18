'use client';

import { useTheme } from 'next-themes';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function LinkedInBadge() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 1. Wait for the component to mount to prevent hydration mismatch errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Force LinkedIn to re-render the badge whenever the user updates the theme toggle
  useEffect(() => {
    if (mounted && typeof window !== 'undefined' && (window as any).IN?.parse) {
      try {
        (window as any).IN.parse();
      } catch (e) {
        console.warn("LinkedIn script parsing deferred:", e);
      }
    }
  }, [resolvedTheme, mounted]);

  // Render a clean structural placeholder layout to avoid content layout shifts during initialization
  if (!mounted) {
    return <div className="h-[250px] w-full max-w-md rounded-2xl border border-white/5 bg-white/[0.02]" />;
  }

  return (
    // The key attribute forces React to rebuild this block context on dark/light mode toggle pivots
    <div key={resolvedTheme} className="w-full flex justify-center xl:justify-start">
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
          className="badge-base__link LI-simple-link text-xs text-slate-500 hover:text-emerald-400 transition-colors" 
          href="https://my.linkedin.com/in/syahmisaadon?trk=profile-badge"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </div>
      
      {/* Optimized Script Loading: 
        Loads immediately after the page becomes interactive and forces an immediate target parse
      */}
      <Script 
        src="https://platform.linkedin.com/badges/js/profile.js" 
        strategy="afterInteractive" 
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).IN?.parse) {
            (window as any).IN.parse();
          }
        }}
      />
    </div>
  );
}