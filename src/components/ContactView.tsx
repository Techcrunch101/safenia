import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, ChevronUp, MessageSquare, Clock } from 'lucide-react';
import { SafeniaLogo } from './SafeniaLogo';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  const faqs = [
    {
      question: 'How do I choose the right Safenia oil for my hair type?',
      answer:
        'If you are seeking length retention and thickness, we recommend our Crown Growth Elixir. For dry curls, locs, and coils needing weightless hydration, choose Botanical Moisture Nectar. For tight scalp tension, itchiness, or protective styles (braids/locs), the Botanical Scalp Therapy Drops provide immediate cooling relief.',
    },
    {
      question: 'Are Safenia oils safe for starter locs and sisterlocs?',
      answer:
        'Yes, absolutely! We formulated our Royal Loc Nectar specifically with cold-pressed Golden Jojoba and Kalahari Melon Seed Oil, which have near-zero wax ester residue and will never leave buildup or attract lint into your locs.',
    },
    {
      question: 'How long will one bottle last?',
      answer:
        'Because our formulas are 100% pure concentrated botanical oils with no fillers or diluted water bases, a 50ml bottle typically lasts 6 to 8 weeks when applied 3 to 4 times per week.',
    },
    {
      question: 'How is checkout and shipping handled?',
      answer:
        'All checkouts, payments (Credit Cards, Apple Pay, PayPal, M-Pesa), and worldwide shipping are securely handled by Shopify. Once your order is placed, you receive instant email and SMS tracking updates.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We take immense pride in the craftsmanship of our oils. If you experience any issues with your shipment, please contact us within 14 days of delivery at safenialuxuryoils@gmail.com and our team will gladly resolve it.',
    },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* Header Banner */}
      <section className="relative py-20 overflow-hidden border-b border-[#BF914A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#111114] border border-[#BF914A]/40 text-[#D8B26F] text-xs font-bold uppercase tracking-[0.25em]">
            <Mail className="w-3.5 h-3.5 text-[#BF914A]" />
            <span>Customer Care</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
            Get In Touch
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Have questions about our botanical formulations, order tracking, or wholesale inquiries? We are here to serve your crown.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8B26F] font-bold">
                Direct Contact
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                We’d Love to Hear From You
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Whether you need botanical routine guidance or want to check on a custom gift order, reach out directly.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <a
                href="mailto:safenialuxuryoils@gmail.com"
                className="p-5 rounded-2xl bg-[#0c0c0f] border border-zinc-800 hover:border-[#BF914A]/60 transition-all flex items-center space-x-4 group block cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#BF914A]/10 border border-[#BF914A]/30 flex items-center justify-center text-[#D8B26F] group-hover:bg-[#BF914A] group-hover:text-black transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Email Us</div>
                  <div className="text-white font-medium text-sm group-hover:text-[#D8B26F] transition-colors">
                    safenialuxuryoils@gmail.com
                  </div>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-[#0c0c0f] border border-zinc-800 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#BF914A]/10 border border-[#BF914A]/30 flex items-center justify-center text-[#D8B26F] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Response Hours</div>
                  <div className="text-white font-medium text-sm">
                    Monday – Saturday: 9:00 AM – 6:00 PM
                  </div>
                  <div className="text-xs text-zinc-400">Average response time under 12 hours</div>
                </div>
              </div>
            </div>

            {/* Slogan Pill */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#141418] to-[#0a0a0d] border-l-2 border-[#BF914A]">
              <div className="text-xs text-[#D8B26F] font-bold uppercase tracking-widest">
                Safenia Luxury Oils
              </div>
              <div className="text-sm font-serif-luxury text-zinc-300 italic mt-1">
                “Nature’s Care for Every Crown”
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0c0c0f] border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-left">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif-luxury font-bold text-white">
                    Message Received
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Safenia Luxury Oils. Our botanical concierge will reply to{' '}
                    <span className="text-[#D8B26F]">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lady Vivienne"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-black/60 border border-zinc-700 focus:border-[#BF914A] rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-black/60 border border-zinc-700 focus:border-[#BF914A] rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Product Inquiry / Order Question"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-zinc-700 focus:border-[#BF914A] rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="How can we assist you and your crown today?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-zinc-700 focus:border-[#BF914A] rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#75410A] via-[#BF914A] to-[#D8B26F] hover:from-[#9E6924] hover:to-[#F3E5C8] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-[#08080b] border-t border-[#BF914A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8B26F] font-bold">
              Got Questions?
            </span>
            <h2 className="text-3xl font-serif-luxury font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0c0c0f] border border-zinc-800 rounded-2xl overflow-hidden text-left"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:text-[#D8B26F] transition-colors cursor-pointer"
                  >
                    <span className="font-serif-luxury font-semibold text-white text-sm sm:text-base">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#BF914A] shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 ml-4" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-900 pt-3 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
