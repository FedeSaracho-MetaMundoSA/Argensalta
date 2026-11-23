import { MapPin, ArrowRight, CircleDollarSign, Trees, Droplets, MessageCircle, CheckCircle2, ShieldCheck, Compass, FileText, Ruler, HelpCircle, UserCheck, BarChart3, TrendingUp, Building, Layers, Eye } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function IntroVideo({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2500); // Background fades in
    const t2 = setTimeout(() => setPhase(2), 4500); // Grid starts drawing
    const t3 = setTimeout(() => setPhase(3), 6500); // Logo appears
    const t4 = setTimeout(() => onComplete(), 9500); // Done, fade out

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const gridLines = Array.from({ length: 15 });

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
        Saltar Presentación <ArrowRight className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            key="text1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-center px-6"
          >
            <span className="text-[#EFC46C] font-mono tracking-[0.4em] text-xs uppercase block mb-3">Oportunidad de Portafolio en Block</span>
            <h2 className="text-3xl md:text-5xl text-white tracking-widest font-light mb-4 leading-normal">
              Un Desarrollo Completo en la Caldera...
            </h2>
            <p className="text-sm md:text-base text-gray-400 tracking-widest font-sans uppercase">
              Para Desarrolladores e Inversores de Gran Escala
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {(phase >= 1) && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2874&auto=format&fit=crop")' }}
          />
          <div className="absolute inset-0 bg-black/75 mix-blend-multiply" />
          
          {/* Animated 3D Grid Overlay representing Mensura Subdivision */}
          {phase >= 2 && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{ perspective: '800px' }}>
                <motion.div 
                  className="w-[120%] h-[120%] md:w-[80%] md:h-[80%] border-4 border-transparent"
                  style={{ transform: 'rotateX(55deg) rotateZ(-20deg) translateY(-10%)', transformStyle: 'preserve-3d' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 1 }}
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Perimeter */}
                      <motion.rect 
                        x="5" y="5" width="90" height="90" 
                        fill="rgba(16, 185, 129, 0.05)" stroke="#10B981" strokeWidth="0.8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      {/* Rows */}
                      {gridLines.map((_, i) => (
                        <motion.line 
                          key={`r-${i}`}
                          x1="5" y1={5 + (90 / 15) * i} x2="95" y2={5 + (90 / 15) * i}
                          stroke="#EFC46C" strokeWidth="0.3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
                        />
                      ))}
                      {/* Cols */}
                      {gridLines.map((_, i) => (
                        <motion.line 
                          key={`c-${i}`}
                          x1={5 + (90 / 15) * i} y1="5" x2={5 + (90 / 15) * i} y2="95"
                          stroke="#EFC46C" strokeWidth="0.3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
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
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                   <motion.h1 
                     className="text-4xl md:text-6xl font-serif font-black text-[#EFC46C] drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] tracking-widest text-center uppercase"
                     initial={{ y: 30, opacity: 0, scale: 0.95 }}
                     animate={{ y: 0, opacity: 1, scale: 1 }}
                     transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                   >
                     LA CALDERILLA
                   </motion.h1>
                   <motion.div
                     initial={{ width: 0, opacity: 0 }}
                     animate={{ width: "200px", opacity: 1 }}
                     transition={{ duration: 1, delay: 1 }}
                     className="h-[2px] bg-gradient-to-r from-transparent via-[#EFC46C] to-transparent mt-4 mb-3"
                   />
                   <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 1, delay: 1.4 }}
                     className="text-xs md:text-sm font-light tracking-[0.4em] text-emerald-400 uppercase text-center"
                   >
                     Masterplan Integral de Montaña • 32 Hectáreas
                   </motion.p>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

// Subdivided layout for Fraction B (approx 136 potential lots for visualization)
const PROYECTO_LOTES = [
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 1;
    const surface = num === 1 || num === 34 ? 460.38 : (num === 2 || num === 33 ? 451.54 : (num === 3 || num === 32 ? 450.69 : (num === 4 || num === 31 ? 449.30 : 450.00)));
    return { id: `C-A-${num}`, block: 'A', lotNumber: num.toString().padStart(2, '0'), surface };
  }),
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 1;
    const surface = num === 1 || num === 34 ? 460.38 : (num === 2 || num === 33 ? 451.54 : (num === 3 || num === 32 ? 450.69 : (num === 4 || num === 31 ? 449.30 : 450.00)));
    return { id: `C-B-${num}`, block: 'B', lotNumber: num.toString().padStart(2, '0'), surface };
  }),
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 1;
    const surface = num === 1 || num === 34 ? 460.38 : (num === 2 || num === 33 ? 451.54 : (num === 3 || num === 32 ? 450.69 : (num === 4 || num === 31 ? 449.30 : 450.00)));
    return { id: `C-C-${num}`, block: 'C', lotNumber: num.toString().padStart(2, '0'), surface };
  }),
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 1;
    let surface = num === 1 || num === 34 ? 460.38 : (num === 2 || num === 33 ? 451.54 : 450.00);
    if (num === 10) surface = 508.36;
    else if (num === 11) surface = 472.89;
    else if (num === 25) surface = 507.32;
    return { id: `C-D-${num}`, block: 'D', lotNumber: num.toString().padStart(2, '0'), surface };
  })
];

