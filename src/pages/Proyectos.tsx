import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';

export default function Proyectos() {
  return (
    <div className="bg-black min-h-screen text-white pt-24 font-sans pb-24">
      <Helmet>
        <title>Desarrollos Activos | Argensalta Propiedades</title>
      </Helmet>

      {/* Projects Section */}
      <div id="proyectos" className="relative z-20 py-24 bg-black shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
           
           {/* SECTION 1: DESARROLLOS (OPERACIÓN CERRADA) */}
           <div>
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-6">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                   <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                     Masterplans & Escala Corporativa
                   </span>
                   <span className="text-[10px] bg-red-600 text-white px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest animate-pulse">
                     100% VENDIDO
                   </span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4 uppercase tracking-tighter">
                   Nuestros <span className="text-[#EFC46C]">Desarrollos</span>
                 </h2>
                 <p className="text-lg text-gray-400 max-w-3xl font-light leading-relaxed">
                   Proyectos de escala integral y alto impacto territorial. Éxito de colocación total en block para desarrolladores y fondos de inversión.
                 </p>
               </div>
               
               <div className="shrink-0 bg-red-950/30 border border-red-500/30 rounded-2xl p-5 max-w-xs">
                 <p className="text-red-400 text-xs font-black uppercase tracking-widest mb-1.5 flex items-center">
                   💼 Operación Cerrada
                 </p>
                 <p className="text-xs text-gray-300 font-light leading-normal">
                   La Calderilla ha sido transferida en su totalidad. Contactá de manera directa para recibir la carpeta de los próximos desarrollos en estructuración.
                 </p>
                 <a 
                   href="https://wa.me/5493875557009?text=Hola,%20quisiera%20recibir%20informacion%20corporativa%20sobre%20la%20adquisicion%20completa%20o%20alianza%20en%20el%20desarrollo%20La%20Calderilla." 
                   target="_blank" 
                   rel="noreferrer"
                   className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-[#EFC46C] hover:text-white transition-colors mt-3"
                 >
                   Próximas Oportunidades <ArrowRight className="w-3.5 h-3.5" />
                 </a>
               </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
               {/* Left Side: La Calderilla */}
               <div className="lg:col-span-7">
                 <Link to="/proyecto/la-calderilla" className="group relative rounded-[2.5rem] overflow-hidden block border-2 border-red-500/40 shadow-2xl h-[550px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/60 to-black/30 z-10"></div>
                    <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2874&auto=format&fit=crop" alt="La Calderilla Loteo Ecológico - 100% Vendido" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    
                    {/* Diagonal Sold Ribbon */}
                    <div className="absolute top-10 right-[-45px] rotate-45 z-30 pointer-events-none">
                      <div className="sold-ribbon py-2 px-14 shadow-2xl text-center border-y-2 border-white/40">
                        <span className="text-white font-black text-xs tracking-[0.25em] uppercase">
                          100% VENDIDO
                        </span>
                      </div>
                    </div>

                    <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                      <div className="mb-6 inline-flex items-center space-x-3 bg-red-500/20 backdrop-blur-md border border-red-500/40 px-5 py-2.5 rounded-full self-start shadow-xl">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
                        <span className="text-xs font-bold tracking-widest text-red-200 uppercase">Cartera Cerrada • Éxito Total</span>
                      </div>
                      <h3 className="text-4xl lg:text-5xl font-serif text-white mb-4 group-hover:text-[#EFC46C] transition-colors drop-shadow-2xl flex items-center gap-3">
                        Loteo Ecológico La Calderilla
                      </h3>
                      <p className="text-gray-200 mb-8 font-light max-w-lg text-base drop-shadow-md border-l-2 border-red-500 pl-4 line-clamp-3">
                        Masterplan integral en La Caldera transferido con éxito. Concluyó la operación mayorista de adquisición de cartera y mensura aprobada.
                      </p>
                      <div className="inline-flex items-center text-white bg-zinc-900 border border-white/20 hover:border-[#EFC46C] hover:text-[#EFC46C] px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-colors shadow-lg self-start">
                        Ver Caso de Éxito <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                 </Link>
               </div>

               {/* Right Side: Key points for investors */}
               <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950 border border-red-500/20 rounded-[2.5rem] p-8 lg:p-10 shadow-xl space-y-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                 <div>
                    <p className="text-red-400 text-xs font-black uppercase tracking-widest mb-2">Track Record Inmobiliario</p>
                    <h3 className="text-white text-3xl font-serif mb-4">Caso de Éxito: Colocación en Block</h3>
                    <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                      El proyecto contó con mensura certificada por la Dirección General de Inmuebles, un plano de fraccionamiento estructurado que maximizó la rentabilidad del suelo respetando la ecología, transferido en su totalidad de manera exitosa.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                         <span className="text-red-400 text-lg mt-0.5">✔</span>
                         <div>
                           <p className="text-white text-sm font-bold">100% Vendido en Tiempo Récord</p>
                           <p className="text-gray-400 text-xs">Estructuración y cierre fiduciario completado.</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <span className="text-red-400 text-lg mt-0.5">✔</span>
                         <div>
                           <p className="text-white text-sm font-bold">Respaldo Técnico & Legal</p>
                           <p className="text-gray-400 text-xs">Títulos perfectos y subdivisiones inscriptas.</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <span className="text-red-400 text-lg mt-0.5">✔</span>
                         <div>
                           <p className="text-white text-sm font-bold">Nuevas Fracciones en Evaluación</p>
                           <p className="text-gray-400 text-xs">Próximos lanzamientos en los valles de Salta.</p>
                         </div>
                      </div>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Estado Operativo</p>
                      <p className="text-red-400 font-black text-lg">SOLD OUT • 22 Ha</p>
                    </div>
                    <a 
                      href="https://wa.me/5493875557009?text=Hola,%20quisiera%20consultar%20por%20proximas%20adquisiciones%20en%20block%20con%20Jose%20Luis."
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-[#EFC46C] hover:bg-[#DFA238] text-black font-black uppercase tracking-widest rounded-2xl text-[10px] transition-all text-center w-full sm:w-auto shadow-md"
                    >
                      Próximos Desarrollos
                    </a>
                 </div>
               </div>
             </div>
           </div>

           {/* SECTION 1.5: PROPIEDADES EN VENTA */}
           <div className="space-y-8">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-[#EFC46C]/30 pb-6">
               <div>
                 <span className="text-xs bg-amber-500/20 text-[#EFC46C] border border-[#EFC46C]/40 px-3.5 py-1 rounded-full font-black uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
                   ✨ Oportunidades Exclusivas de Compra Inmediata
                 </span>
                 <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4 uppercase tracking-tighter">
                   Propiedades <span className="text-[#EFC46C]">Residenciales</span>
                 </h2>
                 <p className="text-lg text-gray-400 max-w-3xl font-light leading-relaxed">
                   Casas y residencias listas para habitar o rentar. Oportunidades únicas de inversión con posesión y documentación garantizada por ArgenSalta.
                 </p>
               </div>
             </div>

             {/* Property Card 1: Casa en Potreros */}
             <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-2 border-emerald-500/40 hover:border-emerald-400 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all mb-8">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
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
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                   <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                     <span className="text-[10px] bg-emerald-500 text-black font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                       Terreno 697 m²
                     </span>
                     <span className="text-[10px] bg-blue-500 text-white font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                       Piscina con Cerco
                     </span>
                     <span className="text-[10px] bg-[#EFC46C] text-black font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                       Galería Techada
                     </span>
                   </div>
                   <div className="absolute bottom-6 left-6 right-6 z-20">
                     <p className="text-xs text-emerald-300 font-bold uppercase tracking-widest mb-1">
                       Potreros • Salta | Vista a las Montañas
                     </p>
                     <h4 className="text-2xl sm:text-3xl font-black text-white uppercase">
                       Casa en Potreros con Gran Galería & Piscina
                     </h4>
                   </div>
                 </div>

                 <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                   <div>
                     <div className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-4">
                       <div>
                         <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">
                           Superficie & Tipología
                         </span>
                         <span className="text-2xl sm:text-3xl font-black text-white font-serif">
                           697 m² <span className="text-[#EFC46C] text-lg font-sans font-normal">• 128 m² Cubiertos</span>
                         </span>
                       </div>
                       <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-black uppercase">
                         🏡 Venta Exclusiva
                       </span>
                     </div>

                     <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                       Ideal para casa de fin de semana, vivienda permanente o renta turística. Estar-comedor con techos de madera a la vista de primera calidad, cocina semi-integrada, dormitorios luminosos con rejas de seguridad, baño completo, gran galería techada con asador de material y piscina revestida con cerco perimetral.
                     </p>

                     <div className="grid grid-cols-2 gap-3 mb-4">
                       <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                         <p className="text-amber-300 text-xs font-bold">✨ Techos Madera</p>
                         <p className="text-[10px] text-gray-400">Estar-comedor cálido y amplio</p>
                       </div>
                       <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                         <p className="text-emerald-300 text-xs font-bold">🥩 Gran Asador</p>
                         <p className="text-[10px] text-gray-400">Galería de madera rústica</p>
                       </div>
                     </div>
                   </div>

                   <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                     <Link
                       to="/propiedad/potreros"
                       className="flex-1 py-4 px-6 bg-[#EFC46C] hover:bg-[#DFA238] text-black font-black uppercase tracking-widest text-xs rounded-2xl text-center transition-all hover:scale-105 shadow-lg shadow-[#EFC46C]/30"
                     >
                       Ver Galería y Detalles Completos →
                     </Link>
                     <a
                       href={`https://wa.me/5493875557009?text=${encodeURIComponent("Hola José Luis! Quisiera consultar precio y coordinar una visita para la propiedad en Potreros (697 m² con piscina y gran galería).")}`}
                       target="_blank"
                       rel="noreferrer"
                       className="py-4 px-6 bg-white/5 hover:bg-emerald-500 hover:text-black text-white font-bold uppercase tracking-widest text-xs rounded-2xl border border-white/10 transition-all text-center"
                     >
                       WhatsApp Directo
                     </a>
                   </div>
                 </div>
               </div>
             </div>

             {/* Property Card 2: 2 Casas en 1 en Camino a Colón */}

             <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-2 border-[#EFC46C]/40 hover:border-[#EFC46C] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                 <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[460px] overflow-hidden group">
                   <img 
                     src="/properties/camino-a-colon/foto_01.jpg" 
                     alt="2 Casas en 1 en Camino a Colón" 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                   <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                     <span className="text-[10px] bg-[#EFC46C] text-black font-black uppercase tracking-widest px-3 py-1 rounded-full">
                       2 Casas en 1
                     </span>
                     <span className="text-[10px] bg-blue-500 text-white font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                       Con Piscina
                     </span>
                   </div>
                   <div className="absolute bottom-6 left-6 right-6 z-20">
                     <p className="text-xs text-amber-300 font-bold uppercase tracking-widest mb-1">
                       Camino a Colón • Salta
                     </p>
                     <h4 className="text-2xl sm:text-3xl font-black text-white uppercase">
                       Cabaña Alpina + Casa Moderna a Estrenar
                     </h4>
                   </div>
                 </div>

                 <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                   <div>
                     <div className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-4">
                       <div>
                         <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">
                           Precio de Oportunidad
                         </span>
                         <span className="text-3xl sm:text-4xl font-black text-[#EFC46C] font-serif">
                           USD 64.000
                         </span>
                       </div>
                       <span className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/40 rounded-xl text-xs font-black uppercase">
                         💵 Únicamente de Contado
                       </span>
                     </div>

                     <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                       Dos viviendas independientes en un mismo predio: acogedora cabaña alpina (1 dorm, cocina, baño, altillo) + moderna casa a estrenar con living-comedor integrado, gran habitación, antebaño y baño. Gran patio parquizado y piscina con luces y bomba.
                     </p>

                     <div className="grid grid-cols-2 gap-3 mb-4">
                       <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                         <p className="text-amber-300 text-xs font-bold">✨ Cabaña Alpina</p>
                         <p className="text-[10px] text-gray-400">1 Dorm, cocina, baño, altillo</p>
                       </div>
                       <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                         <p className="text-emerald-300 text-xs font-bold">🏠 Casa Nueva</p>
                         <p className="text-[10px] text-gray-400">A estrenar, muy luminosa</p>
                       </div>
                     </div>
                   </div>

                   <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                     <Link
                       to="/propiedad/camino-a-colon"
                       className="flex-1 py-4 px-6 bg-[#EFC46C] hover:bg-[#DFA238] text-black font-black uppercase tracking-widest text-xs rounded-2xl text-center transition-all hover:scale-105 shadow-lg shadow-[#EFC46C]/30"
                     >
                       Ver Galería y Detalles Completos →
                     </Link>
                     <a
                       href={`https://wa.me/5493875557009?text=${encodeURIComponent("Hola José Luis! Quisiera consultar por la propiedad de USD 64.000 en Camino a Colón (2 Casas en 1 con Piscina).")}`}
                       target="_blank"
                       rel="noreferrer"
                       className="py-4 px-6 bg-white/5 hover:bg-emerald-500 hover:text-black text-white font-bold uppercase tracking-widest text-xs rounded-2xl border border-white/10 transition-all text-center"
                     >
                       WhatsApp Directo
                     </a>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* SECTION 2: URBANIZACIONES Y LOTEOS */}
           <div>
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-6">
               <div>
                 <span className="text-xs bg-[#EFC46C]/10 text-[#EFC46C] border border-[#EFC46C]/30 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                   Fraccionamiento Residencial
                 </span>
                 <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4 uppercase tracking-tighter">
                   Urbanizaciones & <span className="text-[#EFC46C]">Loteos</span>
                 </h2>
                 <p className="text-lg text-gray-400 max-w-3xl font-light leading-relaxed">
                   Opciones residenciales listas para adquirir parcelas individuales. Diseñadas para familias, inversores minoristas y constructores con excelentes opciones de financiación propia.
                 </p>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Riveras de Pucheta Project Card */}
               <Link to="/proyecto/riveras-de-pucheta" className="group relative rounded-[2.5rem] overflow-hidden block border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/60 to-transparent z-10"></div>
                  <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" alt="Riveras de Pucheta" className="w-full h-[550px] object-cover group-hover:scale-110 transition-transform duration-[10s]" />
                  
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <div className="mb-6 inline-flex items-center space-x-3 bg-[#EFC46C]/20 backdrop-blur-md border border-[#EFC46C]/30 px-5 py-2.5 rounded-full self-start shadow-xl">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#EFC46C] animate-pulse"></div>
                      <span className="text-xs font-bold tracking-widest text-[#EFC46C] uppercase">100% Activo - Pre-Venta</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-serif text-white mb-4 group-hover:text-[#EFC46C] transition-colors drop-shadow-2xl">
                      Riveras de Pucheta
                    </h3>
                    <p className="text-gray-200 mb-8 font-light max-w-lg text-base drop-shadow-md border-l-2 border-[#EFC46C] pl-4 line-clamp-3">
                      Barrio cerrado en La Caldera, Salta. Lotes desde 300m². Urbanización de lujo en contacto con la naturaleza y alto retorno de inversión.
                    </p>
                    <div className="inline-flex items-center text-black bg-[#EFC46C] group-hover:bg-[#DFA238] px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-colors shadow-[0_10px_30px_rgba(239,196,108,0.4)] self-start">
                      Presentación <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
               </Link>

               {/* Don Borromeo Project Card */}
               <Link to="/proyecto/don-borromeo" className="group relative rounded-[2.5rem] overflow-hidden block border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/60 to-transparent z-10"></div>
                  <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" alt="Don Borromeo" className="w-full h-[550px] object-cover group-hover:scale-110 transition-transform duration-[10s]" />
                  
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <div className="mb-6 inline-flex items-center space-x-3 bg-[#EFC46C]/20 backdrop-blur-md border border-[#EFC46C]/30 px-5 py-2.5 rounded-full self-start shadow-xl">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#EFC46C] animate-pulse"></div>
                      <span className="text-xs font-bold tracking-widest text-[#EFC46C] uppercase">100% Activo - Pre-Venta</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-serif text-white mb-4 group-hover:text-[#EFC46C] transition-colors drop-shadow-2xl">
                      Don Borromeo
                    </h3>
                    <p className="text-gray-200 mb-8 font-light max-w-lg text-base drop-shadow-md border-l-2 border-[#EFC46C] pl-4 line-clamp-3">
                      San Carlos, Ruta 40. Loteo privado ideal para el descanso. Increíbles vistas a los Valles Calchaquíes con escritura inmediata.
                    </p>
                    <div className="inline-flex items-center text-black bg-[#EFC46C] group-hover:bg-[#DFA238] px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-colors shadow-[0_10px_30px_rgba(239,196,108,0.4)] self-start">
                      Presentación <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
               </Link>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}
