import React from 'react';
import { Star, Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/currencies';

interface ProductCardProps {
  product: Product;
  selectedCurrency: Currency;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedCurrency,
  isWishlisted,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
}) => {
  return (
    <div className="group relative glass-gold rounded-2xl overflow-hidden border border-[#BF914A]/25 hover:border-[#BF914A]/70 transition-all duration-500 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-[#75410A]/20">
      {/* Product Image & Hover Action Overlay */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0c0c0d] cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
          {product.isBestSeller ? (
            <span className="bg-gradient-to-r from-[#75410A] to-[#BF914A] text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-black" /> Best Seller
            </span>
          ) : (
            <span className="bg-black/70 backdrop-blur-md border border-[#BF914A]/30 text-[#D8B26F] text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              {product.volume}
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md border transition-colors pointer-events-auto cursor-pointer ${
              isWishlisted
                ? 'bg-[#BF914A] border-[#BF914A] text-black'
                : 'bg-black/60 border-white/20 text-white hover:text-[#BF914A]'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2.5 bg-black/80 hover:bg-black text-[#F3E5C8] border border-[#BF914A]/50 text-xs font-medium uppercase tracking-wider rounded-full backdrop-blur-md flex items-center space-x-2 transition-transform transform hover:scale-105 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#BF914A]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#D8B26F] uppercase tracking-widest text-[10px] font-semibold">
              {product.collection} ritual
            </span>
            <div className="flex items-center space-x-1 text-[#BF914A]">
              <Star className="w-3 h-3 fill-current text-[#BF914A]" />
              <span className="text-xs font-bold text-white">{product.rating}</span>
              <span className="text-[10px] text-zinc-500">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#F3E5C8] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-[#BF914A]/20 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-white font-serif-luxury">
              {formatPrice(product.price, selectedCurrency)}
            </div>
            <div className="text-[10px] text-zinc-500">
              {selectedCurrency.code} incl. duties
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2.5 bg-gradient-to-r from-[#75410A] to-[#BF914A] hover:from-[#9E6924] hover:to-[#D8B26F] text-black font-semibold text-xs uppercase tracking-wider rounded-lg shadow transition-all flex items-center space-x-1.5 transform hover:scale-105 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-black" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
