import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  Waves, 
  Sparkles, 
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
  Calendar, 
  Layers, 
  Flame, 
  Trees, 
  Mountain, 
  Check, 
  Compass, 
  Heart,
  Share2
} from 'lucide-react';

export default function PropertyPotreros() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'galeria' | 'piscina' | 'interior' | 'entorno'>('all');
  const [copied, setCopied] = useState(false);

  // List of 14 photos for Potreros property from /properties/potreros/foto_01.jpg to foto_14.jpg
  const galleryImages = [
    {
      url: '/properties/potreros/foto_01.jpg',
      title: 'Vista Panorámica de la Propiedad & Cordón Montañoso',
      category: 'entorno',
      desc: 'Terreno de 697 m² con césped impecable y vista totalmente despejada a las montañas'
    },
    {
      url: '/properties/potreros/foto_02.jpg',
      title: 'Piscina Revestida con Solárium y Cerco de Seguridad',
      category: 'piscina',
      desc: 'Hermosa pileta revestida rodeada de solárium y cerco perimetral de seguridad para niños y mascotas'
    },
    {
      url: '/properties/potreros/foto_03.jpg',
      title: 'Gran Galería Techada en Madera Rústica',
      category: 'galeria',
      desc: 'Estructura de madera rústica de primera calidad con asador de material para todo el año'
    },
    {
      url: '/properties/potreros/foto_04.jpg',
      title: 'Estar-Comedor con Techos de Madera a la Vista',
      category: 'interior',
      desc: 'Techos en madera noble de excelente calidad que aportan gran calidez, distinción y altura'
    },
    {
      url: '/properties/potreros/foto_05.jpg',
      title: 'Cocina Semi-Integrada con Mesada y Muebles Bajomesada',
      category: 'interior',
      desc: 'Equipada con mesada amplia, bajomesada a medida, ventilación y modernos detalles funcionales'
    },
    {
      url: '/properties/potreros/foto_06.jpg',
      title: 'Dormitorio Principal Amplio y Luminoso',
      category: 'interior',
      desc: 'Habitación confortable con aberturas de aluminio y rejas de seguridad colocadas'
    },
    {
      url: '/properties/potreros/foto_07.jpg',
      title: 'Baño Completo con Sanitarios y Griferías',
      category: 'interior',
      desc: 'Baño completo con revestimientos cerámicos de calidad y excelente ventilación'
    },
    {
      url: '/properties/potreros/foto_08.jpg',
      title: 'Perspectiva Exterior y Jardín Frontal',
      category: 'entorno',
      desc: 'Excelente fachada exterior integrada al entorno campestre y natural de Potreros'
    },
    {
      url: '/properties/potreros/foto_09.jpg',
      title: 'Área Social de la Galería y Asador de Material',
      category: 'galeria',
      desc: 'Parrillero de material de gran capacidad y espacio para mesas familiares al aire libre'
    },
    {
      url: '/properties/potreros/foto_10.jpg',
      title: 'Piscina y Solárium con Vistas a los Cerros',
      category: 'piscina',
      desc: 'Sol todo el día y orientación privilegiada para disfrutar en familia'
    },
    {
      url: '/properties/potreros/foto_11.jpg',
      title: 'Detalle de Aberturas de Aluminio y Rejas',
      category: 'interior',
      desc: 'Seguridad y solidez constructiva en cada ambiente de la casa'
    },
    {
      url: '/properties/potreros/foto_12.jpg',
      title: 'Espacio Verde de 697 m² Totalmente Aprovechable',
      category: 'entorno',
      desc: 'Parque llano con césped parejo, cerco perimetral y proyección para huerta o jardín botánico'
    },
    {
      url: '/properties/potreros/foto_13.jpg',
      title: 'Ambientes Cálidos e Iluminación Natural',
      category: 'interior',
      desc: 'Luz natural durante todo el día que resalta la belleza de las terminaciones en madera'
    },
    {
      url: '/properties/potreros/foto_14.jpg',
      title: 'Entorno de Paz y Vistas Panorámicas en Potreros',
      category: 'entorno',
      desc: 'Aire puro, silencio y naturaleza a solo minutos de la ciudad'
    }
  ];

  const filteredImages = activeTab === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeTab);

  const whatsappMessage = encodeURIComponent(
    "Hola José Luis! Vengo de la web de ArgenSalta y me interesa la propiedad en venta en Potreros (697 m² de terreno, piscina con cerco y gran galería con parrillero). Quisiera coordinar una visita y conocer el precio y detalles."
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Propiedad en Potreros con Piscina y Gran Galería | ArgenSalta',
        text: 'Mira esta excelente casa en Potreros (697 m² con piscina, galería con asador y vista a las montañas)',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans pt-24 pb-24 selection:bg-[#EFC46C] selection:text-black">
      <Helmet>
        <title>Propiedad en Potreros con Piscina y Gran Galería | Argensalta Propiedades</title>
        <meta name="description" content="Excelente casa en Potreros: 697 m² de terreno, 128 m² cubiertos, techos de madera a la vista, gran galería con parrillero, piscina con cerco y vista a las montañas." />
        <meta name="keywords" content="propiedad potreros salta, casa con pileta potreros, terreno 697m2, casa con galeria y asador, casa de campo salta, casa de fin de semana, argensalta propiedades" />
      </Helmet>

      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#EFC46C] transition-colors">Inicio</Link>
            <span>/</span>
            <Link to="/proyectos" className="hover:text-[#EFC46C] transition-colors">Propiedades & Desarrollos</Link>
            <span>/</span>
            <span className="text-[#EFC46C] font-bold">Potreros • Salta</span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#EFC46C] border border-white/10 transition-all text-[11px]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? '¡Enlace Copiado!' : 'Compartir Ficha'}</span>
          </button>
        </div>
      </div>

      {/* HERO / PROPERTY TITLE & HIGHLIGHTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/40 text-emerald-300">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                Naturaleza & Vista Imponente
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[#EFC46C]/10 text-[#EFC46C] border border-[#EFC46C]/30">
                Terreno 697 m² • 128 m² Cubiertos
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Piscina Revestida con Cerco
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              Casa en Potreros <span className="text-[#EFC46C]">— Gran Galería & Piscina</span>
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-gray-300 mt-3 text-sm sm:text-base">
              <MapPin className="w-5 h-5 text-[#EFC46C] shrink-0" />
              <span className="font-semibold text-white">Zona de Potreros, Salta</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">Tranquilidad absoluta, aire puro y a pocos minutos de todo</span>
            </div>
          </div>

          {/* Pricing & Contact Box */}
          <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-[#EFC46C]/40 rounded-3xl p-6 sm:p-8 lg:min-w-[360px] shadow-[0_10px_40px_rgba(239,196,108,0.15)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block mb-1">
                Estado de la Propiedad
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white font-serif uppercase tracking-tight">
                  En Venta Exclusiva
                </span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider">
                🏡 Fin de Semana • Vivienda Permanente • Renta Turística
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
              <a
                href={`https://wa.me/5493875557009?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 bg-gradient-to-r from-[#EFC46C] via-[#f7d68b] to-[#DFA238] hover:scale-[1.02] text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,196,108,0.4)] transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" /> Consultar Precio & Coordinar Visita
              </a>
              <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">
                Contacto directo con José Luis Saracho • ArgenSalta
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK HIGHLIGHTS METRICS BADGES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EFC46C]/10 text-[#EFC46C]">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Superficie Terreno</p>
              <p className="text-lg font-bold text-white">697 m²</p>
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Sup. Cubierta</p>
              <p className="text-lg font-bold text-white">128 m² aprox.</p>
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Piscina</p>
              <p className="text-lg font-bold text-white">Revestida + Cerco</p>
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Gran Galería</p>
              <p className="text-lg font-bold text-white">Asador de Material</p>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE MEDIA GALLERY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase font-black tracking-widest text-[#EFC46C] block mb-1">
              Registro Visual de la Propiedad
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold uppercase">
              Galería Fotográfica
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Todas las Fotos' },
              { id: 'galeria', label: 'Galería & Quincho' },
              { id: 'piscina', label: 'Piscina & Parque' },
              { id: 'interior', label: 'Interiores & Madera' },
              { id: 'entorno', label: 'Vistas & Montañas' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#EFC46C] text-black shadow-lg shadow-[#EFC46C]/20'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage Image Viewer */}
        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/15 bg-zinc-950 aspect-[16/9] sm:aspect-[21/9] max-h-[580px] shadow-2xl group">
          <img
            src={filteredImages[selectedImage]?.url || filteredImages[0]?.url}
            alt={filteredImages[selectedImage]?.title || 'Casa en Potreros'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

          {/* Fullscreen Trigger */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105"
            title="Ver en pantalla completa"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Caption info on bottom */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-[10px] bg-[#EFC46C] text-black font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-2">
                Foto {selectedImage + 1} de {filteredImages.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase drop-shadow-md">
                {filteredImages[selectedImage]?.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light mt-1 drop-shadow">
                {filteredImages[selectedImage]?.desc}
              </p>
            </div>

            <button
              onClick={() => setLightboxOpen(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all"
            >
              Ampliar Imagen
            </button>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mt-4">
          {filteredImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === idx
                  ? 'border-[#EFC46C] scale-105 shadow-md shadow-[#EFC46C]/30'
                  : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#EFC46C] hover:text-black transition-all"
            >
              ✕
            </button>

            <div className="relative max-w-6xl max-h-[85vh] w-full flex flex-col items-center">
              <img
                src={filteredImages[selectedImage]?.url}
                alt={filteredImages[selectedImage]?.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl border border-white/10"
              />
              <div className="text-center mt-4">
                <h4 className="text-lg font-bold text-white uppercase">{filteredImages[selectedImage]?.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{filteredImages[selectedImage]?.desc}</p>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
                }}
                className="pointer-events-auto p-4 rounded-full bg-black/70 hover:bg-[#EFC46C] text-white hover:text-black transition-all"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
                }}
                className="pointer-events-auto p-4 rounded-full bg-black/70 hover:bg-[#EFC46C] text-white hover:text-black transition-all"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE PROPERTY CONTENT / DETAILED SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Full Descriptive Breakdown */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* The Concept Section */}
            <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-xl">
              <span className="text-xs uppercase font-black tracking-widest text-[#EFC46C] block mb-2">
                Calidad de Vida & Entorno
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold mb-4">
                ¿Buscás escapar del ruido y vivir rodeado de naturaleza?
              </h3>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                Te presentamos esta excelente propiedad ubicada en la zona de <strong className="text-white font-semibold">Potreros</strong>, ideal tanto para <strong className="text-[#EFC46C]">casa de fin de semana</strong> como para <strong className="text-[#EFC46C]">vivienda permanente</strong> o <strong className="text-[#EFC46C]">inversión de renta turística</strong> en Salta.
              </p>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Un espacio pensado para disfrutar del verde, el sol y la tranquilidad, a pocos minutos de todo, con el imponente cordón montañoso como postal cotidiana.
              </p>

              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-emerald-400 font-bold text-xs uppercase block mb-1">🌿 Entorno Puro</span>
                  <p className="text-xs text-gray-400 font-light">Aire limpio, flora autóctona y serenidad absoluta.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[#EFC46C] font-bold text-xs uppercase block mb-1">⛰️ Vistas Abiertas</span>
                  <p className="text-xs text-gray-400 font-light">Orientación privilegiada con panorámica a los cerros.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-blue-400 font-bold text-xs uppercase block mb-1">🚗 Acceso Directo</span>
                  <p className="text-xs text-gray-400 font-light">A pocos minutos de centros urbanos y servicios.</p>
                </div>
              </div>
            </div>

            {/* Ambientes & Superficies Cubiertas */}
            <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-xl space-y-6">
              <div>
                <span className="text-xs uppercase font-black tracking-widest text-[#EFC46C] block mb-2">
                  Distribución & Construcción
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold mb-3">
                  Superficies y Ambientes
                </h3>
                <p className="text-xs text-gray-400">
                  Total del Terreno: <strong className="text-white">697 m²</strong> totalmente aprovechables | Sup. Cubierta: <strong className="text-white">128 m² aprox.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-[#EFC46C]/10 text-[#EFC46C]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase">Estar-Comedor Integrado</h4>
                  </div>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Elegante espacio social con <strong className="text-white">techos de madera a la vista de excelente calidad</strong>, que aportan calidez, distinción y gran amplitud visual.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase">Cocina Semi-Integrada</h4>
                  </div>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Equipada con mesada de granito, muebles bajo mesada a medida y modernos detalles funcionales con excelente ventilación natural.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                      <BedDouble className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase">Dormitorios Luminosos</h4>
                  </div>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Habitaciones con generosa entrada de luz solar, carpintería de aluminio de primera línea y rejas de seguridad colocadas.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                      <Bath className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase">Baño Completo</h4>
                  </div>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Baño completo equipado con sanitarios modernos, grifería de calidad y terminaciones cerámicas contemporáneas.
                  </p>
                </div>
              </div>
            </div>

            {/* Exteriores y Recreación: ¡Lo mejor de la casa! */}
            <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-[#EFC46C]/40 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#EFC46C]/10 rounded-full blur-3xl pointer-events-none" />

              <span className="text-xs uppercase font-black tracking-widest text-[#EFC46C] block mb-2">
                ¡Lo Mejor de la Casa!
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-white font-bold mb-6">
                Exteriores & Recreación
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-3 rounded-2xl bg-[#EFC46C] text-black shrink-0 font-black">
                    🥩
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white uppercase mb-1">
                      Gran Galería Techada con Asador de Material
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                      Estructura de madera rústica de primera calidad, pensada para asados, celebraciones y momentos en familia durante cualquier época del año sin importar el clima.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-3 rounded-2xl bg-blue-500 text-white shrink-0 font-black">
                    🏊‍♂️
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white uppercase mb-1">
                      Piscina Revestida + Solárium + Cerco Perimetral
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                      Hermosa pileta con solárium atérmico para tomar sol y delimitada con cerco de seguridad perimetral, ideal para máxima tranquilidad de niños y mascotas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-3 rounded-2xl bg-emerald-500 text-black shrink-0 font-black">
                    🌄
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white uppercase mb-1">
                      Parque de 697 m² con Vista Totalmente Despejada
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                      Terreno totalmente plano y aprovechable con césped verde, excelente proyección para huerta o parquización adicional y un marco de montañas imponente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Key Takeaways & Contact Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Contact Sticky Card */}
            <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-[#EFC46C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-28">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
                <img
                  src="/JoseLuis.jpeg"
                  alt="José Luis Saracho"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#EFC46C]"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">José Luis Saracho</h4>
                  <p className="text-[10px] text-[#EFC46C] font-black uppercase tracking-widest">
                    Director Comercial • ArgenSalta
                  </p>
                  <p className="text-[10px] text-gray-400">Atención personalizada y visitas guiadas</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Documentación verificada por ArgenSalta</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Posesión inmediata garantizada</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Coordinación de visitas los 7 días de la semana</span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/5493875557009?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 bg-[#EFC46C] hover:bg-[#DFA238] text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#EFC46C]/30 transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4" /> Solicitar Precio por WhatsApp
                </a>

                <a
                  href={`tel:+5493875557009`}
                  className="w-full py-3.5 px-6 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-2xl border border-white/10 flex items-center justify-center gap-2 transition-all"
                >
                  Llamada Telefónica Directa
                </a>
              </div>

              {/* Summary Specs Pillbox */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Terreno:</span>
                  <span className="font-bold text-white">697 m²</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Sup. Cubierta:</span>
                  <span className="font-bold text-white">128 m² aprox.</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Galería Techada:</span>
                  <span className="font-bold text-emerald-400">Sí (con Asador)</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Piscina:</span>
                  <span className="font-bold text-blue-400">Revestida + Cerco</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Zona:</span>
                  <span className="font-bold text-amber-300">Potreros, Salta</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FINAL CALL TO ACTION BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-950 to-zinc-900 border border-emerald-500/30 rounded-[2.5rem] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-black tracking-widest text-emerald-400 block mb-2">
              ¿Listo para dar el siguiente paso?
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold mb-2">
              Vení a conocer la propiedad en Potreros
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light">
              Sentí la tranquilidad del lugar, la vista a los cerros y la calidez de sus techos de madera en una visita presencial.
            </p>
          </div>

          <a
            href={`https://wa.me/5493875557009?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-[#EFC46C] hover:bg-[#DFA238] text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:scale-105 transition-all shrink-0 text-center"
          >
            Agendar Visita Ahora →
          </a>
        </div>
      </div>
    </div>
  );
}
