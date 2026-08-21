import React from 'react';
import { REVIEWS } from '../data/mockData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#080809] relative border-t border-[#75410A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8B26F] font-semibold">
            Global Royal Crown Voices
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
            Loved Across 45+ Nations
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#BF914A] to-transparent mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="glass-gold rounded-2xl p-6 border border-[#BF914A]/25 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden"
            >
              <Quote className="absolute -top-2 -right-2 w-16 h-16 text-[#BF914A]/10 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center space-x-1 text-[#BF914A]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#BF914A]" />
                  ))}
                </div>

                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  "{rev.headline}"
                </h3>

                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white font-serif-luxury">{rev.customerName}</div>
                    <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                      <span>{rev.countryCode}</span>
                      <span>{rev.location}</span>
                    </div>
                  </div>
                  {rev.isVerified && (
                    <span className="bg-[#BF914A]/15 border border-[#BF914A]/30 text-[#D8B26F] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3 h-3 text-[#BF914A]" /> Verified Crown
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-zinc-500 italic">
                  Purchased: {rev.productTitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
