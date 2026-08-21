import React, { useState } from 'react';
import { Package, Search, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { ShopifyConfig } from '../types';
import { buildShopifyTrackingUrl } from '../utils/shopify';

interface TrackOrderTeaserProps {
  shopifyConfig: ShopifyConfig;
  onFullTrackPage: () => void;
}

export const TrackOrderTeaser: React.FC<TrackOrderTeaserProps> = ({
  shopifyConfig,
  onFullTrackPage,
}) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    const url = buildShopifyTrackingUrl(shopifyConfig, orderNumber, emailOrPhone);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-[#08080b] border-t border-[#BF914A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#121216] via-[#0e0e11] to-[#121216] rounded-3xl border border-[#BF914A]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Icon */}
          <Truck className="absolute -right-10 -bottom-10 w-64 h-64 text-[#BF914A]/5 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-3 text-left">
              <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#D8B26F] font-bold">
                <Package className="w-3.5 h-3.5 text-[#BF914A]" />
                <span>Shopify Order Tracking</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white">
                Track Your Safenia Order
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Enter your Shopify order number (e.g. #SAF-1042) to check real-time packaging, DHL Express courier dispatch, and delivery updates.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleTrackSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Order Number (e.g. #SAF-1042)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-zinc-700 focus:border-[#BF914A] rounded-xl text-white text-xs placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Email or Phone Number"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-zinc-700 focus:border-[#BF914A] rounded-xl text-white text-xs placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#BF914A] hover:bg-[#D8B26F] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Track Order Status</span>
                  </button>

                  <button
                    type="button"
                    onClick={onFullTrackPage}
                    className="px-5 py-3.5 bg-black/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Full Tracking Page</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
