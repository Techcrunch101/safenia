import React from 'react';
import { PageView } from '../types';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';
import { getShopifyAccountUrl } from '../utils/shopify';
import { Logo } from './Logo';

interface TopBarProps {
  currentPage: PageView;
  currentCategory?: string;
  cartCount: number;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentPage,
  currentCategory = 'all',
  cartCount,
  onOpenMobileMenu,
  onOpenSearch,
  onOpenCart,
}) => {
  const getBreadcrumbTitle = () => {
    switch (currentPage) {
      case 'home':
        return 'SAFENIA / BOTANICAL CARE';
      case 'shop': {
        const catMap: Record<string, string> = {
          all: 'ALL PRODUCTS',
          growth: 'HAIR & GROWTH OILS',
          scalp: 'SCALP CARE & THERAPY',
          moisture: 'MOISTURE & HYDRATION',
          strength: 'STRENGTH & REPAIR',
          gift: 'GIFT SETS & KITS',
          merchandise: 'SILK & MERCHANDISE',
        };
        return `SHOP / ${catMap[currentCategory] || 'ALL PRODUCTS'}`;
      }
      case 'about':
        return 'SAFENIA / OUR STORY';
      case 'track':
        return 'SERVICE / TRACK ORDER';
      case 'contact':
        return 'SERVICE / CONTACT';
      default:
        return 'SAFENIA LUXURY OILS';
    }
  };

  const handleAccountClick = () => {
    const url = getShopifyAccountUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-20 bg-[#F5F1E8]/90 backdrop-blur-md border-b border-[#171713]/10 h-14 transition-colors">
      <div className="h-full px-4 sm:px-8 flex items-center justify-between">
        {/* Left Side: Mobile Menu Button + Breadcrumb */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Icon */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-1.5 -ml-1.5 text-[#171713] hover:text-[#4E5B45] transition-colors cursor-pointer"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center">
            <Logo variant="nav" size="sm" showTagline={false} />
          </div>

          {/* Desktop Breadcrumb Section Title */}
          <div className="hidden lg:flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#78716C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E5B45]" />
            <span className="text-[#171713] font-semibold">{getBreadcrumbTitle()}</span>
          </div>
        </div>

        {/* Right Side: Quick Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-[#57534E] hover:text-[#171713] hover:bg-[#EDE7DA] rounded-lg transition-colors cursor-pointer"
            title="Search Products"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-[#171713]" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-medium">
              Search
            </span>
          </button>

          {/* Account Trigger (Shopify) */}
          <button
            onClick={handleAccountClick}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs text-[#57534E] hover:text-[#171713] hover:bg-[#EDE7DA] rounded-lg transition-colors cursor-pointer"
            title="Shopify Account & Orders"
            aria-label="Account"
          >
            <User className="w-4 h-4 text-[#171713]" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-medium">
              Account
            </span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center space-x-2 px-3 py-1.5 bg-[#171713] hover:bg-[#283126] text-[#F5F1E8] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#B7A477]" />
            <span className="hidden sm:inline text-[11px]">Bag</span>
            <span className="bg-[#B7A477] text-[#171713] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center -mr-1">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
