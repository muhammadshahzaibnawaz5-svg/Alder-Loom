import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#E5DCCE] text-[#302923]/75 p-6 text-center ${className}`}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
          className="mb-3 opacity-60"
        >
          <rect x="4" y="10" width="28" height="16" rx="2" stroke="currentColor" strokeWidth="1.25" />
          <path d="M8 26V29M28 26V29" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M9 17H27" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
        <span className="font-serif text-lg tracking-tight text-[#302923]">
          {fallbackLabel || 'Alder & Loom'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
