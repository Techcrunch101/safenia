import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroSectionProps {
  onShopClick: () => void;
  onAboutClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onAboutClick,
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center justify-center bg-[#070605] pt-24 sm:pt-28 pb-16 lg:pb-12 overflow-hidden">
      {/* Background Image Container with Cinematic Lighting and Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/src/assets/images/safenia_dark_hero_bg_1787788259317.jpg"
          alt="Safenia Luxury Botanical Bottle"
          className="w-full h-full object-cover object-center sm:object-right lg:object-center opacity-85 scale-105 transform animate-heroImage"
        />
        {/* Dark radial and gradient overlays to guarantee perfect text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070605] via-[#070605]/80 sm:via-[#070605]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0908] via-transparent to-[#0B0908]/70 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full h-full flex flex-col justify-center relative z-20 py-8 lg:py-16">
        <div className="max-w-2xl lg:max-w-3xl text-left">
          
          {/* 1. Small Eyebrow Label */}
          <div className="animate-heroText flex items-center space-x-3 mb-4 sm:mb-6">
            <span className="h-[1px] w-6 bg-[#D4AF37]/60" />
            <span className="text-[10px] sm:text-[11.5px] uppercase tracking-[0.38em] font-sans-body font-semibold text-[#D4AF37]">
              BOTANICAL HAIRCARE • EST. MODERN AFRICAN LUXURY
            </span>
          </div>

          {/* 2. Main Headline (Editorial Serif Display) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-serif-luxury font-normal text-[#F5F0E6] leading-[1.04] tracking-tight mb-6 sm:mb-8">
            <span className="block">
              Nature’s Care for
            </span>
            <span className="block font-serif-luxury italic text-[#D4AF37] font-normal mt-1">
              Every Crown.
            </span>
          </h1>

          {/* 3. Supporting Editorial Copy */}
          <div className="space-y-3 max-w-xl mb-8 sm:mb-10 text-sm sm:text-base text-[#D9CCB8]/90 font-sans-body font-light leading-relaxed animate-heroSub">
            <p>
              Luxury botanical formulations created to nourish every crown—from natural hair and protective styles to locs, braids, curls, coils, beards, and healthy scalps.
            </p>
            <p className="text-xs sm:text-sm text-[#B3ACA0]">
              Crafted using carefully selected botanical oils and backed by modern formulation standards, every bottle is designed to support stronger, healthier, more resilient hair.
            </p>
          </div>

          {/* 4. Tactile Premium CTAs */}
          <div className="animate-heroCta flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
            <button
              onClick={onShopClick}
              className="px-8 py-4 bg-[#D4AF37] text-[#0B0908] text-[11px] uppercase tracking-[0.26em] font-sans-body font-semibold hover:bg-[#F3E5AB] transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.3)] flex items-center justify-center space-x-2.5 cursor-pointer group"
            >
              <span>{t('hero_cta_shop', 'SHOP COLLECTION')}</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <button
              onClick={onAboutClick}
              className="px-7 py-4 border border-[#D4AF37]/50 text-[#F5F0E6] text-[11px] uppercase tracking-[0.26em] font-sans-body font-medium hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <span>DISCOVER THE RITUAL</span>
            </button>
          </div>

          {/* Subtle Editorial Assurance Divider */}
          <div className="mt-12 pt-6 border-t border-[#D4AF37]/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10.5px] uppercase tracking-[0.24em] text-[#B3ACA0] font-sans-body">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Pure Cold-Pressed</span>
            </span>
            <span className="text-[#D4AF37]/40">•</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Zero Fillers</span>
            </span>
            <span className="text-[#D4AF37]/40">•</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Handcrafted Small Batch</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};


