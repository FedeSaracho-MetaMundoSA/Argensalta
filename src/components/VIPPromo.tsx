import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Home, MapPin, CheckCircle2, MoveRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VIPPromo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 3D Floating Button */}
      <motion.button
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10], rotateZ: [0, -2, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 sm:bottom-12 sm:left-12 z-[100] group cursor-pointer"
      >
        <div className="relative">
          {/* Outer glow and shadows */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#EFC46C] via-[#DFA238] to-[#EFC46C] rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
          
          {/* Main button body (Simulating 3D / Blender 4D materials) */}
          <div className="relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-white/20 shadow-[inset_0_-8px_20px_rgba(0,0,0,0.5),inset_0_4px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(239,196,108,0.4)] backdrop-blur-md overflow-hidden bg-gradient-to-br from-[#EFC46C] via-[#DFA238] to-amber-800 transition-transform group-hover:scale-110 duration-300">
            {/* Shines */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none"></div>
            <div className="absolute top-2 left-2 right-2 h-4 bg-white/20 rounded-full blur-sm pointer-events-none"></div>
            
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-1 drop-shadow-md" />
            <span className="text-[10px] sm:text-xs font-black text-black uppercase tracking-widest drop-shadow-sm text-center leading-tight">
              Oferta<br/>VIP
            </span>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-lg border border-red-400 animate-bounce">
            Imperdible
          </div>
        </div>
      </motion.button>

      {/* Info Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-[#EFC46C]/30 rounded-3xl shadow-[0_0_50px_rgba(239,196,108,0.2)] p-1 scrollbar-hide flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-[120] bg-black/50 hover:bg-black text-[#EFC46C] hover:text-white w-10 h-10 rounded-full flex items-center justify-center border border-[#EFC46C]/30 hover:border-[#EFC46C] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Visuals */}
              <div className="md:w-1/2 relative overflow-hidden rounded-2xl md:rounded-r-none md:rounded-l-[1.4rem]">
                <div className="absolute inset-0 bg-black" />
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" 
                  alt="Don Borromeo" 
                  className="w-full h-[250px] md:h-1/2 object-cover opacity-70"
                />
                <img 
                  src="/imagen.jpg" 
                  alt="CUBE" 
                  className="w-full h-[250px] md:h-1/2 object-cover border-t-2 border-[#EFC46C]/50 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 border-[6px] border-[#EFC46C]/20 pointer-events-none rounded-2xl md:rounded-r-none md:rounded-l-[1.4rem]" />
              </div>

              {/* Right Column: Content */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col bg-gradient-to-b from-zinc-900 to-black rounded-b-2xl md:rounded-l-none md:rounded-r-[1.4rem]">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#EFC46C] to-[#DFA238] px-4 py-1.5 rounded-full mb-4 w-max shadow-lg">
                  <span className="text-black text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Oferta VIP Combo
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-2">
                  Lote + Vivienda<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EFC46C] to-[#DFA238]">VivaCube 30m²</span>
                </h3>

                <div className="flex items-end gap-3 mb-6 pb-6 border-b border-white/10">
                  <span className="text-4xl font-light text-white tracking-tight">USD 35.000</span>
                </div>

                <div className="space-y-4 flex-1">
                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    Accede a una solución integral en pleno corazón de los Valles Calchaquíes. Combinamos terreno y vivienda en un entorno natural privilegiado con excelente proyección.
                  </p>
                  
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#EFC46C] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white text-xs uppercase tracking-wider font-bold mb-0.5">San Carlos - Salta</strong>
                        <span className="text-gray-400 text-xs">Sobre Ruta Nacional 40, ubicación estratégica.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Home className="w-4 h-4 text-[#EFC46C] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white text-xs uppercase tracking-wider font-bold mb-0.5">Don Borromeo + VivaCube 30m²</strong>
                        <span className="text-gray-400 text-xs">Escritura y posesión inmediata del lote. Plazo de entrega estimado vivienda: 18 meses.</span>
                      </div>
                    </li>
                  </ul>

                  <div className="grid grid-cols-2 gap-2 mt-6">
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5"><CheckCircle2 className="w-4 h-4 text-[#EFC46C]" /> <span className="text-[10px] text-gray-300">Vistas al Cerro Zorrito</span></div>
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5"><CheckCircle2 className="w-4 h-4 text-[#EFC46C]" /> <span className="text-[10px] text-gray-300">Red Agua / Prox Luz</span></div>
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5"><CheckCircle2 className="w-4 h-4 text-[#EFC46C]" /> <span className="text-[10px] text-gray-300">Entorno Único</span></div>
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5"><CheckCircle2 className="w-4 h-4 text-[#EFC46C]" /> <span className="text-[10px] text-gray-300">Ideal Renta Turística</span></div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <a 
                    href="https://wa.me/5493875557009?text=Hola,%20me%20interesa%20la%20oferta%20del%20Combo%20VIP%20Lote%20+%20VivaCube%2030m2%20a%20USD%2035.000."
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'click_vip_promo_advisor', {
                          'event_category': 'Lead',
                          'event_label': 'VIP Promo Advisor Contact'
                        });
                      }
                    }}
                    className="w-full text-center py-4 bg-gradient-to-r from-[#EFC46C] to-[#DFA238] hover:from-[#f3cd7c] hover:to-[#eeb44c] text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_30px_rgba(239,196,108,0.4)] text-xs flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    Contactar Asesor <MoveRight className="w-4 h-4" />
                  </a>
                  <Link 
                    to="/proyecto/don-borromeo"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-4 bg-zinc-900 border border-white/10 hover:border-[#EFC46C]/50 hover:bg-black text-white font-bold uppercase tracking-widest rounded-xl transition-all text-[10px] flex items-center justify-center gap-2"
                  >
                    Ver detalles del proyecto
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
