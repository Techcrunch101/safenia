import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  selectedCurrency: Currency;
  wishlistIds: string[];
  selectedCollectionFilter?: string;
  searchQuery?: string;
  onQuickViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCurrency,
  wishlistIds,
  selectedCollectionFilter = 'all',
  searchQuery = '',
  onQuickViewProduct,
  onAddToCart,
  onToggleWishlist,
}) => {
  const [activeCollection, setActiveCollection] = useState<string>(selectedCollectionFilter);
  const [activeHairType, setActiveHairType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'bestsellers' | 'price-asc' | 'price-desc' | 'rating'>('bestsellers');

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCollection !== 'all') {
      list = list.filter((p) => p.collection === activeCollection);
    }

    if (activeHairType !== 'all') {
      list = list.filter((p) =>
        p.hairTypes.some((ht) => ht.toLowerCase().includes(activeHairType.toLowerCase()))
      );
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.keyIngredients.some((i) => i.toLowerCase().includes(q)) ||
          p.collection.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'bestsellers') {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCollection, activeHairType, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-20 bg-[#050505] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-[#BF914A]/20 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[#D8B26F] text-xs uppercase tracking-[0.25em] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Botanical Vault</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
              The Safenia Formulations
            </h2>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Hair Type Filter */}
            <div className="flex items-center space-x-2 bg-[#0c0c0d] px-3 py-2 rounded-lg border border-[#75410A]/40 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#BF914A]" />
              <span className="text-zinc-400">Crown:</span>
              <select
                value={activeHairType}
                onChange={(e) => setActiveHairType(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#050505]">All Crown Types</option>
                <option value="4C" className="bg-[#050505]">4C / 4B Coily</option>
                <option value="Locs" className="bg-[#050505]">Locs & Sisterlocs</option>
                <option value="Braids" className="bg-[#050505]">Braids & Cornrows</option>
                <option value="Beard" className="bg-[#050505]">Beard & Jawline</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 bg-[#0c0c0d] px-3 py-2 rounded-lg border border-[#75410A]/40 text-xs">
              <span className="text-zinc-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#D8B26F] font-medium focus:outline-none cursor-pointer"
              >
                <option value="bestsellers" className="bg-[#050505]">Best Sellers</option>
                <option value="rating" className="bg-[#050505]">Highest Rated</option>
                <option value="price-asc" className="bg-[#050505]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#050505]">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collection Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-6 scrollbar-none mb-10">
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'growth', label: 'Hair Growth' },
            { id: 'locs', label: 'Loc Rituals' },
            { id: 'scalp', label: 'Scalp Therapy' },
            { id: 'beard', label: 'Beard Care' },
            { id: 'protective', label: 'Protective Styles' },
            { id: 'gift', label: 'Gift Sets' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCollection(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                activeCollection === tab.id
                  ? 'bg-gradient-to-r from-[#75410A] to-[#BF914A] text-black font-bold shadow-lg shadow-[#75410A]/30'
                  : 'bg-[#0c0c0d] text-zinc-400 hover:text-white border border-[#BF914A]/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedCurrency={selectedCurrency}
                isWishlisted={wishlistIds.includes(product.id)}
                onQuickView={onQuickViewProduct}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0c0c0d] rounded-2xl border border-[#BF914A]/20 space-y-4">
            <p className="text-zinc-400 text-sm font-serif-luxury text-lg">
              No botanical formulations matched your query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setActiveCollection('all');
                setActiveHairType('all');
              }}
              className="px-6 py-2.5 bg-[#BF914A] text-black text-xs uppercase font-bold tracking-wider rounded-full hover:bg-[#D8B26F] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
