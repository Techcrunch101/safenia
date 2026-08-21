import React, { useState } from 'react';
import { ShoppingBag, Check, ArrowRight, ExternalLink, Sparkles, ShieldCheck, RefreshCw, X } from 'lucide-react';
import { ShopifyConfig } from '../types';
import { saveShopifyConfig } from '../utils/shopify';

interface ShopifySettingsModalProps {
  isOpen: boolean;
  config: ShopifyConfig;
  onClose: () => void;
  onUpdateConfig: (newConfig: ShopifyConfig) => void;
}

export const ShopifySettingsModal: React.FC<ShopifySettingsModalProps> = ({
  isOpen,
  config,
  onClose,
  onUpdateConfig,
}) => {
  if (!isOpen) return null;

  const [domain, setDomain] = useState(config.storeDomain);
  const [useDirect, setUseDirect] = useState(config.useDirectShopifyCheckout);
  const [token, setToken] = useState(config.storefrontAccessToken || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = domain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const updated: ShopifyConfig = {
      storeDomain: cleanDomain || 'safenialuxuryoils.myshopify.com',
      storefrontAccessToken: token.trim(),
      currencyCode: 'USD',
      useDirectShopifyCheckout: useDirect,
    };
    saveShopifyConfig(updated);
    onUpdateConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleTestLink = () => {
    const cleanDomain = domain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '') || 'safenialuxuryoils.myshopify.com';
    window.open(`https://${cleanDomain}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto glass-dark backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0c0c0d] border border-[#BF914A]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full bg-black/60 border border-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#96BF48]/10 border border-[#96BF48]/40 flex items-center justify-center text-[#96BF48]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-serif-luxury font-bold text-white">
                Shopify Account Integration
              </h3>
              <span className="text-[10px] bg-[#96BF48]/20 text-[#96BF48] font-bold px-2 py-0.5 rounded-full border border-[#96BF48]/30">
                Connected
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-light">
              Link your live Shopify store so orders & checkouts sync directly to your Shopify admin.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div>
            <label className="block text-zinc-300 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
              Shopify Store Domain / URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. safenialuxuryoils.myshopify.com or safenialuxuryoils.com"
                className="w-full bg-black/80 border border-[#BF914A]/40 rounded-xl px-4 py-3 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#D8B26F]"
                required
              />
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">
              Enter your standard `your-store.myshopify.com` or custom custom domain.
            </p>
          </div>

          {/* Direct Checkout Toggle */}
          <div className="p-4 bg-black/60 border border-zinc-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-white text-xs">Direct Shopify Cart Checkout</div>
                <div className="text-[11px] text-zinc-400">
                  When enabled, clicking "Checkout" opens your Shopify checkout permalink with your items automatically populated.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useDirect}
                  onChange={(e) => setUseDirect(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#BF914A]"></div>
              </label>
            </div>
          </div>

          {/* Features info */}
          <div className="p-4 bg-[#BF914A]/5 border border-[#BF914A]/20 rounded-2xl space-y-2">
            <div className="text-[11px] font-semibold text-[#D8B26F] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How It Works With Your Shopify Store:</span>
            </div>
            <ul className="text-[11px] text-zinc-400 space-y-1 list-disc list-inside">
              <li>Customers browse this high-speed, custom luxury front-end.</li>
              <li>Add to cart items are formatted with quantities and applied discount codes.</li>
              <li>Checkout redirects straight to your official Shopify SSL checkout page with all payment gateways (Shop Pay, Apple Pay, Cards, PayPal) handled by Shopify.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between space-x-3">
            <button
              type="button"
              onClick={handleTestLink}
              className="px-4 py-3 bg-black/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer text-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit Store</span>
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-[#75410A] via-[#BF914A] to-[#D8B26F] hover:from-[#9E6924] hover:to-[#F3E5C8] text-black font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer text-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Shopify Settings Saved!</span>
                </>
              ) : (
                <>
                  <span>Save Shopify Link</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
