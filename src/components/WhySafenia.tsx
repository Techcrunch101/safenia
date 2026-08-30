import React from 'react';

export const WhySafenia: React.FC = () => {
  const botanicals = [
    {
      num: '01',
      name: 'Rosemary',
      benefit: 'Circulation & follicle vitality',
      region: 'MEDITERRANEAN BASIN',
    },
    {
      num: '02',
      name: 'Castor Oil',
      benefit: 'Sealing, strength & length retention',
      region: 'EAST AFRICA',
    },
    {
      num: '03',
      name: 'Black Seed',
      benefit: 'Thymoquinone-rich scalp calm',
      region: 'EGYPT',
    },
    {
      num: '04',
      name: 'Amla',
      benefit: 'Vitamin C for resilient strands',
      region: 'INDIAN SUBCONTINENT',
    },
    {
      num: '05',
      name: 'Fenugreek',
      benefit: 'Protein support & softness',
      region: 'NORTH AFRICA',
    },
    {
      num: '06',
      name: 'Peppermint',
      benefit: 'Cooling stimulation',
      region: 'HIGHLAND FARMS',
    },
    {
      num: '07',
      name: 'Jojoba',
      benefit: 'Sebum-mimicking balance',
      region: 'SONORAN DESERT',
    },
    {
      num: '08',
      name: 'Baobab',
      benefit: 'Omega-rich elasticity',
      region: 'SOUTHERN AFRICA',
    },
    {
      num: '09',
      name: 'Argan',
      benefit: 'Luminous, weightless finish',
      region: 'SOUSS VALLEY, MOROCCO',
    },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#0B0908] border-t border-[#D4AF37]/15 text-[#F5F0E6]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 text-left space-y-3">
          <span className="text-[10.5px] uppercase tracking-[0.36em] font-sans-body font-semibold text-[#D4AF37] block">
            INGREDIENT STORY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#F5F0E6] tracking-tight">
            Nine botanicals, each with
            <br />
            a reason.
          </h2>
        </div>

        {/* 3x3 Luxury Botanical Grid Matching Video */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {botanicals.map((bot) => (
            <div
              key={bot.num}
              className="p-8 sm:p-9 bg-[#14110E] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between text-left group min-h-[220px]"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors block">
                  {bot.num}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F0E6] group-hover:text-[#D4AF37] transition-colors">
                  {bot.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#B3ACA0] font-sans-body font-light leading-relaxed">
                  {bot.benefit}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#D4AF37]/10">
                <span className="text-[9.5px] uppercase tracking-[0.32em] font-sans-body font-semibold text-[#D4AF37]/80">
                  {bot.region}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


