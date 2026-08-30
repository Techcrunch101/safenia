import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { formatPrice, buildShopifyCartPermalink } from '../utils/shopify';
import { X, ShoppingBag, ArrowRight, ChevronDown, ChevronUp, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant: ProductVariant) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: product.id,
      title: 'Standard',
      price: product.price,
      currencyCode: product.currencyCode,
      availableForSale: product.availableForSale,
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>('ingredients');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const gallery = product.images.length > 0 ? product.images : [product.featuredImage];
  const activeImage = gallery[selectedImageIndex] || product.featuredImage;

  const handleBuyNow = () => {
    const permalink = buildShopifyCartPermalink([
      { variantId: selectedVariant.id, quantity },
    ]);
    window.location.href = permalink;
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedVariant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#17130F]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#F5F0E6] border border-[#17130F]/10 shadow-2xl overflow-hidden text-[#17130F] my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 text-[#17130F] hover:text-[#56604A] transition-colors duration-200 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-start">
          
          {/* Left Column: Image Gallery (~55% / 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] bg-[#D9CCB8]/30 overflow-hidden">
              <img
                src={activeImage}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Thumbnail selector */}
            {gallery.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 overflow-hidden border transition-all duration-200 cursor-pointer shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#17130F] opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Editorial Product Information & Order Controls (~45% / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.32em] text-[#56604A] font-semibold block">
                {product.category?.toUpperCase() || 'BOTANICAL FORMULATION'}
              </span>

              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-normal text-[#17130F] leading-tight">
                {product.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline space-x-3 pt-1">
                <span className="text-2xl font-serif-luxury text-[#17130F] font-semibold">
                  {formatPrice(selectedVariant.price, selectedVariant.currencyCode)}
                </span>
                {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
                  <span className="text-sm text-[#7A746B] line-through font-sans-body font-light">
                    {formatPrice(selectedVariant.compareAtPrice, selectedVariant.currencyCode)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#56604A]/90 font-sans-body font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Botanical Transparency Highlights */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#17130F]/08 text-center">
              <div className="flex flex-col items-center justify-center p-2">
                <Leaf className="w-3.5 h-3.5 text-[#56604A] mb-1" />
                <span className="text-[9px] uppercase tracking-[0.16em] font-sans-body font-medium text-[#17130F]">100% Botanical</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 border-x border-[#17130F]/08">
                <Sparkles className="w-3.5 h-3.5 text-[#B79B6B] mb-1" />
                <span className="text-[9px] uppercase tracking-[0.16em] font-sans-body font-medium text-[#17130F]">Micro-Batch</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#56604A] mb-1" />
                <span className="text-[9px] uppercase tracking-[0.16em] font-sans-body font-medium text-[#17130F]">Zero Fillers</span>
              </div>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <label className="block text-[10px] font-sans-body uppercase tracking-[0.22em] text-[#7A746B] font-semibold">
                  SELECT OPTION
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2 text-xs uppercase tracking-wider font-sans-body transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#17130F] text-[#F5F0E6]'
                            : 'border border-[#17130F]/20 text-[#56604A] hover:border-[#17130F]'
                        }`}
                      >
                        {v.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#17130F]/20 bg-transparent">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-3 text-xs text-[#17130F] hover:bg-[#17130F]/06 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold font-sans-body text-[#17130F]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-3 text-xs text-[#17130F] hover:bg-[#17130F]/06 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 bg-[#17130F] hover:bg-[#30382D] text-[#F5F0E6] font-semibold text-xs uppercase tracking-[0.22em] font-sans-body transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#B79B6B]" />
                  <span>ADD TO BAG</span>
                </button>
              </div>

              {/* Direct Checkout Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-transparent hover:bg-[#17130F] text-[#17130F] hover:text-[#F5F0E6] border border-[#17130F] font-semibold text-xs uppercase tracking-[0.22em] font-sans-body transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>DIRECT SHOPIFY CHECKOUT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Accordion Tabs */}
            <div className="pt-4 border-t border-[#17130F]/08 space-y-2 text-left">
              {/* Ingredients */}
              <div className="border-b border-[#17130F]/08 pb-2">
                <button
                  onClick={() => toggleSection('ingredients')}
                  className="w-full py-2 flex items-center justify-between font-serif-luxury text-lg text-[#17130F] cursor-pointer"
                >
                  <span>Botanical Ingredients</span>
                  {openSection === 'ingredients' ? (
                    <ChevronUp className="w-4 h-4 text-[#56604A]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7A746B]" />
                  )}
                </button>
                {openSection === 'ingredients' && (
                  <div className="pb-3 text-xs text-[#56604A]/90 font-sans-body font-light leading-relaxed">
                    <ul className="list-disc list-inside space-y-1">
                      {(product.ingredients || [
                        'Cold-pressed Ricinus Communis (Castor) Seed Oil',
                        'Simmondsia Chinensis (Jojoba) Seed Oil',
                        'Rosmarinus Officinalis (Rosemary) Leaf Extract',
                        'Emblica Officinalis (Amla) Fruit Extract',
                        'Pure Tocopherol (Natural Vitamin E)',
                      ]).map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* How To Use */}
              <div className="border-b border-[#17130F]/08 pb-2">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full py-2 flex items-center justify-between font-serif-luxury text-lg text-[#17130F] cursor-pointer"
                >
                  <span>Application & Care Method</span>
                  {openSection === 'howToUse' ? (
                    <ChevronUp className="w-4 h-4 text-[#56604A]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7A746B]" />
                  )}
                </button>
                {openSection === 'howToUse' && (
                  <div className="pb-3 text-xs text-[#56604A]/90 font-sans-body font-light leading-relaxed space-y-1.5">
                    {(product.howToUse || [
                      'Dispense 3–5 drops directly onto clean scalp or warm between palms.',
                      'Gently massage in circular motions for 2–3 minutes to promote healthy circulation.',
                      'Smooth remaining drops down hair lengths to seal moisture.',
                    ]).map((step, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <span className="font-semibold text-[#56604A] shrink-0">{i + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Shipping & Shopify Guarantee */}
              <div className="border-b border-[#17130F]/08 pb-2">
                <button
                  onClick={() => toggleSection('shipping')}
                  className="w-full py-2 flex items-center justify-between font-serif-luxury text-lg text-[#17130F] cursor-pointer"
                >
                  <span>Shipping & Packaging</span>
                  {openSection === 'shipping' ? (
                    <ChevronUp className="w-4 h-4 text-[#56604A]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7A746B]" />
                  )}
                </button>
                {openSection === 'shipping' && (
                  <div className="pb-3 text-xs text-[#56604A]/90 font-sans-body font-light leading-relaxed">
                    Orders are processed within 24–48 hours in protective eco-friendly luxury packaging. Real-time carrier tracking is automatically dispatched via email.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

