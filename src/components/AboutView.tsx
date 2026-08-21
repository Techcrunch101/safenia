import React from 'react';
import { Crown, Sparkles, Heart, Shield, Leaf, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { SafeniaLogo } from './SafeniaLogo';

interface AboutViewProps {
  onShopClick: () => void;
}

const heroBottleImg = '/src/assets/images/safenia_hero_bottle_1785599770184.jpg';
const productBoxesImg = '/src/assets/images/safenia_product_boxes_1785599787566.jpg';
const silkInspoImg = '/src/assets/images/safenia_silk_inspo_1785599801373.jpg';
const serenAestheticImg = '/src/assets/images/safenia_seren_aesthetic_1785599818225.jpg';

export const AboutView: React.FC<AboutViewProps> = ({ onShopClick }) => {
  const values = [
    {
      title: 'Quality',
      description: 'Premium botanical ingredients and carefully crafted formulations without shortcuts or cheap synthetic fillers.',
      icon: Award,
    },
    {
      title: 'Integrity',
      description: 'Honesty, transparency, and uncompromising standards in every bottle we formulate and seal.',
      icon: Shield,
    },
    {
      title: 'Craftsmanship',
      description: 'Every single bottle is handmade with precision, patience, and meticulous attention to botanical synergy.',
      icon: Sparkles,
    },
    {
      title: 'Nature-Inspired',
      description: 'Harnessing the ancient and scientifically proven power of botanicals to support healthy hair and scalp naturally.',
      icon: Leaf,
    },
    {
      title: 'Empowerment',
      description: 'Celebrating every individual crown and instilling confidence through loving, intentional self-care ceremonies.',
      icon: Crown,
    },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* Editorial Hero Header */}
      <section className="relative py-20 sm:py-32 overflow-hidden border-b border-[#BF914A]/20">
        <div className="absolute inset-0 bg-radial from-[#75410A]/20 via-[#050505]/90 to-[#050505] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#111114] border border-[#BF914A]/40 text-[#D8B26F] text-xs font-bold uppercase tracking-[0.25em]">
            <Crown className="w-3.5 h-3.5 text-[#BF914A]" />
            <span>The Safenia Story</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold text-white tracking-tight leading-tight">
            Nature’s Care for Every Crown
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
            Safenia Luxury Oils is a premium handcrafted botanical hair-care brand created around healthy hair, intentional craftsmanship, and carefully selected natural ingredients.
          </p>
        </div>
      </section>

      {/* Brand Genesis & Origin Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8B26F] font-bold">
              About Safenia Luxury Oils
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
              Born from a Passion for Healthy Crowns
            </h2>
            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                Safenia Luxury Oils was born from a passion for healthy hair, intentional craftsmanship, and the belief that every crown deserves the very best care.
              </p>
              <p>
                Every bottle is made from scratch using thoughtfully selected botanical ingredients, herbs and nutrient-rich oils that nourish, protect and restore hair and scalp health naturally.
              </p>
              <p className="text-zinc-400 text-sm">
                We believe that hair care is more than a daily maintenance routine—it is a deeply restorative ceremony of self-care. From our formulation studio to your dressing table, each blend is prepared with reverence for the botanical kingdom and the beauty of natural textures.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-[#BF914A]/30 aspect-[3/4] shadow-2xl">
              <img
                src={serenAestheticImg}
                alt="Safenia Botanical Aesthetics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#BF914A]/30 aspect-[3/4] translate-y-8 shadow-2xl">
              <img
                src={heroBottleImg}
                alt="Safenia Bottle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-[#0a0a0d] border-y border-[#BF914A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Mission */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#141418] to-[#0d0d10] border border-zinc-800 hover:border-[#BF914A]/50 transition-all text-left space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#BF914A]/10 border border-[#BF914A]/30 flex items-center justify-center text-[#D8B26F]">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B26F] font-bold">
                Purpose & Commitment
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                Our Mission
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                To create luxurious, handcrafted botanical hair care products that empower people to embrace healthy, thriving hair through clean, intentional, and effective formulations.
              </p>
            </div>

            {/* Our Vision */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#141418] to-[#0d0d10] border border-zinc-800 hover:border-[#BF914A]/50 transition-all text-left space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#BF914A]/10 border border-[#BF914A]/30 flex items-center justify-center text-[#D8B26F]">
                <Crown className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B26F] font-bold">
                Aspiration & Future
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                Our Vision
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                To become a trusted luxury botanical hair care brand known for exceptional quality, authenticity, and products that deliver lasting results while celebrating every individual’s unique crown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8B26F] font-bold">
            Guiding Principles
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
            Our Values
          </h2>
          <p className="text-zinc-400 text-sm">
            The five pillars that guide every formulation, partnership, and customer experience at Safenia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0c0c0f] border border-zinc-800 hover:border-[#BF914A]/50 transition-all text-left flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#BF914A]/10 border border-[#BF914A]/30 flex items-center justify-center text-[#D8B26F] mb-4 group-hover:bg-[#BF914A] group-hover:text-black transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-serif-luxury font-bold text-white mb-2">
                    {val.title}
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Editorial CTA */}
      <section className="py-20 bg-gradient-to-b from-[#0e0e12] to-[#050505] border-t border-[#BF914A]/20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
            Experience the Safenia Ritual
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Discover handcrafted elixirs formulated with precision and botanical care for your crown.
          </p>
          <button
            onClick={onShopClick}
            className="px-8 py-4 bg-gradient-to-r from-[#75410A] via-[#BF914A] to-[#D8B26F] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          >
            <span>Explore The Collection</span>
          </button>
        </div>
      </section>
    </div>
  );
};
