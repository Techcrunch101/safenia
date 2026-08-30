import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';

interface NotFoundViewProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onNavigateHome,
  onNavigateShop,
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-6 bg-[#0B0908] text-[#F5F0E6]">
      <div className="max-w-lg text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-[#14110E] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block">
            404 — SANCTUARY UNFOUND
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#F5F0E6]">
            This Botanical Path Does Not Exist
          </h1>
          <p className="text-xs sm:text-sm text-[#B3ACA0] font-light leading-relaxed max-w-md mx-auto">
            The page or formulation you are looking for has been moved or retired from our active botanical catalog.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onNavigateShop}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0908] font-bold text-xs uppercase tracking-[0.22em] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
          >
            <span>Explore Formulations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#14110E] hover:bg-[#1f1a15] text-[#F5F0E6] border border-[#D4AF37]/30 text-xs uppercase tracking-[0.22em] transition-all cursor-pointer"
          >
            Return to Sanctuary
          </button>
        </div>
      </div>
    </div>
  );
};
