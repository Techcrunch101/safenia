import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#30382D] text-[#F5F0E6]">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.34em] font-sans-body font-semibold text-[#A7AD98] block">
            PRIVATE ACCESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-luxury font-normal tracking-tight text-[#F5F0E6]">
            JOIN THE SAFENIA CIRCLE
          </h2>
          <p className="text-sm sm:text-base text-[#D9CCB8]/90 font-sans-body font-light max-w-lg mx-auto leading-relaxed">
            Exclusive botanical launches, hair care wisdom, and private invitations.
          </p>
        </div>

        {isSubscribed ? (
          <div className="py-5 px-8 bg-[#24211D]/80 border border-[#D9CCB8]/20 max-w-md mx-auto flex items-center justify-center space-x-3 text-sm tracking-wide text-[#F5F0E6]">
            <Check className="w-4 h-4 text-[#B79B6B]" />
            <span className="font-sans-body font-light">Welcome to the circle. Check your inbox shortly.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row items-stretch border-b border-[#F5F0E6]/30 focus-within:border-[#B79B6B] transition-colors duration-300 pb-1"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent py-3.5 px-3 text-sm text-[#F5F0E6] placeholder-[#D9CCB8]/60 focus:outline-none font-sans-body font-light text-center sm:text-left"
            />
            <button
              type="submit"
              className="py-3 px-5 text-[11px] uppercase tracking-[0.24em] font-sans-body font-semibold text-[#F5F0E6] hover:text-[#B79B6B] transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer shrink-0"
            >
              <span>JOIN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

