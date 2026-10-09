import React, { useState } from 'react';

export default function ArgensaltaLogo({ className = "h-12 w-auto", style }: { className?: string, style?: React.CSSProperties }) {
  const [src, setSrc] = useState('/logo.jpeg');
  
  return (
    <img 
      src={src} 
      alt="Argensalta Propiedades" 
      className={`object-contain mix-blend-screen ${className}`}
      style={{
        filter: "invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.2)",
        ...style
      }}
      onError={() => {
        // Fallback placeholder para guiar al usuario
        setSrc('https://placehold.co/800x400/000000/EFC46C.png?text=Argensalta');
      }}
    />
  );
}
