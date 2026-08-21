import React, { useState } from 'react';
import { PageView, Currency, ShopifyConfig } from '../types';
import { CURRENCIES } from '../data/currencies';
import { ShoppingBag, Search, User, Menu, X, ChevronDown, Store } from 'lucide-react';
import { SafeniaLogo } from './SafeniaLogo';

interface HeaderProps {
  currentPage: PageView;
  cartCount: number;
  selectedCurrency: Currency;
  shopifyConfig: ShopifyConfig;
  onNavigate: (page: PageView) => void;
  onSelectCurrency: (currency: Currency) => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenShopifyConfig: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  cartCount,
  selectedCurrency,
  shopifyConfig,
  onNavigate,
  onSelectCurrency,
  onOpenCart,
  onOpenAccount,
  onOpenShopifyConfig,
  onOpenSearch,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'About', page: 'about' },
    { label: 'Track Order', page: 'track' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <>
      {/* Main Luxury Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-[#BF914A]/20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-zinc-300 hover:text-white focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Left: Brand Logo & Slogan */}
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer flex items-center space-x-3 group"
            >
              <SafeniaLogo variant="horizontal" />
            </div>

            {/* Center: Main Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    className={`relative text-xs uppercase tracking-[0.2em] font-medium py-2 transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#D8B26F] font-bold'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#75410A] via-[#BF914A] to-[#D8B26F] rounded-full animate-fadeIn" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Account, Cart, Shopify Badge) */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                className="p-2 text-zinc-300 hover:text-[#D8B26F] transition-colors cursor-pointer"
                title="Search oils and products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopify Account Button */}
              <button
                onClick={onOpenAccount}
                className="p-2 text-zinc-300 hover:text-[#D8B26F] transition-colors cursor-pointer hidden sm:flex items-center space-x-1.5"
                title="Shopify Customer Account"
              >
                <User className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider hidden md:inline">Account</span>
              </button>

              {/* Shopify Connection Pill */}
              <button
                onClick={onOpenShopifyConfig}
                className="hidden xl:flex items-center space-x-1.5 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#182613] text-[#96BF48] border border-[#96BF48]/40 hover:bg-[#96BF48] hover:text-black transition-colors cursor-pointer"
                title="Shopify Backend Connected"
              >
                <Store className="w-3 h-3" />
                <span>Shopify</span>
              </button>

              {/* Currency Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                  className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer py-1 px-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-[#D8B26F]"
                >
                  <span>{selectedCurrency.flag}</span>
                  <span className="font-semibold text-[11px]">{selectedCurrency.code}</span>
                  <ChevronDown className="w-3 h-3 text-zinc-400" />
                </button>

                {isCurrencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#0c0c0d] border border-[#BF914A]/40 rounded-xl shadow-2xl py-1 z-50 animate-fadeIn">
                    {CURRENCIES.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          onSelectCurrency(curr);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#BF914A]/20 transition-colors cursor-pointer ${
                          selectedCurrency.code === curr.code ? 'text-[#D8B26F] font-bold bg-[#BF914A]/10' : 'text-zinc-300'
                        }`}
                      >
                        <span className="flex items-center space-x-2">
                          <span>{curr.flag}</span>
                          <span>{curr.code}</span>
                        </span>
                        <span className="text-zinc-400 font-mono text-[10px]">{curr.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-zinc-300 hover:text-[#D8B26F] transition-colors cursor-pointer flex items-center space-x-1.5"
                title="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#BF914A]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#75410A] to-[#BF914A] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs uppercase tracking-wider hidden sm:inline font-semibold">
                  Cart
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0a0c] border-b border-[#BF914A]/30 px-6 py-6 space-y-4 animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => {
                      onNavigate(link.page);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-sm uppercase tracking-widest py-2 border-b border-zinc-900 transition-colors ${
                      isActive ? 'text-[#D8B26F] font-bold' : 'text-zinc-300'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 flex items-center justify-between border-t border-zinc-800 text-xs">
              <button
                onClick={() => {
                  onOpenAccount();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-zinc-300 hover:text-[#D8B26F]"
              >
                <User className="w-4 h-4 text-[#BF914A]" />
                <span>Shopify Account</span>
              </button>

              <button
                onClick={() => {
                  onOpenShopifyConfig();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-1.5 text-[#96BF48] font-medium"
              >
                <Store className="w-4 h-4" />
                <span>Configure Shopify</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
