'use client';

import React, { useState } from 'react';
import AsciiWave from '@/components/shaders/ascii-wave';

export function AsciiWaveDemo() {
  const [color, setColor] = useState('#f97316'); // Default Firecrawl Orange
  const [speed, setSpeed] = useState(1);

  const colorPresets = [
    { name: 'Flame Orange', hex: '#f97316', bg: 'bg-orange-500' },
    { name: 'Cyber Green', hex: '#10b981', bg: 'bg-emerald-500' },
    { name: 'Electric Cyan', hex: '#06b6d4', bg: 'bg-cyan-500' },
    { name: 'Neon Purple', hex: '#a855f7', bg: 'bg-purple-500' },
    { name: 'Crimson Red', hex: '#ff3366', bg: 'bg-[#ff3366]' },
    { name: 'Solar Amber', hex: '#eab308', bg: 'bg-yellow-500' },
  ];

  const speedOptions = [0.5, 1, 1.5, 2];

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] overflow-hidden bg-black/90 rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
      {/* Top Header / Interactive Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
            Ascii Wave Simulation
          </span>
        </div>

        {/* Right Controls: Color Presets & Speed */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Color Palettes */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-900/80 border border-white/10 backdrop-blur-md">
            {colorPresets.map((preset) => (
              <button
                key={preset.hex}
                onClick={() => setColor(preset.hex)}
                title={preset.name}
                className={`w-5 h-5 rounded-full ${preset.bg} transition-all duration-200 flex items-center justify-center ${
                  color === preset.hex ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-900/80 border border-white/10 backdrop-blur-md text-xs font-mono">
            {speedOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
                  speed === s ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Animated ASCII Wave */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black via-black/60 to-transparent z-10" />
        <AsciiWave className="w-full h-full opacity-90" color={color} speed={speed} />
      </div>
    </div>
  );
}

export default AsciiWaveDemo;

