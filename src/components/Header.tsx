import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Logo } from './Logo';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { getShopifyAccountUrl } from '../utils/shopify';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  currentPage: PageView;
  cartCount: number;
  onNavigate: (page: PageView, category?: string) => void;
  onOpenSearch?: () => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  cartCount,
  onNavigate,
  onOpenCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = currentPage === 'home';

  // Desktop navigation items translated dynamically
  const navItems: { label: string; page: PageView }[] = [
    { label: t('nav_shop', 'SHOP'), page: 'shop' },
    { label: t('nav_about', 'ABOUT'), page: 'about' },
    { label: t('nav_ritual', 'CROWN CARE'), page: 'ritual' },
    { label: t('nav_journal', 'JOURNAL'), page: 'journal' },
    { label: t('nav_contact', 'CONTACT'), page: 'contact' },
  ];

  const handleMobileNav = (page: PageView) => {
    setIsMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-out ${
          isScrolled || !isHomePage
            ? 'h-[76px] sm:h-[80px] bg-[#0B0908]/95 backdrop-blur-md border-b border-[#D4AF37]/15 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
            : 'h-[84px] sm:h-[90px] bg-gradient-to-b from-[#0B0908]/90 via-[#0B0908]/50 to-transparent border-b border-[#D4AF37]/10'
        }`}
      >
        <div className="max-w-[1440px] h-full mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Mobile: Left Hamburger */}
          <div className="flex items-center lg:hidden w-1/4 justify-start">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#F5F0E6] hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Logo (Desktop: Upper-Left | Mobile: Centered) */}
          <div className="flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
            <button
              onClick={() => onNavigate('home')}
              className="text-left cursor-pointer transition-opacity duration-300 hover:opacity-80"
            >
              <Logo variant="nav" theme="dark" size="md" />
            </button>
          </div>

          {/* Desktop Center Editorial Nav */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-11">
            {navItems.map((item) => {
              const isActive = currentPage === item.page || (item.page === 'ritual' && currentPage === 'care');
              return (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`relative text-[11.5px] uppercase tracking-[0.24em] font-sans-body transition-colors duration-300 cursor-pointer py-1.5 ${
                    isActive
                      ? 'font-bold text-[#D4AF37]'
                      : 'font-normal text-[#F5F0E6]/80 hover:text-[#D4AF37]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] animate-fadeIn" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Utility Navigation: LANGUAGE SWITCHER, ACCOUNT, BAG */}
          <div className="flex items-center justify-end space-x-3.5 sm:space-x-5 xl:space-x-6 w-1/4 lg:w-auto">
            {/* 10-Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher variant="desktop" />
            </div>

            {/* Account */}
            <a
              href={getShopifyAccountUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center text-[#F5F0E6]/80 hover:text-[#D4AF37] transition-colors group"
              aria-label="Shopify Customer Account"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] font-sans-body font-medium text-[#F5F0E6]/80 group-hover:text-[#D4AF37]">
                {t('nav_account', 'ACCOUNT')}
              </span>
            </a>

            {/* Bag */}
            <button
              onClick={onOpenCart}
              className="flex items-center space-x-2 text-[#F5F0E6] hover:text-[#D4AF37] transition-colors cursor-pointer group"
              aria-label={`Shopping Bag with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#F5F0E6] group-hover:text-[#D4AF37] transition-colors" />
                {cartCount > 0 && (
                  <span className="lg:hidden absolute -top-1.5 -right-2 bg-[#D4AF37] text-[#0B0908] text-[9px] font-sans-body w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-[11px] uppercase tracking-[0.22em] font-sans-body font-medium text-[#F5F0E6] group-hover:text-[#D4AF37]">
                {t('nav_bag', 'BAG')} ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#0B0908] text-[#F5F0E6] animate-fadeIn">
          {/* Drawer Top */}
          <div className="p-6 border-b border-[#D4AF37]/15 flex items-center justify-between">
            <Logo variant="nav" theme="dark" size="sm" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#F5F0E6] hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <div className="p-8 flex-1 flex flex-col justify-between overflow-y-auto space-y-8">
            <div className="space-y-8 text-left">
              <span className="text-[9px] uppercase tracking-[0.34em] text-[#D4AF37] font-semibold block">
                {t('nav_language', 'NAVIGATION')}
              </span>
              <div className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => handleMobileNav(item.page)}
                    className="block w-full text-left font-serif-luxury text-3xl sm:text-4xl text-[#F5F0E6] hover:text-[#D4AF37] transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-[#D4AF37]/15 space-y-3">
                <button
                  onClick={() => handleMobileNav('track')}
                  className="block w-full text-left text-xs uppercase tracking-[0.22em] text-[#B3ACA0] hover:text-[#D4AF37]"
                >
                  {t('nav_track_order', 'TRACK ORDER')}
                </button>
                <a
                  href={getShopifyAccountUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs uppercase tracking-[0.22em] text-[#B3ACA0] hover:text-[#D4AF37]"
                >
                  {t('nav_shopify_account', 'SHOPIFY ACCOUNT')} ↗
                </a>
              </div>

              {/* 10-Language Selection Grid in Mobile Drawer */}
              <div className="pt-6 border-t border-[#D4AF37]/15">
                <LanguageSwitcher
                  variant="mobile-drawer"
                  onSelect={() => setIsMobileMenuOpen(false)}
                />
              </div>
            </div>

            {/* Bottom Statement */}
            <div className="pt-6 border-t border-[#D4AF37]/15 text-left">
              <p className="font-serif-luxury italic text-base text-[#D4AF37]">
                {t('hero_title_line1', 'Nature’s Care for')} {t('hero_title_line2', 'Every Crown')}
              </p>
              <p className="text-[9.5px] uppercase tracking-[0.28em] text-[#B3ACA0] mt-1.5 font-medium">
                {t('hero_tagline', 'Handcrafted Botanical Luxury')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


