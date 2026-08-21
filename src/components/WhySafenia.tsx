import React from 'react';
import { Sparkles, Leaf, Target, Crown } from 'lucide-react';

export const WhySafenia: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Handcrafted',
      description: 'Every bottle is made from scratch with intention and artisanal precision.',
    },
    {
      icon: Leaf,
      title: 'Botanical',
      description: 'Thoughtfully selected cold-pressed herbs, seeds, and nutrient-dense plant oils.',
    },
    {
      icon: Target,
      title: 'Purposeful',
      description: 'Each formulation is created with a specific hair and scalp care objective.',
    },
    {
      icon: Crown,
      title: 'Luxury',
      description: 'Elevated, high-performance care designed for your daily crown ceremony.',
    },
  ];

  return (
    <section className="py-20 bg-[#08080a] border-y border-[#BF914A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8B26F] font-bold">
            The Safenia Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
            Why Safenia Luxury Oils
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Crafted for those who view hair care not as a routine, but as a sacred ritual of self-love and restoration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-b from-[#111114] to-[#0a0a0c] border border-zinc-800 hover:border-[#BF914A]/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#BF914A]/10 border border-[#BF914A]/30 flex items-center justify-center mb-6 group-hover:bg-[#BF914A] transition-colors">
                  <Icon className="w-6 h-6 text-[#D8B26F] group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-lg font-serif-luxury font-bold text-white mb-2.5">
                  {benefit.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
