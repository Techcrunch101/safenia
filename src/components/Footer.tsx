import React from 'react';
import { PageView } from '../types';
import { Logo } from './Logo';
import { getShopifyAccountUrl } from '../utils/shopify';

interface FooterProps {
  onNavigate: (page: PageView, category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#070605] text-[#F5F0E6] pt-24 pb-12 border-t border-[#D4AF37]/15">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-[#D4AF37]/15">
          
          {/* Brand Column (~5 cols) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <button
              onClick={() => onNavigate('home')}
              className="text-left cursor-pointer focus:outline-none"
            >
              <Logo variant="nav" />
            </button>

            <p className="font-serif-luxury italic text-base sm:text-lg text-[#D4AF37] font-light max-w-sm">
              "Nature's Care for Every Crown"
            </p>

            <p className="text-xs sm:text-sm text-[#B3ACA0] font-sans-body font-light leading-relaxed max-w-md">
              Safenia Luxury Oils was born from a passion for healthy hair, intentional craftsmanship, and the belief that every crown deserves the very best care. Handcrafted in micro-batches with pure botanical extractions.
            </p>

            <div className="pt-1 text-[10px] uppercase tracking-[0.28em] text-[#D4AF37] font-sans-body font-semibold">
              AUTHENTIC BOTANICAL HERITAGE • ZERO FILLERS
            </div>
          </div>

          {/* Column 1: SHOP (~2-3 cols) */}
          <div className="lg:col-span-3 lg:col-start-7 text-left space-y-4">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">
              THE FORMULATIONS
            </span>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans-body font-light text-[#B3ACA0]">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  All Formulations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'growth')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  Safenia Crown Growth Oil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'moisture')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  Botanical Moisture Nectar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'scalp')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  Scalp Therapy Drops
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: DISCOVER (~2 cols) */}
          <div className="lg:col-span-2 text-left space-y-4">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">
              DISCOVER
            </span>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans-body font-light text-[#B3ACA0]">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  Botanical Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('care')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  The Crown Method
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  Botanical Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: SERVICE (~2 cols) */}
          <div className="lg:col-span-2 text-left space-y-4">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">
              SERVICE
            </span>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans-body font-light text-[#B3ACA0]">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  Concierge Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <a
                  href={getShopifyAccountUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors duration-200 block"
                >
                  Shopify Account ↗
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
                >
                  Shipping & Returns
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B3ACA0] font-sans-body font-light gap-4">
          <p>© {new Date().getFullYear()} SAFENIA LUXURY OILS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6 text-[10.5px] uppercase tracking-[0.18em]">
            <button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37] transition-colors duration-200">
              PRIVACY POLICY
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37] transition-colors duration-200">
              TERMS OF SERVICE
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37] transition-colors duration-200">
              SHIPPING POLICY
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

