import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SAFENIA_IMAGES } from '../assets/images';
import { SafeImage } from './SafeImage';

interface JournalViewProps {
  onShopClick: () => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onShopClick }) => {
  const articles = [
    {
      id: 'botanical-scalp-care',
      tag: 'BOTANICAL TRICHOLOGY',
      title: 'Why Cold-Pressed Oils Outperform Mineral Oil for Scalp Health',
      readTime: '4 min read',
      date: 'OCTOBER 2024',
      snippet:
        'Understanding lipid chemistry and why synthetic mineral oils merely coat the surface while cold-pressed botanical lipids penetrate and nourish the follicular matrix.',
      image: SAFENIA_IMAGES.emeraldBotanicalHero,
      content:
        'Mineral oil is a petroleum byproduct that creates an occlusive plastic-like seal over the scalp, blocking natural perspiration and trapping sebum. In contrast, cold-pressed oils like Castor, Jojoba, and Almond are biologically compatible with human sebum. They deliver essential omega-6 and omega-9 fatty acids, zinc, and tocopherol directly to the scalp barrier.',
    },
    {
      id: 'mulberry-silk-benefits',
      tag: 'CROWN PROTECTION',
      title: 'The Science of 22-Momme Mulberry Silk vs. Traditional Cotton',
      readTime: '3 min read',
      date: 'SEPTEMBER 2024',
      snippet:
        'How standard cotton weaves rob hair of up to 40% of its moisture overnight, and why pure silk preserves hydration, curl definition, and delicate hairline edges.',
      image: SAFENIA_IMAGES.growthAfro,
      content:
        'Cotton is an ultra-absorbent fiber that wicks moisture away from your hair shaft while you sleep. The friction caused by tossing on a cotton pillowcase also lifts the hair cuticle, leading to mechanical breakage, split ends, and morning frizz. Grade 6A Mulberry Silk has an exceptionally smooth protein-based surface that glides against strands, preserving natural lipids and styles.',
    },
    {
      id: 'scalp-massage-science',
      tag: 'SCALP ANATOMY & CARE',
      title: 'The Ancient Art and Modern Science of Daily Scalp Massages',
      readTime: '5 min read',
      date: 'AUGUST 2024',
      snippet:
        'How 4 minutes of standardized mechanical scalp stimulation increases subcutaneous blood flow and activates anagen-phase hair growth genes.',
      image: SAFENIA_IMAGES.locCareGold,
      content:
        'Clinical studies in dermatology have proven that direct mechanical tension delivered to dermal papilla cells stimulates gene expression linked to hair cycle prolongation. Pairing this mechanical stimulation with rosemary and peppermint infusions amplifies micro-circulation significantly.',
    },
  ];

  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  return (
    <div className="bg-transparent text-[#17130F] min-h-screen pt-28 pb-32">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#17130F]/08 gap-6">
          <div className="text-left space-y-3">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.34em] font-semibold text-[#56604A] block">
              EDITORIAL & BOTANICAL WISDOM
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-normal text-[#17130F] tracking-tight leading-[0.98]">
              THE SAFENIA JOURNAL
            </h1>
          </div>
          <p className="text-base text-[#56604A]/90 font-sans-body font-light max-w-md text-left md:text-right leading-relaxed">
            Essays on botanical science, mindful crown care, scalp wellness, and honoring every crown.
          </p>
        </div>
      </section>

      {/* Article Grid or Modal Reader */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {selectedArticle ? (
          <div className="max-w-3xl mx-auto text-left space-y-8 animate-fadeIn">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-xs uppercase tracking-[0.2em] font-sans-body font-semibold text-[#56604A] hover:text-[#17130F] cursor-pointer"
            >
              ← BACK TO ALL ESSAYS
            </button>

            <div className="space-y-4">
              <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.3em] text-[#56604A] font-semibold block">
                {selectedArticle.tag} • {selectedArticle.readTime}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif-luxury text-[#17130F] leading-tight">
                {selectedArticle.title}
              </h2>
            </div>

            <div className="aspect-[16/9] w-full overflow-hidden bg-[#D9CCB8]/40 shadow-[0_15px_40px_-10px_rgba(23,19,15,0.08)]">
              <SafeImage
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 text-base sm:text-lg text-[#56604A]/90 font-sans-body font-light leading-relaxed">
              <p className="font-serif-luxury italic text-xl sm:text-2xl text-[#17130F]">
                "{selectedArticle.snippet}"
              </p>
              <p>{selectedArticle.content}</p>
              <p>
                At Safenia Luxury Oils, each formulation is engineered to harmonize with this natural biology, delivering concentrated nourishment directly where your crown needs it most.
              </p>
            </div>

            <div className="pt-10 border-t border-[#17130F]/08 flex justify-between items-center">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-3 border border-[#17130F]/20 text-xs font-sans-body font-semibold uppercase tracking-[0.2em] hover:bg-[#17130F] hover:text-[#F5F0E6] transition-colors cursor-pointer"
              >
                Close Essay
              </button>
              <button
                onClick={onShopClick}
                className="px-6 py-3 bg-[#17130F] text-[#F5F0E6] text-xs font-sans-body font-semibold uppercase tracking-[0.2em] hover:bg-[#30382D] transition-colors cursor-pointer"
              >
                Explore Formulations
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 text-left">
            {articles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group flex flex-col justify-between cursor-pointer space-y-6 pb-8 border-b border-[#17130F]/08"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/10] overflow-hidden bg-[#D9CCB8]/40 shadow-[0_15px_40px_-10px_rgba(23,19,15,0.08)]">
                    <SafeImage
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-sans-body uppercase tracking-[0.24em] text-[#7A746B]">
                    <span>{art.tag}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-[#17130F] group-hover:text-[#56604A] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#56604A]/90 font-sans-body font-light line-clamp-3 leading-relaxed">
                    {art.snippet}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs font-sans-body uppercase tracking-[0.2em] font-semibold text-[#17130F] group-hover:text-[#56604A] transition-colors">
                  <span>READ ESSAY</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-[#B79B6B]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
