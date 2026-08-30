import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How should I incorporate Safenia oils into my daily crown care routine?',
      a: 'We recommend applying 3–5 drops directly to your scalp or between palms 3–4 times weekly. Gently massage in circular motions for 2–3 minutes to promote healthy scalp circulation. You can also smooth a few drops over damp or dry mid-lengths and ends to seal in moisture.',
    },
    {
      q: 'Are Safenia products suitable for locs, braids, and color-treated crowns?',
      a: 'Yes, absolutely. Our botanical formulas are lightweight, non-comedogenic, and 100% free of petroleum, mineral oil, silicones, and synthetic sulfates, ensuring zero heavy buildup on locs, braids, or protective styles.',
    },
    {
      q: 'Where and how are the oils formulated?',
      a: 'Every Safenia oil is handcrafted from scratch in intentional small batches using cold-pressed botanical seed oils (like Castor and Golden Jojoba), enriched with slow herbal infusions such as Rosemary, Amla, and Hibiscus.',
    },
    {
      q: 'How does shipping and order tracking work?',
      a: 'All orders are processed securely through our official Shopify checkout. Real-time carrier tracking is automatically dispatched via email once the artisan batch leaves our facility.',
    },
    {
      q: 'What is the shelf life of handcrafted botanical oils?',
      a: 'Because we use pure cold-pressed botanicals and natural Vitamin E (Tocopherol) as an antioxidant, our oils have an optimal freshness shelf life of 12–18 months when stored in a cool, dry place away from direct sunlight.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#17130F]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#F5F0E6] border border-[#17130F]/15 shadow-2xl overflow-hidden text-[#17130F] p-8 sm:p-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#17130F]/08 pb-5">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-sans-body uppercase tracking-[0.3em] font-semibold text-[#56604A] block">
              BOTANICAL GUIDANCE
            </span>
            <h2 className="font-serif-luxury text-3xl text-[#17130F]">
              Frequently Asked Questions
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#17130F] hover:text-[#56604A] transition-colors cursor-pointer"
            aria-label="Close FAQ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 text-left">
          {faqs.map((faq, index) => {
            const isOpenItem = openIndex === index;
            return (
              <div
                key={index}
                className="border border-[#17130F]/08 bg-[#D9CCB8]/20 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpenItem ? null : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="font-serif-luxury text-lg text-[#17130F] pr-4">
                    {faq.q}
                  </span>
                  {isOpenItem ? (
                    <ChevronUp className="w-4 h-4 text-[#56604A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7A746B] shrink-0" />
                  )}
                </button>

                {isOpenItem && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#56604A]/90 font-sans-body leading-relaxed border-t border-[#17130F]/08 pt-3 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-2 text-center text-xs text-[#56604A]/90 font-sans-body font-light">
          Have a question about your crown care? Email our concierge directly at{' '}
          <a
            href="mailto:safenialuxuryoils@gmail.com"
            className="text-[#17130F] font-semibold hover:underline"
          >
            safenialuxuryoils@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};
