import React, { useState } from 'react';
import { Product, Currency, ShopifyConfig, ProductVariant } from '../types';
import { formatPrice } from '../data/currencies';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  RotateCw,
  CheckCircle2,
  ExternalLink,
  Store,
  Zap,
} from 'lucide-react';
import { buildShopifyProductUrl, buildShopifyCheckoutUrl } from '../utils/shopify';

interface ProductDetailModalProps {
  product: Product | null;
  selectedCurrency: Currency;
  shopifyConfig: ShopifyConfig;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedVariant?: ProductVariant
  ) => void;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  selectedCurrency,
  shopifyConfig,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'directions' | 'science'>('benefits');
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [rotationDegree, setRotationDegree] = useState(0);

  const handleRotate = () => {
    setRotationDegree((prev) => (prev + 45) % 360);
  };

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  const handleBuyNow = () => {
    // Build direct checkout permalink with this 1 item
    const checkoutUrl = buildShopifyCheckoutUrl(
      [{ product, quantity, selectedVariant }],
      shopifyConfig
    );
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
  };

  const handleBuyOnShopify = () => {
    const url = buildShopifyProductUrl(product.id, product.shopifyHandle, shopifyConfig);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0c0c0d] border border-[#BF914A]/40 rounded-3xl shadow-2xl overflow-hidden my-8 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 bg-black/80 hover:bg-[#BF914A] hover:text-black text-zinc-300 rounded-full border border-[#BF914A]/30 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#BF914A]/30 bg-black group">
              <img
                src={product.gallery[activeImageIndex] || product.image}
                alt={product.name}
                style={{ transform: `rotate(${rotationDegree}deg)` }}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
              />

              {/* 360 Rotation toggle */}
              <button
                onClick={handleRotate}
                className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#BF914A]/50 text-xs text-[#D8B26F] flex items-center gap-1.5 hover:bg-[#BF914A] hover:text-black transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Rotate View</span>
              </button>

              <div className="absolute top-4 left-4 bg-gradient-to-r from-[#75410A] to-[#BF914A] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                {selectedVariant ? selectedVariant.volume : product.volume}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setRotationDegree(0);
                  }}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#BF914A] scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Form */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#D8B26F] font-semibold tracking-widest uppercase">
                <span>{product.collection} RITUAL</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current text-[#BF914A]" />
                  <span className="text-white font-bold">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewCount} Reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white leading-tight">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Variants Selector (if multiple exist) */}
              {product.variants && product.variants.length > 1 && (
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                    Select Size / Option:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((variant) => {
                      const isSelected = selectedVariant?.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#BF914A] bg-[#BF914A]/10 text-white'
                              : 'border-zinc-800 bg-black/40 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <div className="text-xs font-bold">{variant.title}</div>
                          <div className="text-xs text-[#D8B26F] mt-0.5">
                            {formatPrice(variant.price, selectedCurrency)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Display */}
              <div className="p-4 rounded-2xl bg-black/40 border border-[#BF914A]/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider">Price</div>
                  <div className="text-2xl font-serif-luxury font-bold text-white">
                    {formatPrice(currentPrice, selectedCurrency)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-emerald-400 font-medium">In Stock & Ready to Ship</div>
                  <div className="text-[10px] text-zinc-500">Fulfilled securely by Shopify</div>
                </div>
              </div>

              {/* Quantity & CTA Actions */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-[#75410A]/50 rounded-xl bg-black px-3 py-2 text-sm font-medium">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-zinc-400 hover:text-white px-2 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2 text-white font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-zinc-400 hover:text-white px-2 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary CTA: Add to Cart */}
                  <button
                    onClick={() => onAddToCart(product, quantity, selectedVariant)}
                    className="flex-1 py-3.5 bg-gradient-to-r from-[#75410A] via-[#BF914A] to-[#D8B26F] hover:from-[#9E6924] hover:to-[#F3E5C8] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-xl flex items-center justify-center space-x-2 transition-transform transform hover:scale-[1.02] cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>Add To Bag</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted ? 'bg-[#BF914A] border-[#BF914A] text-black' : 'border-zinc-800 text-zinc-300 hover:text-white'
                    }`}
                    title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>

                {/* Secondary CTA: Buy Now with Shopify */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 bg-[#111114] hover:bg-[#BF914A]/20 text-[#D8B26F] border border-[#BF914A]/50 rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-[#BF914A]" />
                  <span>Buy Now (Shopify Checkout)</span>
                </button>
              </div>

              {/* Direct Shopify Store Link */}
              <button
                onClick={handleBuyOnShopify}
                className="w-full py-2 bg-transparent text-xs text-zinc-400 hover:text-zinc-200 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Store className="w-3.5 h-3.5 text-[#96BF48]" />
                <span>View on Shopify Store</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </button>
            </div>

            {/* Information Tabs */}
            <div className="pt-4 border-t border-zinc-800">
              <div className="flex items-center space-x-4 border-b border-zinc-800 pb-2 text-xs uppercase tracking-wider font-semibold">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'benefits' ? 'text-[#D8B26F] border-b-2 border-[#BF914A]' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Key Benefits
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'ingredients' ? 'text-[#D8B26F] border-b-2 border-[#BF914A]' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Pure Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('directions')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'directions' ? 'text-[#D8B26F] border-b-2 border-[#BF914A]' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  How to Use
                </button>
                <button
                  onClick={() => setActiveTab('science')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'science' ? 'text-[#D8B26F] border-b-2 border-[#BF914A]' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Formulation Science
                </button>
              </div>

              <div className="py-3 text-xs text-zinc-300 leading-relaxed min-h-[90px]">
                {activeTab === 'benefits' && (
                  <ul className="space-y-1.5">
                    {product.benefits.map((b, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#BF914A] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-2">
                    <p className="text-zinc-400">100% Pure, Cold-Pressed, Organic & Vegan Formulation:</p>
                    <p className="font-mono text-[11px] text-zinc-300">{product.ingredientsList.join(' • ')}</p>
                  </div>
                )}

                {activeTab === 'directions' && (
                  <ol className="space-y-1.5 list-decimal list-inside text-zinc-300">
                    {product.directions.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ol>
                )}

                {activeTab === 'science' && (
                  <p className="text-zinc-300 leading-relaxed">{product.scientificExplanation}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
