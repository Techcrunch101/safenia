import React from 'react';
import { ShopifyCart } from '../types';
import { formatPrice, isShopifyConfigured } from '../utils/shopify';
import { X, Trash2, ArrowRight, ShoppingBag, Leaf, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface CartDrawerProps {
  isOpen: boolean;
  cart: ShopifyCart | null;
  isLoading?: boolean;
  onClose: () => void;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemoveItem: (lineId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  isLoading = false,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const lines = cart?.lines || [];
  const totalQuantity = cart?.totalQuantity || 0;
  const subtotal = cart?.cost?.subtotalAmount?.amount ? Number(cart.cost.subtotalAmount.amount) : 0;
  const currencyCode = cart?.cost?.subtotalAmount?.currencyCode || 'USD';
  const hasConfiguredShopify = isShopifyConfigured();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#0B0908] border-l border-[#D4AF37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between text-[#F5F0E6]">
          
          {/* Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-serif-luxury text-2xl tracking-wide text-[#F5F0E6]">
                {t('cart_title', 'YOUR BAG')}
              </span>
              <span className="bg-[#D4AF37] text-[#0B0908] text-[10px] font-sans-body font-bold px-2.5 py-0.5 rounded-xs">
                {totalQuantity}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#B3ACA0] hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Line Items List */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
            {!hasConfiguredShopify && (
              <div className="p-3 border border-[#D4AF37]/30 bg-[#14110E] text-[11px] font-sans-body text-[#D4AF37] flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#D4AF37]" />
                <span>Storefront Preview Mode: Connect your Shopify Storefront Token in Settings to enable live cart synchronization.</span>
              </div>
            )}

            {lines.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-14 h-14 bg-[#14110E] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-2xl text-[#F5F0E6]">
                    {t('cart_empty_title', 'Your bag is empty')}
                  </h3>
                  <p className="text-xs text-[#B3ACA0] max-w-xs leading-relaxed font-sans-body font-light">
                    {t(
                      'cart_empty_desc',
                      'Explore our botanical formulations to begin your intentional crown care journey.'
                    )}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="px-7 py-3.5 bg-[#D4AF37] text-[#0B0908] text-[11px] font-semibold uppercase tracking-[0.22em] font-sans-body cursor-pointer hover:bg-[#F3E5AB] transition-colors duration-300"
                >
                  {t('cart_continue_shopping', 'EXPLORE THE COLLECTION')}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {lines.map((item) => {
                  const unitPrice = item.selectedVariant.price;
                  const itemTotal = unitPrice * item.quantity;
                  const image = item.product.featuredImage || item.product.images[0] || '';
                  const isAvailable = item.selectedVariant.availableForSale !== false;

                  return (
                    <div
                      key={item.id}
                      className="flex space-x-4 p-3.5 bg-[#14110E] border border-[#D4AF37]/15 text-left"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-20 bg-[#0B0908] border border-[#D4AF37]/10 overflow-hidden shrink-0">
                        <img
                          src={image}
                          alt={item.product.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif-luxury text-base text-[#F5F0E6] line-clamp-1">
                              {item.product.title}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[#7A746B] hover:text-[#D4AF37] transition-colors p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {item.selectedVariant.title && item.selectedVariant.title !== 'Default Title' && (
                            <div className="text-[9.5px] text-[#D4AF37] uppercase tracking-wider font-sans-body">
                              {item.selectedVariant.title}
                            </div>
                          )}
                          {!isAvailable && (
                            <div className="text-[9px] text-red-400 font-sans-body uppercase tracking-wider font-medium">
                              Currently Out of Stock
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Stepper */}
                          <div className="flex items-center border border-[#D4AF37]/30 bg-[#0B0908]">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-0.5 text-xs text-[#F5F0E6] hover:bg-[#D4AF37]/20 transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2.5 text-xs font-semibold font-sans-body text-[#F5F0E6]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-0.5 text-xs text-[#F5F0E6] hover:bg-[#D4AF37]/20 transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          {/* Item Price */}
                          <div className="text-base font-serif-luxury font-semibold text-[#D4AF37]">
                            {formatPrice(itemTotal, currencyCode)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {lines.length > 0 && (
            <div className="p-6 sm:p-8 border-t border-[#D4AF37]/20 bg-[#14110E] space-y-4 text-left">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans-body uppercase tracking-[0.22em] font-semibold text-[#B3ACA0]">
                    {t('cart_subtotal', 'SUBTOTAL')}
                  </span>
                  <span className="font-serif-luxury font-medium text-2xl text-[#D4AF37]">
                    {formatPrice(subtotal, currencyCode)}
                  </span>
                </div>
                <p className="text-[11px] text-[#B3ACA0]/80 font-sans-body font-light">
                  {t('cart_shipping_notice', 'Taxes and shipping calculated securely at Shopify checkout.')}
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <button
                  onClick={onCheckout}
                  disabled={isLoading}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0908] font-bold text-xs uppercase tracking-[0.24em] font-sans-body transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0B0908]" />
                      <span>GENERATING CHECKOUT...</span>
                    </>
                  ) : (
                    <>
                      <span>{t('cart_checkout_btn', 'PROCEED TO SHOPIFY CHECKOUT')}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#0B0908]" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-1.5 pt-1 text-[10px] text-[#B3ACA0] font-sans-body">
                  <Leaf className="w-3 h-3 text-[#D4AF37]" />
                  <span>Carefully packaged with 100% recyclable luxury materials.</span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="w-full py-2 text-[#B3ACA0] hover:text-[#D4AF37] text-[11px] font-medium uppercase tracking-[0.2em] font-sans-body transition-colors cursor-pointer text-center"
                >
                  {t('cart_continue_shopping', 'CONTINUE BROWSING')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


