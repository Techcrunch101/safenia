import React, { useState, useMemo } from 'react';
import { Product, Currency, ShopifyConfig } from '../types';
import { ShoppingBag, Eye, Star, Sparkles, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { buildShopifyProductUrl } from '../utils/shopify';

interface ShopViewProps {
  products: Product[];
  selectedCurrency: Currency;
  shopifyConfig: ShopifyConfig;
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  selectedCurrency,
  shopifyConfig,
  initialCategory = 'all',
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'growth', label: 'Growth' },
    { id: 'moisture', label: 'Moisture' },
    { id: 'scalp', label: 'Scalp Care' },
    { id: 'strength', label: 'Strength & Repair' },
    { id: 'gift', label: 'Gift Sets' },
    { id: 'merchandise', label: 'The Safenia Collection' },
  ];

  const formatPrice = (priceInUSD: number) => {
    const converted = priceInUSD * selectedCurrency.rate;
    return `${selectedCurrency.symbol}${converted.toFixed(2)}`;
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat =
          selectedCategory === 'all' ||
          p.collection === selectedCategory ||
          (selectedCategory === 'merchandise' && p.isMerchandise);

        const matchesSearch =
          !searchQuery.trim() ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.keyIngredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* Header Banner */}
      <section className="relative py-16 overflow-hidden border-b border-[#BF914A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#111114] border border-[#BF914A]/40 text-[#D8B26F] text-xs font-bold uppercase tracking-[0.25em]">
            <span>Botanical Dispensary</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
            The Safenia Catalog
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Nourish, stimulate and restore with handcrafted botanical elixirs, silk accessories, and luxury gift sets.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Bar: Search, Category Tabs, Sort Filter */}
        <div className="space-y-6 mb-10">
          {/* Top Row: Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search oils, ingredients, silks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0c0c0f] border border-zinc-800 focus:border-[#BF914A] rounded-xl text-white text-xs placeholder-zinc-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <ArrowUpDown className="w-4 h-4 text-[#BF914A]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-[#0c0c0f] border border-zinc-800 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-[#BF914A] cursor-pointer"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#BF914A] text-black shadow-lg shadow-[#BF914A]/20'
                      : 'bg-[#0e0e12] text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif-luxury font-bold text-white">
              No products found
            </h3>
            <p className="text-zinc-400 text-xs">
              Try adjusting your search query or filter category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-[#BF914A] text-black text-xs font-bold uppercase tracking-wider rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#0a0a0d] rounded-2xl border border-zinc-800 hover:border-[#BF914A]/60 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl"
              >
                {/* Product Image */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-square overflow-hidden bg-black cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {product.isBestSeller && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#BF914A] text-black text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Best Seller</span>
                    </div>
                  )}

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
                    <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-2">
                      <div className="flex text-[#BF914A]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px]">({product.reviewCount})</span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif-luxury font-bold text-white text-lg hover:text-[#D8B26F] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-3 flex items-center space-x-2 text-[11px] text-[#D8B26F] font-mono">
                      <span>{product.volume}</span>
                      <span>•</span>
                      <span className="capitalize">{product.collection}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">Price</div>
                      <div className="text-lg font-bold text-white">
                        {formatPrice(product.price)}
                      </div>
                    </div>

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
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
