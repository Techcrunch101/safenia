import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  initialCategory = 'all',
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high'>('featured');

  const categories = [
    { id: 'all', label: 'ALL FORMULATIONS' },
    { id: 'growth', label: 'CROWN GROWTH', matchCategory: ['growth'] },
    { id: 'moisture', label: 'MOISTURE NECTAR', matchCategory: ['moisture'] },
    { id: 'scalp', label: 'SCALP THERAPY', matchCategory: ['scalp'] },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        let matchesCat = selectedCategory === 'all';

        if (!matchesCat) {
          const currentCatObj = categories.find((c) => c.id === selectedCategory);
          if (currentCatObj?.matchCategory) {
            matchesCat = currentCatObj.matchCategory.includes(p.category || '');
          } else {
            matchesCat = p.category === selectedCategory;
          }
        }

        const matchesSearch =
          !searchQuery.trim() ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#0B0908] text-[#F5F0E6] min-h-screen pt-28 pb-32">
      {/* Editorial Page Header */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-14 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#D4AF37]/15 gap-6">
          <div className="text-left space-y-3">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.34em] font-semibold text-[#D4AF37] block">
              CATALOGUE / ALL FORMULATIONS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-normal text-[#F5F0E6] tracking-tight">
              THE SAFENIA COLLECTION
            </h1>
          </div>
          <p className="text-sm text-[#B3ACA0] font-sans-body font-light max-w-md text-left md:text-right leading-relaxed">
            Every bottle is handcrafted in small batches using 100% pure cold-pressed botanicals, formulated to nourish, protect, and empower your crown.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          {/* Horizontal Category Nav */}
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-[11px] font-sans-body font-semibold uppercase tracking-[0.2em] px-4 py-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#0B0908]'
                      : 'text-[#B3ACA0] hover:text-[#F5F0E6] border border-[#D4AF37]/20 hover:border-[#D4AF37]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#B3ACA0]" />
              <input
                type="text"
                placeholder="Search formulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#14110E] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-xs font-sans-body text-[#F5F0E6] placeholder-[#B3ACA0]/50 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#14110E] border border-[#D4AF37]/20 py-2 px-3 text-xs font-sans-body text-[#F5F0E6] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="featured" className="bg-[#14110E] text-[#F5F0E6]">Featured First</option>
                <option value="newest" className="bg-[#14110E] text-[#F5F0E6]">Newest Additions</option>
                <option value="price-low" className="bg-[#14110E] text-[#F5F0E6]">Price: Low to High</option>
                <option value="price-high" className="bg-[#14110E] text-[#F5F0E6]">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Asymmetric / Editorial Product Grid */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-14">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-[#D4AF37]/20 p-10 space-y-4 max-w-lg mx-auto bg-[#14110E]">
            <h3 className="font-serif-luxury text-3xl text-[#F5F0E6]">
              No Botanical Formulations Found
            </h3>
            <p className="text-xs text-[#B3ACA0] font-sans-body font-light leading-relaxed">
              We couldn’t find anything matching your specific search query. Try clearing the filter to view all products.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#D4AF37] text-[#0B0908] text-xs font-semibold uppercase tracking-[0.2em] font-sans-body cursor-pointer hover:bg-[#F3E5AB] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#0B0908]" />
              <span>RESET CATALOGUE</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
