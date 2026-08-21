import React from 'react';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { Product, Currency, ShopifyConfig } from '../types';

interface MerchandiseSectionProps {
  products: Product[];
  selectedCurrency: Currency;
  shopifyConfig: ShopifyConfig;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onShopCollection: () => void;
}

const silkInspoImg = '/src/assets/images/safenia_silk_inspo_1785599801373.jpg';

export const MerchandiseSection: React.FC<MerchandiseSectionProps> = ({
  products,
  selectedCurrency,
  shopifyConfig,
  onSelectProduct,
  onAddToCart,
  onShopCollection,
}) => {
  // Filter merchandise products
  const merchItems = products.filter(
    (p) => p.collection === 'merchandise' || p.isMerchandise
  );

  const formatPrice = (priceInUSD: number) => {
    const converted = priceInUSD * selectedCurrency.rate;
    return `${selectedCurrency.symbol}${converted.toFixed(2)}`;
  };

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden border-t border-[#BF914A]/20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#BF914A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#141416] border border-[#BF914A]/30 text-[#D8B26F] text-[10px] font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3 h-3 text-[#BF914A]" />
            <span>Ritual Accessories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
            The Safenia Collection
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-light italic">
            More than hair care. A ritual.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Elevate your daily ceremony with pure Mulberry silk bonnets, hand-rolled scarves, velvet travel organizers, and organic canvas totes.
          </p>
        </div>

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {merchItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#0d0d10] rounded-2xl border border-zinc-800 hover:border-[#BF914A]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl"
            >
              {/* Image Container */}
              <div
                onClick={() => onSelectProduct(item)}
                className="relative aspect-square overflow-hidden bg-black cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-[#BF914A]/40 text-[#D8B26F] text-[10px] font-bold uppercase tracking-wider">
                  Silk & Gear
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3
                    onClick={() => onSelectProduct(item)}
                    className="font-serif-luxury font-bold text-white text-base hover:text-[#D8B26F] transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div className="text-base font-bold text-white">
                    {formatPrice(item.price)}
                  </div>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="p-2.5 rounded-xl bg-[#BF914A]/10 hover:bg-[#BF914A] text-[#D8B26F] hover:text-black transition-all cursor-pointer"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onShopCollection}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#75410A] via-[#BF914A] to-[#D8B26F] hover:from-[#9E6924] hover:to-[#F3E5C8] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-xl transition-all cursor-pointer"
          >
            <span>Shop Full Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
