import React, { useState } from 'react';
import { SAFENIA_IMAGES } from '../assets/images';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Safenia Luxury Oils',
  className = '',
  fallbackSrc = SAFENIA_IMAGES.emeraldBotanicalHero,
  ...props
}) => {
  const [error, setError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Safenia Asset Warning] Failed to load image: ${src}. Falling back to default botanical asset.`);
      }
      setError(true);
    }
    if (props.onError) {
      props.onError(e);
    }
  };

  const finalSrc = error || !src ? fallbackSrc : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={handleError}
      loading={props.loading || 'lazy'}
      {...props}
    />
  );
};
