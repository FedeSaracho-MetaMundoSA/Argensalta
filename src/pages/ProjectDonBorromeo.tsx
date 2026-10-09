import { MapPin, ArrowRight, CircleDollarSign, BadgePercent, Droplets, MessageCircle, Map as MapIcon, X, CheckCircle2, Loader2, CreditCard, ShieldCheck, AlertCircle, MountainSnow, Store, Handshake, Sun, Home, MoveRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import InteractiveDonBorromeoMasterplan from '../components/InteractiveDonBorromeoMasterplan';

function MapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleClose = () => onClose();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-gray-900 flex flex-col pt-4 md:pt-8"
        >
          {/* Header */}
          <div className="bg-black/90 p-4 sm:p-6 flex justify-between items-center border-b-[3px] border-[#EFC46C] shadow-lg relative z-20">
            <div className="flex items-center">
              <MapIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-[#EFC46C]" /> 
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase relative z-10 drop-shadow-lg">
                   Plano de Lotes Completos
                </h2>
                <p className="text-[#EFC46C] tracking-widest text-[10px] sm:text-xs mt-1 font-bold">DON BORROMEO</p>
              </div>
            </div>
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="bg-black/60 hover:bg-white/10 p-3 rounded-full text-white transition-all shadow-md border border-white/20 hover:scale-110"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Full Screen Image Map */}
          <div className="flex-grow w-full h-[85vh] bg-gray-100 flex items-center justify-center p-2 overflow-auto relative">
             <InteractiveDonBorromeoMasterplan />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IntroVideo({ onComplete }: { key?: string; onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 3500); // fade in
    const t2 = setTimeout(() => setPhase(2), 5500); // grid
    const t3 = setTimeout(() => setPhase(3), 8500); // logo
    const t4 = setTimeout(() => onComplete(), 12500); // done

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
            <h2 className="text-2xl md:text-5xl text-[#EFC46C] tracking-widest font-light mb-4 drop-shadow-md">
              Oportunidad Única...
            </h2>
            <p className="text-lg md:text-2xl text-gray-400 tracking-wide font-sans">
              En los Valles Calchaquíes
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
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80")' }}
          />
          <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
          
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
                      <motion.rect 
                        x="5" y="5" width="90" height="90" 
                        fill="rgba(239, 196, 108, 0.05)" stroke="#EFC46C" strokeWidth="0.8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                      />
                      {gridLines.map((_, i) => (
                        <motion.line 
                          key={`r-${i}`}
                          x1="5" y1={5 + (90 / 20) * i} x2="95" y2={5 + (90 / 20) * i}
                          stroke="#EFC46C" strokeWidth="0.2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: i * 0.05, ease: "easeOut" }}
                        />
                      ))}
                      {gridLines.map((_, i) => (
                         <motion.line 
                         key={`c-${i}`}
                         x1={5 + (90 / 20) * i} y1="5" x2={5 + (90 / 20) * i} y2="95"
                         stroke="#EFC46C" strokeWidth="0.2"
                         initial={{ pathLength: 0 }}
                         animate={{ pathLength: 1 }}
                         transition={{ duration: 2, delay: i * 0.05, ease: "easeOut" }}
                       />
                      ))}
                    </svg>
                </motion.div>
             </div>
          )}

          <AnimatePresence>
            {phase >= 3 && (
                <motion.div
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                >
                   <motion.h1 
                     className="text-5xl md:text-8xl font-serif font-bold text-[#EFC46C] drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] tracking-widest text-center"
                     initial={{ y: 50, opacity: 0, scale: 0.95 }}
                     animate={{ y: 0, opacity: 1, scale: 1 }}
                     transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                   >
                     DON <span className="text-4xl md:text-7xl text-white">BORROMEO</span>
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
                     className="text-xl md:text-2xl font-light tracking-[0.4em] text-gray-300 uppercase"
                   >
                     San Carlos, Ruta 40
                   </motion.p>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ProjectDonBorromeo() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Don Borromeo | Loteo Privado en San Carlos, Salta</title>
        <meta name="description" content="Descubrí Don Borromeo, loteo privado en San Carlos sobre Ruta 40, a minutos de Cafayate. Terrenos con escritura inmediata, vista a los cerros y preventa exclusiva." />
        <meta name="keywords" content="Don Borromeo, loteo San Carlos, Ruta 40, Cafayate, terrenos en venta, Argensalta, Valles Calchaquies" />
      </Helmet>
      <AnimatePresence>
        {showIntro && <IntroVideo key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <motion.div 
          className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Animated Background Image - Landscape of Valles Calchaquies */}
          <motion.div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat origin-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80")' }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 1, -1, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[2px]"></div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-between min-h-screen">
            
            <header className="mb-12 flex flex-col items-center md:items-start text-center md:text-left mt-8">
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-xl tracking-wide mb-3 flex flex-col">
                <span>DON</span>
                <span className="text-[#EFC46C]">BORROMEO</span>
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-[#EFC46C] w-6 h-6" />
                  <span className="text-xl md:text-2xl font-light text-gray-200 tracking-widest uppercase text-shadow-md">San Carlos, Ruta 40 - Valles Calchaquíes</span>
                </div>
                <div className="hidden sm:block text-gray-400">|</div>
                <div className="inline-flex gap-3">
                  <div className="px-5 py-1 bg-[#EFC46C]/10 backdrop-blur-md border border-[#EFC46C]/30 rounded-full shadow-lg">
                    <span className="text-[#EFC46C] font-semibold text-xs tracking-[0.2em] uppercase">Loteo Privado</span>
                  </div>
                  <div className="hidden md:block px-5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
                    <span className="text-white font-semibold text-xs tracking-[0.2em] uppercase">Escritura Inmediata</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 max-w-2xl text-lg font-light leading-relaxed mb-6">
                Una inversión que combina seguridad, proyección y la sublime belleza natural de los Valles Calchaquíes. Un entorno de paz y exclusividad absoluta.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button 
                  onClick={() => setIsMapOpen(true)}
                  className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#EFC46C] to-[#DFA238] rounded-full text-black font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(239,196,108,0.4)] hover:shadow-[0_15px_50px_rgba(239,196,108,0.6)] transition-all hover:scale-105 overflow-hidden flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  <MapIcon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 text-sm md:text-base">Ver Terrenos</span>
                </button>
                
                <a 
                  href="/mensura-don-borromeo.pdf" 
                  download="Mensura_Don_Borromeo.pdf"
                  className="group relative px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold uppercase tracking-widest hover:bg-white/20 transition-all hover:scale-105 flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  <MapIcon className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-sm md:text-base">Descargar Mensura</span>
                </a>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-black/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFC46C]/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                  <p className="text-[#EFC46C] text-sm uppercase tracking-widest font-semibold mb-2 flex items-center">
                    <CircleDollarSign className="w-5 h-5 mr-2" />
                    Precio Contado X Lote Completo
                  </p>
                  <p className="text-5xl md:text-6xl font-light text-white tracking-tight">USD 6,000</p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4">
                    <div className="flex items-center text-sm font-light text-gray-300">
                      <ShieldCheck className="w-4 h-4 text-green-400 mr-2" /> Posesión y Escritura Inmediata
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl transition hover:bg-black/60">
                      <Droplets className="w-8 h-8 text-[#EFC46C] mb-3" />
                      <h3 className="text-white font-medium text-lg mb-1 drop-shadow">Red de Servicios</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Agua disponible, próxima instalación de red eléctrica y conectividad Wi-Fi.</p>
                    </div>
                    <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl transition hover:bg-black/60">
                      <Store className="w-8 h-8 text-[#EFC46C] mb-3" />
                      <h3 className="text-white font-medium text-lg mb-1 drop-shadow">Sector Comercial</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Área proyectada sobre el frente del loteo (Ruta 40) para desarrollo turístico y comercial.</p>
                    </div>
                  </div>

                  <div className="block bg-gradient-to-br from-[#EFC46C]/20 via-[#EFC46C]/10 to-transparent border-2 border-[#EFC46C] rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(239,196,108,0.2)] transition-all group overflow-hidden relative">
                    <div className="absolute -right-12 -top-12 bg-[#EFC46C]/20 w-48 h-48 rounded-full blur-3xl pointer-events-none"></div>
                    <span className="absolute top-0 right-8 bg-[#EFC46C] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-b-xl shadow-lg">Oferta VIP Combo</span>
                    
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-gradient-to-br from-[#EFC46C] to-[#DFA238] text-black rounded-2xl shrink-0 shadow-lg relative">
                        <Home className="w-8 h-8" />
                        <div className="absolute -top-2 -right-2 bg-white text-black w-6 h-6 rounded-full flex items-center justify-center shadow font-black text-xs animate-bounce">
                          ✨
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <h4 className="text-[#EFC46C] font-black text-xl sm:text-2xl uppercase tracking-tighter drop-shadow-md leading-none">
                          Lote + VivaCube 30m²
                        </h4>
                        <div className="flex items-end gap-3 mt-2 mb-3">
                          <span className="text-3xl sm:text-4xl font-light text-white tracking-tight">USD 35.000</span>
                        </div>
                        <ul className="text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed font-light space-y-2 mb-5">
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#EFC46C]" /> Escritura y posesión del lote inmediata.</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#EFC46C]" /> Vivienda Modular VivaCube lista (18 meses entrega est).</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#EFC46C]" /> Ideal vivir, vacacionar o renta turística.</li>
                        </ul>
                        <a 
                           href="https://wa.me/5493875557009?text=Hola,%20me%20interesa%20la%20oferta%20del%20Combo%20VIP%20Lote%20+%20VivaCube%2030m2%20a%20USD%2035.000%20en%20Don%20Borromeo."
                           target="_blank" 
                           rel="noreferrer"
                           className="inline-flex w-max items-center gap-3 text-xs sm:text-sm text-black font-black uppercase tracking-widest bg-[#EFC46C] px-6 py-3 rounded-xl hover:bg-white hover:text-black hover:scale-105 transition-all shadow-[0_5px_15px_rgba(239,196,108,0.4)] relative z-10"
                        >
                          Reservar Oferta por WhatsApp <MoveRight className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#EFC46C] to-[#C49B55] rounded-3xl p-6 text-black shadow-xl relative overflow-hidden group">
                    <MountainSnow className="absolute -right-4 -bottom-4 w-32 h-32 text-black/10 group-hover:scale-110 transition-transform duration-500" />
                    <p className="text-[#3A2201] text-xs font-bold uppercase tracking-widest mb-1">Cerro Zorrito</p>
                    <p className="text-4xl font-bold mb-1 text-[#3A2201] mt-2">Desde 300 m²</p>
                    <p className="text-[#4A3205] text-sm font-bold opacity-90 mt-2">Vista privilegiada de los Valles</p>
                  </div>
                  
                  <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between">
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1 flex items-center">Financiación</p>
                      <p className="text-3xl font-light text-white mb-1">USD 3,500 <span className="text-sm text-gray-400 font-normal">Anticipo</span></p>
                    </div>
                    <div className="mt-4 inline-block align-bottom">
                      <p className="text-[#EFC46C] text-lg font-bold">20 Cuotas Fijas</p>
                      <p className="text-gray-300 font-serif text-xl italic">de USD 200</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center sm:items-center gap-6 relative mt-4 group hover:border-[#EFC46C]/30 transition-all duration-500">
                  <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 z-10 mx-auto sm:mx-0">
                    <div className="absolute inset-0 rounded-full bg-gray-800 border-2 border-[#EFC46C] overflow-hidden flex items-center justify-center">
                      <img src="/JoseLuis.jpeg" alt="Asesor" className="w-full h-full object-cover object-center" />
                    </div>
                  </div>
                  
                  <div className="text-center sm:text-left flex-grow">
                    <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-1">Asesor Comercial</p>
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 drop-shadow-md">José Luis</h3>
                    
                    <a 
                      href="https://wa.me/5493875557009" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center text-lg font-light text-[#EFC46C] hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" /> +54 9 387 555-7009
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <footer className="mt-12 w-full pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm font-light text-gray-400 tracking-wider text-center md:text-left">
                Ideal para desarrollo turístico o tu casa en los Valles.
              </p>
              <div className="flex items-center mt-4 md:mt-0 space-x-2 text-[#EFC46C]">
                <Handshake className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Inversión Segura</span>
              </div>
            </footer>

          </div>
        </motion.div>
      )}

      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </>
  );
}
