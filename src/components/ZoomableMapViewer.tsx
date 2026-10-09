import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Move, ShieldCheck } from 'lucide-react';

interface ZoomableMapViewerProps {
  src: string;
  alt: string;
}

export default function ZoomableMapViewer({ src, alt }: ZoomableMapViewerProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Reset zoom and scale when image source changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse Drag (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale === 1) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch Drag (Mobile / Tablet)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale === 1) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      dragStart.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale === 1) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.current.x;
      const newY = touch.clientY - dragStart.current.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative overflow-hidden bg-zinc-950 rounded-2xl flex items-center justify-center select-none touch-none border border-white/5">
      {/* Zoom indicator badging */}
      <div className="absolute top-4 right-4 z-30 flex items-center space-x-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg select-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#EFC46C] animate-pulse"></div>
        <span className="text-[10px] sm:text-xs font-mono text-gray-300 font-extrabold uppercase tracking-widest">
          Zoom: {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Touch helper indicator when zoomed */}
      {scale > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] text-gray-200 font-semibold flex items-center shadow-2xl tracking-wider uppercase animate-fade-in">
          <Move className="w-3.5 h-3.5 mr-2 text-[#EFC46C]" />
          <span>Arrastrá el mapa para moverte</span>
        </div>
      )}

      {/* Glassmorphic control overlay floating nicely over image */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/90 backdrop-blur-md p-2 rounded-2xl border border-white/15 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.8)]">
        <button
          onClick={handleZoomIn}
          disabled={scale >= 4}
          className="p-3 bg-zinc-900/80 hover:bg-zinc-800 text-white disabled:opacity-35 disabled:hover:bg-zinc-900/80 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center"
          title="Zoom +"
        >
          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-[#EFC46C]" />
        </button>
        <button
          onClick={handleZoomOut}
          disabled={scale <= 1}
          className="p-3 bg-zinc-900/80 hover:bg-zinc-800 text-white disabled:opacity-35 disabled:hover:bg-zinc-900/80 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center"
          title="Zoom -"
        >
          <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5 text-[#EFC46C]" />
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-zinc-900/80 hover:bg-zinc-805 text-white rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
        </button>
      </div>

      {/* Double-tap instruction overlay shown briefly */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <span className="text-[9px] text-zinc-500 font-sans tracking-wide uppercase bg-black/30 px-3 py-1 rounded-full">
          Gesticular con botones o arrastrar para ver detalles
        </span>
      </div>

      {/* Main image container */}
      <div
        className={`w-full h-full flex items-center justify-center transition-all ${
          scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={src}
          alt={alt}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          className="max-w-full max-h-full w-auto h-auto object-contain pointer-events-none shadow-2xl"
        />
      </div>
    </div>
  );
}
