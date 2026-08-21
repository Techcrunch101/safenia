import React, { useState } from 'react';
import { Sparkles, Calendar, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export const Transformations: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section id="transformations" className="py-24 bg-[#050505] relative border-t border-[#75410A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8B26F] font-semibold">
            Authentic Clinical Progress
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
            Crown Transformations
          </h2>
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Real progress from verified Safenia clients. Drag the slider to compare 90 days of consistent Crown Growth Elixir usage along hairline edges and scalp crowns.
          </p>
        </div>

        {/* Interactive Before & After Comparison Slider */}
        <div className="max-w-3xl mx-auto glass-gold p-4 sm:p-8 rounded-3xl border border-[#BF914A]/30 shadow-2xl">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none">
            {/* After Image (Full Base) */}
            <img
              src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80"
              alt="90 Days After Safenia Growth Elixir"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#BF914A]/40 text-xs text-[#D8B26F] font-bold uppercase tracking-wider">
              Day 90: Restored Density & Sheen
            </div>

            {/* Before Image (Clipped by slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
                alt="Day 1 Before Safenia Growth Elixir"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%' }}
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs text-white font-bold uppercase tracking-wider">
                Day 1: Thinning Temple Edges
              </div>
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#BF914A] shadow-[0_0_15px_#BF914A] cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#BF914A] border-2 border-black flex items-center justify-center text-black shadow-lg">
                <div className="flex items-center -space-x-1">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Range Input Overlay */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-400 gap-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#BF914A]" />
              <span>Routine: 4 drops Crown Growth Elixir applied 3x weekly</span>
            </div>
            <div className="flex items-center space-x-2 text-[#D8B26F] font-semibold">
              <CheckCircle className="w-4 h-4 text-[#BF914A]" />
              <span>Verified Customer Case Study #892</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
