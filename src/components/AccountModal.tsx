import React, { useState } from 'react';
import { DEMO_USER } from '../data/mockData';
import { ShopifyConfig } from '../types';
import { X, Crown, Package, MapPin, RefreshCw, Award, Copy, Check, ExternalLink, Store } from 'lucide-react';
import { buildShopifyAccountUrl, formatShopifyDomain } from '../utils/shopify';

interface AccountModalProps {
  isOpen: boolean;
  shopifyConfig: ShopifyConfig;
  onClose: () => void;
  onOpenShopifyConfig: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  shopifyConfig,
  onClose,
  onOpenShopifyConfig,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'rewards' | 'subscriptions' | 'addresses'>('orders');
  const [copiedReferral, setCopiedReferral] = useState(false);

  const domain = formatShopifyDomain(shopifyConfig.storeDomain);

  const handleOpenShopifyAccount = () => {
    const url = buildShopifyAccountUrl(shopifyConfig);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://safenia.com/refer?crown=CROWN2026');
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0c0c0d] border border-[#BF914A]/50 rounded-3xl p-6 sm:p-10 shadow-2xl text-white my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-black/80 hover:bg-[#BF914A] hover:text-black text-zinc-300 rounded-full border border-[#BF914A]/30 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#BF914A]/20 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full border-2 border-[#BF914A] bg-[#050505] flex items-center justify-center font-serif-luxury text-2xl text-[#BF914A] font-bold">
              {DEMO_USER.name[0]}
            </div>
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                {DEMO_USER.name}
              </h2>
              <div className="text-xs text-zinc-400">{DEMO_USER.email}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleOpenShopifyAccount}
              className="px-4 py-2 bg-[#BF914A] hover:bg-[#D8B26F] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1.5 shadow-lg cursor-pointer"
            >
              <span>Shopify Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-6 border-b border-zinc-800 my-6 text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'border-[#BF914A] text-[#D8B26F]' : 'border-transparent text-zinc-500'
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'rewards' ? 'border-[#BF914A] text-[#D8B26F]' : 'border-transparent text-zinc-500'
            }`}
          >
            Crown Rewards
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'subscriptions' ? 'border-[#BF914A] text-[#D8B26F]' : 'border-transparent text-zinc-500'
            }`}
          >
            Auto-Refills
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'addresses' ? 'border-[#BF914A] text-[#D8B26F]' : 'border-transparent text-zinc-500'
            }`}
          >
            Addresses
          </button>
        </div>

        {/* Tab Contents */}
        <div className="py-2 text-xs text-zinc-300 text-left">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {DEMO_USER.orders.map((ord) => (
                <div key={ord.id} className="p-5 bg-black/60 rounded-2xl border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                    <div className="font-serif-luxury font-bold text-white text-sm">{ord.id}</div>
                    <span className="bg-[#BF914A]/20 text-[#D8B26F] px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase">
                      {ord.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-zinc-400">
                    <div>Date: {ord.date}</div>
                    <div>Tracking: <span className="text-white font-mono">{ord.trackingNumber}</span> ({ord.courier})</div>
                    <div>Destination: {ord.shippingAddress}</div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-white font-bold">
                    <span>Total Amount</span>
                    <span className="text-[#D8B26F] font-serif-luxury text-base">${ord.total.toFixed(2)} USD</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-[#141418] to-[#0a0a0d] rounded-2xl border border-[#BF914A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-[#D8B26F] font-semibold text-xs uppercase tracking-widest">
                    Available Crown Points
                  </div>
                  <div className="text-4xl font-serif-luxury font-bold text-white mt-1">
                    {DEMO_USER.crownPoints} <span className="text-lg font-normal text-zinc-400">Pts</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Redeem 500 points for $15 OFF any full-size botanical oil.
                  </p>
                </div>
                <button className="px-6 py-3 bg-[#BF914A] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#D8B26F] transition-colors cursor-pointer">
                  Redeem Reward
                </button>
              </div>

              <div className="p-4 bg-black/60 rounded-xl border border-zinc-800 space-y-2">
                <div className="font-semibold text-[#F3E5C8]">Refer-A-Friend</div>
                <p className="text-zinc-400 font-light">
                  Give $20 OFF their first order and earn 500 Crown Points when they complete checkout.
                </p>
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    readOnly
                    value="https://safenia.com/refer?crown=CROWN2026"
                    className="flex-1 bg-black border border-zinc-800 p-2 rounded text-zinc-300"
                  />
                  <button
                    onClick={handleCopyReferral}
                    className="px-4 py-2 bg-zinc-800 hover:bg-[#BF914A] hover:text-black text-white rounded font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedReferral ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedReferral ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="space-y-3">
              {DEMO_USER.subscriptions.map((sub, idx) => (
                <div key={idx} className="p-4 bg-black/60 rounded-xl border border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="font-serif-luxury font-bold text-white text-sm">{sub.productName}</div>
                    <div className="text-zinc-400 text-[11px]">{sub.interval} • Next Refill: {sub.nextDelivery}</div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded text-[10px] font-semibold uppercase">
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-3">
              {DEMO_USER.addresses.map((addr, idx) => (
                <div key={idx} className="p-3 bg-black/60 rounded-xl border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-300">{addr}</span>
                  <span className="text-[10px] text-[#D8B26F] uppercase font-bold">Default</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
