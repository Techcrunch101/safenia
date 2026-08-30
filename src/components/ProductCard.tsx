import React from 'react';
import { Product } from '../types';
import { ArrowRight, Plus } from 'lucide-react';
import { formatPrice } from '../utils/shopify';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
}) => {
  const primaryImage = product.featuredImage || product.images[0] || '';
  const secondaryImage = product.images[1] || primaryImage;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group flex flex-col text-left cursor-pointer transition-all duration-300"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] bg-[#14110E] border border-[#D4AF37]/20 overflow-hidden mb-4 group-hover:border-[#D4AF37]/60 transition-colors">
        <SafeImage
          src={primaryImage}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Alternate Hover Image */}
        {product.images.length > 1 && (
          <SafeImage
            src={secondaryImage}
            alt={`${product.title} alternate`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          />
        )}

        {/* Category Pill */}
        <div className="absolute top-4 left-4 bg-[#0B0908]/85 backdrop-blur-xs px-2.5 py-1 border border-[#D4AF37]/30 text-[8.5px] font-mono uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
          {product.category || 'BOTANICAL'}
        </div>

        {/* Quick Add Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-[#D4AF37] text-[#0B0908] px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md hover:bg-[#F3E5AB] flex items-center space-x-1.5 cursor-pointer"
          aria-label="Add to Bag"
        >
          <Plus className="w-3 h-3" />
          <span>ADD</span>
        </button>
      </div>

      {/* Product Information */}
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F5F0E6] group-hover:text-[#D4AF37] transition-all transform group-hover:-translate-y-0.5 duration-300 line-clamp-1">
            {product.title}
          </h3>
          <span className="font-serif-luxury text-lg sm:text-xl text-[#D4AF37] font-medium shrink-0">
            {formatPrice(product.price, product.currencyCode)}
          </span>
        </div>

        <p className="text-xs text-[#B3ACA0] line-clamp-2 leading-relaxed font-light">
          {product.description}
        </p>

        <div className="pt-1.5 flex items-center space-x-1 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors">
          <span>SHOP PRODUCT</span>
          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
