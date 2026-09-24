'use client';

import React from 'react';
import type { YearCommittee } from '@/types/committee';

interface YearSelectorProps {
  years: YearCommittee[];
  selectedYear: string;
  onSelectYear: (year: string) => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  years,
  selectedYear,
  onSelectYear,
}) => {
  return (
    <div className="flex justify-center items-center my-6">
      <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
        {years.map((y) => {
          const isSelected = y.year === selectedYear;
          return (
            <button
              key={y.year}
              type="button"
              onClick={() => onSelectYear(y.year)}
              className={`px-5 py-2 text-xs sm:text-sm rounded-full transition-all duration-300 font-medium tracking-wide ${
                isSelected
                  ? 'bg-gradient-to-r from-[#bc0034] to-[#ef3b67] text-white shadow-[0_0_20px_rgba(188,0,52,0.4)]'
                  : 'text-tertiary hover:text-primary hover:bg-white/5'
              }`}
            >
              {y.label}
              {y.status === 'teaser' && (
                <span className="ml-2 text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default YearSelector;
