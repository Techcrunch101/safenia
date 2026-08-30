import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/shopify';
import { useLanguage } from '../i18n/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  products,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#17130F]/75 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-24 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#F5F0E6] border border-[#17130F]/15 shadow-2xl overflow-hidden text-[#17130F]">
        {/* Search Header */}
        <div className="p-6 border-b border-[#17130F]/08 flex items-center space-x-4">
          <Search className="w-4 h-4 text-[#56604A] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder={t('search_placeholder', 'Search botanical extractions, crown care, ingredients...')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-sans-body bg-transparent border-none focus:outline-none placeholder-[#7A746B] text-[#17130F]"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#17130F] hover:text-[#56604A] transition-colors cursor-pointer shrink-0"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {query.trim() ? (
            searchResults.length > 0 ? (
              searchResults.map((product) => {
                const img = product.featuredImage || product.images[0] || '';
                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center space-x-4 p-3.5 border border-[#17130F]/08 hover:border-[#17130F] transition-all cursor-pointer text-left bg-[#D9CCB8]/20"
                  >
                    <img
                      src={img}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-15 object-cover bg-[#D9CCB8] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif-luxury text-base text-[#17130F] truncate">
                        {product.title}
                      </h4>
                      <p className="text-[11px] font-sans-body text-[#56604A] uppercase tracking-wider truncate">
                        {product.category} • {formatPrice(product.price, product.currencyCode)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#56604A] shrink-0" />
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-[#7A746B] text-xs font-sans-body font-light">
                {t('search_no_results', 'No botanical formulations found for')} "{query}".
              </div>
            )
          ) : (
            <div className="space-y-3 text-left">
              <span className="text-[10px] font-sans-body uppercase tracking-[0.25em] text-[#7A746B] font-semibold block">
                {t('search_trending', 'TRENDING BOTANICALS')}
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Crown Growth Hair Oil',
                  'Botanical Moisture Nectar',
                  'Scalp Clarifying Elixir',
                  'Mulberry Silk Bonnet',
                  'Crown Care Gift Set',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3.5 py-1.5 border border-[#17130F]/15 hover:border-[#17130F] text-xs font-sans-body text-[#56604A] hover:text-[#17130F] transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

