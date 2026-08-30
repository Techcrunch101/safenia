import React from 'react';
import { SafeniaEmblemSvg, Logo } from './Logo';

interface SafeniaLogoProps {
  variant?: 'full' | 'icon' | 'horizontal' | 'compact' | 'badge' | 'card';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
}

export const SafeniaLogo: React.FC<SafeniaLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
  theme = 'light',
  showTagline = false,
}) => {
  if (variant === 'card') {
    return <Logo variant="card" className={className} />;
  }

  if (variant === 'icon') {
    const emblemSizes = {
      sm: 32,
      md: 40,
      lg: 54,
      xl: 76,
    };
    return <SafeniaEmblemSvg size={emblemSizes[size]} theme={theme} className={className} />;
  }

  if (variant === 'compact' || variant === 'horizontal') {
    return <Logo variant="nav" theme={theme} size={size} className={className} />;
  }

  return (
    <Logo
      variant="full"
      theme={theme}
      size={size}
      showTagline={showTagline}
      className={className}
    />
  );
};
