import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Heart, Crown } from 'lucide-react';
import { Logo } from './Logo';
import { SAFENIA_IMAGES } from '../assets/images';
import { SafeImage } from './SafeImage';

interface AboutViewProps {
  onShopClick: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onShopClick }) => {
  const coreValues = [
    {
      icon: <Leaf className="w-5 h-5 text-[#56604A]" />,
      title: 'Quality',
      description: 'We are committed to using premium botanical ingredients and carefully crafted formulations.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#56604A]" />,
      title: 'Integrity',
      description: 'Every product is made with honesty, transparency, and without compromising on quality.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#B79B6B]" />,
      title: 'Craftsmanship',
      description: 'Each bottle is handmade with precision, passion, and attention to detail.',
    },
    {
      icon: <Leaf className="w-5 h-5 text-[#56604A]" />,
      title: 'Nature-Inspired',
      description: 'We harness the power of botanicals to support healthy hair and scalp naturally.',
    },
    {
      icon: <Crown className="w-5 h-5 text-[#B79B6B]" />,
      title: 'Empowerment',
      description: 'We believe confidence begins with healthy hair, and every crown deserves intentional care.',
    },
  ];

  return (
    <div className="bg-transparent text-[#17130F] min-h-screen pt-28 pb-32">
      {/* Editorial Header */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-20 sm:mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#17130F]/08 gap-6">
          <div className="text-left space-y-3">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.34em] font-semibold text-[#56604A] block">
              HERITAGE & CRAFTSMANSHIP
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-normal text-[#17130F] tracking-tight leading-[0.98]">
              THE SAFENIA STORY
            </h1>
          </div>
          <p className="text-base text-[#56604A]/90 font-sans-body font-light max-w-md text-left md:text-right leading-relaxed">
            Nature’s care for every crown. Formulated with purpose, handcrafted with passion.
          </p>
        </div>
      </section>

      {/* Main Magazine Layout: Big Photography + Exact Brand Story */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-28 sm:space-y-36">
        {/* Story Section 1: The Origin & Handcrafted Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 text-left space-y-6">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.32em] text-[#56604A] font-semibold block">
              OUR ORIGIN & PASSION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#17130F] leading-tight">
              Crafted from Passion,
              <br />
              <span className="italic text-[#56604A]">Formulated with Purpose.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#56604A]/90 font-sans-body font-light leading-relaxed">
              Safenia Luxury Oils was born from a passion for healthy hair, intentional craftsmanship, and the belief that every crown deserves the very best care. What began as a vision to create high-quality botanical hair oils has grown into a luxury hair care brand dedicated to nourishing both the scalp and hair through carefully handcrafted formulations.
            </p>
            <p className="text-base text-[#56604A]/90 font-sans-body font-light leading-relaxed">
              Every bottle is made from scratch using thoughtfully selected botanical ingredients, herbs, and nutrient-rich oils. We believe that healthy hair starts with a healthy scalp, which is why each formula is created with purpose—to strengthen, nourish, restore moisture, promote growth, and enhance your hair’s natural beauty.
            </p>
            <div className="pt-4 border-t border-[#17130F]/08 font-serif-luxury italic text-xl sm:text-2xl text-[#17130F]">
              "Where luxury meets nature and every drop is formulated to help your crown flourish."
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="aspect-[4/5] w-full overflow-hidden bg-[#D9CCB8]/40 shadow-[0_15px_40px_-10px_rgba(23,19,15,0.08)]">
              <SafeImage
                src={SAFENIA_IMAGES.serenAesthetic}
                alt="Safenia Botanical Hair Care Craftsmanship"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* The Master Safenia Black & Gold Seal */}
            <Logo variant="card" />
          </div>
        </div>

        {/* Mission & Vision: 2 Large Editorial Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-16 border-t border-[#17130F]/08 text-left">
          {/* Mission Panel */}
          <div className="space-y-5 p-8 sm:p-12 bg-[#D9CCB8]/20 border border-[#17130F]/08 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.32em] text-[#56604A] font-semibold block">
                OUR MISSION
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif-luxury text-[#17130F]">
                Empowering Healthy, Thriving Hair
              </h3>
              <p className="text-sm sm:text-base text-[#56604A]/90 font-sans-body font-light leading-relaxed">
                To create luxurious, handcrafted botanical hair care products that empower people to embrace healthy, thriving hair through clean, intentional, and effective formulations.
              </p>
            </div>
            <div className="pt-6 border-t border-[#17130F]/08 text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#7A746B]">
              CLEAN • INTENTIONAL • EFFECTIVE
            </div>
          </div>

          {/* Vision Panel */}
          <div className="space-y-5 p-8 sm:p-12 bg-[#30382D] text-[#F5F0E6] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.32em] text-[#B79B6B] font-semibold block">
                OUR VISION
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif-luxury text-[#F5F0E6]">
                The Trusted Standard in Luxury Botanical Care
              </h3>
              <p className="text-sm sm:text-base text-[#D9CCB8]/90 font-sans-body font-light leading-relaxed">
                To become a trusted luxury botanical hair care brand known for exceptional quality, authenticity, and products that deliver lasting results while celebrating every individual’s unique crown.
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#B79B6B]">
              CELEBRATING EVERY INDIVIDUAL’S UNIQUE CROWN
            </div>
          </div>
        </div>

        {/* Our Core Values (5 Distinctive Pillars) */}
        <div className="pt-16 border-t border-[#17130F]/08 text-left">
          <div className="mb-14 space-y-3">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.34em] text-[#56604A] font-semibold block">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury text-[#17130F] tracking-tight">
              OUR CORE VALUES
            </h2>
            <p className="text-sm text-[#56604A]/90 font-sans-body font-light max-w-xl">
              At Safenia Luxury Oils, we don’t believe in shortcuts or unnecessary fillers. Every bottle reflects these unwavering commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val) => (
              <div
                key={val.title}
                className="p-8 border border-[#17130F]/08 bg-[#F5F0E6] hover:bg-[#D9CCB8]/20 transition-all duration-300 space-y-4 text-left group"
              >
                <div className="p-2 w-fit bg-[#D9CCB8]/30">{val.icon}</div>
                <h3 className="font-serif-luxury text-2xl text-[#17130F] group-hover:text-[#56604A] transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#56604A]/90 font-sans-body font-light leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}

            {/* Final Value Highlight Box */}
            <div className="p-8 bg-[#56604A] text-[#F5F0E6] space-y-4 text-left md:col-span-2 lg:col-span-1 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-sans-body uppercase tracking-[0.28em] text-[#B79B6B] font-semibold block">
                  PURPOSEFUL FORMULATION
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#F5F0E6]">
                  No Shortcuts. No Fillers.
                </h3>
                <p className="text-xs sm:text-sm text-[#D9CCB8] font-sans-body font-light leading-relaxed">
                  We believe in creating products with purpose where luxury meets nature and every drop is formulated to help your crown flourish.
                </p>
              </div>
              <div className="pt-4 border-t border-white/20 text-[10px] font-sans-body uppercase tracking-[0.2em] text-[#B79B6B]">
                100% PURE BOTANICAL EXCELLENCE
              </div>
            </div>
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="pt-16 border-t border-[#17130F]/08 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#17130F]">
              Experience Handcrafted Crown Care
            </h3>
            <p className="text-sm text-[#56604A]/90 font-sans-body font-light">
              Explore our small-batch botanical formulations today.
            </p>
          </div>
          <button
            onClick={onShopClick}
            className="px-8 py-4 bg-[#17130F] text-[#F5F0E6] text-xs font-semibold uppercase tracking-[0.24em] font-sans-body hover:bg-[#30382D] transition-colors flex items-center space-x-2 cursor-pointer shadow-sm"
          >
            <span>SHOP THE COLLECTION</span>
            <ArrowRight className="w-4 h-4 text-[#B79B6B]" />
          </button>
        </div>
      </section>
    </div>
  );
};
