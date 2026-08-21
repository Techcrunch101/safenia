import React, { useState } from 'react';
import { X, MessageSquare, Mail, Globe, Send, ShieldCheck, Sparkles, Building, UserCheck } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'concierge' | 'distributor' | 'wholesale' | 'ambassador'>('concierge');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto glass-dark backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0c0c0d] border border-[#BF914A]/50 rounded-3xl p-6 sm:p-10 shadow-2xl text-white my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-black/80 hover:bg-[#BF914A] hover:text-black text-zinc-300 rounded-full border border-[#BF914A]/30 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center space-x-2 text-[#D8B26F] text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Safenia Luxury Concierge</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white">
            Connect With The House
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Whether inquiring about personalized hair rituals, international shipping, wholesale distribution, or ambassador partnerships—our trichology team is at your service.
          </p>
        </div>

        {/* Quick Contact Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <a
            href="https://wa.me/15558392049"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-black/60 hover:bg-[#BF914A]/20 border border-[#BF914A]/30 rounded-2xl flex items-center space-x-3 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#128C7E]/20 border border-[#128C7E]/50 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-serif-luxury">WhatsApp Live Concierge</div>
              <div className="text-[10px] text-[#25D366] font-medium">+1 (555) 839-2049</div>
            </div>
          </a>

          <a
            href="mailto:concierge@safenia.com"
            className="p-4 bg-black/60 hover:bg-[#BF914A]/20 border border-[#BF914A]/30 rounded-2xl flex items-center space-x-3 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#BF914A]/20 border border-[#BF914A]/50 flex items-center justify-center text-[#D8B26F] group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-serif-luxury">Email Priority Desk</div>
              <div className="text-[10px] text-[#D8B26F] font-medium">concierge@safenia.com</div>
            </div>
          </a>

          <div className="p-4 bg-black/60 border border-[#BF914A]/30 rounded-2xl flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#75410A]/20 border border-[#75410A]/50 flex items-center justify-center text-[#F3E5C8]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-serif-luxury">Global Headquarters</div>
              <div className="text-[10px] text-zinc-400">London • Nairobi • Dubai</div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-zinc-800 pb-3">
          {[
            { id: 'concierge', label: 'General Concierge', icon: Mail },
            { id: 'distributor', label: 'Distributor Inquiries', icon: Globe },
            { id: 'wholesale', label: 'Wholesale Registration', icon: Building },
            { id: 'ambassador', label: 'Become an Ambassador', icon: UserCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSubmitted(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center space-x-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#BF914A] text-black shadow-lg shadow-[#75410A]/30'
                    : 'bg-black/60 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 mb-1 font-medium">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Lady Vivienne Thorne"
                  className="w-full bg-black/80 border border-[#BF914A]/30 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#BF914A]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-medium">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. vivienne@safenia.com"
                  className="w-full bg-black/80 border border-[#BF914A]/30 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#BF914A]"
                />
              </div>
            </div>

            {(activeTab === 'distributor' || activeTab === 'wholesale') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">Company / Retail Salon Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Crown Salon Group Ltd"
                    className="w-full bg-black/80 border border-[#BF914A]/30 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#BF914A]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">Country / Region Served *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. United Kingdom & UAE"
                    className="w-full bg-black/80 border border-[#BF914A]/30 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#BF914A]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Your Message / Partnership Proposal *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={
                  activeTab === 'ambassador'
                    ? 'Tell us about your crown hair journey, social media channels, and why you wish to represent Safenia Luxury Oils...'
                    : 'Detail your inquiry, requested stock volumes, or salon requirements...'
                }
                className="w-full bg-black/80 border border-[#BF914A]/30 rounded-xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-[#BF914A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#BF914A] via-[#D8B26F] to-[#BF914A] hover:from-[#D8B26F] hover:to-[#BF914A] text-black font-bold uppercase tracking-widest text-xs rounded-xl transition-all shadow-xl shadow-[#75410A]/30 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Priority Request</span>
            </button>
          </form>
        ) : (
          <div className="p-8 glass-gold rounded-2xl border border-[#BF914A] text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#BF914A] text-black flex items-center justify-center mx-auto shadow-xl">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif-luxury font-bold text-white">
              Thank You For Connecting With Safenia
            </h3>
            <p className="text-xs text-zinc-300 font-light max-w-md mx-auto leading-relaxed">
              Your request has been routed to our global brand concierge team. A dedicated luxury representative will reach out to you within 12 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-black/80 border border-[#BF914A]/50 text-[#D8B26F] text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#BF914A] hover:text-black transition-colors cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
