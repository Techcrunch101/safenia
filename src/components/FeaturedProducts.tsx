import React from 'react';
import { Product } from '../types';
import { formatPrice } from '../utils/shopify';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface FeaturedProductsProps {
  products: Product[];
  isLoading?: boolean;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onSelectProduct,
  onViewAll,
}) => {
  const { t } = useLanguage();

  const heroProduct = products.find((p) => p.category === 'growth') || products[0];
  const sideProduct1 = products.find((p) => p.category === 'moisture') || products[1] || products[0];
  const sideProduct2 = products.find((p) => p.category === 'scalp') || products[2] || products[0];

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#0B0908] border-t border-[#D4AF37]/15 text-[#F5F0E6]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-[#D4AF37]/15 gap-8">
          <div className="max-w-2xl text-left space-y-3">
            <span className="text-[10.5px] uppercase tracking-[0.36em] font-sans-body font-semibold text-[#D4AF37] block">
              THE COLLECTION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-luxury font-normal text-[#F5F0E6] leading-[1.06] tracking-tight">
              Featured Formulations
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right space-y-4">
            <p className="text-sm text-[#B3ACA0] font-sans-body font-light leading-relaxed">
              Every formula is unhurried, handcrafted in micro-batches with cold-pressed botanical lipids to nurture, restore, and honor your crown.
            </p>
            <button
              onClick={onViewAll}
              className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.24em] font-sans-body font-medium text-[#D4AF37] hover:text-[#F3E5AB] transition-colors duration-300 cursor-pointer group"
            >
              <span>VIEW ALL FORMULATIONS</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Asymmetric Editorial Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-stretch">
          
          {/* Left Column: Large Featured Product (7 cols) */}
          {heroProduct && (
            <div
              className="lg:col-span-7 flex flex-col group cursor-pointer text-left"
              onClick={() => onSelectProduct(heroProduct)}
            >
              {/* Product Visual Container */}
              <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/4.7] w-full overflow-hidden bg-[#14110E] border border-[#D4AF37]/20 mb-6">
                <img
                  src={heroProduct.featuredImage || heroProduct.images[0]}
                  alt={heroProduct.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />

                {/* Subtle Hover Reveal Indicator */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-350">
                  <span className="px-4 py-2 bg-[#0B0908]/90 border border-[#D4AF37]/40 text-[#F5F0E6] text-[10px] uppercase tracking-[0.24em] font-sans-body font-medium">
                    QUICK VIEW →
                  </span>
                </div>
              </div>

              {/* Minimal Product Information */}
              <div className="flex flex-col space-y-2">
                <span className="text-[9.5px] uppercase tracking-[0.3em] font-sans-body font-semibold text-[#D4AF37]">
                  {heroProduct.category?.toUpperCase() || 'BOTANICAL HAIR OIL'}
                </span>
                
                <div className="flex items-baseline justify-between pt-0.5">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F0E6] group-hover:text-[#D4AF37] transition-colors">
                    {heroProduct.title}
                  </h3>
                  <span className="font-serif-luxury text-xl sm:text-2xl text-[#D4AF37] font-medium ml-4">
                    {formatPrice(heroProduct.price, heroProduct.currencyCode)}
                  </span>
                </div>

                <div className="pt-2 flex items-center space-x-1.5 text-[11px] uppercase tracking-[0.24em] font-sans-body font-semibold text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors duration-300">
                  <span>SHOP PRODUCT</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Stacked Pair of Products (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12 lg:space-y-0">
            
            {/* Top Stacked Product */}
            {sideProduct1 && (
              <div
                className="group cursor-pointer text-left flex flex-col pb-8 lg:pb-6 border-b border-[#D4AF37]/15"
                onClick={() => onSelectProduct(sideProduct1)}
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden bg-[#14110E] border border-[#D4AF37]/20 mb-4">
                  <img
                    src={sideProduct1.featuredImage || sideProduct1.images[0]}
                    alt={sideProduct1.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute bottom-4 left-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-350">
                    <span className="px-3 py-1.5 bg-[#0B0908]/90 border border-[#D4AF37]/40 text-[#F5F0E6] text-[9px] uppercase tracking-[0.22em] font-sans-body font-medium">
                      QUICK VIEW →
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-[0.28em] font-sans-body font-semibold text-[#D4AF37]">
                    {sideProduct1.category?.toUpperCase() || 'HYDRATION'}
                  </span>
                  
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F5F0E6] group-hover:text-[#D4AF37] transition-colors">
                      {sideProduct1.title}
                    </h3>
                    <span className="font-serif-luxury text-lg sm:text-xl text-[#D4AF37] font-medium ml-3">
                      {formatPrice(sideProduct1.price, sideProduct1.currencyCode)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[10.5px] uppercase tracking-[0.22em] font-sans-body font-semibold text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors duration-300 pt-1">
                    <span>SHOP PRODUCT</span>
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Stacked Product */}
            {sideProduct2 && (
              <div
                className="group cursor-pointer text-left flex flex-col pt-4"
                onClick={() => onSelectProduct(sideProduct2)}
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden bg-[#14110E] border border-[#D4AF37]/20 mb-4">
                  <img
                    src={sideProduct2.featuredImage || sideProduct2.images[0]}
                    alt={sideProduct2.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute bottom-4 left-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-350">
                    <span className="px-3 py-1.5 bg-[#0B0908]/90 border border-[#D4AF37]/40 text-[#F5F0E6] text-[9px] uppercase tracking-[0.22em] font-sans-body font-medium">
                      QUICK VIEW →
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-[0.28em] font-sans-body font-semibold text-[#D4AF37]">
                    {sideProduct2.category?.toUpperCase() || 'SCALP THERAPY'}
                  </span>
                  
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F5F0E6] group-hover:text-[#D4AF37] transition-colors">
                      {sideProduct2.title}
                    </h3>
                    <span className="font-serif-luxury text-lg sm:text-xl text-[#D4AF37] font-medium ml-3">
                      {formatPrice(sideProduct2.price, sideProduct2.currencyCode)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[10.5px] uppercase tracking-[0.22em] font-sans-body font-semibold text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors duration-300 pt-1">
                    <span>SHOP PRODUCT</span>
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


