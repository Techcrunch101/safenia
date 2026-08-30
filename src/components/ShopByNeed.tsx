import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SAFENIA_IMAGES } from '../assets/images';
import { SafeImage } from './SafeImage';

interface ShopByNeedProps {
  onSelectCategory: (category: string) => void;
}

export const ShopByNeed: React.FC<ShopByNeedProps> = ({ onSelectCategory }) => {
  const journeys = [
    {
      id: 'growth',
      title: 'Hair Growth',
      description: 'Targeted care for fuller, stronger lengths.',
      image: SAFENIA_IMAGES.growthAfro,
    },
    {
      id: 'locs',
      title: 'Loc Care',
      description: 'Weightless nourishment for defined, healthy locs.',
      image: SAFENIA_IMAGES.locCareGold,
    },
    {
      id: 'scalp',
      title: 'Scalp Therapy',
      description: 'Balance, comfort and a restored foundation.',
      image: SAFENIA_IMAGES.scalpPipetteSecondary,
    },
    {
      id: 'beard',
      title: 'Beard Care',
      description: 'Softness, shape and conditioned skin beneath.',
      image: SAFENIA_IMAGES.beardGrooming,
    },
  ];

  const subCollections = [
    { id: 'repair', name: 'Dry Hair Repair' },
    { id: 'protective', name: 'Protective Styles' },
    { id: 'kids', name: 'Kids Collection' },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#0B0908] border-t border-[#D4AF37]/15 text-[#F5F0E6]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-18 text-left space-y-3">
          <span className="text-[10.5px] uppercase tracking-[0.36em] font-sans-body font-semibold text-[#D4AF37] block">
            THE COLLECTION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#F5F0E6] tracking-tight">
            Shop by hair journey
          </h2>
        </div>

        {/* 4 Cards Grid Matching Reference Video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 items-stretch mb-10">
          {journeys.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className="group relative flex flex-col justify-end aspect-[4/5] sm:aspect-[3/4] lg:aspect-[3/4.2] w-full overflow-hidden bg-[#14110E] border border-[#D4AF37]/20 cursor-pointer p-6 sm:p-7 text-left transition-all duration-400 hover:border-[#D4AF37]/60"
            >
              {/* Full-Bleed Photography */}
              <SafeImage
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0908]/95 via-[#0B0908]/50 to-transparent group-hover:from-[#0B0908]/98 transition-colors duration-400" />

              {/* Text & Exploration CTA */}
              <div className="relative z-10 space-y-2 text-[#F5F0E6]">
                <h3 className="font-serif-luxury text-2xl sm:text-2xl font-normal tracking-wide text-[#F5F0E6]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#B3ACA0] font-sans-body font-light line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2 flex items-center space-x-2 text-[10px] uppercase tracking-[0.26em] font-sans-body font-semibold text-[#D4AF37] group-hover:text-white transition-colors duration-300">
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Horizontal Sub-Collection Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#D4AF37]/15 pt-6">
          {subCollections.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSelectCategory(sub.id)}
              className="py-5 px-6 bg-[#14110E]/60 border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 hover:bg-[#14110E] transition-all duration-300 flex items-center justify-between group cursor-pointer text-left"
            >
              <span className="font-serif-luxury text-lg text-[#F5F0E6] group-hover:text-[#D4AF37] transition-colors">
                {sub.name}
              </span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};


