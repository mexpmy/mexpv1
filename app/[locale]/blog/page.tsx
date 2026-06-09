"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import EngineeringDataViz from '@/components/EngineeringDataViz';
import { PageWrapper } from '@/components/PageWrapper';
import LinkedInBadge from '@/components/linkedin-badge';
import { createClient } from '@/lib/supabase-browser';

const RetroTerminal = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const index = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let repeatTimer: NodeJS.Timeout;

    const startTyping = () => {
      setDisplayedText("");
      index.current = 0;

      const typingInterval = setInterval(() => {
        if (index.current < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index.current));
          index.current++;
        } else {
          clearInterval(typingInterval);
          repeatTimer = setTimeout(startTyping, 5000);
        }
      }, 30);
    };

    startTyping();

    return () => clearTimeout(repeatTimer);
  }, [isVisible, text]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-zinc-950 p-8 font-mono text-emerald-500 border border-emerald-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)] my-8 rounded-xl transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] bg-[length:100%_2px,3px_100%]" />

      <pre className="relative z-20 whitespace-pre-wrap [text-shadow:0_0_8px_rgba(51,255,51,0.4)] leading-relaxed text-sm">
        {displayedText}
        <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse ml-1 align-middle" />
      </pre>
    </div>
  );
};

export default function BlogPage() {
  const t = useTranslations('Blog');
  const supabase = createClient();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);

  // Dynamic recommended articles from actual posts (with high-quality fallback)
  const imagePool = [
    "https://picsum.photos/id/1015/400/240",
    "https://picsum.photos/id/160/400/240",
    "https://picsum.photos/id/201/400/240",
    "https://picsum.photos/id/29/400/240",
    "https://picsum.photos/id/251/400/240",
    "https://picsum.photos/id/180/400/240",
  ];

  const recommendedArticles = useMemo(() => {
    if (posts.length > 0) {
      const shuffled = [...posts].sort((a, b) => (a.id || "").localeCompare(b.id || "")).slice(0, 4);
      return shuffled.map((post, index) => ({
        id: post.id || String(index),
        title: post.title || "Untitled Entry",
        author: post.author || "Syahmi Saadon",
        readTime: post.read_time || `${Math.max(6, Math.floor((post.excerpt?.length || 300) / 40))} min`,
        image: post.image || imagePool[index % imagePool.length],
        href: post.href || `/blog/${post.slug || post.id || ""}`,
        postId: post.id,
      }));
    }

    // Fallback
    return [
      { id: "fb1", title: "Building Reliable Digital Twins for Offshore Platforms", author: "Syahmi Saadon", readTime: "14 min", image: imagePool[0], href: "/roadmap", postId: null },
      { id: "fb2", title: "The Architecture of Secure AI Agents in Industrial Systems", author: "Syahmi Saadon", readTime: "11 min", image: imagePool[1], href: "/blog", postId: null },
      { id: "fb3", title: "From Mechanical Engineering to Data-Driven Systems", author: "Syahmi Saadon", readTime: "9 min", image: imagePool[2], href: "/portfolio", postId: null },
      { id: "fb4", title: "Why Most Digital Transformation Projects Fail in Heavy Industry", author: "Syahmi Saadon", readTime: "16 min", image: imagePool[3], href: "/blog", postId: null },
    ];
  }, [posts]);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`Error fetching posts: [${error.code || 'STATUS_ERR'}] ${error.message || 'Unknown network anomaly'}`);
        if (error.details) console.error(`Details: ${error.details}`);
      } else if (data) {
        setPosts(data);
      }
      setIsLoading(false);
    }

    fetchPosts();
  }, []);

  // Load saved articles from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mexp_saved_articles');
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, []);

  // Toggle save for later (persists in localStorage)
  const toggleSave = (articleId: string) => {
    const newSaved = savedArticles.includes(articleId)
      ? savedArticles.filter(id => id !== articleId)
      : [...savedArticles, articleId];

    setSavedArticles(newSaved);
    localStorage.setItem('mexp_saved_articles', JSON.stringify(newSaved));
  };
  
  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-800 font-mono selection:bg-emerald-500/20 dark:bg-zinc-950 dark:text-zinc-300 transition-colors duration-300 overflow-x-hidden">

      {/* Grid Pattern Background */}
      <div className="fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      <PageWrapper className="relative z-10 max-w-[1400px] md:px-16 pb-12 mx-auto">

        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-8 mb-16 w-full">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
            <span className="text-xs tracking-[0.4em] uppercase font-black text-zinc-900 dark:text-white italic">System.Status // Online</span>
          </div>
          <div suppressHydrationWarning className="hidden md:block text-[10px] text-zinc-400 dark:text-slate-500 tabular-nums tracking-[0.2em] uppercase">
            Node_ID: D5IXU // DATA_STREAM_ACTIVE
          </div>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20">

          {/* Left Column: Main Focused Content */}
          <div className="xl:col-span-8">
            <section className="space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-500 text-[10px] uppercase font-bold tracking-[0.3em]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Historical_Archive_001
                </div>
                <h1 className="text-5xl md:text-[6.5rem] font-black text-zinc-900 dark:text-white tracking-tighter leading-[0.85] uppercase">
                  The Source Code <br /> of the Web
                </h1>
                <p className="text-zinc-500 dark:text-slate-400 text-xl md:text-3xl font-light leading-snug max-w-2xl">
                  Deconstructing the 1990 Hypertext Project foundations.
                </p>
              </div>
              
              <div className="mt-4 text-zinc-400 dark:text-slate-500 font-mono text-sm md:text-base uppercase tracking-wider">
                by Syahmi Saadon <br />
                Universiti Teknologi Malaysia
              </div>

              <article className="prose prose-zinc dark:prose-invert max-w-none border-t border-zinc-200 dark:border-white/10 pt-16">
                <div className="text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-slate-300 space-y-8">
                  <p>
                    {t.rich('intro', {
                      bold: (chunks) => <strong className="text-zinc-900 dark:text-white font-bold">{chunks}</strong>,
                      link: (chunks) => (
                        <a 
                          href="https://line-mode.cern.ch/www/hypertext/WWW/TheProject.html" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="underline text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
                        >
                          {chunks}
                        </a>
                      )
                    })}
                  </p>

                  <RetroTerminal text="Welcome to the CERN Line Mode Browser simulation. This is how the web began: simple, textual, and revolutionary." />

                  {/* Component Integration */}
                  <div className="py-4">
                    <EngineeringDataViz />
                  </div>

                  <p className="text-zinc-500 dark:text-slate-400 border-l-2 border-zinc-300 dark:border-white/10 pl-8 py-4 italic">
                    "{t('philosophy')}"
                  </p>
                </div>
              </article>
            </section>
          </div>

          {/* Right Column: Sidebar Terminal Stream */}
          <aside className="xl:col-span-4 space-y-10">

            {/* The Hack Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500/30 to-transparent rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-[#050914] p-8 rounded-2xl border border-zinc-200 dark:border-red-500/20 shadow-xl dark:shadow-2xl transition-colors duration-300">
                <div className="flex items-center gap-3 text-red-600 dark:text-red-500 mb-6 font-black text-[10px] uppercase tracking-[0.2em]">
                  <span className="p-2 bg-red-500/10 rounded-md">!</span>
                  {t('securityTitle')}
                </div>
                <h3 className="text-zinc-900 dark:text-white font-bold mb-4 text-xl tracking-tight">
                  {t('securitySubtitle')}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-slate-500">
                  "{t('securityBody')}"
                </p>
              </div>
            </div>

            {/* Live Database Stories Feed Panel */}
            <div className="p-6 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white/[0.6] dark:bg-white/[0.02] backdrop-blur-xl transition-colors duration-300">
              <h3 className="text-zinc-900 dark:text-white font-black mb-6 text-[11px] uppercase tracking-[0.3em] border-b border-zinc-200 dark:border-white/10 pb-4 italic">
                Terminal_Stories_Feed.log
              </h3>
              
              <div className="flex flex-col gap-6">
                
                {/* SYSTEM ROADMAP FEATURED THUMBNAIL */}
                <a 
                  href="/roadmap" 
                  className="group relative block overflow-hidden border border-emerald-500/30 bg-zinc-50 dark:bg-zinc-950 p-5 rounded-none transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                >
                  <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-20 dark:opacity-40" />
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.2em] text-emerald-600 dark:text-emerald-400/80 mb-2 uppercase">
                      <span>⚡ CRITICAL_PATCH_MATRIX</span>
                      <span className="animate-pulse text-emerald-600 dark:text-emerald-400 font-bold">● ACTIVE</span>
                    </div>
                    
                    <h4 className="text-sm font-black tracking-wide text-zinc-900 dark:text-white uppercase mb-1 [text-shadow:0_0_6px_rgba(16,185,129,0.2)] dark:[text-shadow:0_0_6px_rgba(51,255,51,0.3)]">
                      System Modernization Roadmap
                    </h4>
                    
                    <p className="text-[11px] font-mono leading-relaxed text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors mb-3">
                      Interactive layout analysis, internationalization matrices, and localized SEO blueprints.
                    </p>
                    
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black tracking-widest uppercase flex items-center gap-1">
                      <span>[ EXECUTE_INSPECTION_READOUT ]</span>
                      <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </a>

                <div className="border-t border-dashed border-zinc-200 dark:border-white/5 my-1" />

                {/* Database-Driven Dynamic Stories Logs */}
                {isLoading ? (
                  <div className="text-emerald-600 dark:text-emerald-500 animate-pulse font-mono text-xs tracking-wider py-4">
                    &gt; INITIALIZING DATABANKS... FETCHING LOGS...
                  </div>
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <article 
                      key={post.id} 
                      className="border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/40 rounded-none relative group hover:border-emerald-500/50 transition-colors overflow-hidden flex flex-col"
                    >
                      {/* Corner Brackets */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
                      
                      {/* Data-Feed Thumbnail */}
                      {post.image && (
                        <div className="relative w-full h-28 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-950">
                          {/* Retro Scanline Overlay */}
                          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-50 group-hover:opacity-20 transition-opacity" />
                          
                          {/* Emerald Tint Filter */}
                          <div className="absolute inset-0 bg-emerald-900/30 mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                          
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          />
                        </div>
                      )}

                      {/* Text Content Block */}
                      <div className="p-5">
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-500/70 mb-3 font-mono tracking-widest uppercase flex justify-between items-center">
                          <span>NODE_ENTRY: #{post.id?.substring(0, 8) || '7B7E36AB'}</span>
                          <span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : '6/9/2026'}</span>
                        </div>
                        
                        <h4 className="text-sm text-zinc-900 dark:text-zinc-100 font-bold mb-2 uppercase tracking-wide group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors leading-snug">
                          {post.title}
                        </h4>
                        
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
                          {post.excerpt || post.description || 'Live cloud-delivered database stream output verified.'}
                        </p>
                        
                        <a 
                          href={`/blog/${post.slug || post.id}`} 
                          className="inline-block text-[10px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors uppercase tracking-widest font-black"
                        >
                          [ READ_FULL_REPORT ]
                        </a>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-zinc-400 dark:text-zinc-600 font-mono text-xs italic py-4">
                    &gt; NO LOG ENTRIES FOUND IN DATABASE BUFFER.
                  </div>
                )}
              </div>
            </div>
            
            {/* LinkedIn Profile Badge */}
            <LinkedInBadge />

            {/* Research Progress Data */}
            <div className="p-8 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white/[0.6] dark:bg-white/[0.02] backdrop-blur-xl transition-colors duration-300">
              <h3 className="text-zinc-900 dark:text-white font-black mb-8 text-[11px] uppercase tracking-[0.3em] border-b border-zinc-200 dark:border-white/10 pb-4 italic">Active_Research.bin</h3>
              <ul className="space-y-8">
                {[
                  { label: 'Neural Networks', status: '82%', color: 'bg-emerald-500' },
                  { label: 'Mech Analysis', status: 'Applied', color: 'bg-blue-500' },
                  { label: 'Data Science', status: 'Learning', color: 'bg-purple-500' }
                ].map((item) => (
                  <li key={item.label} className="flex flex-col gap-3">
                    <div className="flex justify-between text-[11px] uppercase font-bold tracking-widest">
                      <span className="text-zinc-400 dark:text-slate-500">{item.label}</span>
                      <span className="text-zinc-900 dark:text-white">{item.status}</span>
                    </div>
                    <div className="w-full h-[1px] bg-zinc-200 dark:bg-white/10 relative">
                      <div className={`h-full ${item.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} style={{ width: item.status === '82%' ? '82%' : '100%' }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </main>

        {/* --- NEW RECOMMENDED ARTICLES SECTION --- */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-32 pt-16 border-t border-zinc-200 dark:border-white/10"
        >
          <div className="flex flex-col gap-1 mb-10">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-emerald-600 dark:text-emerald-400 text-xs tracking-[3px] font-mono uppercase">END OF TRANSMISSION</span>
            </div>
            <h3 className="text-3xl font-semibold tracking-tight mt-2 text-zinc-900 dark:text-white">Thanks for reading.</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-md">
              If this exploration resonated, here are a few other pieces from the archive that continue the conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedArticles.map((article, index) => (
              <motion.a
                key={article.id}
                href={article.href}
                className="group block overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-300 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-[160px] object-cover transition-transform duration-700 group-hover:scale-[1.05]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />
                  <div className="absolute bottom-3 right-3 text-[10px] px-2.5 py-0.5 rounded bg-black/70 text-cyan-400 font-mono tracking-widest backdrop-blur-sm">
                    {article.readTime}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className="font-semibold text-base leading-snug tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 flex-1">
                      {article.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSave(article.id);
                      }}
                      className="mt-0.5 text-xl leading-none text-zinc-400 hover:text-emerald-500 transition-colors"
                      aria-label={savedArticles.includes(article.id) ? "Remove from saved" : "Save for later"}
                    >
                      {savedArticles.includes(article.id) ? "♥" : "♡"}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-4">
                    <span>{article.author}</span>
                    <span className="text-emerald-600 dark:text-emerald-400/70 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 font-medium transition-colors uppercase tracking-wider text-[10px]">Read more →</span>
                  </div>
                  {savedArticles.includes(article.id) && (
                    <div className="text-[10px] text-emerald-500 mt-2 tracking-widest font-bold">SAVED FOR LATER</div>
                  )}
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <a 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 text-xs tracking-widest font-mono uppercase transition-colors rounded-lg"
            >
              BROWSE ALL ARCHIVES
            </a>
          </div>
        </motion.section>

        {/* Footer Accent */}
        <footer className="mt-32 pt-12 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 dark:text-slate-300">
            <a href="#" className="hover:text-emerald-500 transition-colors">GitHub</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">LinkedIn</a>
          </div>
          <div className="text-[10px] text-zinc-400 dark:text-slate-500 font-mono uppercase tracking-[0.1em]">
            &lt;/&gt; Built for MExp by Syahmi Saadon 
          </div>
        </footer>

      </PageWrapper>
    </div>
  );
}