import React, { useState } from 'react';
import { Globe, Truck, ShieldCheck, MapPin, Clock, CreditCard } from 'lucide-react';

interface ShippingRegion {
  id: string;
  region: string;
  pinLocation: { top: string; left: string };
  deliveryEstimate: string;
  courierPartners: string[];
  localCurrencies: string[];
  featuredPaymentMethods: string[];
}

const REGIONS: ShippingRegion[] = [
  {
    id: 'north-america',
    region: 'North America (USA & Canada)',
    pinLocation: { top: '35%', left: '22%' },
    deliveryEstimate: '1 - 3 Business Days via Express',
    courierPartners: ['DHL Express Priority', 'FedEx International First', 'UPS Worldwide'],
    localCurrencies: ['USD ($)', 'CAD (CA$)'],
    featuredPaymentMethods: ['Apple Pay', 'Google Pay', 'Visa', 'Mastercard', 'Amex', 'PayPal', 'Stripe'],
  },
  {
    id: 'europe',
    region: 'United Kingdom & Europe',
    pinLocation: { top: '30%', left: '48%' },
    deliveryEstimate: '2 - 3 Business Days via Express',
    courierPartners: ['DHL Express Global', 'Royal Mail Special', 'DPD Express'],
    localCurrencies: ['GBP (£)', 'EUR (€)'],
    featuredPaymentMethods: ['Apple Pay', 'Google Pay', 'Visa', 'Mastercard', 'PayPal', 'Klarna'],
  },
  {
    id: 'africa',
    region: 'Africa (Kenya, Nigeria, South Africa, Ghana)',
    pinLocation: { top: '58%', left: '54%' },
    deliveryEstimate: '2 - 4 Business Days via Express',
    courierPartners: ['DHL Express Africa', 'Aramex Direct', 'FedEx Priority'],
    localCurrencies: ['KES (KSh)', 'NGN (₦)', 'ZAR (R)', 'GHS (₵)'],
    featuredPaymentMethods: ['M-Pesa (Instant Mobile)', 'Flutterwave', 'Paystack', 'Visa', 'Mastercard'],
  },
  {
    id: 'middle-east',
    region: 'Middle East & Gulf (UAE, Qatar, Saudi Arabia)',
    pinLocation: { top: '42%', left: '62%' },
    deliveryEstimate: '2 - 3 Business Days via Express',
    courierPartners: ['DHL Express Gulf', 'Aramex Express'],
    localCurrencies: ['AED (AED)', 'SAR (SAR)', 'USD ($)'],
    featuredPaymentMethods: ['Apple Pay', 'Visa', 'Mastercard', 'Tabby', 'Tamara'],
  },
  {
    id: 'asia-pacific',
    region: 'Asia Pacific & Australia',
    pinLocation: { top: '65%', left: '82%' },
    deliveryEstimate: '3 - 5 Business Days via Express',
    courierPartners: ['DHL Express Asia', 'FedEx International'],
    localCurrencies: ['AUD (AU$)', 'SGD (S$)', 'USD ($)'],
    featuredPaymentMethods: ['Apple Pay', 'Google Pay', 'Visa', 'Mastercard', 'PayPal'],
  },
];

export const GlobalShippingMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<ShippingRegion>(REGIONS[0]);

  return (
    <section id="shipping" className="py-24 bg-[#050505] relative border-t border-[#75410A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 text-[#D8B26F] text-xs uppercase tracking-[0.25em] font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>Worldwide Luxury Logistics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
            Global Express Delivery & Regional Payments
          </h2>
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            We ship Safenia Luxury Oils to over 120 countries in velvet-lined temperature-controlled packaging. Click any region on the world map to inspect local delivery times, courier partners, and preferred regional payment integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Simulated World Map */}
          <div className="lg:col-span-8 glass-gold p-6 rounded-3xl border border-[#BF914A]/30 relative aspect-[16/9] flex items-center justify-center overflow-hidden">
            {/* World Map SVG Background Graphic */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full opacity-25 filter drop-shadow-[0_0_10px_#BF914A]"
              fill="none"
              stroke="#BF914A"
              strokeWidth="1.2"
            >
              {/* World Map Outline SVG Paths */}
              <path d="M150,120 Q200,80 300,100 T400,180 T250,300 T120,200 Z" />
              <path d="M450,100 Q550,70 600,120 T580,220 T480,180 Z" />
              <path d="M480,240 Q580,220 620,300 T520,420 T450,320 Z" />
              <path d="M620,180 Q720,150 820,180 T880,280 T750,250 Z" />
              <path d="M780,350 Q850,340 880,400 T800,450 Z" />
            </svg>

            {/* Interactive Pins */}
            {REGIONS.map((reg) => {
              const isSelected = selectedRegion.id === reg.id;
              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg)}
                  style={{ top: reg.pinLocation.top, left: reg.pinLocation.left }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                >
                  <div
                    className={`relative p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#BF914A] border-white text-black scale-125 shadow-[0_0_20px_#BF914A]'
                        : 'bg-black/80 border-[#BF914A]/60 text-[#D8B26F] hover:scale-110'
                    }`}
                  >
                    <MapPin className="w-4 h-4 fill-current" />
                    {/* Ripple animation for active pin */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full border border-[#BF914A] animate-ping opacity-75"></span>
                    )}
                  </div>
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 px-2 py-0.5 rounded text-[10px] text-[#F3E5C8] font-semibold border border-[#BF914A]/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    {reg.region.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Region Details Panel */}
          <div className="lg:col-span-4 glass-gold p-6 rounded-3xl border border-[#BF914A]/40 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8B26F] font-semibold">
                Selected Destination
              </span>
              <h3 className="text-2xl font-serif-luxury font-bold text-white mt-1">
                {selectedRegion.region}
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-black/60 rounded-xl border border-zinc-800 flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#BF914A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Transit Guarantee</div>
                  <div className="text-zinc-400 font-light mt-0.5">{selectedRegion.deliveryEstimate}</div>
                </div>
              </div>

              <div className="p-3 bg-black/60 rounded-xl border border-zinc-800 flex items-start space-x-3">
                <Truck className="w-4 h-4 text-[#BF914A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Courier Partners</div>
                  <div className="text-zinc-400 font-light mt-0.5">
                    {selectedRegion.courierPartners.join(', ')}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-black/60 rounded-xl border border-zinc-800 flex items-start space-x-3">
                <CreditCard className="w-4 h-4 text-[#BF914A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Regional Payment Gateways</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedRegion.featuredPaymentMethods.map((pm, idx) => (
                      <span key={idx} className="bg-[#BF914A]/20 border border-[#BF914A]/40 text-[#F3E5C8] text-[10px] px-2 py-0.5 rounded font-medium">
                        {pm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Payment Badges Bar */}
        <div className="mt-16 pt-8 border-t border-[#BF914A]/20 text-center space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium">
            Accepted Global & Regional Payment Integrations
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-zinc-300 font-semibold">
            {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'PayPal', 'Stripe', 'M-Pesa', 'Flutterwave', 'Paystack'].map((p, idx) => (
              <div key={idx} className="px-3 py-1.5 glass-dark rounded-lg border border-[#75410A]/40 text-[#F3E5C8]">
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
