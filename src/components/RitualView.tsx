import React from 'react';
import { ArrowRight } from 'lucide-react';

interface RitualViewProps {
  onShopClick: () => void;
}

export const RitualView: React.FC<RitualViewProps> = ({ onShopClick }) => {
  return (
    <div className="bg-transparent text-[#17130F] min-h-screen pt-28 pb-32">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#17130F]/08 gap-6">
          <div className="text-left space-y-3">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.34em] font-semibold text-[#56604A] block">
              MINDFUL CROWN CARE
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-normal text-[#17130F] tracking-tight leading-[0.98]">
              THE SAFENIA CROWN METHOD
            </h1>
          </div>
          <p className="text-base text-[#56604A]/90 font-sans-body font-light max-w-md text-left md:text-right leading-relaxed">
            A 3-step intentional method designed to transform daily hair care into a restorative botanical practice.
          </p>
        </div>
      </section>

      {/* Method Deep-Dive */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-24">
        {/* Step 1: Nourish */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-[#17130F]/08">
          <div className="lg:col-span-6 text-left space-y-5">
            <div className="flex items-center space-x-3">
              <span className="font-serif-luxury text-4xl text-[#56604A]">01</span>
              <span className="text-[10px] font-sans-body uppercase tracking-[0.3em] font-semibold text-[#7A746B]">
                ROOT STIMULATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#17130F]">
              Awaken with Intention
            </h2>
            <p className="text-base text-[#56604A]/90 font-sans-body font-light leading-relaxed">
              Warm 3 to 5 drops of Safenia Crown Growth Hair Oil in the palms of your hands. Breathe in the grounding botanical aroma of rosemary, peppermint, and castor.
            </p>
            <p className="text-base text-[#56604A]/90 font-sans-body font-light leading-relaxed">
              Using the pads of your fingertips, massage your scalp in circular, upward motions for 3–5 minutes. This stimulates blood circulation, bringing essential nutrients directly to follicle roots.
            </p>
            <div className="pt-2 text-xs uppercase tracking-[0.2em] font-sans-body font-semibold text-[#56604A]">
              Recommended Cadence: 3–4 times per week
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden bg-[#D9CCB8]/40 shadow-[0_15px_40px_-10px_rgba(23,19,15,0.08)]">
              <img
                src="/src/assets/images/safenia_loc_care_gold_1787295319757.jpg"
                alt="Scalp Massage Care"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Restore */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-[#17130F]/08">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden bg-[#D9CCB8]/40 shadow-[0_15px_40px_-10px_rgba(23,19,15,0.08)]">
              <img
                src="/src/assets/images/safenia_rose_infusion_1787295593809.jpg"
                alt="Botanical Moisture Nectar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 text-left space-y-5">
            <div className="flex items-center space-x-3">
              <span className="font-serif-luxury text-4xl text-[#56604A]">02</span>
              <span className="text-[10px] font-sans-body uppercase tracking-[0.3em] font-semibold text-[#7A746B]">
                MOISTURE SEALING
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#17130F]">
              Lock in Hydration
            </h2>
            <p className="text-base text-[#56604A]/90 font-sans-body font-light leading-relaxed">
              After applying water or your preferred leave-in conditioner, dispense 2–4 drops of Botanical Moisture Nectar. Smooth down the hair shaft from mid-lengths to fragile ends.
            </p>
            <p className="text-base text-[#56604A]/90 font-sans-body font-light leading-relaxed">
              Our cold-pressed jojoba and sweet almond formulation forms a lightweight lipid shield that seals the outer cuticle, locking hydration within each strand.
            </p>
            <div className="pt-2 text-xs uppercase tracking-[0.2em] font-sans-body font-semibold text-[#56604A]">
              Recommended Cadence: On damp or freshly washed hair
            </div>
          </div>
        </div>

        {/* Step 3: Protect */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-[#17130F]/08">
          <div className="lg:col-span-6 text-left space-y-5">
            <div className="flex items-center space-x-3">
              <span className="font-serif-luxury text-4xl text-[#56604A]">03</span>
              <span className="text-[10px] font-sans-body uppercase tracking-[0.3em] font-semibold text-[#7A746B]">
                NIGHTTIME DEFENSE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#17130F]">
              Shield with Pure Silk
            </h2>
            <p className="text-base text-[#56604A]/90 font-sans-body font-light leading-relaxed">
              Cotton pillowcases absorb natural oils and create friction that causes frizz, shedding, and edge damage. Protect your crown overnight with our 100% Grade 6A Pure Mulberry Silk Bonnet.
            </p>
            <p className="text-base text-[#56604A]/90 font-sans-body font-light leading-relaxed">
              The gentle, friction-free surface maintains moisture balance and preserves locs, braids, coils, and blowouts effortlessly while you sleep.
            </p>
            <div className="pt-2 text-xs uppercase tracking-[0.2em] font-sans-body font-semibold text-[#56604A]">
              Recommended Cadence: Every evening
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden bg-[#D9CCB8]/40 shadow-[0_15px_40px_-10px_rgba(23,19,15,0.08)]">
              <img
                src="/src/assets/images/safenia_growth_afro_1787295304984.jpg"
                alt="Silk Crown Protection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-12 sm:p-16 bg-[#17130F] text-[#F5F0E6] text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F5F0E6]">
              Complete Your Crown Care Collection
            </h3>
            <p className="text-sm text-[#D9CCB8]/90 font-sans-body font-light max-w-lg">
              Explore the full range of handcrafted oils and mulberry silk accessories designed to honor every crown.
            </p>
          </div>
          <button
            onClick={onShopClick}
            className="px-8 py-4 bg-[#F5F0E6] text-[#17130F] text-xs font-semibold uppercase tracking-[0.24em] font-sans-body hover:bg-[#B79B6B] hover:text-[#17130F] transition-colors cursor-pointer shrink-0"
          >
            SHOP THE CROWN CARE SET
          </button>
        </div>
      </section>
    </div>
  );
};