const COORDENADAS_GAUSS_KRUGER = [
  { vt: '1', este: '3565689,93', norte: '7274514,22' },
  { vt: '2', este: '3565717,93', norte: '7274437,15' },
  { vt: '3', este: '3562697,54', norte: '7274700,12' },
  { vt: '4', este: '3562695,53', norte: '7274701,14' },
  { vt: '5', este: '3562682,92', norte: '7274774,80' },
  { vt: '6', este: '3562685,86', norte: '7274773,80' },
  { vt: '7', este: '3561978,08', norte: '7274762,76' },
  { vt: '8', este: '3561944,71', norte: '7274838,89' },
];

const RECREATIONAL_AREAS = [
  { name: 'Área Total Fracción B', detail: '22 Hectáreas 2.765,31 m²' },
  { name: 'Reserva Ampliación Forestal', detail: '10 Hectáreas 6.645,09 m²' },
  { name: 'Suelo Destinado a Lotes', detail: '6 Hectáreas 1.263,60 m² (136 Parcelas)' },
  { name: 'Espacios Verdes y Caminos', detail: '1 Hectárea 5.820,90 m²' },
  { name: 'Costa Ribereña Arroyo Calderilla', detail: 'Más de 1.800 metros lineales continuos' }
];

export default function ProjectCalderilla() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [selectedLot, setSelectedLot] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'roi' | 'plano' | 'ficha' | 'balance'>('roi');

  // ROI Calculator States
  const [avgLotPrice, setAvgLotPrice] = useState(13500); // Standard sale price per individual lot
  const totalLots = 136;
  const estimatedGrossRevenue = avgLotPrice * totalLots;
  const areaVendibleTotal = 61263; // m2

  const filteredLots = PROYECTO_LOTES.filter(l => 
    l.block === selectedBlock && 
    (searchTerm === '' || l.lotNumber.includes(searchTerm))
  );

  return (
    <>
      <Helmet>
        <title>Venta de Masterplan La Calderilla | Desarrollo Inmobiliario Completo en Salta</title>
        <meta name="description" content="Excelente oportunidad para desarrolladores. Venta en block de La Calderilla: Masterplan de 32 Hectáreas con mensura aprobada y trazado para 136 lotes en La Caldera, Salta." />
        <meta name="keywords" content="Venta de campo Salta, masterplan inmobiliario Salta, La Calderilla en block, loteo completo Salta, Jose Luis Argensalta, desarrollo turistico Salta" />
      </Helmet>

      <AnimatePresence>
        {showIntro && <IntroVideo key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <motion.div 
          className="relative min-h-screen bg-gray-950 text-white overflow-hidden font-sans pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Panoramic Background */}
          <motion.div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat origin-center opacity-20 pointer-events-none"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2874&auto=format&fit=crop")' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-950/95 to-black pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-between min-h-screen">
            
            {/* Top HUD Breadcrumb */}
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <Link to="/proyectos" className="text-xs font-black uppercase tracking-widest text-[#EFC46C] hover:text-white transition-colors flex items-center gap-2">
                ← Volver a Proyectos
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full animate-pulse">
                  ● 100% VENDIDO EN BLOCK
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full hidden sm:inline-block">
                  Caso de Éxito ArgenSalta
                </span>
              </div>
            </div>

            {/* Elegant Header with Sold Status */}
            <header className="mb-12 flex flex-col items-center md:items-start text-center md:text-left relative">
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-500/40 px-4 py-2 rounded-full relative">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-red-300 text-xs font-black uppercase tracking-widest">
                    OPERACIÓN CERRADA • VENDIDO EN SU TOTALIDAD
                  </span>
                </div>
                <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                  <Trees className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">
                    Masterplan 32 Hectáreas • Fracción B
                  </span>
                </div>
              </div>

              <h1 className="text-5xl md:text-8xl font-serif font-black text-white drop-shadow-2xl tracking-tight mb-4 uppercase leading-none flex flex-wrap items-center gap-4">
                LA <span className="text-[#EFC46C]">CALDERILLA</span>
                <span className="text-sm md:text-lg bg-red-600 text-white font-sans font-black px-4 py-1.5 rounded-2xl uppercase tracking-widest shadow-lg">
                  SOLD OUT
                </span>
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-[#EFC46C] w-6 h-6 shrink-0" />
                  <span className="text-xl md:text-2xl font-light text-gray-200 tracking-widest uppercase">La Caldera, Salta</span>
                </div>
                <div className="hidden sm:block text-gray-500">|</div>
                <div className="inline-flex gap-3">
                  <div className="px-5 py-1 bg-[#EFC46C]/10 backdrop-blur-md border border-[#EFC46C]/30 rounded-full">
                    <span className="text-[#EFC46C] font-semibold text-xs tracking-[0.2em] uppercase">Mensura y Catastro Inscripto</span>
                  </div>
                  <div className="px-5 py-1 bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-full">
                    <span className="text-red-300 font-semibold text-xs tracking-[0.2em] uppercase">Colocación 100% Completada</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 max-w-4xl text-lg font-light leading-relaxed mb-6 border-l-4 border-red-500 pl-6">
                El **Masterplan Ecológico La Calderilla** ha concluido su ciclo de venta mayorista con un rotundo éxito. Se estructuraron **22 Hectáreas aprobadas (Fracción B)** y una reserva forestal nativa de **10 Hectáreas**, transferidas en su totalidad. ArgenSalta continúa estructurando nuevas fracciones de alta rentabilidad en los Valles de Salta.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <a 
                  href="https://wa.me/5493875557009?text=Hola%20Jose%20Luis,%20vi%20el%20exito%20de%20venta%20de%20La%20Calderilla.%20Quisiera%20recibir%20informacion%20sobre%20proximas%20adquisiciones%20en%20block." 
                  target="_blank" 
                  rel="noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-[#EFC46C] rounded-full text-black font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(239,68,68,0.3)] hover:shadow-[0_15px_50px_rgba(239,196,108,0.5)] transition-all hover:scale-105 overflow-hidden flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5 relative z-10 text-white" />
                  <span className="relative z-10 text-sm text-white">Consultar Próximos Desarrollos</span>
                </a>

                <a 
                  href="#analisis"
                  className="px-8 py-4 bg-white/5 border border-white/20 rounded-full text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all hover:scale-105 text-center text-sm"
                >
                  Ver Ficha Técnica del Proyecto
                </a>
              </div>
            </header>

            {/* Core Project Visual Assets / Video showcase simulation */}
            <div className="my-12 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#EFC46C]/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-[#EFC46C] text-xs font-black uppercase tracking-widest block mb-2">📹 Registro de Campo</span>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Inspección de Terreno & Entorno</h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                    El predio cuenta con un acceso consolidado directo, arbolado autóctono (cebiles, tipas y nogales) y más de **1.800 metros de margen sobre el Arroyo Calderilla**. Este material representa la fisonomía exacta del masterplan, ideal para un desarrollo eco-turístico, barrio cerrado de chacras o club de campo de montaña de alto nivel.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-xs text-gray-300 font-bold">Reserva de 10 Hectáreas inalterable para valorizar las parcelas.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-xs text-gray-300 font-bold">Topografía con pendientes suaves óptimas para la edificación.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-xs text-gray-300 font-bold">Zonificación habilitada para proyectos ecológicos de bajo impacto.</span>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer aspect-video bg-black flex flex-col justify-center items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2874&auto=format&fit=crop" 
                    alt="Terreno La Calderilla" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
                  
                  {/* Play representation */}
                  <div className="relative z-10 w-16 h-16 bg-[#EFC46C] text-black rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                    <span className="text-xl ml-1">▶</span>
                  </div>
                  <span className="relative z-10 mt-4 text-[10px] font-black uppercase tracking-widest text-[#EFC46C] bg-black/70 px-4 py-2 rounded-full border border-[#EFC46C]/30">
                    Solicitar Video Técnico por WhatsApp
                  </span>
                  
                  <a 
                    href="https://wa.me/5493875557009?text=Hola,%20deseo%20que%20me%20envien%20el%20video%20de%20recorrido%20aereo/terreno%20de%20La%20Calderilla."
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute inset-0 z-20"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Investment Section */}
            <div id="analisis" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start my-12">
              
              {/* Left Column: Features & Key Investor Strengths */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Masterplan Key Values */}
                <div className="bg-black/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -mr-8 -mt-8"></div>
                  <p className="text-emerald-400 text-xs uppercase tracking-widest font-black mb-3 flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Atributos Legales de la Tierra
                  </p>
                  <h3 className="text-white text-3xl font-serif mb-6 leading-tight">Plena Factibilidad Inmobiliaria</h3>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#EFC46C]/10 p-2 rounded-xl mt-1">
                        <CheckCircle2 className="w-5 h-5 text-[#EFC46C]" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-bold">Mensura Certificada</h4>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">Plano registrado ante la Dirección General de Inmuebles en la Provincia de Salta. Sin grises legales.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[#EFC46C]/10 p-2 rounded-xl mt-1">
                        <Compass className="w-5 h-5 text-[#EFC46C]" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-bold">Ampliación Forestal Propia</h4>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">Reserva de 10 Hectáreas inscripta que actúa como pulmón verde inalterable, multiplicando el precio del metro cuadrado.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[#EFC46C]/10 p-2 rounded-xl mt-1">
                        <Droplets className="w-5 h-5 text-[#EFC46C]" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-bold">Conexión con el Arroyo</h4>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">Más de 1.8km de costa natural. Genera un ecosistema residencial fresco y exclusivo de gran demanda turística.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Documents Download Requests */}
                <div className="bg-gray-950/80 border border-white/5 rounded-3xl p-8 space-y-4">
                  <h4 className="text-white font-serif text-xl mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#EFC46C]" /> Documentación Técnica VIP
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    Solicitá la carpeta legal completa para tu análisis de pre-factibilidad técnica y due diligence corporativo.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <a 
                      href="https://wa.me/5493875557009?text=Hola%20Jose%20Luis,%20solicito%20el%20Plano%20de%20Mensura%20Aprobado%20en%20PDF%20de%20La%20Calderilla."
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all text-xs font-bold"
                    >
                      <span className="flex items-center gap-2 text-gray-300">📄 Plano de Mensura Aprobado (PDF)</span>
                      <ArrowRight className="w-4 h-4 text-[#EFC46C]" />
                    </a>

                    <a 
                      href="https://wa.me/5493875557009?text=Hola%20Jose%20Luis,%20solicito%20el%20archivo%20KMZ%20para%20Google%20Earth%20del%20loteo%20La%20Calderilla."
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all text-xs font-bold"
                    >
                      <span className="flex items-center gap-2 text-gray-300">🗺️ Poligonal Georreferenciada (KMZ)</span>
                      <ArrowRight className="w-4 h-4 text-[#EFC46C]" />
                    </a>

                    <a 
                      href="https://wa.me/5493875557009?text=Hola%20Jose%20Luis,%20solicito%20el%20Memorandum%20Inmobiliario%20Completo%20de%20La%20Calderilla."
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all text-xs font-bold"
                    >
                      <span className="flex items-center gap-2 text-gray-300">📁 Dossier Financiero de Retorno</span>
                      <ArrowRight className="w-4 h-4 text-[#EFC46C]" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic ROI Calculator & Subdivision Masterplan Explorer */}
              <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-[3rem] p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative">
                
                {/* HUD tab switcher */}
                <div className="flex border-b border-white/10 mb-8 overflow-x-auto pb-1 gap-6">
                  <button 
                    onClick={() => setActiveTab('roi')}
                    className={`pb-3 text-sm font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === 'roi' ? 'text-[#EFC46C] border-b-2 border-[#EFC46C]' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    Simulador Financiero (ROI)
                  </button>
                  <button 
                    onClick={() => setActiveTab('plano')}
                    className={`pb-3 text-sm font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === 'plano' ? 'text-[#EFC46C] border-b-2 border-[#EFC46C]' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    Subdivisiones Aprobadas
                  </button>
                  <button 
                    onClick={() => setActiveTab('ficha')}
                    className={`pb-3 text-sm font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === 'ficha' ? 'text-[#EFC46C] border-b-2 border-[#EFC46C]' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    Ficha de Georreferencia
                  </button>
                  <button 
                    onClick={() => setActiveTab('balance')}
                    className={`pb-3 text-sm font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === 'balance' ? 'text-[#EFC46C] border-b-2 border-[#EFC46C]' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    Superficies Aprobadas
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  
                  {/* ROI TAB - The Crown Jewel for Investors */}
                  {activeTab === 'roi' && (
                    <motion.div
                      key="roi-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 text-left"
                    >
                      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <BarChart3 className="w-8 h-8 text-[#EFC46C] shrink-0" />
                        <div>
                          <h4 className="text-white font-black uppercase text-base tracking-wider">Simulación de Retorno Comercial</h4>
                          <p className="text-gray-500 text-xs">Ajustá los valores de venta minorista para calcular el potencial bruto del masterplan</p>
                        </div>
                      </div>

                      <p className="text-gray-300 text-xs font-light leading-relaxed">
                        Este masterplan ya cuenta con subdivisiones aprobadas listas para su comercialización individual. Como comprador en block, podés proyectar la venta de lotes residenciales y estimar tu volumen de facturación bruta total.
                      </p>

                      <div className="bg-black/60 rounded-3xl p-6 border border-white/5 space-y-6">
                        {/* Dynamic Parameters */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Precio Promedio Proyectado por Lote</span>
                            <span className="text-[#EFC46C] font-mono font-bold text-lg">USD {avgLotPrice.toLocaleString()}</span>
                          </div>
                          
                          <input 
                            type="range" 
                            min="8000" 
                            max="30000" 
                            step="500" 
                            value={avgLotPrice}
                            onChange={(e) => setAvgLotPrice(parseInt(e.target.value))}
                            className="w-full accent-[#EFC46C] bg-white/10 rounded-lg appearance-none h-2 cursor-pointer"
                          />
                          
                          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                            <span>Mín: USD 8.000</span>
                            <span>Sugerido de Mercado: USD 14.500</span>
                            <span>Máx: USD 30.000</span>
                          </div>
                        </div>

                        {/* Calculations HUD */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Volumen de Venta Proyectado (Bruto)</span>
                            <span className="text-3xl font-black text-[#EFC46C] font-mono leading-none block">
                              USD {estimatedGrossRevenue.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">✔ Sobre {totalLots} parcelas</span>
                          </div>

                          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Superficie Útil de Venta</span>
                            <span className="text-2xl font-black text-white font-mono leading-none block">
                              {areaVendibleTotal.toLocaleString()} m²
                            </span>
                            <span className="text-[10px] text-gray-400 mt-1 block">Excluye calles y reserva</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <p className="text-emerald-300 font-bold uppercase tracking-wider mb-1">Ventaja del Comprador Originario</p>
                          <p className="text-gray-300 leading-relaxed font-light">
                            Al adquirir el proyecto en block, absorbés toda la plusvalía de la preventa minorista. Con los planos ya visados, la etapa de pre-factibilidad y la georreferenciación finalizadas, el tiempo de maduración financiera se reduce a la mitad.
                          </p>
                        </div>
                      </div>

                      <div className="text-center">
                        <a 
                          href={`https://wa.me/5493875557009?text=Hola%20Jose%20Luis,%20quiero%20agendar%20una%20reunion%20corporativa%20para%20conocer%20el%20precio%20de%20cartera%20cerrada%20del%20masterplan%20La%20Calderilla%20(Proyeccion%20ROI:%20USD%20${estimatedGrossRevenue.toLocaleString()}).`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#EFC46C] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all shadow-md"
                        >
                          Agendar Reunión Comercial de Portafolio <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* SUBDIVISIONS EXPLORER TAB */}
                  {activeTab === 'plano' && (
                    <motion.div
                      key="plano-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
                        <div>
                          <h4 className="text-white font-black uppercase text-base tracking-wider flex items-center gap-2">
                            <Layers className="w-5 h-5 text-[#EFC46C]" /> Plano Guía de Fraccionamiento
                          </h4>
                          <p className="text-gray-500 text-xs">Simulador del loteo de Fracción B inscripto ante la Dirección General de Inmuebles</p>
                        </div>
                        <div className="w-full sm:w-auto flex-grow max-w-xs">
                          <input 
                            type="text" 
                            placeholder="Buscar lote proyectado..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFC46C] text-xs"
                          />
                        </div>
                      </div>

                      {/* Blocks selectors */}
                      <div className="flex gap-2 mb-4">
                        {(['A', 'B', 'C', 'D'] as const).map(block => (
                          <button
                            key={block}
                            onClick={() => { setSelectedBlock(block); setSelectedLot(null); }}
                            className={`px-4 py-2 rounded-xl font-bold tracking-wider text-xs transition-all border ${selectedBlock === block ? 'bg-[#EFC46C] text-black border-[#EFC46C] shadow-md' : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/15'}`}
                          >
                            Manzana {block}
                          </button>
                        ))}
                      </div>

                      {/* Lots Grid */}
                      <div className="border border-white/5 bg-black/40 rounded-3xl p-4 max-h-[250px] overflow-y-auto grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2">
                        {filteredLots.map(lot => (
                          <button
                            key={lot.id}
                            onClick={() => setSelectedLot(lot)}
                            className={`p-2 rounded-xl border text-center transition-all flex flex-col justify-center items-center gap-1 ${selectedLot?.id === lot.id ? 'bg-[#EFC46C] border-[#EFC46C] text-black scale-105' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                          >
                            <span className="text-[8px] font-bold tracking-widest opacity-60">LOTE</span>
                            <span className="text-sm font-black leading-none">{lot.lotNumber}</span>
                            <span className="text-[8px] opacity-75">{Math.round(lot.surface)} m²</span>
                          </button>
                        ))}
                      </div>

                      {/* Detail of selected lot */}
                      <AnimatePresence>
                        {selectedLot && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center gap-4"
                          >
                            <div className="space-y-1">
                              <span className="bg-[#EFC46C]/20 text-[#EFC46C] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                                Lote Registrado Mz {selectedLot.block}
                              </span>
                              <h4 className="text-white text-lg font-black tracking-tight leading-none">
                                Parcela {selectedLot.block}-{selectedLot.lotNumber}
                              </h4>
                              <p className="text-gray-400 text-xs font-light">
                                Superficie catastral aprobada de **{selectedLot.surface.toFixed(2)} m²** dentro del masterplan de 22 Hectáreas.
                              </p>
                            </div>
                            <span className="text-emerald-400 text-xs font-mono shrink-0 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                              Apto Escritura
                            </span>
                          </motion.div>
                        )}
                        {!selectedLot && (
                          <div className="border border-dashed border-white/5 rounded-2xl p-4 text-center text-gray-500 text-xs font-light">
                            Seleccioná cualquier lote proyectado del tablero para analizar sus medidas catastrales exactas.
                          </div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* FICHA TECNICA TAB (GAUSS KRUGER COORDINATES) */}
                  {activeTab === 'ficha' && (
                    <motion.div
                      key="ficha-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <Compass className="w-8 h-8 text-[#EFC46C] shrink-0" />
                        <div>
                          <h4 className="text-white font-black uppercase text-base tracking-wider">Georreferenciación Catastral (Gauss-Krüger)</h4>
                          <p className="text-gray-500 text-xs">Coordenadas de los vértices de replanteo vinculados a la Red POSGAR (POSGAR 07)</p>
                        </div>
                      </div>

                      <div className="bg-black/60 rounded-3xl p-5 border border-white/5 space-y-4">
                        <p className="text-[#EFC46C] text-xs font-black uppercase tracking-widest border-b border-white/5 pb-2">Vértices Georreferenciados de la Poligonal</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-2">
                          {COORDENADAS_GAUSS_KRUGER.map(c => (
                            <div key={c.vt} className="flex justify-between items-center text-xs border border-white/5 rounded-xl p-2.5 font-mono bg-white/5">
                              <span className="text-[#EFC46C] font-bold">Vértice {c.vt}</span>
                              <div className="text-right">
                                <span className="block text-white text-[10px]">Este: {c.este}</span>
                                <span className="block text-gray-500 text-[10px]">Norte: {c.norte}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4 text-xs font-light text-gray-400 border border-white/5">
                        <FileText className="w-6 h-6 text-emerald-400 shrink-0" />
                        <p>
                          La poligonometría fue relevada mediante receptores GNSS de doble frecuencia por un agrimensor matriculado, asegurando absoluta exactitud en las dimensiones de Fraction B y Fraction A.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* BALANCE DE SUPERFICIES TAB */}
                  {activeTab === 'balance' && (
                    <motion.div
                      key="balance-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <Ruler className="w-8 h-8 text-[#EFC46C] shrink-0" />
                        <div>
                          <h4 className="text-white font-black uppercase text-base tracking-wider">Distribución del Suelo del Proyecto</h4>
                          <p className="text-gray-500 text-xs">Organización ecológica aprobada bajo normativas de sustentabilidad</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {RECREATIONAL_AREAS.map((area, i) => (
                          <div key={i} className="bg-black/60 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                            <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">{area.name}</span>
                            <span className="text-[#EFC46C] text-xs font-black font-mono bg-[#EFC46C]/10 px-3 py-1.5 rounded border border-[#EFC46C]/20">{area.detail}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                        <h5 className="text-emerald-300 font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-2">
                          <Trees className="w-4 h-4" /> Preservación Integral de Biodiversidad
                        </h5>
                        <p className="text-xs text-gray-300 leading-relaxed font-light">
                          El trazado del masterplan reserva más de un **40% de las 32 Hectáreas totales** para esparcimiento pasivo, resguardo forestal y zonas comunes de ribera. Esto garantiza que la plusvalía de la urbanización crezca exponencialmente frente a loteos densificados tradicionales.
                        </p>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>

            </div>

            {/* Exclusive Co-Directors / Corporate Team Panel */}
            <div className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative mt-16 group hover:border-[#EFC46C]/20 transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="text-center md:text-left mb-8 border-b border-white/10 pb-6">
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Canal Corporativo • Negociación Privada
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-white mt-3 mb-2">Comité Ejecutivo Directivo</h3>
                <p className="text-gray-400 text-sm font-light">Coordiná directamente una reunión privada de negocios para la evaluación de adquisición total de La Calderilla.</p>
              </div>

              <div className="grid grid-cols-1 max-w-2xl mx-auto gap-10">
                {/* Director 1: Jose Luis */}
                <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/5 border border-white/5 hover:border-[#EFC46C]/30 p-6 rounded-3xl transition-all duration-300">
                  <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-emerald-500 overflow-hidden shrink-0 shadow-lg">
                    <img src="/JoseLuis.jpeg" alt="Director José Luis" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="text-center sm:text-left flex-grow">
                    <p className="text-[#EFC46C] text-[9px] font-black tracking-widest uppercase">José Luis</p>
                    <h4 className="text-white text-xl font-bold font-serif mb-1">Director de Ventas</h4>
                    <p className="text-xs text-gray-400 mb-3 font-light">Especialista en viabilidad catastral y estructuración legal de tierras.</p>
                    
                    <a 
                      href="https://wa.me/5493875557009?text=Hola%20Jose%20Luis,%20me%20interesa%20coordinar%20una%20reunion%20de%20negocios%20con%20usted%20para%20conocer%20el%20proyecto%20La%20Calderilla%20por%20completo." 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center text-xs font-black uppercase text-[#EFC46C] hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-1.5" /> +54 9 387 555-7009
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Aesthetic Footer */}
            <footer className="mt-16 w-full pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm font-light text-gray-400 tracking-wider text-center md:text-left">
                La Calderilla Masterplan © {new Date().getFullYear()} • Argensalta Negocios Inmobiliarios
              </p>
              <div className="flex items-center space-x-2 text-[#EFC46C]">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold uppercase tracking-widest text-emerald-300">Portafolio Corporativo Homologado</span>
              </div>
            </footer>

          </div>
        </motion.div>
      )}
    </>
  );
}
