import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Logo } from './Logo';

interface AboutTeaserProps {
  onAboutClick: () => void;
}

export const AboutTeaser: React.FC<AboutTeaserProps> = ({ onAboutClick }) => {
  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#0B0908] border-t border-[#D4AF37]/15 text-[#F5F0E6] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/05 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Brand Philosophy: Editorial Split Matching Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left: Glowing Portrait */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full overflow-hidden bg-[#14110E] border border-[#D4AF37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <img
                src="/src/assets/images/safenia_dark_philosophy_1787788278268.jpg"
                alt="Safenia Philosophy - Intentional Botanical Crown Care"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0908]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right: Philosophy Storytelling & Stats */}
          <div className="lg:col-span-7 text-left space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="text-[10.5px] uppercase tracking-[0.36em] font-sans-body font-semibold text-[#D4AF37] block">
                OUR PHILOSOPHY
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-normal text-[#F5F0E6] leading-[1.05] tracking-tight">
                Luxury begins with
                <br />
                <span className="italic font-serif-luxury text-[#D4AF37]">
                  intention.
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-base sm:text-lg text-[#D9CCB8]/90 font-sans-body font-light leading-relaxed max-w-2xl">
              <p>
                Safenia is composed slowly. Each oil is chosen for a specific function — circulation, sealing, elasticity, calm — then measured against modern formulation standards so that beauty and evidence hold the same weight.
              </p>
              <p className="text-sm sm:text-base text-[#B3ACA0]">
                We source from growers we know, blend in small batches, and bottle in UV-protective glass. Nothing is added for spectacle. What remains is a care practice that respects your hair, your time, and the earth it came from.
              </p>
            </div>

            {/* 3 Pillars / Quality Certifications Grid */}
            <div className="pt-6 border-t border-[#D4AF37]/15 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.24em] font-sans-body font-bold text-[#D4AF37] block">
                  SMALL BATCH
                </span>
                <p className="text-xs text-[#B3ACA0]">
                  Composed in limited runs
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.24em] font-sans-body font-bold text-[#D4AF37] block">
                  COLD PRESSED
                </span>
                <p className="text-xs text-[#B3ACA0]">
                  Cold-pressed carrier oils
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.24em] font-sans-body font-bold text-[#D4AF37] block">
                  CRUELTY FREE
                </span>
                <p className="text-xs text-[#B3ACA0]">
                  Never tested on animals
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onAboutClick}
                className="inline-flex items-center space-x-3 text-[11px] uppercase tracking-[0.26em] font-sans-body font-semibold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors duration-300 cursor-pointer group"
              >
                <span>READ OUR FULL STORY</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

