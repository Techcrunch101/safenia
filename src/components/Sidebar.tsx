import React from 'react';
import { PageView } from '../types';
import { ShoppingBag, User, X, Sparkles, ChevronRight } from 'lucide-react';
import { getShopifyAccountUrl } from '../utils/shopify';
import { Logo } from './Logo';

interface SidebarProps {
  currentPage: PageView;
  currentCategory?: string;
  cartCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onNavigate: (page: PageView, category?: string) => void;
  onOpenCart: () => void;
  onOpenFaq?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  currentCategory = 'all',
  cartCount,
  isOpenMobile,
  onCloseMobile,
  onNavigate,
  onOpenCart,
  onOpenFaq,
}) => {
  const shopItems = [
    { label: 'Home', page: 'home' as PageView, category: undefined },
    { label: 'Shop All', page: 'shop' as PageView, category: 'all' },
    { label: 'Hair Oils', page: 'shop' as PageView, category: 'growth' },
    { label: 'Scalp Care', page: 'shop' as PageView, category: 'scalp' },
    { label: 'Growth', page: 'shop' as PageView, category: 'growth' },
    { label: 'Moisture', page: 'shop' as PageView, category: 'moisture' },
    { label: 'Strength & Repair', page: 'shop' as PageView, category: 'strength' },
    { label: 'Gift Sets', page: 'shop' as PageView, category: 'gift' },
    { label: 'Merchandise', page: 'shop' as PageView, category: 'merchandise' },
  ];

  const discoverItems = [
    { label: 'About Safenia', page: 'about' as PageView, targetSection: undefined },
    { label: 'The Safenia Ritual', page: 'home' as PageView, targetSection: 'ritual' },
    { label: 'Our Story', page: 'about' as PageView, targetSection: 'story' },
  ];

  const serviceItems = [
    { label: 'Track Order', page: 'track' as PageView },
    { label: 'Contact', page: 'contact' as PageView },
  ];

  const handleItemClick = (page: PageView, category?: string, targetSection?: string) => {
    onNavigate(page, category);
    onCloseMobile();

    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleAccountClick = () => {
    const url = getShopifyAccountUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#F5F1E8] border-r border-[#171713]/10 text-[#171713] select-none">
      {/* Brand Header */}
      <div className="p-5 pb-4 border-b border-[#171713]/10 flex items-center justify-between">
        <button
          onClick={() => handleItemClick('home')}
          className="text-left group cursor-pointer w-full"
        >
          <Logo variant="compact" size="sm" showTagline={false} />
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-2 text-[#57534E] hover:text-[#171713] rounded-lg cursor-pointer shrink-0 ml-2"
          aria-label="Close Navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Groups (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 text-xs">
        {/* SHOP Section */}
        <div className="space-y-1.5">
          <div className="px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#78716C]">
            SHOP
          </div>
          <div className="space-y-0.5 pt-1">
            {shopItems.map((item) => {
              const isHomeActive = currentPage === 'home' && item.page === 'home';
              const isShopActive =
                currentPage === 'shop' &&
                item.page === 'shop' &&
                (item.category === currentCategory || (item.category === 'all' && currentCategory === 'all'));
              const isActive = isHomeActive || isShopActive;

              return (
                <button
                  key={`${item.label}-${item.category}`}
                  onClick={() => handleItemClick(item.page, item.category)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#EDE7DA] text-[#171713] font-semibold border-l-2 border-[#4E5B45] shadow-xs'
                      : 'text-[#57534E] hover:text-[#171713] hover:bg-[#EDE7DA]/50'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isActive && <ChevronRight className="w-3 h-3 text-[#4E5B45]" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[#171713]/10" />

        {/* DISCOVER Section */}
        <div className="space-y-1.5">
          <div className="px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#78716C]">
            DISCOVER
          </div>
          <div className="space-y-0.5 pt-1">
            {discoverItems.map((item) => {
              const isActive = currentPage === 'about' && item.page === 'about';
              return (
                <button
                  key={item.label}
                  onClick={() => handleItemClick(item.page, undefined, item.targetSection)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#EDE7DA] text-[#171713] font-semibold border-l-2 border-[#4E5B45]'
                      : 'text-[#57534E] hover:text-[#171713] hover:bg-[#EDE7DA]/50'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isActive && <ChevronRight className="w-3 h-3 text-[#4E5B45]" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[#171713]/10" />

        {/* SERVICE Section */}
        <div className="space-y-1.5">
          <div className="px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#78716C]">
            SERVICE
          </div>
          <div className="space-y-0.5 pt-1">
            {serviceItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.label}
                  onClick={() => handleItemClick(item.page)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#EDE7DA] text-[#171713] font-semibold border-l-2 border-[#4E5B45]'
                      : 'text-[#57534E] hover:text-[#171713] hover:bg-[#EDE7DA]/50'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isActive && <ChevronRight className="w-3 h-3 text-[#4E5B45]" />}
                </button>
              );
            })}

            {onOpenFaq && (
              <button
                onClick={() => {
                  onCloseMobile();
                  onOpenFaq();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-[#57534E] hover:text-[#171713] hover:bg-[#EDE7DA]/50 transition-all cursor-pointer"
              >
                <span>FAQ</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Bottom: Account & Cart */}
      <div className="p-4 border-t border-[#171713]/10 bg-[#EDE7DA]/40 space-y-2">
        <button
          onClick={handleAccountClick}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#57534E] hover:text-[#171713] hover:bg-white/80 transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <User className="w-4 h-4 text-[#4E5B45]" />
            <span>Account</span>
          </div>
          <span className="text-[10px] text-[#78716C] uppercase tracking-wider">Shopify</span>
        </button>

        <button
          onClick={() => {
            onCloseMobile();
            onOpenCart();
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#171713] hover:bg-[#283126] text-[#F5F1E8] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 text-[#B7A477]" />
            <span>Cart</span>
          </div>
          {cartCount > 0 ? (
            <span className="bg-[#B7A477] text-[#171713] text-[10px] font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          ) : (
            <span className="text-[10px] text-zinc-400">0</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-60 xl:w-64 h-screen z-30 shadow-xs">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-fadeIn">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-xs h-full bg-[#F5F1E8] shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
