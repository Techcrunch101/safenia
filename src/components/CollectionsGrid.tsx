import React from 'react';
import { COLLECTIONS } from '../data/mockData';
import { CollectionItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CollectionsGridProps {
  onSelectCollection: (collectionId: string) => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({ onSelectCollection }) => {
  return (
    <section id="collections" className="py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8B26F] font-semibold">
            Bespoke Formulations
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white">
            Curated Collections for Every Crown
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#BF914A] to-transparent mx-auto mt-4"></div>
        </div>

        {/* Collections Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col.id)}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-[#BF914A]/20 hover:border-[#BF914A]/80 transition-all duration-500 shadow-xl"
            >
              {/* Background Image with Slow Zoom on Hover */}
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover filter brightness-75 contrast-110 group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/60 transition-all duration-500"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#D8B26F] bg-black/60 px-3 py-1 rounded-full border border-[#75410A]/40 backdrop-blur-md">
                    {col.subtitle}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[#BF914A]/40 bg-black/60 flex items-center justify-center text-[#BF914A] group-hover:bg-[#BF914A] group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white group-hover:text-[#F3E5C8] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-zinc-300 font-light line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                  <div className="pt-2 text-[11px] font-medium text-[#D8B26F] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest">
                    <span>Explore Collection</span> →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
