import React, { useState, useEffect } from 'react';
import ZoomableMapViewer from './ZoomableMapViewer';

export default function InteractiveMasterplan(props: any) {
  const [imageSrc, setImageSrc] = useState('/terrenos-vendidos-pucheta.jpeg');

  useEffect(() => {
    const updateImage = () => {
      const storedImage = localStorage.getItem('masterplan_riveras');
      if (storedImage) {
        setImageSrc(storedImage);
      } else {
        setImageSrc('/terrenos-vendidos-pucheta.jpeg');
      }
    };

    updateImage();
    window.addEventListener('masterplan_updated', updateImage);
    return () => window.removeEventListener('masterplan_updated', updateImage);
  }, []);

  return (
    <div className="w-full h-full relative bg-zinc-950 flex flex-col items-stretch justify-stretch p-0">
      <ZoomableMapViewer 
        src={imageSrc} 
        alt="Plano Masterplan - Terrenos Vendidos" 
      />
    </div>
  );
}

