import React, { useState } from 'react';
import { Package, Search, Truck, Clock, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, HelpCircle } from 'lucide-react';
import { ShopifyConfig } from '../types';
import { buildShopifyTrackingUrl, formatShopifyDomain } from '../utils/shopify';

interface TrackOrderViewProps {
  shopifyConfig: ShopifyConfig;
  onContactClick: () => void;
}

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({
  shopifyConfig,
  onContactClick,
}) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [hasQueried, setHasQueried] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setHasQueried(true);
  };

  const openShopifyTracking = () => {
    const url = buildShopifyTrackingUrl(shopifyConfig, orderNumber, emailOrPhone);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const domain = formatShopifyDomain(shopifyConfig.storeDomain);

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* Header Banner */}
      <section className="relative py-20 overflow-hidden border-b border-[#BF914A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#111114] border border-[#BF914A]/40 text-[#D8B26F] text-xs font-bold uppercase tracking-[0.25em]">
            <Truck className="w-3.5 h-3.5 text-[#BF914A]" />
            <span>Order Fulfillment</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
            Track Your Order
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Follow your handcrafted Safenia botanical order from our micro-batch formulation studio directly to your doorstep.
          </p>
        </div>
      </section>

      {/* Main Tracking Form & Results */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c0c0f] border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Order Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. #SAF-1042 or 1042"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 bg-black/60 border border-zinc-700 focus:border-[#BF914A] rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Email Address or Phone
                </label>
                <input
                  type="text"
                  placeholder="name@example.com"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-4 py-3.5 bg-black/60 border border-zinc-700 focus:border-[#BF914A] rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 py-4 bg-[#BF914A] hover:bg-[#D8B26F] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Look Up Order</span>
              </button>

              <button
                type="button"
                onClick={openShopifyTracking}
                className="px-6 py-4 bg-black/80 hover:bg-zinc-800 text-[#D8B26F] border border-[#BF914A]/40 font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Shopify Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* If Queried, Display Order Status Pipeline */}
          {hasQueried && (
            <div className="pt-8 border-t border-zinc-800 space-y-6 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#141418] border border-[#BF914A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider">
                    Searching Storefront: <span className="text-white font-mono">{domain}</span>
                  </div>
                  <div className="text-lg font-serif-luxury font-bold text-white mt-0.5">
                    Order {orderNumber.startsWith('#') ? orderNumber : `#${orderNumber}`}
                  </div>
                </div>
                <button
                  onClick={openShopifyTracking}
                  className="px-4 py-2.5 bg-[#BF914A] hover:bg-[#D8B26F] text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <span>Open Full Tracking Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Status Timeline Workflow */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#D8B26F]">
                  Order Fulfillment Steps
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-black/50 border border-emerald-500/40 text-left">
                    <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>1. Confirmed</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">Order received and logged in Shopify system.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-[#BF914A]/40 text-left">
                    <div className="flex items-center space-x-2 text-[#D8B26F] text-xs font-bold mb-1">
                      <Clock className="w-4 h-4" />
                      <span>2. Handcrafted</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">Fresh small-batch botanical bottling and sealing.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 text-left">
                    <div className="flex items-center space-x-2 text-zinc-500 text-xs font-bold mb-1">
                      <Truck className="w-4 h-4" />
                      <span>3. In Transit</span>
                    </div>
                    <p className="text-[11px] text-zinc-500">Dispatched via DHL Express or local courier.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 text-left">
                    <div className="flex items-center space-x-2 text-zinc-500 text-xs font-bold mb-1">
                      <Package className="w-4 h-4" />
                      <span>4. Delivered</span>
                    </div>
                    <p className="text-[11px] text-zinc-500">Delivered directly to your crown ceremony.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Delivery Timelines Guide */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-[#09090c] border border-zinc-800 space-y-2">
            <h4 className="font-serif-luxury font-bold text-white text-base">
              Domestic & Regional
            </h4>
            <p className="text-xs text-[#D8B26F] font-mono">1 – 3 Business Days</p>
            <p className="text-xs text-zinc-400">Express doorstep dispatch with live SMS alerts.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#09090c] border border-zinc-800 space-y-2">
            <h4 className="font-serif-luxury font-bold text-white text-base">
              Europe & UK
            </h4>
            <p className="text-xs text-[#D8B26F] font-mono">2 – 4 Business Days</p>
            <p className="text-xs text-zinc-400">DHL Express Priority with customs pre-clearance.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#09090c] border border-zinc-800 space-y-2">
            <h4 className="font-serif-luxury font-bold text-white text-base">
              USA, Canada & Global
            </h4>
            <p className="text-xs text-[#D8B26F] font-mono">3 – 5 Business Days</p>
            <p className="text-xs text-zinc-400">Air priority tracked with signature confirmation.</p>
          </div>
        </div>

        {/* Help Notice */}
        <div className="mt-8 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center text-xs text-zinc-400 flex items-center justify-center space-x-2">
          <HelpCircle className="w-4 h-4 text-[#BF914A]" />
          <span>Need assistance with your package?</span>
          <button
            onClick={onContactClick}
            className="text-[#D8B26F] hover:underline font-semibold cursor-pointer"
          >
            Contact Customer Care
          </button>
        </div>
      </section>
    </div>
  );
};
