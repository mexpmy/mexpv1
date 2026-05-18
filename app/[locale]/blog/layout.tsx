import React from 'react';
import Script from 'next/script'; // 1. Import the Next.js script loader

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 2. Load the LinkedIn script globally for all blog pages */}
      <Script 
        src="https://platform.linkedin.com/badges/js/profile.js" 
        strategy="afterInteractive" 
      />
      
      {/* 3. Render children cleanly inside your section layout wrapper */}
      <section className="flex flex-col w-full">
        {children}
      </section>
    </>
  );
}