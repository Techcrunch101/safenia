import React from 'react';
import { Instagram, Sparkles, Heart } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1608248597263-00079996582a?auto=format&fit=crop&w=800&q=80',
    caption: 'The Golden Dropper ritual on black marble. @safenia.luxury',
    likes: '1.4k',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    caption: '4C coils nourished with cold-pressed rosemary and Egyptian black seed. #SafeniaCrown',
    likes: '2.1k',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    caption: 'Zero-wax loc hydration with Kalahari Melon seed oil. #LocRituals',
    likes: '980',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    caption: 'High shine and tension relief under fresh knotless braids.',
    likes: '3.2k',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
    caption: 'Velvet Beard Nectar grooming for gentlemen. #SafeniaMen',
    likes: '1.8k',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    caption: 'The Golden Crown Velvet Vault presentation set.',
    likes: '4.5k',
  },
];

export const EditorialGallery: React.FC = () => {
  return (
    <section className="py-24 bg-[#080809] relative border-t border-[#75410A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 text-[#D8B26F] text-xs uppercase tracking-[0.25em] font-semibold">
            <Instagram className="w-3.5 h-3.5" />
            <span>@Safenia.Luxury.Oils</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
            The Crown Journal Gallery
          </h2>
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Follow our global community of queens and kings sharing daily crown ceremonies, loc transformations, and hair rituals.
          </p>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-[#BF914A]/25 glass-gold break-inside-avoid cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <p className="text-xs text-zinc-200 font-light leading-relaxed mb-3">
                  {item.caption}
                </p>
                <div className="flex items-center justify-between text-xs text-[#D8B26F] font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current text-[#BF914A]" /> {item.likes}
                  </span>
                  <span className="uppercase text-[10px] tracking-wider">Instagram</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
