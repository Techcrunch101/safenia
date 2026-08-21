import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  growthAfroImg,
  locCareGoldImg,
  scalpPipetteImg,
  beardGroomingImg,
} from '../data/mockData';

interface ShopByNeedProps {
  onSelectCategory: (category: string) => void;
}

export const ShopByNeed: React.FC<ShopByNeedProps> = ({ onSelectCategory }) => {
  const mainCategories = [
    {
      id: 'growth',
      title: 'Hair Growth',
      description: 'Density rituals for fuller, stronger lengths.',
      image: growthAfroImg,
      alt: 'Safenia Hair Growth Density Rituals',
    },
    {
      id: 'loc-care',
      title: 'Loc Care',
      description: 'Weightless nourishment for defined, healthy locs.',
      image: locCareGoldImg,
      alt: 'Safenia Loc Care & Scalp Nourishment',
    },
    {
      id: 'scalp',
      title: 'Scalp Therapy',
      description: 'Balance, comfort and a restored foundation.',
      image: scalpPipetteImg,
      alt: 'Safenia Scalp Therapy Microbiome Drops',
    },
    {
      id: 'beard-care',
      title: 'Beard Care',
      description: 'Softness, shape and conditioned skin beneath.',
      image: beardGroomingImg,
      alt: 'Safenia Beard Grooming & Jawline Conditioning',
    },
  ];

  const secondaryCategories = [
    { id: 'moisture', label: 'Dry Hair Repair' },
    { id: 'strength', label: 'Protective Styles' },
    { id: 'kids', label: 'Kids Collection' },
  ];

  return (
    <section className="bg-[#050505] text-white border-y border-[#BF914A]/20">
      {/* 4-Column Luxury Editorial Grid Matching Reference 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-900/80">
        {mainCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative min-h-[480px] sm:min-h-[540px] flex flex-col justify-end p-8 sm:p-10 cursor-pointer overflow-hidden bg-black transition-all duration-500"
          >
            {/* Background Editorial Image */}
            <img
              src={cat.image}
              alt={cat.alt}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-85 group-hover:opacity-100"
            />

            {/* Dark Dramatic Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[#BF914A]/0 group-hover:bg-[#BF914A]/5 transition-colors duration-500" />

            {/* Bottom Content Floating Over Image */}
            <div className="relative z-10 space-y-3">
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-normal text-[#F8F5F0] group-hover:text-[#D8B26F] transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-xs">
                {cat.description}
              </p>
              <div className="pt-2 flex items-center space-x-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D8B26F] group-hover:text-white transition-colors">
                <span>EXPLORE</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sleek Secondary Category Strip Matching Reference 1 */}
      <div className="border-t border-zinc-900 bg-[#070709]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-900">
          {secondaryCategories.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectCategory(sec.id)}
              className="group py-6 px-8 sm:px-12 flex items-center justify-between text-left hover:bg-black/60 transition-all cursor-pointer"
            >
              <span className="text-lg sm:text-xl font-serif-luxury text-[#E5D7C0] group-hover:text-[#D8B26F] transition-colors">
                {sec.label}
              </span>
              <ArrowRight className="w-4 h-4 text-[#BF914A] group-hover:text-white transform group-hover:translate-x-2 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

