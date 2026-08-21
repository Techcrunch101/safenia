import React, { useState } from 'react';
import { CartItem, Currency, ShopifyConfig } from '../types';
import { formatPrice } from '../data/currencies';
import { X, Trash2, ArrowRight, Gift, ShoppingBag, ExternalLink, ShieldCheck, Sparkles, Store } from 'lucide-react';
import { buildShopifyCheckoutUrl } from '../utils/shopify';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  selectedCurrency: Currency;
  shopifyConfig: ShopifyConfig;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, giftNote: string) => void;
  onOpenShopifyConfig: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cartItems,
  selectedCurrency,
  shopifyConfig,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOpenShopifyConfig,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(false);

  const subtotalUSD = cartItems.reduce((acc, item) => {
    const base = item.isSubscription ? item.product.price * 0.85 : item.product.price;
    return acc + base * item.quantity;
  }, 0);

  const freeShippingThresholdUSD = 120;
  const progressPercentage = Math.min(100, (subtotalUSD / freeShippingThresholdUSD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'CROWN20' || code === 'SAFENIA20') {
      setAppliedDiscount(0.2); // 20% off
      setCouponError('');
    } else if (code === 'ROYAL10' || code === 'WELCOME10') {
      setAppliedDiscount(0.1);
      setCouponError('');
    } else {
      setCouponError('Try code "CROWN20" for 20% off your crown ritual.');
    }
  };

  const discountAmountUSD = subtotalUSD * appliedDiscount;
  const finalTotalUSD = subtotalUSD - discountAmountUSD;

  // Direct Shopify Checkout link handler
  const handleShopifyCheckout = () => {
    if (shopifyConfig.useDirectShopifyCheckout) {
      const url = buildShopifyCheckoutUrl(
        cartItems,
        shopifyConfig,
        appliedDiscount > 0 ? (couponCode || 'CROWN20') : undefined,
        giftNote
      );
      window.open(url, '_blank');
    } else {
      onProceedToCheckout(appliedDiscount, giftNote);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden glass-dark backdrop-blur-md flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-[#0c0c0d] border-l border-[#BF914A]/40 h-full flex flex-col justify-between p-6 shadow-2xl text-white">
        {/* Cart Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#BF914A]/20">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#BF914A]" />
              <h2 className="text-xl font-serif-luxury font-bold text-white uppercase tracking-wider">
                Shopping Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="py-3.5 border-b border-zinc-800 space-y-1.5">
            <div className="flex justify-between text-xs text-[#D8B26F]">
              <span>
                {subtotalUSD >= freeShippingThresholdUSD
                  ? '🎉 You unlocked Free Express Worldwide Shipping!'
                  : `Add ${formatPrice(freeShippingThresholdUSD - subtotalUSD, selectedCurrency)} for Free Express Shipping`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#75410A] to-[#BF914A] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const unitPriceUSD = item.isSubscription ? item.product.price * 0.85 : item.product.price;
              return (
                <div
                  key={item.product.id}
                  className="p-3 bg-black/60 rounded-xl border border-zinc-800 flex items-center space-x-3 text-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-[#BF914A]/30 shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="font-serif-luxury text-sm font-bold text-white leading-tight">
                      {item.product.name}
                    </div>
                    {item.isSubscription && (
                      <span className="text-[10px] text-[#D8B26F] font-semibold bg-[#BF914A]/20 px-2 py-0.5 rounded">
                        Auto-Refill ({item.subscriptionInterval})
                      </span>
                    )}
                    <div className="text-zinc-400 text-[11px]">{item.product.volume}</div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-zinc-700 rounded px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-1 text-zinc-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-white font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-1 text-zinc-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-serif-luxury font-bold text-white text-sm">
                        {formatPrice(unitPriceUSD * item.quantity, selectedCurrency)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-zinc-500 text-xs space-y-2">
              <ShoppingBag className="w-8 h-8 text-[#BF914A]/40 mx-auto" />
              <p className="font-serif-luxury text-lg text-zinc-400">Your Cart is Empty</p>
              <p>Explore our cold-pressed botanical hair oils to begin.</p>
            </div>
          )}
        </div>

        {/* Footer Actions & Summary */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-[#BF914A]/20 space-y-3.5">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Discount Code (e.g. CROWN20)"
                className="flex-1 bg-black/80 border border-zinc-800 text-xs px-3 py-2 rounded-lg text-white placeholder-zinc-500 focus:outline-none uppercase"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#BF914A]/30 text-[#D8B26F] hover:bg-[#BF914A] hover:text-black border border-[#BF914A]/50 text-xs uppercase font-bold rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            {couponError && <p className="text-[10px] text-red-400">{couponError}</p>}
            {appliedDiscount > 0 && (
              <p className="text-[10px] text-green-400">✓ 20% Botanical Discount Applied!</p>
            )}

            {/* Gift Note Toggle */}
            <button
              onClick={() => setShowGiftInput(!showGiftInput)}
              className="text-xs text-[#D8B26F] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{showGiftInput ? 'Hide Gift Message' : 'Add Complimentary Gift Message'}</span>
            </button>
            {showGiftInput && (
              <textarea
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Write your custom luxury gift message..."
                className="w-full bg-black/80 border border-zinc-800 rounded-lg p-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                rows={2}
              />
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalUSD, selectedCurrency)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmountUSD, selectedCurrency)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-white text-base font-serif-luxury pt-1 border-t border-zinc-800">
                <span>Total</span>
                <span className="text-[#D8B26F]">{formatPrice(finalTotalUSD, selectedCurrency)}</span>
              </div>
            </div>

            {/* Shopify Store Connection pill indicator */}
            <div className="flex items-center justify-between text-[11px] text-zinc-400 bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-[#96BF48]" />
                <span>Shopify: <strong className="text-zinc-200">{shopifyConfig.storeDomain}</strong></span>
              </span>
              <button
                onClick={onOpenShopifyConfig}
                className="text-[#D8B26F] hover:underline cursor-pointer font-medium"
              >
                Configure
              </button>
            </div>

            {/* Primary Shopify Checkout Button */}
            <button
              onClick={handleShopifyCheckout}
              className="w-full py-4 bg-gradient-to-r from-[#75410A] via-[#BF914A] to-[#D8B26F] hover:from-[#9E6924] hover:to-[#F3E5C8] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-2xl transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Checkout with Shopify</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
