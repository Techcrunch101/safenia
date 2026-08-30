import React from 'react';
import { SAFENIA_IMAGES } from '../assets/images';
import { SafeImage } from './SafeImage';

// Official high-resolution generated and raster assets for Safenia
export const SAFENIA_LOGO_IMAGE_URL = SAFENIA_IMAGES.officialLogo;

interface LogoProps {
  variant?: 'nav' | 'full' | 'compact' | 'footer' | 'icon' | 'badge' | 'card' | 'image';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showEmblem?: boolean;
  useImage?: boolean;
}

export const SafeniaEmblemSvg: React.FC<{
  size?: number;
  className?: string;
  theme?: 'dark' | 'light';
}> = ({ size = 48, className = '', theme = 'light' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Safenia Luxury Oils Emblem"
    >
      <defs>
        {/* Rich Metallic Gold Linear Gradient */}
        <linearGradient id="safeniaGoldMain" x1="15%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#F9EBB2" />
          <stop offset="25%" stopColor="#E2BD5B" />
          <stop offset="50%" stopColor="#C99827" />
          <stop offset="75%" stopColor="#E8C768" />
          <stop offset="100%" stopColor="#A87515" />
        </linearGradient>

        {/* Leaf Accent Gradient */}
        <linearGradient id="safeniaLeafGold" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B38728" />
          <stop offset="45%" stopColor="#FDF2A9" />
          <stop offset="75%" stopColor="#D9AC3C" />
          <stop offset="100%" stopColor="#8A5C10" />
        </linearGradient>

        {/* Droplet Glow / Inner Gradient */}
        <linearGradient id="safeniaDropletGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FBE9A7" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#966914" />
        </linearGradient>
      </defs>

      {/* 1. Geometric Outer Gold Frame with Open Interlocking Corners */}
      <path
        d="M96 22 L24 22 L24 96"
        stroke="url(#safeniaGoldMain)"
        strokeWidth="2.2"
        strokeLinecap="square"
        fill="none"
      />
      <path
        d="M24 98 L96 98 L96 24"
        stroke="url(#safeniaGoldMain)"
        strokeWidth="2.2"
        strokeLinecap="square"
        fill="none"
      />

      {/* 2. Majestic Serif 'S' */}
      <path
        d="M80 32 C78 28 72 24 61 24 C46 24 37 32 37 43 C37 53 46 59 58 64 C73 70 80 77 80 87 C80 98 69 106 53 106 C42 106 33 100 29 93 L34 88 C38 94 44 98 53 98 C64 98 72 92 72 85 C72 77 64 71 52 66 C38 60 30 52 30 42 C30 29 42 18 60 18 C70 18 78 22 83 28 Z"
        fill="url(#safeniaGoldMain)"
      />

      {/* 3. Botanical Leaf on Lower-Left of the S */}
      <path
        d="M38 58 C32 46 44 36 54 38 C53 50 45 58 38 58 Z"
        fill="url(#safeniaLeafGold)"
      />
      <path
        d="M40 56 C44 48 48 43 53 39"
        stroke="#6E4C0E"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* 4. Hanging Oil Droplet with Queen Silhouette */}
      <g transform="translate(60, 96)">
        <path
          d="M0 -14 C-1 -12 -7 -3 -7 3 C-7 7 -3.8 10.5 0 10.5 C3.8 10.5 7 7 7 3 C7 -3 1 -12 0 -14 Z"
          fill="url(#safeniaDropletGrad)"
          stroke="#4D3409"
          strokeWidth="0.6"
        />

        {/* Silhouette of Queen Profile inside Droplet */}
        <path
          d="M-0.5 0 C-0.5 -1.5 0.5 -2 1.2 -2.5 C1.8 -2.8 2 -3.2 2 -3.8 C2 -4.2 1.6 -4.6 1 -4.6 C0.3 -4.6 -0.2 -4.1 -0.4 -3.6 L-1.2 -3.9 C-0.9 -4.8 -0.1 -5.4 1 -5.4 C2.2 -5.4 2.9 -4.6 2.9 -3.7 C2.9 -3 2.5 -2.4 1.8 -2 C1.2 -1.6 0.8 -1.2 0.8 0 L-0.5 0 Z"
          fill="#17130F"
        />
        <path
          d="M-2.5 -0.5 L-2.2 -2.5 L-0.8 -1.5 L0.5 -3 L1.8 -1.5 L3.2 -2.5 L3.5 -0.5 Z"
          fill="#17130F"
        />
        <path
          d="M-1 2 C0 4 2 5.5 3 6 C2 5.2 1 3.5 0.5 2 Z"
          fill="#17130F"
        />
      </g>
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'nav',
  theme = 'light',
  className = '',
  size = 'md',
  showTagline = false,
  showEmblem = true,
  useImage = false,
}) => {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? 'text-[#F5F0E6]' : 'text-[#17130F]';

  const emblemSizes = {
    sm: 34,
    md: 44,
    lg: 58,
    xl: 82,
  };

  // Direct Image rendering variant
  if (variant === 'image' || useImage) {
    const imgHeights = {
      sm: 'h-10',
      md: 'h-14',
      lg: 'h-20',
      xl: 'h-32',
    };
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <SafeImage
          src={SAFENIA_LOGO_IMAGE_URL}
          alt="Safenia Luxury Oils"
          className={`${imgHeights[size]} object-contain drop-shadow-md rounded-xs`}
        />
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <SafeniaEmblemSvg
        size={emblemSizes[size]}
        className={className}
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
    );
  }

  // Navigation Variant (Header)
  if (variant === 'nav') {
    return (
      <div
        className={`flex items-center space-x-3.5 text-left select-none group transition-opacity duration-300 hover:opacity-95 ${className}`}
      >
        {showEmblem && (
          <div className="relative p-0.5 rounded-sm bg-[#120F0D] border border-[#D4AF37]/40 shadow-sm">
            <SafeniaEmblemSvg
              size={size === 'sm' ? 32 : size === 'lg' ? 44 : 36}
              theme="dark"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col">
          <span
            className={`font-cinzel font-semibold tracking-[0.24em] leading-none transition-colors duration-300 ${
              size === 'sm' ? 'text-base sm:text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
            } ${primaryColor}`}
          >
            SAFENIA
          </span>
          <span
            className="text-[8px] sm:text-[9px] uppercase tracking-[0.42em] font-sans-body font-semibold mt-1.5 leading-none text-[#B79B6B]"
          >
            LUXURY OILS
          </span>
        </div>
      </div>
    );
  }

  // Footer Editorial Display
  if (variant === 'footer') {
    return (
      <div className={`flex flex-col items-start text-left select-none ${className}`}>
        <div className="flex items-center space-x-4 mb-3.5">
          <div className="p-1 rounded-sm bg-[#120F0D] border border-[#D4AF37]/50 shadow-md">
            <SafeniaEmblemSvg size={46} theme="dark" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-cinzel font-normal text-2xl sm:text-3xl lg:text-4xl tracking-[0.22em] leading-none ${primaryColor}`}
            >
              SAFENIA
            </span>
            <span
              className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.44em] font-sans-body font-medium mt-2 text-[#B79B6B]"
            >
              — LUXURY OILS —
            </span>
          </div>
        </div>
        
        {/* Crown Divider & Script Tagline */}
        <div className="flex items-center space-x-2.5 my-1.5 text-[#D4AF37]">
          <span className="h-[1px] w-7 bg-[#D4AF37]/50" />
          <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor">
            <path d="M1 10 L2 3 L5 6 L8 1 L11 6 L14 3 L15 10 Z" />
          </svg>
          <span className="h-[1px] w-7 bg-[#D4AF37]/50" />
        </div>

        {showTagline && (
          <p className="font-script-luxury text-2xl sm:text-3xl text-white/95 tracking-wide mt-1">
            Nature's Care for Every Crown
          </p>
        )}
      </div>
    );
  }

  // Full Luxury Card Brand Display (Black & Gold Master Presentation matching the upload)
  if (variant === 'card') {
    return (
      <div className={`bg-[#0A0908] border border-[#D4AF37]/40 p-8 sm:p-12 rounded-xs shadow-2xl flex flex-col items-center text-center relative overflow-hidden ${className}`}>
        {/* Subtle radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <SafeniaEmblemSvg size={92} theme="dark" className="mb-6 drop-shadow-[0_4px_12px_rgba(212,175,55,0.2)]" />
          
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E6] tracking-[0.26em] font-medium leading-tight">
            SAFENIA
          </h2>
          
          <div className="flex items-center space-x-3.5 my-3 text-[#D4AF37]">
            <span className="h-[1px] w-10 bg-[#D4AF37]/60" />
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.48em] font-sans-body font-semibold">
              LUXURY OILS
            </span>
            <span className="h-[1px] w-10 bg-[#D4AF37]/60" />
          </div>

          {/* 5-Point Crown Icon with Horizontal Lines */}
          <div className="flex items-center space-x-3 my-2 text-[#D4AF37]">
            <span className="h-[1px] w-6 bg-[#D4AF37]/40" />
            <svg width="20" height="13" viewBox="0 0 18 12" fill="currentColor">
              <path d="M2 10 L3 4 L6 7 L9 2 L12 7 L15 4 L16 10 Z" />
            </svg>
            <span className="h-[1px] w-6 bg-[#D4AF37]/40" />
          </div>

          <p className="font-script-luxury text-2xl sm:text-3xl text-white mt-1.5 tracking-wide">
            Nature's Care for Every Crown
          </p>
        </div>
      </div>
    );
  }

  // Full Editorial Brand Display
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {showEmblem && (
        <div className="mb-4 p-2 rounded-sm bg-[#120F0D] border border-[#D4AF37]/40 shadow-md">
          <SafeniaEmblemSvg
            size={size === 'xl' ? 76 : size === 'lg' ? 60 : 48}
            theme="dark"
          />
        </div>
      )}
      <span
        className={`font-cinzel font-medium tracking-[0.24em] leading-none ${
          size === 'xl'
            ? 'text-4xl sm:text-5xl lg:text-6xl'
            : size === 'lg'
            ? 'text-3xl sm:text-4xl'
            : 'text-2xl sm:text-3xl'
        } ${primaryColor}`}
      >
        SAFENIA
      </span>
      <div className="flex items-center space-x-3.5 my-2.5">
        <span className="h-[1px] w-8 bg-[#B79B6B]/60" />
        <span
          className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.46em] font-sans-body font-semibold text-[#B79B6B]"
        >
          LUXURY OILS
        </span>
        <span className="h-[1px] w-8 bg-[#B79B6B]/60" />
      </div>

      {/* 5-Point Crown Icon */}
      <div className="flex items-center space-x-2.5 my-1 text-[#D4AF37]">
        <span className="h-[1px] w-5 bg-[#D4AF37]/40" />
        <svg width="15" height="10" viewBox="0 0 16 10" fill="currentColor">
          <path d="M1 9 L2 3 L5 6 L8 1 L11 6 L14 3 L15 9 Z" />
        </svg>
        <span className="h-[1px] w-5 bg-[#D4AF37]/40" />
      </div>

      {showTagline && (
        <span className="font-script-luxury text-2xl sm:text-3xl text-[#17130F] mt-1 font-normal tracking-wide">
          Nature's Care for Every Crown
        </span>
      )}
    </div>
  );
};
