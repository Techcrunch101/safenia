import React, { useState } from 'react';
import { INGREDIENTS } from '../data/mockData';
import { Ingredient } from '../types';
import { Sparkles, Globe, ShieldCheck, Info, X } from 'lucide-react';

export const IngredientLibrary: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  return (
    <section id="ingredients" className="py-24 bg-[#080809] relative border-t border-[#75410A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 text-[#D8B26F] text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Botanical Integrity</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
            The Botanical Apothecary
          </h2>
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Explore the 10 sacred cold-pressed botanicals formulated into Safenia Luxury Oils. Every plant is ethically wild-harvested and clinically verified for cellular hair follicle bio-efficacy.
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#BF914A] to-transparent mx-auto mt-4"></div>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {INGREDIENTS.map((ing) => (
            <div
              key={ing.id}
              onClick={() => setSelectedIngredient(ing)}
              className="group relative glass-gold rounded-2xl p-5 border border-[#BF914A]/20 hover:border-[#BF914A]/80 transition-all duration-500 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-2xl hover:shadow-[#75410A]/20"
            >
              <div className="space-y-3">
                <div className="relative aspect-square rounded-xl overflow-hidden border border-[#BF914A]/30">
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] text-[#D8B26F] font-semibold uppercase tracking-wider border border-[#BF914A]/30 flex items-center gap-1">
                    <Globe className="w-2.5 h-2.5" /> {ing.origin}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#F3E5C8] transition-colors">
                    {ing.name}
                  </h3>
                  <div className="text-[11px] text-[#D8B26F] italic font-serif-luxury">
                    {ing.botanicalName}
                  </div>
                </div>

                <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
                  {ing.scientificExplanation}
                </p>
              </div>

              <button className="w-full py-2 bg-black/60 hover:bg-[#BF914A] hover:text-black text-xs text-[#D8B26F] font-semibold uppercase tracking-wider rounded-lg border border-[#BF914A]/30 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer">
                <Info className="w-3.5 h-3.5" />
                <span>Explore Bio-Profile</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Ingredient Detail Modal */}
      {selectedIngredient && (
        <div className="fixed inset-0 z-50 overflow-y-auto glass-dark backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-[#0c0c0d] border border-[#BF914A]/50 rounded-3xl p-6 sm:p-10 shadow-2xl text-white my-8">
            <button
              onClick={() => setSelectedIngredient(null)}
              className="absolute top-5 right-5 p-2 bg-black/80 hover:bg-[#BF914A] hover:text-black text-zinc-300 rounded-full border border-[#BF914A]/30 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#BF914A]/40">
                <img
                  src={selectedIngredient.image}
                  alt={selectedIngredient.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-[#BF914A]/30">
                  <div className="text-[10px] text-[#D8B26F] uppercase tracking-widest font-semibold">Botanical Origin</div>
                  <div className="text-xs text-white font-medium">{selectedIngredient.origin}</div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#D8B26F] font-semibold">
                    Botanical Profile
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white mt-1">
                    {selectedIngredient.name}
                  </h3>
                  <div className="text-sm italic font-serif-luxury text-[#BF914A]">
                    {selectedIngredient.botanicalName}
                  </div>
                </div>

                <div className="space-y-3 text-xs text-zinc-300 font-light leading-relaxed">
                  <div>
                    <h4 className="text-[#F3E5C8] font-bold uppercase tracking-wider text-[11px] mb-1">
                      Scientific Explanation
                    </h4>
                    <p>{selectedIngredient.scientificExplanation}</p>
                  </div>

                  <div>
                    <h4 className="text-[#F3E5C8] font-bold uppercase tracking-wider text-[11px] mb-1">
                      Traditional Royal Usage
                    </h4>
                    <p>{selectedIngredient.traditionalUse}</p>
                  </div>

                  <div>
                    <h4 className="text-[#F3E5C8] font-bold uppercase tracking-wider text-[11px] mb-1">
                      How Safenia Formulates It
                    </h4>
                    <p className="text-[#D8B26F] font-medium">{selectedIngredient.safeniaUsage}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider mb-2">Key Bio-Benefits</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedIngredient.benefits.map((b, idx) => (
                      <span key={idx} className="bg-[#BF914A]/10 border border-[#BF914A]/30 text-[#D8B26F] text-[10px] px-3 py-1 rounded-full font-medium">
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
