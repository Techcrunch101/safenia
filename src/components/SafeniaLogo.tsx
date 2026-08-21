import React from 'react';

const officialLogoImg = '/src/assets/images/safenia_official_logo_1787293412342.jpg';

interface SafeniaLogoProps {
  variant?: 'full' | 'icon' | 'horizontal' | 'compact' | 'badge';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SafeniaLogo: React.FC<SafeniaLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
}) => {
  // 1. Icon-only variant: Centered crop of the golden 'S' & Queen Crown Droplet
  if (variant === 'icon') {
    const sizeMap = {
      sm: 'w-8 h-8',
      md: 'w-11 h-11',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    };
    return (
      <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-[#BF914A]/40 bg-black shadow-lg ${sizeMap[size]} ${className}`}>
        <img
          src={officialLogoImg}
          alt="Safenia Logo"
          className="w-full h-full object-cover scale-[1.5] -translate-y-1 object-center"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // 2. Horizontal / Navbar variant: Displays the complete official logo lockup cleanly
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center group select-none ${className}`}>
        <img
          src={officialLogoImg}
          alt="SAFENIA LUXURY OILS - Nature's Care for Every Crown"
          className="h-14 sm:h-16 w-auto object-contain rounded-md transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(191,145,74,0.25)]"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // 3. Compact Mobile variant: Slightly more compact version of the full official logo
  if (variant === 'compact') {
    return (
      <div className={`flex items-center group select-none ${className}`}>
        <img
          src={officialLogoImg}
          alt="SAFENIA LUXURY OILS"
          className="h-10 sm:h-12 w-auto object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // 4. Badge variant: Framed gold luxury badge
  if (variant === 'badge') {
    return (
      <div className={`relative inline-block rounded-2xl border border-[#BF914A]/50 bg-black/90 p-2 shadow-2xl ${className}`}>
        <img
          src={officialLogoImg}
          alt="SAFENIA LUXURY OILS"
          className="w-48 sm:w-60 h-auto object-contain rounded-xl"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // 5. Default 'full' variant: Exact high-resolution brand portrait logo as uploaded
  const fullSizeMap = {
    sm: 'w-44 sm:w-48',
    md: 'w-60 sm:w-72',
    lg: 'w-80 sm:w-96',
    xl: 'w-96 sm:w-[28rem]',
  };

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      <div className={`relative overflow-hidden rounded-2xl border border-[#BF914A]/40 bg-black shadow-2xl p-2 ${fullSizeMap[size]} group`}>
        <img
          src={officialLogoImg}
          alt="SAFENIA LUXURY OILS - Nature's Care for Every Crown"
          className="w-full h-auto object-contain rounded-xl transform group-hover:scale-[1.02] transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};



