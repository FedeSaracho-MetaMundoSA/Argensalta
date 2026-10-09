import React, { useState, useEffect } from 'react';
import ZoomableMapViewer from './ZoomableMapViewer';

export default function InteractiveDonBorromeoMasterplan(props: any) {
  const [imageSrc, setImageSrc] = useState<string>('/terrenos-vendidos-don-borromeo.jpeg');

  useEffect(() => {
    const updateImage = () => {
      const storedImage = localStorage.getItem('masterplan_don_borromeo');
      if (storedImage) {
        setImageSrc(storedImage);
      } else {
        setImageSrc('/terrenos-vendidos-don-borromeo.jpeg');
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
        alt="Plano Masterplan - Don Borromeo" 
      />
    </div>
  );
}
