"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PageWrapper } from '@/components/PageWrapper';

export default function RoadmapPage() {
  const [steps, setSteps] = useState<any[]>([]);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const posts: any[] = [];

  useEffect(() => {
    async function fetchRoadmap() {
      const { data, error } = await supabase
        .from('roadmap_steps')
        .select('*')
        .order('step_number', { ascending: true });

      if (error) {
        console.error("Error fetching roadmap items:", error);
      } else if (data) {
        setSteps(data);
      }
      setIsLoading(false);
    }
    fetchRoadmap();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 font-mono text-emerald-500">
        <span className="animate-pulse">LOADING_ROADMAP_STREAM...</span>
      </div>
    );
  }

  const activeStep = selectedStepIndex !== null ? steps[selectedStepIndex] : null;

  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-800 font-mono dark:bg-zinc-950 dark:text-zinc-300 transition-colors duration-300 overflow-x-hidden">
      {/* Radial Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      <PageWrapper className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 py-12">
        
        {/* Navigation Header */}
        <header className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-8 mb-12 w-full">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
            <span className="text-xs tracking-[0.4em] uppercase font-black text-zinc-900 dark:text-white italic">
              System.Roadmap // Modernization_Plan
            </span>
          </div>
        </header>

        {/* Dashboard Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Navigation Roadmap Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-white/5 bg-white/[0.6] dark:bg-white/[0.01] backdrop-blur-xl">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white mb-2">
                Improvement Roadmap
              </h2>
              <p className="text-xs text-zinc-500 dark:text-slate-500">
                Select an architectural upgrade node to inspect system parameters and code execution snippets.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setSelectedStepIndex(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 font-mono text-xs uppercase tracking-wider ${
                    selectedStepIndex === index
                      ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                      : 'border-zinc-200 dark:border-white/5 bg-white/[0.4] dark:bg-white/[0.01] hover:border-zinc-400 dark:hover:border-white/20'
                  }`}
                >
                  <div className="text-lg bg-zinc-100 dark:bg-zinc-900 w-8 h-8 rounded-lg flex items-center justify-center border border-zinc-200 dark:border-white/10 flex-shrink-0">
                    {step.icon}
                  </div>
                  <div className="font-bold">
                    {step.step_number}. {step.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Live Database Stories Feed Panel */}
<div className="p-6 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white/[0.6] dark:bg-white/[0.02] backdrop-blur-xl transition-colors duration-300">
  <h3 className="text-zinc-900 dark:text-white font-black mb-6 text-[11px] uppercase tracking-[0.3em] border-b border-zinc-200 dark:border-white/10 pb-4 italic">
    Terminal_Stories_Feed.log
  </h3>
  
  <div className="flex flex-col gap-6">
    
    {/* SYSTEM ROADMAP FEATURED THUMBNAIL (Fully adapts to Light/Dark themes) */}
    <a 
      href="/roadmap" 
      className="group relative block overflow-hidden border border-emerald-500/30 bg-zinc-50 dark:bg-zinc-950 p-5 rounded-none transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
    >
      {/* Scanline Overlay matching theme intensity */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-20 dark:opacity-40" />
      
      {/* Theme Adaptive Corner Accents */}
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
          className="border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/40 p-5 rounded-none relative group hover:border-emerald-500/50 transition-colors"
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="text-[10px] text-emerald-600 dark:text-emerald-500/70 mb-2 font-mono tracking-widest uppercase flex justify-between">
            <span>NODE_ENTRY: #{post.id?.substring(0, 8) || '7B7E36AB'}</span>
            <span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : '5/27/2026'}</span>
          </div>
          
          <h4 className="text-sm text-zinc-900 dark:text-zinc-100 font-bold mb-2 uppercase tracking-wide group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
            {post.title}
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">
            {post.excerpt || post.description || 'Testing out the new database connection! This is pulling live from the cloud.'}
          </p>
          
          <a 
            href={`/blog/${post.slug || post.id}`} 
            className="inline-block text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline uppercase tracking-widest font-black"
          >
            [ READ_FULL_REPORT ]
          </a>
        </article>
      ))
    ) : (
      <div className="text-zinc-400 dark:text-zinc-600 font-mono text-xs italic py-4">
        &gt; NO LOG ENTRIES FOUND IN DATABASE BUFFER.
      </div>
    )}
  </div>
</div>

          {/* Right Inspection / Terminal Details View Panel */}
          <div className="lg:col-span-7">
            {activeStep ? (
              <div className="space-y-6">
                
                {/* Problems and Solutions Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* The Problem */}
                  <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/[0.02] backdrop-blur-xl">
                    <h3 className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                      <span>⚠️</span> System_Anomaly
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-600 dark:text-slate-400">
                      {activeStep.problem}
                    </p>
                  </div>

                  {/* The Solution */}
                  <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02] backdrop-blur-xl">
                    <h3 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                      <span>✓</span> Operational_Patch
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-600 dark:text-slate-400">
                      {activeStep.solution}
                    </p>
                  </div>
                </div>

                {/* Implementation Code View (Styled like a Terminal Window) */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl relative">
                  
                  {/* Terminal Header */}
                  <div className="border-b border-zinc-900 bg-zinc-900/40 px-4 py-3 flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest">
                    <span>File_Buffer // patch_execution.ts</span>
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-zinc-800"></span>
                      <span className="w-2 h-2 rounded-full bg-zinc-800"></span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500/70"></span>
                    </div>
                  </div>

                  {/* Code Body Block */}
                  <div className="p-6 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed max-h-[400px]">
                    <pre className="whitespace-pre-wrap selection:bg-emerald-500/20">
                      <code>{activeStep.code_implementation}</code>
                    </pre>
                  </div>
                </div>

              </div>
            ) : (
              /* Initial Empty Inspection State */
              <div className="h-full min-h-[300px] border border-dashed border-zinc-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-8 text-zinc-400 dark:text-slate-600">
                <span className="text-3xl animate-bounce mb-4">←</span>
                <p className="text-xs uppercase tracking-widest">
                  Await_Instruction: Select an upgrade node to initialize execution readouts.
                </p>
              </div>
            )}
          </div>

        </div>
      </PageWrapper>
    </div>
  );
}