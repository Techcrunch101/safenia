import React, { useState } from 'react';
import { Sparkles, Crown, Shield, Droplets, Palette, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { SafeniaLogo } from './SafeniaLogo';

const heroBottleImg = '/src/assets/images/safenia_hero_bottle_1785599770184.jpg';
const heroEmeraldImg = '/src/assets/images/safenia_emerald_botanical_hero_1787295575998.jpg';
const productBoxesImg = '/src/assets/images/safenia_product_boxes_1785599787566.jpg';
const silkInspoImg = '/src/assets/images/safenia_silk_inspo_1785599801373.jpg';
const serenAestheticImg = '/src/assets/images/safenia_seren_aesthetic_1785599818225.jpg';

interface BrandStoryProps {
  onDiscoverMore?: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onDiscoverMore }) => {
  const [showInspoModal, setShowInspoModal] = useState(false);

  return (
    <section id="story" className="py-24 bg-[#080809] relative overflow-hidden border-t border-[#75410A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header with Full Safenia Logo Emblem */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <SafeniaLogo variant="full" size="md" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Image Showcase with Gold Monogram Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#BF914A]/30 shadow-2xl group">
              <img
                src={heroEmeraldImg}
                alt="Safenia Botanical Hair Ceremony with Hibiscus and Amla"
                className="w-full h-[540px] object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

              {/* Bottom Floating Luxury Monogram Stamp */}
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-dark rounded-xl border border-[#BF914A]/40 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-[#D8B26F] font-semibold">
                    Cold-Pressed Craftsmanship
                  </div>
                  <div className="font-serif-luxury text-lg text-white font-medium mt-0.5">
                    100% High-Integrity Botanical Oils
                  </div>
                </div>
                <button
                  onClick={() => setShowInspoModal(true)}
                  className="px-4 py-2 bg-[#BF914A] hover:bg-[#D8B26F] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer shadow-lg"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>View Design Inspo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Editorial Story Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-[#D8B26F] text-xs uppercase tracking-[0.3em] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Brand Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white leading-tight">
              Luxury Begins With <br />
              <span className="text-gold-gradient italic font-normal">Intention.</span>
            </h2>

            <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
              At Safenia Luxury Oils, we believe your hair is not merely hair—it is your living crown. For centuries across kingdoms and continents, natural oil pressings were revered as sacred beauty rituals. We honor that heritage by combining ancient botanical wisdom with modern trichological science.
            </p>

            <p className="text-zinc-400 font-light text-sm leading-relaxed">
              Every drop is micro-batched using cold-pressed steam extraction to ensure delicate nutrient bonds remain unbroken. We reject synthetic fillers, cheap mineral oils, silicone coatings, and synthetic fragrances. Luxury lies in uncompromising purity.
            </p>

            {/* Color Palette Preview Strip */}
            <div className="p-4 bg-black/60 border border-[#BF914A]/30 rounded-2xl space-y-2">
              <div className="text-[10px] text-[#D8B26F] font-semibold uppercase tracking-[0.2em] flex justify-between items-center">
                <span>The Sovereign Gold Color Palette</span>
                <span className="text-zinc-500 font-normal">Desired Collection</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { hex: '#75410A', label: 'Dark Bronze' },
                  { hex: '#9E6924', label: 'Warm Ochre' },
                  { hex: '#BF914A', label: 'Luxury Gold' },
                  { hex: '#D8B26F', label: 'Champagne' },
                ].map((color) => (
                  <div key={color.hex} className="flex flex-col items-center">
                    <div
                      className="w-full h-8 rounded-lg border border-white/10 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[9px] text-zinc-300 font-mono mt-1">{color.hex}</span>
                    <span className="text-[8px] text-zinc-500">{color.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#BF914A]/20">
              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#BF914A] font-serif-luxury font-bold text-base">
                  <Crown className="w-4 h-4" />
                  <span>Sovereignty</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-light">Honoring natural coils, locs, braids, and crowns with royal care.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#BF914A] font-serif-luxury font-bold text-base">
                  <Droplets className="w-4 h-4" />
                  <span>Bio-Efficacy</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-light">High-concentration actives like Carnosic Acid & Thymoquinone.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#BF914A] font-serif-luxury font-bold text-base">
                  <Shield className="w-4 h-4" />
                  <span>Purity</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-light">Residue-free, zero mineral oil, zero silicones, zero wax buildup.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Inspo & Aesthetic Gallery Modal */}
        {showInspoModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto glass-dark backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="relative w-full max-w-5xl bg-[#0c0c0d] border border-[#BF914A]/50 rounded-3xl p-6 sm:p-10 shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowInspoModal(false)}
                className="absolute top-5 right-5 p-2 bg-black/80 hover:bg-[#BF914A] hover:text-black text-zinc-300 rounded-full border border-[#BF914A]/30 transition-colors cursor-pointer z-10"
              >
                ✕
              </button>

              <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
                <div className="inline-flex items-center space-x-2 text-[#D8B26F] text-xs uppercase tracking-[0.25em] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Design & Aesthetic Moodboard</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white">
                  Safenia Atelier Inspiration
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light">
                  Direct design elements, silk textures, color codes, packaging renders, and editorial layouts inspiring the Safenia brand experience.
                </p>
              </div>

              {/* Grid of Inspo Assets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Silk Texture & Color Palette */}
                <div className="bg-black/60 border border-[#BF914A]/30 rounded-2xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif-luxury font-bold text-[#D8B26F] uppercase tracking-wider">
                      Silk Fabric & Color Inspiration
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">DESIRED COLLECTION</span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-[#BF914A]/20">
                    <img
                      src={silkInspoImg}
                      alt="Gold Silk Draped Fabric Texture"
                      className="w-full h-64 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { hex: '#75410A', name: 'Dark Bronze', usage: 'Deep accents & borders' },
                      { hex: '#9E6924', name: 'Warm Ochre', usage: 'Secondary gold gradient' },
                      { hex: '#BF914A', name: 'Luxury Gold', usage: 'Primary foil & buttons' },
                      { hex: '#D8B26F', name: 'Champagne Gold', usage: 'Text highlights & glow' },
                    ].map((item) => (
                      <div key={item.hex} className="p-3 bg-black/80 rounded-xl border border-zinc-800 flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-lg shrink-0 border border-white/20 shadow-inner"
                          style={{ backgroundColor: item.hex }}
                        />
                        <div>
                          <div className="text-xs font-mono font-bold text-white">{item.hex}</div>
                          <div className="text-[10px] text-[#D8B26F]">{item.name}</div>
                          <div className="text-[9px] text-zinc-500">{item.usage}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editorial Layout & Packaging Studio */}
                <div className="space-y-6">
                  {/* Packaging Boxes Render */}
                  <div className="bg-black/60 border border-[#BF914A]/30 rounded-2xl p-4 space-y-3">
                    <div className="text-xs font-serif-luxury font-bold text-[#D8B26F] uppercase tracking-wider">
                      Crown Growth Oil 50ml Black & Gold Packaging
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-[#BF914A]/20">
                      <img
                        src={productBoxesImg}
                        alt="Safenia 50ml Box Packaging Studio Photo"
                        className="w-full h-48 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">
                      Matte black soft-touch boxes with gold foil embossed logo, GMP quality assurance seals, and environmental recycling marks.
                    </p>
                  </div>

                  {/* Editorial Layout Aesthetic */}
                  <div className="bg-black/60 border border-[#BF914A]/30 rounded-2xl p-4 space-y-3">
                    <div className="text-xs font-serif-luxury font-bold text-[#D8B26F] uppercase tracking-wider">
                      Sérën Editorial Layout Concept
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-[#BF914A]/20">
                      <img
                        src={serenAestheticImg}
                        alt="Minimalist Skincare & Haircare Design Aesthetic"
                        className="w-full h-44 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">
                      "Reveal Your Natural Radiance" — warm terracotta sand tones, architectural timber blocks, and soft organic palm leaf shadows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

