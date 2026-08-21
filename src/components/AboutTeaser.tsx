import React from 'react';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import {
  growthAfroImg,
  locCareGoldImg,
  scalpPipetteImg,
  beardGroomingImg,
  productBoxesImg,
} from '../data/mockData';

interface AboutTeaserProps {
  onStoryClick: () => void;
}

const warmHeroImg = '/src/assets/images/safenia_seren_warm_hero_1787295590207.jpg';

export const AboutTeaser: React.FC<AboutTeaserProps> = ({ onStoryClick }) => {
  return (
    <section className="bg-[#050505] text-white border-t border-[#BF914A]/20">
      {/* 1. Sérën-Inspired Editorial Header Banner */}
      <div className="relative min-h-[420px] sm:min-h-[480px] flex items-center overflow-hidden bg-[#0c0c0e]">
        <img
          src={warmHeroImg}
          alt="Safenia Botanical Haircare Rituals"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent sm:w-2/3" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-md bg-white/95 backdrop-blur-md text-zinc-900 p-8 sm:p-10 rounded-2xl shadow-2xl border border-[#BF914A]/30">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E6924] font-bold block mb-2">
              The Botanical Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-normal text-zinc-950 leading-snug">
              Reveal Your Crown's Natural Radiance
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-light mt-3 leading-relaxed">
              Discover the purity of Safenia botanical haircare. Formulated with the finest cold-pressed African seed oils, active herbs, and nutrient-dense botanicals.
            </p>
            <div className="mt-6 pt-4 border-t border-zinc-200">
              <button
                onClick={onStoryClick}
                className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-zinc-900 hover:text-[#9E6924] transition-colors cursor-pointer"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. "Our Stories" Clean Minimalist Split Section */}
      <div className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D8B26F] font-bold block mb-2">
              Brand Genesis
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif-luxury text-white font-normal">
              Our Stories
            </h3>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              We believe in the restorative power of nature. Our journey began with a passion to create hair and scalp formulations that are not only profoundly effective, but also gentle, pure, and deeply honoring of your crown.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Every Safenia product is crafted in small micro-lots with love, using cold-pressed Egyptian black seed, Jamaican black castor, Moroccan argan, rosemary, and hibiscus calyx to ensure the highest bio-potency and long-lasting scalp health.
            </p>
            <div className="pt-2">
              <button
                onClick={onStoryClick}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#D8B26F] hover:text-white transition-colors cursor-pointer"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 4-Photo Minimalist Ritual Gallery (Matching Sérën 4-Panel Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        {[
          { img: growthAfroImg, title: 'Density & Growth', tag: 'Micro-Steam Infusion' },
          { img: locCareGoldImg, title: 'Loc Nourishment', tag: 'Zero Buildup' },
          { img: scalpPipetteImg, title: 'Scalp Balance', tag: 'Microbiome Dropper' },
          { img: beardGroomingImg, title: 'Velvet Grooming', tag: 'Coarse Hair Softness' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-zinc-800 bg-black cursor-pointer"
          >
            <img
              src={item.img}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <span className="text-[9px] uppercase tracking-widest text-[#D8B26F] font-bold block">
                {item.tag}
              </span>
              <h4 className="text-sm sm:text-base font-serif-luxury text-white mt-0.5">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Elegant Minimalist Testimonial Card */}
      <div className="border-t border-zinc-900 bg-[#08080a] py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className="flex justify-center space-x-1 text-[#BF914A]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <blockquote className="text-lg sm:text-xl font-serif-luxury italic text-[#F3E5C8] leading-relaxed">
            “Safenia Growth Oil has transformed my crown. My edges are flourishing, my scalp tension is gone, and my locs stay nourished without any lint or residue.”
          </blockquote>
          <div className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold">
            Dr. Amina K. · Verified Crown Ritualist
          </div>
        </div>
      </div>
    </section>
  );
};
