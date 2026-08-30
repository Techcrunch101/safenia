import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SAFENIA_IMAGES } from '../assets/images';
import { SafeImage } from './SafeImage';

interface SafeniaRitualSectionProps {
  onShopClick?: () => void;
}

export const SafeniaRitualSection: React.FC<SafeniaRitualSectionProps> = ({ onShopClick }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeWeek, setActiveWeek] = useState<'week0' | 'week8' | 'week16'>('week16');

  const steps = [
    {
      num: '01',
      title: 'Warm & Part',
      description: 'Warm 3–5 drops of Crown Growth Oil between palms. Part into sections.',
    },
    {
      num: '02',
      title: 'Stimulate',
      description: 'Massage using firm circular fingertip motions for 3–5 minutes to encourage blood flow.',
    },
    {
      num: '03',
      title: 'Seal & Protect',
      description: 'Apply Botanical Moisture Nectar to lengths and seal under a silk bonnet overnight.',
    },
  ];

  return (
    <section id="care" className="py-24 sm:py-32 lg:py-36 bg-[#070605] text-[#F5F0E6] border-t border-[#D4AF37]/15 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Documented Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left space-y-3">
          <span className="text-[10.5px] uppercase tracking-[0.36em] font-sans-body font-semibold text-[#D4AF37] block">
            DOCUMENTED
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-normal text-[#F5F0E6] tracking-tight">
            Sixteen weeks, one regimen.
          </h2>
          <p className="text-sm sm:text-base text-[#B3ACA0] font-sans-body font-light leading-relaxed max-w-xl">
            Photographed under identical lighting, unretouched. Results vary with consistency, health and hair type — we make no promises beyond care.
          </p>
        </div>

        {/* Transformation Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Visual Transformation Display with Interactive Comparison */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-[#14110E] border border-[#D4AF37]/25 shadow-2xl group select-none">
              
              {/* After Image (Week 16) */}
              <SafeImage
                src={SAFENIA_IMAGES.darkPhilosophy}
                alt="Week 16 - Resilient, flourishing crown"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Before Image (Week 0) with clip-path based on slider */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <SafeImage
                  src={SAFENIA_IMAGES.growthAfro}
                  alt="Week 0 - Foundation start"
                  className="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[30%] contrast-[95%]"
                />
              </div>

              {/* Slider Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.8)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0B0908] border-2 border-[#D4AF37] flex items-center justify-center text-[10px] text-[#D4AF37] font-bold">
                  ↔
                </div>
              </div>

              {/* Range input overlay for smooth dragging */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
                aria-label="Before and after transformation slider"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 z-20 bg-[#0B0908]/80 backdrop-blur-md px-3 py-1 border border-[#D4AF37]/30 text-[10px] uppercase tracking-[0.2em] text-[#F5F0E6]">
                Week 0 • Baseline
              </div>
              <div className="absolute top-4 right-4 z-20 bg-[#0B0908]/80 backdrop-blur-md px-3 py-1 border border-[#D4AF37]/30 text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                Week 16 • Crown Density
              </div>
            </div>
            <p className="mt-3 text-xs text-[#B3ACA0]/80 text-center font-sans-body">
              Drag slider left or right to inspect 16-week follicle density & moisture retention
            </p>
          </div>

          {/* Right Column: 3 Ritual Pillars */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans-body font-semibold text-[#D4AF37] block">
              THE NIGHTLY CEREMONY
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F5F0E6]">
              Simple. Steady. Unhurried.
            </h3>

            <div className="space-y-6 pt-4">
              {steps.map((s) => (
                <div key={s.num} className="p-5 bg-[#14110E] border border-[#D4AF37]/15 text-left space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono text-[#D4AF37]">{s.num}</span>
                    <h4 className="font-serif-luxury text-xl text-[#F5F0E6]">{s.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#B3ACA0] font-sans-body font-light leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            {onShopClick && (
              <div className="pt-4">
                <button
                  onClick={onShopClick}
                  className="px-8 py-4 bg-[#D4AF37] text-[#0B0908] text-[11px] uppercase tracking-[0.24em] font-sans-body font-semibold hover:bg-[#F3E5AB] transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.25)] flex items-center justify-center space-x-2.5 cursor-pointer"
                >
                  <span>BEGIN YOUR REGIMEN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

