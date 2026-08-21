import React from 'react';
import { Product, Currency, ShopifyConfig } from '../types';
import { ShoppingBag, Eye, Star, Sparkles, ArrowRight } from 'lucide-react';
import { buildShopifyProductUrl } from '../utils/shopify';

interface FeaturedProductsProps {
  products: Product[];
  selectedCurrency: Currency;
  shopifyConfig: ShopifyConfig;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  selectedCurrency,
  shopifyConfig,
  onSelectProduct,
  onAddToCart,
  onViewAll,
}) => {
  // Take the primary botanical hair oils (excluding merchandise, sets, or extra fillers)
  const oilProducts = products.filter(
    (p) =>
      p.collection !== 'merchandise' &&
      !p.isMerchandise &&
      p.collection !== 'gift' &&
      p.id !== 'safenia-kids-gentle-crown'
  );

  const formatPrice = (priceInUSD: number) => {
    const converted = priceInUSD * selectedCurrency.rate;
    return `${selectedCurrency.symbol}${converted.toFixed(2)}`;
  };

  return (
    <section className="py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8B26F] font-bold">
              Pure Botanical Formulations
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
              Shop Our Oils
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              Each elixir is handcrafted with intentional herbs and cold-pressed botanical oils to nourish, stimulate and protect your crown.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-widest text-[#D8B26F] hover:text-white flex items-center space-x-1.5 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {oilProducts.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group bg-[#0a0a0d] rounded-2xl border border-zinc-800 hover:border-[#BF914A]/60 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl"
            >
              {/* Image with Floating Badges */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative aspect-square overflow-hidden bg-black cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Best Seller / Tag Badge */}
                {product.isBestSeller && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#BF914A] text-black text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Best Seller</span>
                  </div>
                )}

                {/* Quick View Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-black/80 hover:bg-[#BF914A] text-zinc-300 hover:text-black transition-colors opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Product Content */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  {/* Reviews rating */}
                  <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-2">
                    <div className="flex text-[#BF914A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px]">({product.reviewCount})</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-serif-luxury font-bold text-white text-lg hover:text-[#D8B26F] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Volume indicator */}
                  <div className="mt-3 flex items-center space-x-2 text-[11px] text-[#D8B26F] font-mono">
                    <span>{product.volume}</span>
                    <span>•</span>
                    <span className="capitalize">{product.collection} Care</span>
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Price</div>
                    <div className="text-lg font-bold text-white">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2.5 rounded-xl bg-[#BF914A] hover:bg-[#D8B26F] text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
