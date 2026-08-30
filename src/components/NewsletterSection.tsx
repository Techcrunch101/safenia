import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubscribed(true);
      } else {
        setErrorMessage(data.error || 'Failed to join the Circle. Please try again.');
      }
    } catch {
      setErrorMessage('Network connection error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#0B0908] text-[#F5F0E6] relative overflow-hidden border-t border-[#D4AF37]/15">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#14110E] border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-semibold uppercase tracking-[0.28em]">
          <Mail className="w-3 h-3 text-[#D4AF37]" />
          <span>The Safenia Circle</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-normal text-[#F5F0E6]">
          Join the Safenia Ritual
        </h2>

        <p className="text-xs sm:text-sm text-[#B3ACA0] max-w-xl mx-auto font-light leading-relaxed">
          Be the first to receive invitations to private micro-batch reserves, botanical hair wisdom, and slow beauty insights.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center space-x-2.5 px-6 py-4 bg-[#14110E] border border-[#D4AF37]/40 text-[#F5F0E6] animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-medium">
              Welcome to the Safenia Circle. You will receive private botanical insights and micro-batch announcements.
            </span>
          </div>
        ) : (
          <div className="space-y-3 max-w-md mx-auto">
            {errorMessage && (
              <div className="p-3 border border-red-500/40 bg-red-950/30 text-red-300 text-xs font-sans-body flex items-center justify-center space-x-2">
                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 pt-1"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="flex-1 px-5 py-3.5 bg-[#14110E] border border-[#D4AF37]/25 text-[#F5F0E6] placeholder-[#B3ACA0]/60 text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3.5 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0908] font-semibold text-[11px] uppercase tracking-[0.24em] transition-all flex items-center justify-center space-x-2 cursor-pointer shrink-0 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
