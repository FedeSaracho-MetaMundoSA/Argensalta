import { MapPin, ArrowRight, CircleDollarSign, BadgePercent, Droplets, MessageCircle, Map as MapIcon, X, CheckCircle2, Loader2, CreditCard, ShieldCheck, AlertCircle, Home, MoveRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function IntroVideo({ onComplete }: { key?: string; onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 3500); // Background fades in
    const t2 = setTimeout(() => setPhase(2), 5500); // Grid starts drawing
    const t3 = setTimeout(() => setPhase(3), 8500); // Logo appears
    const t4 = setTimeout(() => onComplete(), 12500); // Done, fade out

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const gridLines = Array.from({ length: 20 });

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-gray-950 text-white flex items-center justify-center overflow-hidden font-serif"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* Skip Button */}
      <button 
        onClick={onComplete}
        className="absolute top-6 right-6 z-50 bg-black/40 hover:bg-black/80 text-[#EFC46C] hover:text-white border border-[#EFC46C]/30 hover:border-[#EFC46C] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
      >
        Saltar Intro <ArrowRight className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            key="text1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="text-center px-6"
          >
            <h2 className="text-3xl md:text-5xl text-[#EFC46C] tracking-widest font-light mb-4 drop-shadow-md">
              Visualiza tu futuro...
            </h2>
            <p className="text-lg md:text-2xl text-gray-400 tracking-wide font-sans">
              En el corazón de La Caldera
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {(phase >= 1) && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 7, ease: "easeOut" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/pucheta-loteo.jpeg")' }}
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          
          {/* Animated 3D Grid Overlay */}
          {phase >= 2 && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{ perspective: '800px' }}>
                <motion.div 
                  className="w-[120%] h-[120%] md:w-[80%] md:h-[80%] border-4 border-transparent"
                  style={{ transform: 'rotateX(55deg) rotateZ(-20deg) translateY(-10%)', transformStyle: 'preserve-3d' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Perimeter */}
                      <motion.rect 
                        x="5" y="5" width="90" height="90" 
                        fill="rgba(50, 200, 50, 0.05)" stroke="#EF4444" strokeWidth="0.8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                      />
                      {/* Rows */}
                      {gridLines.map((_, i) => (
                        <motion.line 
                          key={`r-${i}`}
                          x1="5" y1={5 + (90 / 20) * i} x2="95" y2={5 + (90 / 20) * i}
                          stroke="#EFC46C" strokeWidth="0.3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: i * 0.05, ease: "easeOut" }}
                        />
                      ))}
                      {/* Cols */}
                      {gridLines.map((_, i) => (
                         <motion.line 
                         key={`c-${i}`}
                         x1={5 + (90 / 20) * i} y1="5" x2={5 + (90 / 20) * i} y2="95"
                         stroke="#EFC46C" strokeWidth="0.3"
                         initial={{ pathLength: 0 }}
                         animate={{ pathLength: 1 }}
                         transition={{ duration: 2, delay: i * 0.05, ease: "easeOut" }}
                       />
                      ))}
                    </svg>
                </motion.div>
             </div>
          )}

          {/* Logo Fade In */}
          <AnimatePresence>
            {phase >= 3 && (
                <motion.div
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                >
                   <motion.h1 
                     className="text-6xl md:text-8xl font-serif font-bold text-[#EFC46C] drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] tracking-widest text-center"
                     initial={{ y: 50, opacity: 0, scale: 0.95 }}
                     animate={{ y: 0, opacity: 1, scale: 1 }}
                     transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                   >
                     RIVERAS <span className="text-5xl md:text-7xl text-[#EFC46C]">DE</span><br/>PUCHETA
                   </motion.h1>
                   <motion.div
                     initial={{ width: 0, opacity: 0 }}
                     animate={{ width: "250px", opacity: 1 }}
                     transition={{ duration: 1.5, delay: 1.8 }}
                     className="h-[2px] bg-gradient-to-r from-transparent via-[#EFC46C] to-transparent mt-6 mb-4"
                   />
                   <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 1.5, delay: 2.2 }}
                     className="text-xl md:text-2xl font-light tracking-[0.4em] text-white uppercase"
                   >
                     Barrio Cerrado
                   </motion.p>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

const MOCK_LOTS = Array.from({ length: 36 }, (_, i) => {
  const block = Math.ceil((i + 1) / 12).toString();
  const lotNumber = (i % 12) + 1;
  let status = 'available';
  const soldIndices = [2, 5, 10, 15, 22, 25, 30, 34];
  const reservedIndices = [1, 8, 14, 19, 28];
  
  if (soldIndices.includes(i)) status = 'sold';
  else if (reservedIndices.includes(i)) status = 'reserved';
  
  return {
    id: `m${block}-l${lotNumber}`,
    block,
    lotNumber,
    surface: 300 + (i % 3) * 15,
    price: 5500 + (i % 5) * 200,
    status
  };
});

import InteractiveMasterplan3D from '../components/InteractiveMasterplan3D';
import { useReservationStore } from '../store/useReservationStore';

function MapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (<AnimatePresence>{isOpen && (<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] bg-gray-900 flex flex-col pt-4 md:pt-8"><div className="bg-black/90 p-4 sm:p-6 flex justify-between items-center border-b-[3px] border-[#EFC46C] shadow-lg relative z-20"><div className="flex items-center"><MapIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-[#EFC46C]" /><div><h2 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase relative z-10 drop-shadow-lg">Plano de Lotes 3D</h2><p className="text-[#EFC46C] tracking-widest text-[10px] sm:text-xs mt-1 font-bold">RIVERAS DE PUCHETA</p></div></div><button onClick={() => onClose()} className="bg-black/60 hover:bg-white/10 p-3 rounded-full text-white transition-all shadow-md border border-white/20 hover:scale-110"><X className="w-5 h-5 sm:w-6 sm:h-6" /></button></div><div className="flex-grow w-full h-[85vh] bg-gray-100 flex items-center justify-center p-0 overflow-hidden relative"><InteractiveMasterplan3D /></div></motion.div>)}</AnimatePresence>);
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <Helmet>
        <title>Riveras de Pucheta | Loteo Barrio Cerrado en La Caldera</title>
        <meta name="description" content="Descubrí Riveras de Pucheta, un exclusivo barrio cerrado en La Caldera, Salta. Terrenos y lotes disponibles desde 300m2. Una oportunidad de Argensalta." />
        <meta name="keywords" content="Riveras de Pucheta, loteo La Caldera, barrio cerrado Salta, terrenos en venta, Argensalta" />
      </Helmet>
      <AnimatePresence>
        {showIntro && <IntroVideo key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <MapModal isOpen={showMap} onClose={() => setShowMap(false)} />

      {!showIntro && (
        <motion.div 
          className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Animated Background Image - Scaling slowly */}
          <motion.div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat origin-center"
            style={{ backgroundImage: 'url("/pucheta-loteo.jpeg")' }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 1, -1, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 z-0 bg-black/50 backdrop-blur-[1px]"></div>

          {/* Main Container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-between min-h-screen">
            
            {/* Header / Title */}
            <header className="mb-12 flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-xl tracking-wide mb-3 flex flex-col">
                <span>RIVERAS DE</span>
                <span className="text-[#EFC46C]">PUCHETA</span>
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-[#EFC46C] w-6 h-6" />
                  <span className="text-xl md:text-2xl font-light text-gray-200 tracking-widest uppercase text-shadow-md">La Caldera - Salta</span>
                </div>
                <div className="hidden sm:block text-gray-400">|</div>
                <div className="inline-block px-5 py-1 bg-[#EFC46C]/10 backdrop-blur-md border border-[#EFC46C]/30 rounded-full shadow-lg">
                  <span className="text-[#EFC46C] font-semibold text-xs tracking-[0.2em] uppercase">Barrio Cerrado</span>
                </div>
              </div>

              {/* 3D Button - Terrenos Disponibles */}
              <button 
                onClick={() => setShowMap(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-[#3A2201] uppercase tracking-widest rounded-full overflow-visible transition-all duration-150 active:translate-y-2 focus:outline-none"
                style={{
                  background: 'linear-gradient(to bottom, #FCE18E 0%, #DFA238 50%, #CD8217 100%)',
                  boxShadow: '0 8px 0 #8B4513, 0 15px 20px rgba(0,0,0,0.4)',
                }}
              >
                {/* Shine effect */}
                <span className="absolute left-0 -top-full w-[20%] h-[300%] bg-white/40 -rotate-45 group-hover:animate-shine z-10 pointer-events-none"></span>
                <span className="absolute inset-0 w-full h-full rounded-full opacity-30 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none"></span>
                
                <MapIcon className="w-5 h-5 mr-3 animate-pulse relative z-10" />
                <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] text-lg">Terrenos Disponibles</span>
              </button>
            </header>

            {/* Grid Layout for Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow items-center">
              
              {/* Left Column (Pricing & Benefits) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Main Price Card */}
                <div className="bg-black/60 backdrop-blur-lg rounded-[2rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFC46C]/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                  <p className="text-[#EFC46C] text-sm uppercase tracking-widest font-semibold mb-2 flex items-center">
                    <CircleDollarSign className="w-5 h-5 mr-2" />
                    Precio Pre-Venta
                  </p>
                  <p className="text-5xl md:text-6xl font-light text-white tracking-tight">USD 5,500</p>
                </div>

                {/* Benefits */}
                <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl flex items-start space-x-4 transition hover:bg-black/60">
                  <div className="bg-[#EFC46C]/20 p-3 rounded-2xl flex-shrink-0">
                    <BadgePercent className="w-6 h-6 text-[#EFC46C]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-1 drop-shadow">Beneficio por pago contado</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">Asesórate sobre las condiciones exclusivas para pagos en la totalidad de la reserva.</p>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl flex items-start space-x-4 transition hover:bg-black/60">
                  <div className="bg-[#EFC46C]/20 p-3 rounded-2xl flex-shrink-0">
                    <Droplets className="w-6 h-6 text-[#EFC46C]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-1 drop-shadow">Servicios Prorrateados</h3>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">Red de luz y agua potable. Infraestructura de barrio cerrado.</p>
                    <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-[#EFC46C] uppercase tracking-wider">
                      Entregas: Dic. 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column (Lot Specs & Contact) */}
              <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center space-y-6 mt-8 lg:mt-0">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Surface Area */}
                  <div className="bg-gradient-to-br from-[#EFC46C] to-[#C49B55] rounded-3xl p-6 text-black shadow-xl relative overflow-hidden group">
                    <ArrowRight className="absolute -right-4 -bottom-4 w-24 h-24 text-black/10 -rotate-45 group-hover:scale-110 transition-transform duration-500" />
                    <p className="text-[#3A2201] text-xs font-bold uppercase tracking-widest mb-1">Superficie</p>
                    <p className="text-4xl font-bold mb-1 text-[#3A2201]">300 m²</p>
                    <p className="text-[#4A3205] text-sm font-semibold">10x30 metros promedio</p>
                  </div>
                  
                  {/* Financing */}
                  <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Financiación</p>
                    <p className="text-3xl font-light text-white mb-2">USD 3,500 <span className="text-base text-gray-400 font-normal">anticipo</span></p>
                    <p className="text-[#EFC46C] text-sm font-medium">+ 15 cuotas mensuales</p>
                  </div>
                </div>

                {/* Professional Agent Card */}
                <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center sm:items-start gap-6 relative mt-12 sm:mt-16 group hover:border-[#EFC46C]/30 transition-all duration-500">
                  
                  {/* Floating 3D Avatar */}
                  <div className="relative shrink-0 w-32 h-32 sm:w-40 sm:h-40 -mt-16 sm:-mt-20 perspective-[1200px] z-10 mx-auto sm:mx-0">
                    <motion.div 
                      className="w-full h-full relative"
                      whileHover={{ scale: 1.05, rotateY: 10, rotateX: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Inner Circular Setup */}
                      <div className="absolute inset-0 rounded-full bg-gray-800 shadow-[0_20px_50px_rgba(239,196,108,0.4)] border-4 border-[#EFC46C] overflow-hidden z-10 flex items-center justify-center">
                        <img 
                          src="/JoseLuis.jpeg" 
                          alt="Asesor Jose Luis" 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Badge Whatsapp */}
                      <a 
                        href="https://wa.me/5493875557009" 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute bottom-1 right-1 sm:-right-2 bg-gradient-to-tr from-[#1DA851] to-[#25D366] text-white p-3.5 rounded-full shadow-[0_15px_25px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform duration-300 z-30 border-2 border-white/20 group-hover:animate-pulse"
                      >
                        <MessageCircle className="w-6 h-6 fill-current" />
                      </a>
                    </motion.div>
                  </div>
                  
                  <div className="text-center sm:text-left flex-grow">
                    <div className="inline-flex items-center space-x-2 bg-[#EFC46C]/10 px-3 py-1 pb-1.5 rounded-full mb-3 ml-2 border border-[#EFC46C]/20 shadow-sm">
                       <span className="w-2 h-2 rounded-full bg-[#EFC46C] animate-pulse"></span>
                       <p className="text-[#EFC46C] text-xs font-black tracking-widest uppercase">En Línea Ahora</p>
                    </div>
                    <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-1">Asesor Comercial</p>
                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 drop-shadow-md">José Luis</h3>
                    
                    <a 
                      href="https://wa.me/5493875557009" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block text-xl font-light text-gray-200 hover:text-white transition-colors mb-4"
                    >
                      +54 9 387 555-7009
                    </a>
                    
                    <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-4 hidden sm:block"></div>
                    <p className="text-sm text-gray-400 italic leading-relaxed">
                      "Te acompañaré en esta única e importante oportunidad para el futuro de tu familia."
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 text-center md:text-right w-full">
              <p className="text-lg md:text-xl font-light text-gray-300 tracking-wider drop-shadow-md pb-4">
                Asesorarte y acompañarte en este proceso es nuestra misión.
              </p>
            </footer>

          </div>
        </motion.div>
      )}
    </>
  );
}

