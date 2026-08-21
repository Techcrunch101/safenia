import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../data/currencies';
import { X, ShieldCheck, CheckCircle2, CreditCard, Lock, ArrowRight, Printer } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  selectedCurrency: Currency;
  appliedDiscount: number;
  giftNote: string;
  onClose: () => void;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  cartItems,
  selectedCurrency,
  appliedDiscount,
  giftNote,
  onClose,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'mpesa' | 'flutterwave' | 'paypal'>('card');
  const [fullName, setFullName] = useState('Lady Vivienne Thorne');
  const [email, setEmail] = useState('vivienne.thorne@safenia.com');
  const [phone, setPhone] = useState('+1 (555) 839-2049');
  const [address, setAddress] = useState('45 Park Lane, Mayfair, London W1K 1PN, United Kingdom');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [mpesaNumber, setMpesaNumber] = useState('254712345678');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  const subtotalUSD = cartItems.reduce((acc, item) => {
    const base = item.isSubscription ? item.product.price * 0.85 : item.product.price;
    return acc + base * item.quantity;
  }, 0);

  const discountUSD = subtotalUSD * appliedDiscount;
  const finalTotalUSD = subtotalUSD - discountUSD;

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((i) => ({
            productName: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
            image: i.product.image,
          })),
          shippingAddress: address,
          paymentMethod: paymentMethod.toUpperCase(),
          total: finalTotalUSD,
          currency: selectedCurrency.code,
        }),
      });

      const data = await response.json();
      if (data.success && data.order) {
        setCompletedOrder(data.order);
      }
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto glass-dark backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0c0c0d] border border-[#BF914A]/50 rounded-3xl p-6 sm:p-10 shadow-2xl text-white my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-black/80 hover:bg-[#BF914A] hover:text-black text-zinc-300 rounded-full border border-[#BF914A]/30 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!completedOrder ? (
          <form onSubmit={handleCompleteOrder} className="space-y-6">
            <div className="border-b border-[#BF914A]/20 pb-4">
              <div className="flex items-center space-x-2 text-[#D8B26F] text-xs uppercase tracking-[0.25em] font-semibold mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                Complete Your Safenia Order
              </h2>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#F3E5C8]">1. Delivery Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#BF914A]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#BF914A]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-zinc-400 block mb-1">Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#BF914A]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#F3E5C8]">2. Payment Method</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'card', name: 'Credit / Debit' },
                  { id: 'applepay', name: 'Apple Pay' },
                  { id: 'mpesa', name: 'M-Pesa Express' },
                  { id: 'flutterwave', name: 'Flutterwave / Card' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'border-[#BF914A] bg-[#BF914A]/20 text-[#F3E5C8]'
                        : 'border-zinc-800 bg-black/40 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {pm.name}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 bg-black/60 rounded-xl border border-zinc-800 space-y-2 text-xs">
                  <label className="text-zinc-400 block">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                  />
                </div>
              )}

              {paymentMethod === 'mpesa' && (
                <div className="p-4 bg-black/60 rounded-xl border border-zinc-800 space-y-2 text-xs">
                  <label className="text-zinc-400 block">Safaricom M-Pesa Phone Number (254...)</label>
                  <input
                    type="text"
                    value={mpesaNumber}
                    onChange={(e) => setMpesaNumber(e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                  />
                  <p className="text-[10px] text-zinc-500">
                    An STK Push prompt will be sent directly to your phone for PIN confirmation.
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary & Pay Action */}
            <div className="pt-4 border-t border-zinc-800 space-y-4">
              <div className="flex justify-between items-center text-sm font-serif-luxury font-bold">
                <span>Total Due</span>
                <span className="text-xl text-[#D8B26F]">
                  {formatPrice(finalTotalUSD, selectedCurrency)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#75410A] via-[#BF914A] to-[#D8B26F] hover:from-[#9E6924] hover:to-[#F3E5C8] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-2xl transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Processing Payment...' : 'Authorize Payment'}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </form>
        ) : (
          /* Order Confirmation View */
          <div className="space-y-6 animate-fadeIn text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#BF914A]/20 border-2 border-[#BF914A] flex items-center justify-center mx-auto text-[#BF914A]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D8B26F] font-semibold">
                Order Confirmed & Prepared
              </span>
              <h2 className="text-3xl font-serif-luxury font-bold text-white">
                Thank You for Choosing Safenia
              </h2>
              <p className="text-xs text-zinc-400 font-light">
                Your order receipt and tracking credentials have been dispatched to {email}.
              </p>
            </div>

            <div className="p-6 glass-gold rounded-2xl border border-[#BF914A]/30 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-zinc-800 pb-2 font-semibold">
                <span>Order Reference:</span>
                <span className="text-[#D8B26F]">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Tracking Number:</span>
                <span className="text-white">{completedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Courier:</span>
                <span className="text-white">{completedOrder.courier}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Shipping Address:</span>
                <span className="text-white">{completedOrder.shippingAddress}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#D8B26F] pt-1">
                <span>Crown Rewards Points Earned:</span>
                <span>+{completedOrder.crownPointsEarned} Crown Points</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 border border-[#BF914A]/60 text-[#D8B26F] hover:bg-[#BF914A] hover:text-black text-xs uppercase font-bold tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => {
                  onOrderCompleted();
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#BF914A] hover:bg-[#D8B26F] text-black text-xs uppercase font-bold tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Return to Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
