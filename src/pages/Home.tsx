import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Code, HardHat, Users, MapPin, Briefcase, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import ArgensaltaLogo from '../components/ArgensaltaLogo';
import ArgensaltaLogo3D from '../components/ArgensaltaLogo3D';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Argensalta Propiedades | Inversiones Inmobiliarias</title>
        <meta name="description" content="Inversiones inmobiliarias, compra y venta de propiedades, lotes y terrenos en Salta. Asesoramiento profesional y tokenización. Argensalta Propiedades." />
        <meta name="keywords" content="Argensalta, Salta, bienes raices, inmobiliaria, terrenos, loteo, Riveras de Pucheta, propiedades, venta, inversiones" />
      </Helmet>

      <div className="bg-black min-h-screen text-white font-sans overflow-hidden">
      
      {/* High Quality Real Estate Background */}
      <div className="fixed inset-0 z-0 bg-black">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop" alt="Modern Architecture" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-20 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* 3D Interactive Presentation Logo */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="w-full h-[300px] md:h-[400px] mb-4 relative z-30 cursor-grab active:cursor-grabbing"
           title="Podes arrastrar para explorar el logo"
        >
           <ArgensaltaLogo3D />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500 uppercase leading-none drop-shadow-2xl relative z-40"
        >
          El Valor de la Experiencia
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-300 max-w-4xl mb-12 font-light leading-relaxed drop-shadow-md"
        >
          <span className="text-white font-serif text-2xl sm:text-3xl italic">"Ayudamos a familias a encontrar un hogar y a inversores a consolidar negocios seguros."</span><br /><br />
          Un especialista en bienes raíces que brinda asesoramiento experto. Acompañamos desde lo emocional y lo profesional cada etapa de tu operación inmobiliaria.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-6 relative w-full items-center justify-center max-w-4xl px-4 z-40"
        >
          {/* Main action block with glowing effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFC46C]/15 to-[#DFA238]/5 blur-3xl rounded-full opacity-60 animate-pulse pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full relative z-10">
            <Link 
              to="/login" 
              className="px-8 py-4.5 bg-gradient-to-r from-[#EFC46C] to-[#DFA238] hover:from-[#f3cd7c] hover:to-[#eeb44c] text-black font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(239,196,108,0.5)] border border-[#EFC46C] text-xs text-center min-w-[220px]"
            >
              Ingresar a Mi Cuenta
            </Link>
            
            <Link 
              to="/proyectos" 
              className="px-8 py-4.5 bg-black/60 hover:bg-black/80 border border-[#EFC46C]/40 hover:border-[#EFC46C] text-white hover:text-[#EFC46C] font-extrabold uppercase tracking-widest rounded-full text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md text-center min-w-[220px]"
            >
              Ver Desarrollos
            </Link>

            <Link 
              to="/modulos" 
              className="px-8 py-4.5 bg-zinc-900/90 hover:bg-black text-[#EFC46C] hover:text-white border border-[#EFC46C]/50 hover:border-[#EFC46C] font-extrabold uppercase tracking-widest rounded-full text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(239,196,108,0.15)] backdrop-blur-md text-center min-w-[220px]"
            >
              Módulos CUBE
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Featured Developments Showcase Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 mb-4">
        <div className="text-center mb-16">
          <span className="text-[#EFC46C] text-[11px] font-black uppercase tracking-widest bg-[#EFC46C]/10 border border-[#EFC46C]/20 px-3.5 py-1.5 rounded-full">
            ★ PROYECTOS INSIGNIA ARGENSALTA
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 uppercase tracking-tighter">
            Portafolio Inmobiliario
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-2 font-light">
            Estructuramos nuestras propuestas en desarrollos a gran escala y fraccionamientos residenciales de alta proyección.
          </p>
        </div>

        <div className="space-y-16">
          {/* SECTION A: DESARROLLOS (Grandes Inversores) */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-red-400 text-[10px] font-black uppercase tracking-widest">Masterplans & Escala Corporativa</p>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                    ● OPERACIÓN CERRADA
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white uppercase font-black">1. Desarrollos</h3>
              </div>
              <p className="text-xs text-gray-400 max-w-md mt-2 sm:mt-0 font-light text-left sm:text-right">
                Adquisiciones integrales y estructuraciones corporativas exitosas lideradas por ArgenSalta.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Card: Loteo Ecológico La Calderilla - 100% VENDIDO */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="lg:col-span-8 group relative h-[480px] rounded-[2.5rem] overflow-hidden border-2 border-red-500/40 hover:border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black">
                  <img 
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2874&auto=format&fit=crop" 
                    alt="La Calderilla Loteo Ecológico - 100% Vendido" 
                    className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
                </div>

                {/* Spectacular Diagonal Sold Ribbon with Shimmer */}
                <div className="absolute top-8 right-[-50px] rotate-45 z-30 pointer-events-none">
                  <div className="sold-ribbon py-2 px-16 shadow-2xl text-center border-y-2 border-white/40">
                    <span className="text-white font-black text-xs sm:text-sm tracking-[0.25em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      100% VENDIDO
                    </span>
                  </div>
                </div>

                {/* Floating Stamp Effect in center top */}
                <div className="absolute top-6 left-6 z-30">
                  <div className="sold-stamp bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 transform -rotate-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-red-400 font-black text-xs uppercase tracking-widest">
                      DESARROLLO COMPLETO VENDIDO
                    </span>
                  </div>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end text-left h-full z-20">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[9px] bg-red-500/20 border border-red-500/40 text-red-300 font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      Venta en Block Exitosa
                    </span>
                    <span className="text-[9px] bg-zinc-800 text-gray-300 font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      22 Hectáreas • Fracción B
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none mb-2 flex items-center gap-3">
                    La Calderilla
                    <span className="text-xs bg-red-600 text-white font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      SOLD OUT
                    </span>
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-6 max-w-xl">
                    Masterplan integral en La Caldera transferido con éxito. Concluyó la operación mayorista de adquisición de cartera y mensura aprobada. ¡Gracias a los inversores que confiaron en ArgenSalta!
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Link 
                      to="/lacalderilla"
                      className="inline-flex items-center justify-between gap-6 px-6 py-4 bg-zinc-900/90 hover:bg-zinc-800 text-white hover:text-[#EFC46C] border border-white/20 hover:border-[#EFC46C] font-black uppercase tracking-wider rounded-2xl transition-all text-xs"
                    >
                      <span>Ver Caso de Éxito & Ficha</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a 
                      href="https://wa.me/5493875557009?text=Hola%20José%20Luis,%20vi%20que%20se%20vendió%20La%20Calderilla.%20Quisiera%20recibir%20información%20sobre%20próximos%20desarrollos%20en%20block."
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#EFC46C] hover:underline font-bold uppercase tracking-wider"
                    >
                      Consultar por Próximos Desarrollos →
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Special Investor HUD Callout */}
              <div className="lg:col-span-4 bg-gradient-to-br from-red-950/20 via-black to-zinc-950 border border-red-500/20 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-[10px] font-black uppercase tracking-widest mb-3">
                    ✔ Éxito de Colocación
                  </div>
                  <h4 className="text-white font-serif text-2xl mb-3">Cartera Cerrada</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    ArgenSalta estructuró técnica, legal y comercialmente el masterplan completo, logrando la colocación integral del activo. Estamos preparando nuevas fracciones para fondos y desarrolladores.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Canal Exclusivo Inversores</p>
                  <a 
                    href="https://wa.me/5493875557009?text=Hola%20José%20Luis,%20quisiera%20sumarme%20a%20la%20lista%20de%20espera%20para%20futuros%20desarrollos%20e%20inversiones%20corporativas."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-full px-5 py-3.5 bg-white/5 hover:bg-[#EFC46C] text-white hover:text-black font-black uppercase tracking-widest rounded-xl border border-white/10 hover:border-transparent transition-all text-[10px]"
                  >
                    Sumarse a Próximos Proyectos <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* NEW SECTION: PROPIEDADES DESTACADAS & CASAS A ESTRENAR */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#EFC46C]/30 pb-4">
              <div>
                <span className="text-xs bg-amber-500/20 text-[#EFC46C] border border-[#EFC46C]/40 px-3.5 py-1 rounded-full font-black uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
                  🔥 Oportunidad Destacada de Inversión
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-white uppercase font-black">
                  Propiedades en Venta
                </h3>
              </div>
              <p className="text-xs text-gray-400 max-w-md mt-2 sm:mt-0 font-light text-left sm:text-right">
                Inmuebles listos para habitar o rentar de inmediato con posesión y documentación garantizada.
              </p>
            </div>

            {/* Property 1: Casa en Potreros con Gran Galería y Piscina */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-2 border-emerald-500/40 hover:border-emerald-400 rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Left Visual Area */}
                <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[460px] overflow-hidden group">
                  <img 
                    src="/properties/potreros/foto_01.jpg" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200') {
                        target.src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200';
                      }
                    }}
                    alt="Casa en Potreros con Gran Galería y Piscina" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                    <span className="text-[10px] bg-emerald-500 text-black font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg">
                      Terreno 697 m²
                    </span>
                    <span className="text-[10px] bg-blue-500 text-white font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg">
                      Piscina con Cerco
                    </span>
                    <span className="text-[10px] bg-[#EFC46C] text-black font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg">
                      Galería con Asador
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <p className="text-xs text-emerald-300 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      📍 Potreros • Salta | Vista a las Montañas
                    </p>
                    <h4 className="text-2xl font-black text-white uppercase drop-shadow-md">
                      Casa en Potreros con Gran Galería & Piscina
                    </h4>
                  </div>
                </div>

                {/* Right Details Area */}
                <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-4">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">
                          Superficie & Categoría
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-white font-serif">
                          697 m² <span className="text-[#EFC46C] text-lg font-sans font-normal">• 128 m² Cub.</span>
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-black uppercase">
                        🏡 Venta Exclusiva
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                      ¿Buscás escapar del ruido y vivir rodeado de naturaleza, aire puro y una vista imponente a las montañas? Excelente propiedad en Potreros, ideal tanto para casa de fin de semana como para vivienda permanente o inversión turística.
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-left">
                        <p className="text-amber-300 text-xs font-bold mb-1">✨ Techos de Madera a la Vista</p>
                        <p className="text-[11px] text-gray-400">Estar-comedor integrado de excelente calidad y gran calidez.</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-left">
                        <p className="text-emerald-300 text-xs font-bold mb-1">🥩 Gran Galería Techada</p>
                        <p className="text-[11px] text-gray-400">Madera rústica de primera calidad con parrillero de material.</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-left sm:col-span-2">
                        <p className="text-blue-300 text-xs font-bold mb-1">🏊‍♂️ Piscina Revestida con Solárium</p>
                        <p className="text-[11px] text-gray-400">Delimitada con cerco perimetral de seguridad para niños y mascotas, rodeada de parque verde.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center">
                    <Link
                      to="/propiedad/potreros"
                      className="w-full sm:w-auto flex-1 px-6 py-4 bg-gradient-to-r from-[#EFC46C] to-[#DFA238] hover:scale-105 text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all text-center shadow-lg shadow-[#EFC46C]/30"
                    >
                      Ver Galería & Ficha Completa →
                    </Link>

                    <a
                      href={`https://wa.me/5493875557009?text=${encodeURIComponent("Hola José Luis! Quisiera consultar precio y coordinar una visita para la propiedad en venta en Potreros (697 m² con piscina y gran galería).")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-emerald-500 hover:text-black text-white font-bold uppercase tracking-widest text-xs rounded-2xl border border-white/10 transition-all text-center"
                    >
                      Consultar WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Featured House Card: 2 Casas en 1 en Camino a Colón */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-2 border-[#EFC46C]/50 hover:border-[#EFC46C] rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_rgba(239,196,108,0.15)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Left Visual Area */}
                <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[460px] overflow-hidden group">
                  <img 
                    src="/properties/camino-a-colon/foto_01.jpg" 
                    alt="2 Casas en 1 con Piscina - Camino a Colón" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                    <span className="text-[10px] bg-[#EFC46C] text-black font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg">
                      ¡2 Casas en 1 Lote!
                    </span>
                    <span className="text-[10px] bg-blue-500 text-white font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      Piscina con Luces & Bomba
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <p className="text-xs text-amber-300 font-bold uppercase tracking-widest mb-1">
                      📍 Camino a Colón • Salta
                    </p>
                    <h4 className="text-2xl font-black text-white uppercase drop-shadow-md">
                      Cabaña Alpina + Casa Moderna a Estrenar
                    </h4>
                  </div>
                </div>

                {/* Right Details Area */}
                <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-4">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">
                          Precio Promocional de Venta
                        </span>
                        <span className="text-3xl sm:text-4xl font-black text-[#EFC46C] font-serif">
                          USD 64.000
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/40 rounded-xl text-xs font-black uppercase">
                        💵 Solo Contado
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                      Una propiedad pensada para quienes buscan amplitud, comodidad y la posibilidad de tener dos viviendas independientes en un mismo lugar. Ideal tanto para vivir como para generar doble renta en Airbnb o alquiler tradicional.
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-left">
                        <p className="text-amber-300 text-xs font-bold mb-1">✨ Cabaña Alpina</p>
                        <p className="text-[11px] text-gray-400">1 Dormitorio, recepción, cocina, baño y altillo de guardado.</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-left">
                        <p className="text-emerald-300 text-xs font-bold mb-1">🏠 Casa a Estrenar</p>
                        <p className="text-[11px] text-gray-400">Cocina-comedor integrada, habitación amplia, antebaño y baño.</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-left sm:col-span-2">
                        <p className="text-blue-300 text-xs font-bold mb-1">🌿 Exterior & Parque</p>
                        <p className="text-[11px] text-gray-400">Gran patio parquizado y piscina equipada con luces y bomba para disfrutar en familia.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center">
                    <Link
                      to="/propiedad/camino-a-colon"
                      className="w-full sm:w-auto flex-1 px-6 py-4 bg-[#EFC46C] hover:bg-[#DFA238] text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all text-center shadow-lg shadow-[#EFC46C]/30 hover:scale-105"
                    >
                      Ver Galería & Ficha Completa →
                    </Link>

                    <a
                      href={`https://wa.me/5493875557009?text=${encodeURIComponent("Hola José Luis! Quisiera coordinar una visita para la propiedad de USD 64.000 (2 Casas en 1 con Piscina en Camino a Colón).")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-emerald-500 hover:text-black text-white font-bold uppercase tracking-widest text-xs rounded-2xl border border-white/10 transition-all text-center"
                    >
                      Coordinar Visita
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* SECTION B: URBANIZACIONES Y LOTEOS */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/10 pb-4">
              <div>
                <p className="text-[#EFC46C] text-[10px] font-black uppercase tracking-widest">Fraccionamiento Residencial Minorista</p>
                <h3 className="text-2xl sm:text-3xl font-serif text-white uppercase font-black">2. Urbanizaciones / Loteos</h3>
              </div>
              <p className="text-xs text-gray-500 max-w-md mt-2 sm:mt-0 font-light text-left sm:text-right">
                Parcelas individuales para construcción de viviendas o resguardo de capital a mediano plazo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card: Riveras de Pucheta */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-[#EFC46C]/30 shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black">
                  <img 
                    src="/pucheta-loteo.jpeg" 
                    alt="Riveras de Pucheta" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end text-left h-full">
                  <span className="text-[10px] bg-[#EFC46C]/20 border border-[#EFC46C]/40 text-[#EFC46C] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-max mb-3">
                    Lotes Campestres Activos
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none mb-2">
                    Riveras de Pucheta
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
                    Paisaje de ensueño y naturaleza viva en La Caldera. Lotes premium listos para construir el hogar de tus sueños con posesión segura e inmediata.
                  </p>
                  <Link 
                    to="/riverasdepucheta"
                    className="inline-flex items-center justify-between w-full px-6 py-4 bg-white/5 hover:bg-[#EFC46C] text-white hover:text-black font-black uppercase tracking-wider rounded-2xl border border-white/10 hover:border-transparent transition-all text-xs"
                  >
                    <span>Explorar Lotes</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Card: Don Borromeo */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-[#EFC46C]/30 shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black">
                  <img 
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" 
                    alt="Don Borromeo" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end text-left h-full">
                  <span className="text-[10px] bg-[#EFC46C]/20 border border-[#EFC46C]/40 text-[#EFC46C] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-max mb-3">
                    Lotes en Preventa Exclusiva
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none mb-2">
                    Don Borromeo
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
                    Tu cable a tierra en los majestuosos Valles Calchaquíes. Financiación propia en pesos o unidades indexadas con excelente proyección de valorización.
                  </p>
                  <Link 
                    to="/donborromeo"
                    className="inline-flex items-center justify-between w-full px-6 py-4 bg-white/5 hover:bg-[#EFC46C] text-white hover:text-black font-black uppercase tracking-wider rounded-2xl border border-white/10 hover:border-transparent transition-all text-xs"
                  >
                    <span>Explorar Lotes</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SECTION C: VIVIENDAS MODULARES */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/10 pb-4">
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Sistemas Habitacionales Industrializados</p>
                <h3 className="text-2xl sm:text-3xl font-serif text-white uppercase font-black">3. Viviendas Modulares</h3>
              </div>
              <p className="text-xs text-gray-500 max-w-md mt-2 sm:mt-0 font-light text-left sm:text-right">
                Arquitectura de rápida ejecución, aislación premium y diseño contemporáneo transportable.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Card 4: Módulos CUBE */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="lg:col-span-8 group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-[#EFC46C]/20 hover:border-[#EFC46C]/50 shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black">
                  <img 
                    src="/imagen.jpg" 
                    alt="Módulos CUBE" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end text-left h-full">
                  <span className="text-[10px] bg-[#EFC46C] text-black font-extrabold uppercase tracking-widest px-3 py-1 rounded-full w-max mb-3">
                    CUBE L Flagship • 19.000 USD
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none mb-2">
                    Módulos CUBE
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-6 max-w-xl">
                    Construcción industrializada de alta gama de 30.62 m². Chasis autoportante de alta resistencia adaptado al riguroso clima salteño, entrega garantizada en 45 días.
                  </p>
                  <Link 
                    to="/modulos"
                    className="inline-flex items-center justify-between w-max gap-8 px-6 py-4 bg-[#EFC46C] text-black font-black uppercase tracking-wider rounded-2xl transition-all text-xs shadow-lg shadow-[#EFC46C]/20 hover:scale-105"
                  >
                    <span>Ver Modelos y Financiación</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Modular Features HUD Callout */}
              <div className="lg:col-span-4 bg-gradient-to-br from-gray-950/40 via-black to-transparent border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <p className="text-[#EFC46C] text-[10px] font-black uppercase tracking-widest mb-1">Tecnología Hábitat</p>
                  <h4 className="text-white font-serif text-2xl mb-3">Diseño Bioclimático</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Nuestros módulos cuentan con envolvente térmica multicapa (Steel Frame, lana de vidrio de alta densidad, barrera de vapor) y aberturas de doble vidrio hermético (DVH) para un confort térmico absoluto y bajo consumo.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Construcción en Fábrica</p>
                  <Link 
                    to="/modulos"
                    className="inline-flex items-center justify-center w-full px-5 py-3.5 bg-white/5 hover:bg-[#EFC46C] text-white hover:text-black font-black uppercase tracking-widest rounded-xl border border-white/10 hover:border-transparent transition-all text-[10px]"
                  >
                    Especificaciones Técnicas <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Highlights Feature */}
      <div className="relative z-20 py-24 bg-gradient-to-b from-transparent via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ rotateY: 10, rotateX: -10, scale: 1.02 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="p-10 bg-black/60 border border-white/10 rounded-[2rem] backdrop-blur-xl group hover:border-[#EFC46C] hover:shadow-[0_0_30px_rgba(239,196,108,0.3)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFC46C]/10 rounded-bl-full filter blur-2xl group-hover:bg-[#EFC46C]/30 transition-colors" style={{ transform: 'translateZ(-20px)' }}></div>
              <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-[#EFC46C]/20 to-black border border-[#EFC46C]/30 rounded-2xl flex items-center justify-center mb-8 relative z-10 shadow-inner group-hover:bg-[#EFC46C]/30 transition-colors">
                  <Users className="w-8 h-8 text-[#EFC46C]" style={{ transform: 'translateZ(20px)' }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10" style={{ transform: 'translateZ(10px)' }}>Relación Familiar</h3>
                <p className="text-gray-400 leading-relaxed font-light relative z-10">
                  Entendemos que cada inversión es un sueño familiar. Nuestro equipo te asesora de manera personalizada para tomar la mejor decisión con seguridad y respaldo.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ rotateY: 10, rotateX: -10, scale: 1.02 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="p-10 bg-black/60 border border-white/10 rounded-[2rem] backdrop-blur-xl group hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full filter blur-2xl group-hover:bg-blue-500/30 transition-colors" style={{ transform: 'translateZ(-20px)' }}></div>
              <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 rounded-2xl flex items-center justify-center mb-8 relative z-10 shadow-inner group-hover:bg-blue-900/60 transition-colors">
                  <HardHat className="w-8 h-8 text-blue-400" style={{ transform: 'translateZ(20px)' }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10" style={{ transform: 'translateZ(10px)' }}>Desarrollo Real</h3>
                <p className="text-gray-400 leading-relaxed font-light relative z-10">
                  Diseñamos urbanizaciones integrales. Desde la tierra cruda hasta el barrio estructurado para futuros hoteles y complejos. Transformamos la matriz urbana.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ rotateY: 10, rotateX: -10, scale: 1.02 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="p-10 bg-black/60 border border-white/10 rounded-[2rem] backdrop-blur-xl group hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full filter blur-2xl group-hover:bg-emerald-500/30 transition-colors" style={{ transform: 'translateZ(-20px)' }}></div>
              <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-8 relative z-10 shadow-inner group-hover:bg-emerald-900/60 transition-colors">
                  <Code className="w-8 h-8 text-emerald-400" style={{ transform: 'translateZ(20px)' }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10" style={{ transform: 'translateZ(10px)' }}>Smart & Token</h3>
                <p className="text-gray-400 leading-relaxed font-light relative z-10">
                  Plataforma interactiva con modelo PropTech. Control preciso de avances y a largo plazo, la democratización de la inversión vía tokenización inmobiliaria.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Transparencia y Familia Section */}
      <div className="relative z-20 py-24 md:py-32 bg-gray-950 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0">
           <motion.div 
             initial={{ scale: 1.1 }}
             animate={{ scale: 1 }}
             transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
             className="w-full h-full"
           >
             <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Familia cerrando negocio" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
             <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
           </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
             <div className="inline-flex items-center space-x-2 bg-[#EFC46C]/10 border border-[#EFC46C]/20 px-4 py-2 rounded-full mb-6 relative">
                 <div className="absolute inset-0 bg-[#EFC46C]/20 blur-md rounded-full animate-pulse"></div>
                 <ShieldCheck className="w-5 h-5 text-[#EFC46C] relative z-10" />
                 <span className="text-[#EFC46C] text-xs font-bold uppercase tracking-widest relative z-10">¿Qué es un Asesor?</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight drop-shadow-lg">
                Decisiones con Mayor <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EFC46C] to-[#DFA238]">Seguridad</span>
             </h2>
             <p className="text-gray-300 text-lg font-light leading-relaxed mb-8 relative z-10">
               Un asesor inmobiliario es un especialista en bienes raíces que brinda servicios de promoción de propiedades y asesoramiento en operaciones. Su función principal es acompañar a las personas durante procesos de compra, venta o alquiler de una propiedad, aportando información, análisis y orientación.
             </p>
             <div className="space-y-6 relative z-10">
                <div className="flex bg-black/40 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                   <div className="w-12 h-12 rounded-xl bg-[#EFC46C]/20 flex items-center justify-center mr-5 shrink-0 shadow-inner">
                      <Users className="w-6 h-6 text-[#EFC46C]" />
                   </div>
                   <div>
                      <h4 className="text-white font-bold tracking-wider uppercase text-sm">Acompañamiento Profesional y Emocional</h4>
                      <p className="text-gray-400 text-sm mt-1 leading-relaxed">Su rol no solo pasa por promocionar las propiedades, sino proponer estrategias y facilitar cada etapa, entendiendo los tiempos, dudas y expectativas.</p>
                   </div>
                </div>
             </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 relative">
             <div className="absolute -inset-4 bg-gradient-to-r from-[#EFC46C] to-[#DFA238] rounded-3xl blur-2xl opacity-10"></div>
             <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden hover:border-[#EFC46C]/30 transition-colors duration-500">
               <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#EFC46C]/10 rounded-full blur-3xl"></div>
               <h3 className="text-xl md:text-2xl font-black text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4 flex items-center">
                 <Briefcase className="w-6 h-6 mr-3 text-[#EFC46C]" />
                 Operaciones que Facilitamos
               </h3>
               <ul className="text-lg text-gray-300 font-light leading-relaxed relative z-10 space-y-3">
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-[#EFC46C]" /> Venta de casas y departamentos</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-[#EFC46C]" /> Venta de terrenos y lotes</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-[#EFC46C]" /> Promoción de desarrollos inmobiliarios</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-[#EFC46C]" /> Promoción de departamentos en pozo</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-[#EFC46C]" /> Alquiler de todo tipo de propiedades</li>
               </ul>
               <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/10">
                 <div>
                   <p className="text-white font-bold tracking-wider uppercase text-sm">Equipo ARGENSALTA</p>
                 </div>
                 <div className="flex items-center">
                   <ArgensaltaLogo className="h-20 sm:h-24 w-auto object-contain" />
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Visión Corporativa de Alta Gama */}
      <div className="relative z-20 py-24 md:py-32 bg-black overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="inline-flex items-center space-x-2 bg-[#EFC46C]/10 border border-[#EFC46C]/20 px-4 py-2 rounded-full mb-6 relative">
                <div className="absolute inset-0 bg-[#EFC46C]/10 blur-sm rounded-full animate-pulse"></div>
                <span className="text-[#EFC46C] text-xs font-bold uppercase tracking-widest relative z-10">Filosofía Empresarial</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EFC46C] to-[#DFA238]">Visión</span> Corporativa
              </h2>
              <p className="text-gray-300 text-lg font-light leading-relaxed mb-8">
                Nos especializamos en asesoramiento integral de bienes raíces en Salta. Conectamos a familias e inversores estratégicos con propiedades premium seleccionadas bajo estrictos estándares de rentabilidad, plusvalía, y diseño moderno.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
                <div className="border-l-2 border-[#EFC46C]/40 pl-4">
                  <span className="block text-white font-black uppercase text-xs tracking-wider mb-1">Estrategias Segmentadas</span>
                  <p className="text-xs text-gray-400">Desarrollo urbano con crecimiento de plusvalía planificada y segura.</p>
                </div>
                <div className="border-l-2 border-[#EFC46C]/40 pl-4">
                  <span className="block text-white font-black uppercase text-xs tracking-wider mb-1">Garantía Profesional</span>
                  <p className="text-xs text-gray-400">Seguridad jurídica y acompañamiento emocional continuo.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group hover:border-[#EFC46C]/30 transition-colors duration-500"
            >
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop" alt="Visión Corporativa" className="w-full h-[400px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 z-10 bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-white/5">
                <p className="text-[#EFC46C] text-xs font-bold uppercase tracking-widest mb-1">Estándares Internacionales</p>
                <p className="text-white text-sm font-light">"Compromiso inquebrantable en potenciar tu capital con criterio innovador."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
