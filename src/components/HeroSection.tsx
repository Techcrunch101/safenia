import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Droplet, Crown } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onDiscoverClick: () => void;
}

const heroEmeraldImg = '/src/assets/images/safenia_emerald_botanical_hero_1787295575998.jpg';
const heroBottleImg = '/src/assets/images/safenia_hero_bottle_1785599770184.jpg';

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick, onDiscoverClick }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#050505] text-white">
      {/* Cinematic Dark Background Atmosphere with Golden Micro Aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#050505] to-[#040404] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-[#BF914A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-[32rem] h-[32rem] bg-[#75410A]/15 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Floating Gold Spec Particles */}
      <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#BF914A]/60 blur-[0.5px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-[#D8B26F]/40 blur-[1px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/2 w-1 h-1 rounded-full bg-[#F3E5C8]/50 blur-[0.5px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
          {/* Slogan Title Matching Reference 3 */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif-luxury font-normal tracking-tight text-white leading-[1.08]">
            Nature's Care for{' '}
            <span className="font-serif-luxury italic text-[#D8B26F] block sm:inline font-normal">
              Every Crown.
            </span>
          </h1>

          {/* Two Structured Explanatory Paragraphs Matching Reference 3 */}
          <div className="space-y-4 max-w-2xl mx-auto lg:mx-0 text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
            <p>
              Luxury botanical formulations created to nourish every crown—from natural hair and protective styles to locs, braids, curls, coils, beards, and healthy scalps.
            </p>
            <p className="text-sm sm:text-base text-zinc-400">
              Crafted using carefully selected botanical oils and backed by modern formulation standards, every bottle is designed to support stronger, healthier, more resilient hair.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onShopClick}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#75410A] via-[#BF914A] to-[#D8B26F] hover:from-[#9E6924] hover:to-[#F3E5C8] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={onDiscoverClick}
              className="w-full sm:w-auto px-8 py-4 bg-black/60 hover:bg-[#BF914A]/20 text-[#F3E5C8] border border-[#BF914A]/40 font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer backdrop-blur-md"
            >
              <span>Discover Ingredients</span>
            </button>
          </div>

          {/* 4 Micro Trust Badges */}
          <div className="pt-8 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-zinc-400">
            <div className="flex items-center space-x-2 justify-center lg:justify-start">
              <Droplet className="w-4 h-4 text-[#BF914A] shrink-0" />
              <span>100% Cold-Pressed</span>
            </div>
            <div className="flex items-center space-x-2 justify-center lg:justify-start">
              <ShieldCheck className="w-4 h-4 text-[#BF914A] shrink-0" />
              <span>Zero Build-Up</span>
            </div>
            <div className="flex items-center space-x-2 justify-center lg:justify-start">
              <Sparkles className="w-4 h-4 text-[#BF914A] shrink-0" />
              <span>GMP Certified</span>
            </div>
            <div className="flex items-center space-x-2 justify-center lg:justify-start">
              <Crown className="w-4 h-4 text-[#BF914A] shrink-0" />
              <span>For Every Crown</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Dropper Artwork with Gold Foil Accent */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-[#BF914A]/40 shadow-2xl bg-black group">
            <img
              src={heroEmeraldImg}
              alt="Safenia Growth Oil Dropper Bottle with Hibiscus, Amla, Castor and Rosemary"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

            {/* Floating Product Callout */}
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-gold rounded-2xl border border-[#BF914A]/40 shadow-xl flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#D8B26F] font-bold">
                  Flagship Formulation
                </div>
                <div className="font-serif-luxury text-base font-bold text-white">
                  Safenia Growth Oil (50ml)
                </div>
                <div className="text-[11px] text-zinc-300">Red Hibiscus · Rosemary · Amla · Castor</div>
              </div>
              <button
                onClick={onShopClick}
                className="px-3.5 py-2 bg-[#BF914A] hover:bg-[#D8B26F] text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

