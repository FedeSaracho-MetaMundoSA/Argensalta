import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Briefcase, Search, Camera, Navigation, Handshake, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Nosotros() {
  const team = [
    { name: 'Jose Luis Sarapura', role: 'Socio Fundador', desc: 'Visión estratégica y desarrollo inmobiliario', img: '/logo.jpeg' },
    { name: 'Jorge Alberto Sarapura', role: 'Socio Fundador', desc: 'Estructuración financiera y capitales', img: '/logo.jpeg' },
    { name: 'Maximiliano Ivan Sarapura', role: 'Socio Fundador', desc: 'Operaciones y Arquitectura', img: '/logo.jpeg' },
    { name: 'Gonzalo Jose Sarapura', role: 'Socio Fundador', desc: 'Garantías institucionales y marco legal', img: '/logo.jpeg' }
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-24 font-sans pb-24">
      <Helmet>
        <title>Nosotros | Argensalta Propiedades</title>
      </Helmet>
      
      {/* Corporate Team Section */}
      <div className="relative z-20 py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <Briefcase className="w-12 h-12 text-[#EFC46C] mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Socios <span className="text-[#EFC46C]">Fundadores</span></h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">Las 4 líneas de nuestro estudio representan la experiencia, dedicación y profesionalismo de nuestros fundadores, unidos para potenciar tu capital.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {team.map((member, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="group text-center"
               >
                 <div className="relative w-40 h-40 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#EFC46C]/30 animate-[spin_10s_linear_infinite] group-hover:border-[#EFC46C] transition-colors"></div>
                    <img src={member.img} alt={member.name} className="w-full h-full rounded-full object-cover border-4 border-black group-hover:scale-105 transition-transform duration-500 relative z-10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">{member.name}</h3>
                 <p className="text-[#EFC46C] text-xs font-black tracking-widest uppercase mb-3">{member.role}</p>
                 <p className="text-gray-500 text-sm font-light leading-relaxed px-4">{member.desc}</p>
               </motion.div>
             ))}
           </div>
        </div>
      </div>

      {/* About Us Sub-Section - Funciones de Asesor */}
      <div className="relative z-20 py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Principales <span className="text-[#EFC46C]">Funciones</span></h2>
               <p className="text-gray-400 text-lg font-light leading-relaxed">Haciendo que la operación pueda ser realizada por el corredor inmobiliario de forma eficiente.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-black/60 border border-white/10 p-8 rounded-3xl hover:border-[#EFC46C] transition-colors">
                  <Search className="w-10 h-10 text-[#EFC46C] mb-6" />
                  <h4 className="text-white text-xl font-bold uppercase tracking-wider mb-3">Captar Propiedades</h4>
                  <p className="text-gray-500 font-light leading-relaxed">Identificar propietarios que desean vender o alquilar, generar vínculos de confianza y proponer una estrategia clara para comercializar el inmueble.</p>
               </div>
               <div className="bg-black/60 border border-white/10 p-8 rounded-3xl hover:border-[#EFC46C] transition-colors">
                  <Camera className="w-10 h-10 text-[#EFC46C] mb-6" />
                  <h4 className="text-white text-xl font-bold uppercase tracking-wider mb-3">Preparar y Promocionar</h4>
                  <p className="text-gray-500 font-light leading-relaxed">Puesta en valor y visibilidad. Análisis comparativo de mercado, fotos profesionales, descripción comercial y difusión en portales y redes.</p>
               </div>
               <div className="bg-black/60 border border-white/10 p-8 rounded-3xl hover:border-[#EFC46C] transition-colors">
                  <Navigation className="w-10 h-10 text-[#EFC46C] mb-6" />
                  <h4 className="text-white text-xl font-bold uppercase tracking-wider mb-3">Visitas y Asesoramiento</h4>
                  <p className="text-gray-500 font-light leading-relaxed">Coordinar recorridos con potenciales interesados y responder dudas sobre la propiedad, zona, valores y condiciones de la operación.</p>
               </div>
               <div className="bg-black/60 border border-white/10 p-8 rounded-3xl hover:border-[#EFC46C] transition-colors md:col-span-1 md:col-start-1">
                  <Handshake className="w-10 h-10 text-[#EFC46C] mb-6" />
                  <h4 className="text-white text-xl font-bold uppercase tracking-wider mb-3">Negociación</h4>
                  <p className="text-gray-500 font-light leading-relaxed">Analizar ofertas, acercar posiciones y acompañar el proceso junto al corredor y equipo legal/administrativo para preparar documentación.</p>
               </div>
               <div className="bg-black/60 border border-white/10 p-8 rounded-3xl hover:border-[#EFC46C] transition-colors md:col-span-2">
                  <MessageCircle className="w-10 h-10 text-[#EFC46C] mb-6" />
                  <h4 className="text-white text-xl font-bold uppercase tracking-wider mb-3">Seguimiento de Clientes</h4>
                  <p className="text-gray-500 font-light leading-relaxed">El objetivo no es solo formalizar una operación, sino construir relaciones a largo plazo. Fidelizar y generar nuevas oportunidades mediante contacto continuo.</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
