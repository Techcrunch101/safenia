import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, Clock, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Unable to deliver message at this moment. Please email us directly at safenialuxuryoils@gmail.com.');
      }
    } catch (err) {
      setErrorMessage('Network connection error. Please try again or email us directly at safenialuxuryoils@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0B0908] text-[#F5F0E6] min-h-screen pt-28 pb-32">
      {/* Editorial Header */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#D4AF37]/20 gap-6">
          <div className="text-left space-y-3">
            <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.34em] font-semibold text-[#D4AF37] block">
              CUSTOMER CONCIERGE
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif-luxury font-normal text-[#F5F0E6] tracking-tight">
              LET’S TALK
            </h1>
          </div>
          <div className="text-left md:text-right space-y-1">
            <p className="text-xs sm:text-sm text-[#B3ACA0] font-sans-body font-light">For inquiries, wholesale, or crown care advice:</p>
            <a
              href="mailto:safenialuxuryoils@gmail.com"
              className="text-sm font-sans-body text-[#D4AF37] hover:text-[#F5F0E6] font-semibold transition-colors inline-block tracking-wide"
            >
              safenialuxuryoils@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="border border-[#D4AF37]/20 p-8 space-y-6 bg-[#14110E]">
              <h3 className="font-serif-luxury text-2xl text-[#F5F0E6]">
                Safenia Concierge
              </h3>

              <div className="space-y-4 text-xs font-sans-body text-[#B3ACA0] font-light">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#F5F0E6] block">Direct Email</span>
                    <a href="mailto:safenialuxuryoils@gmail.com" className="hover:text-[#D4AF37] transition-colors">
                      safenialuxuryoils@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#F5F0E6] block">Concierge Hours</span>
                    <span>Monday – Friday: 9:00 AM – 5:00 PM EST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border border-[#D4AF37]/20 space-y-3 text-left bg-[#14110E]">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h4 className="font-serif-luxury text-lg text-[#F5F0E6]">
                  Bespoke Formulation Advice
                </h4>
              </div>
              <p className="text-xs text-[#B3ACA0] font-sans-body font-light leading-relaxed">
                Unsure which botanical formulation suits your scalp density or loc care routine? Detail your crown's current regimen in your message for tailored guidance from our specialists.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 border border-[#D4AF37]/20 p-8 sm:p-12 text-left bg-[#14110E]">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mx-auto animate-fadeIn" />
                <h3 className="font-serif-luxury text-3xl text-[#F5F0E6]">
                  Inquiry Received
                </h3>
                <p className="text-sm text-[#B3ACA0] font-sans-body max-w-md mx-auto font-light leading-relaxed">
                  Thank you for connecting with Safenia Luxury Oils. Our concierge has logged your message and will respond to <span className="text-[#D4AF37] font-medium">{formData.email}</span> within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="px-6 py-3 bg-[#D4AF37] text-[#0B0908] text-xs font-sans-body font-semibold uppercase tracking-[0.22em] cursor-pointer hover:bg-[#F3E5AB] transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 border border-red-500/40 bg-red-950/30 text-red-300 text-xs font-sans-body flex items-start space-x-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.2em] font-semibold text-[#B3ACA0]">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-[#0B0908] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-sm font-sans-body text-[#F5F0E6] placeholder-[#7A746B] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.2em] font-semibold text-[#B3ACA0]">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-[#0B0908] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-sm font-sans-body text-[#F5F0E6] placeholder-[#7A746B] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.2em] font-semibold text-[#B3ACA0]">
                    TOPIC
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#0B0908] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-sm font-sans-body text-[#F5F0E6] focus:outline-none cursor-pointer transition-colors"
                  >
                    <option value="General Inquiry" className="bg-[#0B0908] text-[#F5F0E6]">General Inquiry</option>
                    <option value="Product Recommendation" className="bg-[#0B0908] text-[#F5F0E6]">Hair & Scalp Care Recommendation</option>
                    <option value="Order Support" className="bg-[#0B0908] text-[#F5F0E6]">Shopify Order Support</option>
                    <option value="Wholesale" className="bg-[#0B0908] text-[#F5F0E6]">Wholesale & Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.2em] font-semibold text-[#B3ACA0]">
                    MESSAGE *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How may our concierge assist your crown today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#0B0908] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-sm font-sans-body text-[#F5F0E6] placeholder-[#7A746B] focus:outline-none resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0908] font-semibold text-xs font-sans-body uppercase tracking-[0.24em] shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0B0908]" />
                      <span>TRANSMITTING INQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#0B0908]" />
                      <span>SUBMIT INQUIRY</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
