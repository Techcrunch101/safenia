import React, { useState } from 'react';
import { Search, ExternalLink, ArrowRight, User, Info } from 'lucide-react';
import { getShopifyOrderStatusUrl, getShopifyAccountUrl } from '../utils/shopify';

export const TrackOrderView: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    const cleanOrderNumber = orderNumber.replace(/^#/, '').trim();
    const trackingUrl = getShopifyOrderStatusUrl(cleanOrderNumber, email.trim());
    window.open(trackingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAccountLogin = () => {
    const accountUrl = getShopifyAccountUrl();
    window.open(accountUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-transparent text-[#17130F] min-h-screen pt-28 pb-32">
      {/* Editorial Page Header */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#17130F]/08 gap-6">
          <div className="text-left space-y-3">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.34em] font-semibold text-[#56604A] block">
              CUSTOMER CONCIERGE
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif-luxury font-normal text-[#17130F] tracking-tight">
              TRACK YOUR ORDER
            </h1>
          </div>
          <p className="text-base text-[#56604A]/90 font-sans-body font-light max-w-md text-left md:text-right leading-relaxed">
            Follow the journey of your handcrafted botanical formulation from our studio to your crown.
          </p>
        </div>
      </section>

      {/* Main Track Form */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto border border-[#17130F]/08 p-8 sm:p-12 space-y-8 text-left bg-[#D9CCB8]/20">
          <form onSubmit={handleTrackSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.2em] font-semibold text-[#7A746B]">
                ORDER NUMBER
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1001 or #1001"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-4 py-3.5 bg-transparent border border-[#17130F]/15 focus:border-[#17130F] text-sm font-sans-body text-[#17130F] placeholder-[#7A746B] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.2em] font-semibold text-[#7A746B]">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                placeholder="The email used at checkout"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-transparent border border-[#17130F]/15 focus:border-[#17130F] text-sm font-sans-body text-[#17130F] placeholder-[#7A746B] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#17130F] hover:bg-[#30382D] text-[#F5F0E6] font-semibold text-xs font-sans-body uppercase tracking-[0.22em] shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#B79B6B]" />
              <span>SEARCH SHOPIFY CARRIER TRACKING</span>
              <ExternalLink className="w-3 h-3 ml-1 text-[#B79B6B]" />
            </button>
          </form>

          {/* Fulfillment Notice */}
          <div className="p-4 border-t border-[#17130F]/08 flex items-start space-x-3 text-xs font-sans-body text-[#56604A]/90 font-light leading-relaxed">
            <Info className="w-4 h-4 text-[#56604A] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#17130F] block">Tracking Status Notice</span>
              <span>Live carrier tracking numbers are activated upon package handoff. You will automatically receive an email confirmation with direct courier links.</span>
            </div>
          </div>

          {/* Account Login Option */}
          <div className="pt-6 border-t border-[#17130F]/08 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-body text-[#56604A]">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-[#56604A]" />
              <span>Have a customer account?</span>
            </div>

            <button
              onClick={handleAccountLogin}
              className="text-[#17130F] hover:text-[#56604A] font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-1"
            >
              <span>View All Past Orders</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B79B6B]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
