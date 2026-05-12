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
    }, 5000); // Changes every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [setActiveYear, years]);

  return (
    <div className="w-full bg-background pt-8 pb-2"> {/* Minimal bottom padding */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-[#006FEE] font-mono text-xl font-bold uppercase mb-4">
          Stories Published On This Day
        </h2>

        <div className="flex overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
          <div className="inline-flex p-1 border border-gray-800 rounded-xl bg-[#111] mx-auto whitespace-nowrap">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 sm:px-10 py-3 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all duration-500
                  ${activeYear === year 
                    ? 'bg-[#006FEE] text-white shadow-[0_0_20px_rgba(0,111,238,0.5)] -translate-y-1' 
                    : 'text-gray-500 hover:text-gray-300 translate-y-0'
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}