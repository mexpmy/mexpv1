'use client';

import React, { useEffect } from 'react';

interface YearFilterProps {
  activeYear: string;
  setActiveYear: React.Dispatch<React.SetStateAction<string>>;
}

export default function YearFilter({ activeYear, setActiveYear }: YearFilterProps) {
  const years = ['2025', '2024', '2023', '2022', '2021', '2019'];

  // Auto-transition logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveYear((current: string) => {
        const currentIndex = years.indexOf(current);
        const nextIndex = (currentIndex + 1) % years.length;
        return years[nextIndex];
      });
    }, 5200);

    return () => clearInterval(interval);
  }, [setActiveYear]);

  return (
    <div className="w-full bg-background pt-8 pb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-[#006FEE] font-mono text-[13px] sm:text-base font-bold uppercase tracking-[0.08em] mb-4">
          Stories Published On This Day
        </h2>

        {/* Mobile-safe horizontal scroller with better touch + no overflow */}
        <div className="flex overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 year-filter-scroll">
          <div className="inline-flex p-1 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md mx-auto whitespace-nowrap gap-1 shadow-inner">
            {years.map((year) => {
              const isActive = activeYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`
                    px-5 sm:px-8 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold tracking-widest
                    transition-all duration-200 active:scale-[0.985]
                    ${isActive 
                      ? 'bg-[#006FEE] text-white shadow-[0_0_18px_rgba(0,111,238,0.45)]' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                    }
                  `}
                  aria-pressed={isActive}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
