import React, { useState } from 'react';
import { PageView } from '../types';
import { ShieldCheck, Store, Mail, Crown, Instagram, Facebook, Sparkles } from 'lucide-react';
import { SafeniaLogo } from './SafeniaLogo';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenShopifyConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenShopifyConfig }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#030303] text-white pt-16 pb-12 border-t border-[#BF914A]/25 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter Row */}
        <div className="p-8 sm:p-10 bg-gradient-to-r from-[#141418] via-[#0e0e11] to-[#141418] rounded-3xl border border-[#BF914A]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D8B26F] font-semibold flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-[#BF914A]" /> Join The Crown Circle
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
              Receive Private Botanical Releases & 15% Off
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Pure botanical formulas crafted to nourish natural hair, locs, braids, and healthy scalps.
            </p>
          </div>

          <div className="lg:col-span-6">
            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 bg-black/80 border border-[#BF914A]/40 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#BF914A]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#75410A] to-[#BF914A] hover:from-[#9E6924] hover:to-[#D8B26F] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  Join Circle
                </button>
              </form>
            ) : (
              <div className="p-4 bg-[#BF914A]/20 border border-[#BF914A]/50 rounded-xl text-xs text-[#F3E5C8] font-medium text-left">
                ✓ Welcome to the Crown Circle! Your 15% invitation code is CROWN15.
              </div>
            )}
          </div>
        </div>

        {/* Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-xs text-left">
          {/* Brand Info & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <SafeniaLogo variant="horizontal" />
            <p className="text-zinc-400 font-light leading-relaxed max-w-sm">
              Safenia Luxury Oils — Nature’s Care for Every Crown. Handcrafted botanical hair and scalp formulations created around healthy hair, intentional craftsmanship and clean plant oils.
            </p>
            <div className="space-y-1.5 text-zinc-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#BF914A]" />
                <a href="mailto:safenialuxuryoils@gmail.com" className="hover:text-[#D8B26F] transition-colors">
                  safenialuxuryoils@gmail.com
                </a>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-[#D8B26F] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#BF914A]" />
              <span>Complimentary Worldwide Express Delivery on Orders $120+</span>
            </div>
          </div>

          {/* Column 1: Main Pages */}
          <div className="space-y-3">
            <div className="font-serif-luxury text-sm font-bold text-[#F3E5C8] uppercase tracking-wider">
              Explore
            </div>
            <ul className="space-y-2 text-zinc-400 font-light">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#D8B26F] cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D8B26F] cursor-pointer">
                  Shop All Oils
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D8B26F] cursor-pointer">
                  About Our Brand
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-[#D8B26F] cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D8B26F] cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Support & Policies */}
          <div className="space-y-3">
            <div className="font-serif-luxury text-sm font-bold text-[#F3E5C8] uppercase tracking-wider">
              Customer Care
            </div>
            <ul className="space-y-2 text-zinc-400 font-light">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D8B26F] cursor-pointer">
                  FAQ & Answers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-[#D8B26F] cursor-pointer">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D8B26F] cursor-pointer">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D8B26F] cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D8B26F] cursor-pointer">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Shopify Commerce Integration */}
          <div className="space-y-3">
            <div className="font-serif-luxury text-sm font-bold text-[#F3E5C8] uppercase tracking-wider">
              Shopify Commerce
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Powered by Shopify infrastructure for secure checkout, payments, inventory, and order tracking.
            </p>
            <button
              onClick={onOpenShopifyConfig}
              className="text-[#96BF48] hover:text-[#b1e058] flex items-center gap-1.5 font-semibold text-xs pt-1 cursor-pointer"
            >
              <Store className="w-4 h-4" />
              <span>Configure Shopify Link</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} SAFENIA LUXURY OILS. All Rights Reserved. <em>Nature’s Care for Every Crown</em>.
          </div>
          <div className="flex items-center space-x-6">
            <span>100% Cold-Pressed Botanicals</span>
            <span>Cruelty-Free & Vegan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
