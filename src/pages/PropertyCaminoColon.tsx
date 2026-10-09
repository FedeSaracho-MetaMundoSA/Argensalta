import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  Waves, 
  Sparkles, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Maximize2, 
  BedDouble, 
  Bath, 
  Utensils, 
  Sun, 
  ShieldCheck, 
  Camera, 
  TrendingUp, 
  Calendar, 
  Info,
  Layers,
  Flame,
  Check
} from 'lucide-react';

export default function PropertyCaminoColon() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'alpina' | 'moderna' | 'exterior'>('all');

  const galleryImages = [
    {
      url: '/properties/camino-a-colon/foto_01.jpg',
      title: 'Vista Panorámica de la Cabaña Alpina y Entorno',
      category: 'alpina',
      desc: 'Fachada frontal de la cabaña alpina con parquizado y acceso vehicular'
    },
    {
      url: '/properties/camino-a-colon/foto_02.jpg',
      title: 'Gran Parque y Piscina con Sistema de Filtrado',
      category: 'exterior',
      desc: 'Piscina equipada con luces subacuáticas, bomba y amplio solárium verde'
    },
    {
      url: '/properties/camino-a-colon/foto_03.jpg',
      title: 'Casa Moderna a Estrenar - Fachada Exterior',
      category: 'moderna',
      desc: 'Segunda vivienda independiente con diseño moderno y líneas limpias'
    },
    {
      url: '/properties/camino-a-colon/foto_04.jpg',
      title: 'Living-Comedor y Cocina Integrada de la Casa Nueva',
      category: 'moderna',
      desc: 'Espacio abierto de amplias dimensiones con gran entrada de luz natural'
    },
    {
      url: '/properties/camino-a-colon/foto_05.jpg',
      title: 'Cocina Equipada a Estrenar con Mesadas',
      category: 'moderna',
      desc: 'Bacha de acero, bajomesada a estrenar y ventanales al jardín'
    },
    {
      url: '/properties/camino-a-colon/foto_06.jpg',
      title: 'Dormitorio Principal Súper Espacioso',
      category: 'moderna',
      desc: 'Ambiente confortable con espacio para cama King Size y placard completo'
    },
    {
      url: '/properties/camino-a-colon/foto_07.jpg',
      title: 'Antebaño y Vanitory de Calidad',
      category: 'moderna',
      desc: 'Sector de lavamanos independiente con terminaciones modernas'
    },
    {
      url: '/properties/camino-a-colon/foto_08.jpg',
      title: 'Baño Completo con Sanitarios Nuevos',
      category: 'moderna',
      desc: 'Revestimientos cerámicos de calidad, ducha amplia y ventilación'
    },
    {
      url: '/properties/camino-a-colon/foto_09.jpg',
      title: 'Interior Cálido de la Cabaña Alpina',
      category: 'alpina',
      desc: 'Estructura en madera noble, ambiente acogedor y funcional'
    },
    {
      url: '/properties/camino-a-colon/foto_10.jpg',
      title: 'Cocina y Sector de Recepción Cabaña',
      category: 'alpina',
      desc: 'Espacio optimizado para renta diaria o vivienda secundaria'
    },
    {
      url: '/properties/camino-a-colon/foto_11.jpg',
      title: 'Dormitorio y Altillo de la Cabaña',
      category: 'alpina',
      desc: 'Espacio de descanso con nivel superior auxiliar para guardado'
    },
    {
      url: '/properties/camino-a-colon/foto_12.jpg',
      title: 'Patio Verde Parquizado y Espacio Recreativo',
      category: 'exterior',
      desc: 'Terreno amplio con cerco perimetral, sol todo el día y vegetación'
    },
    {
      url: '/properties/camino-a-colon/foto_13.jpg',
      title: 'Perspectiva General de las 2 Viviendas en el Lote',
      category: 'exterior',
      desc: 'Predio unificado con total independencia entre ambas construcciones'
    }
  ];

  const filteredImages = activeTab === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeTab);

  const whatsappMessage = encodeURIComponent(
    "Hola José Luis! Vengo de la web de ArgenSalta y estoy interesado en la propiedad de USD 64.000 (2 Casas en 1 con Piscina en Camino a Colón). Quisiera coordinar una visita presencial y recibir más detalles."
  );

  return (
    <div className="bg-black min-h-screen text-white font-sans pt-24 pb-24 selection:bg-[#EFC46C] selection:text-black">
      <Helmet>
        <title>2 Casas en 1 a Estrenar con Piscina - Camino a Colón | Argensalta Propiedades</title>
        <meta name="description" content="Oportunidad Única: 2 Casas en 1 (Cabaña Alpina + Casa Moderna a Estrenar) con piscina y gran parque en Camino a Colón. USD 64.000 Únicamente de Contado." />
        <meta name="keywords" content="2 casas en 1, Camino a Colon, cabaña alpina, casa a estrenar con pileta, Salta, propiedades, venta contado, oportunidad inmobiliaria" />
      </Helmet>

      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-[#EFC46C] transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/proyectos" className="hover:text-[#EFC46C] transition-colors">Propiedades & Desarrollos</Link>
          <span>/</span>
          <span className="text-[#EFC46C] font-bold">2 Casas en 1 • Camino a Colón</span>
        </div>
      </div>

      {/* HERO / PROPERTY TITLE & HIGHLIGHTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-[#EFC46C] text-[#EFC46C] animate-pulse">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                Oportunidad Única • Precio Promocional
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                A Estrenar + Cabaña
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Piscina con Luces & Bomba
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              2 Casas en 1 <span className="text-[#EFC46C]">— A Estrenar</span>
            </h1>

            <div className="flex items-center gap-2 text-gray-300 mt-3 text-sm sm:text-base">
              <MapPin className="w-5 h-5 text-[#EFC46C] shrink-0" />
              <span className="font-semibold text-white">Ubicación: Camino a Colón, Salta</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">Entorno natural, tranquilo y de fácil acceso</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-[#EFC46C]/40 rounded-3xl p-6 sm:p-8 lg:min-w-[340px] shadow-[0_10px_40px_rgba(239,196,108,0.15)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block mb-1">
                Valor Total de Venta
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-serif">
                  USD 64.000
                </span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/40 text-xs font-black uppercase tracking-wider">
                💵 Únicamente de Contado
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
              <a
                href={`https://wa.me/5493875557009?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 bg-gradient-to-r from-[#EFC46C] via-[#f7d68b] to-[#DFA238] hover:scale-[1.02] text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,196,108,0.4)] transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" /> Consultar / Visitar con José Luis
              </a>
              <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">
                Respuesta inmediata • Atención personalizada
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GALLERY SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Large Viewer */}
          <div className="lg:col-span-8 relative rounded-[2.5rem] overflow-hidden border border-white/15 h-[400px] sm:h-[520px] bg-zinc-950 group">
            <img 
              src={galleryImages[selectedImage].url} 
              alt={galleryImages[selectedImage].title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button 
                onClick={() => setLightboxOpen(true)}
                className="p-3 bg-black/60 hover:bg-black text-white rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110"
                title="Ver pantalla completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-20">
              <span className="text-[10px] bg-[#EFC46C] text-black font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block">
                Foto {selectedImage + 1} de {galleryImages.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {galleryImages[selectedImage].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
                {galleryImages[selectedImage].desc}
              </p>
            </div>
          </div>

          {/* Thumbnails Column */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-black uppercase tracking-widest text-[#EFC46C] flex items-center gap-1.5">
                <Camera className="w-4 h-4" /> Galería Fotográfica
              </span>
              <div className="flex gap-1">
                {(['all', 'alpina', 'moderna', 'exterior'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-1 rounded-lg text-[9px] uppercase font-bold tracking-wider transition-all ${
                      activeTab === tab 
                        ? 'bg-[#EFC46C] text-black font-black' 
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab === 'all' ? 'Todo' : tab === 'alpina' ? 'Alpina' : tab === 'moderna' ? 'Moderna' : 'Patio/Pileta'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[440px] pr-1">
              {filteredImages.map((img, idx) => {
                const originalIndex = galleryImages.findIndex(gi => gi.url === img.url);
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(originalIndex)}
                    className={`relative rounded-2xl overflow-hidden h-28 border-2 text-left transition-all group ${
                      selectedImage === originalIndex 
                        ? 'border-[#EFC46C] scale-[0.98] shadow-lg shadow-[#EFC46C]/20' 
                        : 'border-transparent opacity-70 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] bg-black/80 backdrop-blur-sm text-white px-1.5 py-0.5 rounded font-medium line-clamp-1">
                      {img.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 text-center">
              <p className="text-[11px] text-gray-400">
                ¿Querés recibir el video recorrido completo por WhatsApp?
              </p>
              <a 
                href={`https://wa.me/5493875557009?text=${encodeURIComponent("Hola José Luis! Quisiera recibir el video completo y fotos en alta resolución de las 2 Casas en 1 de Camino a Colón.")}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-black text-[#EFC46C] hover:underline uppercase tracking-wider mt-1 inline-block"
              >
                Solicitar Video Recorrido →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED PROPERTY BREAKDOWN (2 CASAS EN 1) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#EFC46C] text-xs font-black uppercase tracking-widest bg-[#EFC46C]/10 border border-[#EFC46C]/20 px-4 py-1.5 rounded-full inline-block mb-3">
            Estructura y Distribución
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Dos Viviendas Independientes en un Mismo Terreno
          </h2>
          <p className="text-gray-400 text-sm mt-3 font-light leading-relaxed">
            Una propiedad pensada para quienes buscan amplitud, comodidad y la posibilidad de tener dos viviendas independientes en un mismo lugar. Ideal tanto para vivir como para invertir y obtener doble renta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* CASA 1: CABAÑA ALPINA */}
          <div className="bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border border-amber-500/30 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-2">
                  ✨ Primera Casa
                </span>
                <span className="text-xs text-gray-400 font-mono">Estilo Rústico Cálido</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
                Cabaña Alpina
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light mb-8 leading-relaxed">
                Una cálida y acogedora cabaña tradicional con arquitectura en A, detalles en madera noble y excelente aislación térmica.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 mt-0.5">
                    <BedDouble className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">1 Dormitorio Confortable</h4>
                    <p className="text-xs text-gray-400">Espacio privado con iluminación natural y pisos de madera.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 mt-0.5">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Recepción Independiente</h4>
                    <p className="text-xs text-gray-400">Hall de acceso que conecta armónicamente los ambientes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 mt-0.5">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Cocina Completa</h4>
                    <p className="text-xs text-gray-400">Totalmente equipada con bacha, bajomesada y espacio de guardado.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 mt-0.5">
                    <Bath className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Baño Completo</h4>
                    <p className="text-xs text-gray-400">Con sanitarios, ducha y revestimientos higiénicos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Pequeño Altillo de Guardado</h4>
                    <p className="text-xs text-gray-400">Nivel superior funcional para almacenamiento o espacio auxiliar.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-amber-300 font-bold">
              <span>Ideal para Renta Turística o Casa de Huéspedes</span>
              <span>100% Funcional</span>
            </div>
          </div>

          {/* CASA 2: NUEVA A ESTRENAR */}
          <div className="bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border border-emerald-500/40 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-2">
                  🏠 Segunda Casa
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold">¡Nueva a Estrenar!</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
                Casa Moderna a Estrenar
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light mb-8 leading-relaxed">
                Diseño contemporáneo, materiales de primera calidad, techos altos y muchísima luz natural en todos los espacios.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 mt-0.5">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Gran Cocina–Comedor con Living Integrado</h4>
                    <p className="text-xs text-gray-400">Concepto abierto moderno con ventanales hacia el parque y piscina.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 mt-0.5">
                    <BedDouble className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">1 Habitación Súper Amplia</h4>
                    <p className="text-xs text-gray-400">Espacio para cama King Size, placard completo y escritorio.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 mt-0.5">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Antebaño de Excelentes Dimensiones</h4>
                    <p className="text-xs text-gray-400">Sector de vanitory independiente con terminaciones de alta gama.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 mt-0.5">
                    <Bath className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Baño Completo Muy Amplio</h4>
                    <p className="text-xs text-gray-400">Sanitarios de primera marca, ducha moderna y ventilación natural.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Ambientes Cómodos y Luminosos</h4>
                    <p className="text-xs text-gray-400">Orientación estratégica para aprovechar el sol todo el año.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-emerald-300 font-bold">
              <span>Construcción Nueva • Lista para Habitar</span>
              <span>Sin Uso Previo</span>
            </div>
          </div>
        </div>

        {/* EXTERIOR & PISCINA HIGHLIGHT */}
        <div className="bg-gradient-to-r from-blue-950/40 via-zinc-950 to-emerald-950/40 border border-blue-500/30 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 inline-flex items-center gap-2">
                <Waves className="w-3.5 h-3.5" /> Parque & Área Recreativa
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                🌿 Exterior: Gran Patio y Piscina Equipada
              </h3>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                La propiedad cuenta con un <strong className="text-white font-bold">gran patio verde parquizado</strong> y una <strong className="text-white font-bold">piscina completamente equipada con sistema de luces subacuáticas y bomba de filtrado</strong>. 
                El entorno ideal para disfrutar en familia, recibir amigos los fines de semana o aprovechar como espacio de relax y alquiler turístico de alta rentabilidad.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
                  <Waves className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-white text-xs font-bold">Piscina con Luces</p>
                  <p className="text-gray-400 text-[10px]">Iluminación nocturna LED</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <p className="text-white text-xs font-bold">Bomba y Filtro</p>
                  <p className="text-gray-400 text-[10px]">Mantenimiento simplificado</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
                  <Sun className="w-6 h-6 text-[#EFC46C] mx-auto mb-2" />
                  <p className="text-white text-xs font-bold">Gran Patio Verde</p>
                  <p className="text-gray-400 text-[10px]">Espacio para asados y relax</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden h-72 border border-white/15 shadow-xl">
              <img 
                src="/properties/camino-a-colon/foto_02.jpg" 
                alt="Piscina y Patio" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-xs text-white font-medium">Camino a Colón • Paz y Confort</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY THIS IS A REAL ESTATE GEM / INVESTMENT ANALYSIS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[#EFC46C] text-xs font-black uppercase tracking-widest mb-2 block">
                  Potencial Comercial & Renta
                </span>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
                  ¿Por qué es una inversión inteligente?
                </h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                  Tener dos unidades independientes sobre un mismo lote te permite múltiples alternativas financieras que una casa convencional no puede ofrecer:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#EFC46C]/10 to-transparent border border-[#EFC46C]/30">
                <p className="text-xs text-[#EFC46C] font-black uppercase tracking-widest mb-1">
                  Resumen Económico
                </p>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-white">USD 64.000</span>
                  <span className="text-xs text-orange-400 font-bold uppercase">Solo Contado</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  Costo por m² y por unidad significativamente inferior a la media de la zona.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[#EFC46C]/30 transition-all">
                <span className="text-2xl mb-3 block">🏡 + 💰</span>
                <h4 className="text-white text-base font-bold mb-2">Viví en una y Alquilá la otra</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Podés residir en la casa a estrenar y generar un ingreso mensual alquilando la cabaña alpina en Airbnb o a inquilinos fijos.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[#EFC46C]/30 transition-all">
                <span className="text-2xl mb-3 block">👨‍👩‍👧‍👦</span>
                <h4 className="text-white text-base font-bold mb-2">Ideal para 2 Familias</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Independencia total para padres e hijos adultos en el mismo predio, compartiendo el patio, la piscina y los gastos.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[#EFC46C]/30 transition-all">
                <span className="text-2xl mb-3 block">📈</span>
                <h4 className="text-white text-base font-bold mb-2">Alquiler Turístico Dual</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Salta tiene altísima demanda de casas con pileta para turismo o fines de semana. Renta estimada de USD 600 a USD 1.100/mes en temporada.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[#EFC46C]/30 transition-all">
                <span className="text-2xl mb-3 block">🔑</span>
                <h4 className="text-white text-base font-bold mb-2">Posesión Rápida</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Operación transparente y directa. Lista para mudarte o ponerla en alquiler de manera inmediata.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CALL TO ACTION */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border border-[#EFC46C]/50 rounded-[3rem] p-8 sm:p-14 relative overflow-hidden shadow-[0_0_50px_rgba(239,196,108,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFC46C]/10 via-transparent to-[#EFC46C]/10 opacity-50" />
          
          <div className="relative z-10 space-y-6">
            <span className="text-[11px] bg-[#EFC46C] text-black font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block">
              ¡No dejes pasar esta oportunidad única!
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Agendá tu Visita a Camino a Colón
            </h2>

            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              Las propiedades con dos viviendas y pileta a este valor de preventa (USD 64.000 contado) tienen alta demanda y se cierran rápidamente. Coordiná hoy mismo con José Luis para recorrerla personalmente.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <a
                href={`https://wa.me/5493875557009?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4.5 bg-gradient-to-r from-[#EFC46C] to-[#DFA238] text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-all shadow-[0_10px_35px_rgba(239,196,108,0.5)] flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Hablar por WhatsApp con José Luis
              </a>

              <Link
                to="/contacto"
                className="w-full sm:w-auto px-8 py-4.5 bg-black/60 border border-white/20 hover:border-white text-white font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-all"
              >
                Ver Datos de Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-[#EFC46C] text-sm font-bold uppercase tracking-widest z-50 p-2 bg-black/50 rounded-full border border-white/20"
            >
              ✕ Cerrar
            </button>
            <div className="max-w-5xl max-h-[85vh] relative flex flex-col items-center">
              <img 
                src={galleryImages[selectedImage].url} 
                alt={galleryImages[selectedImage].title}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
              />
              <p className="text-white text-sm mt-4 font-bold text-center">
                {galleryImages[selectedImage].title} — {galleryImages[selectedImage].desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
