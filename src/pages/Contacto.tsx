import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, Home as HomeIcon, Target, Globe, ShieldCheck, LineChart, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Contacto() {
  const [tasacionName, setTasacionName] = useState('');
  const [tasacionPhone, setTasacionPhone] = useState('');
  const [tasacionType, setTasacionType] = useState('');
  const [tasacionLocation, setTasacionLocation] = useState('');
  const [tasacionLoading, setTasacionLoading] = useState(false);

  const [b2bName, setB2bName] = useState('');
  const [b2bEmail, setB2bEmail] = useState('');
  const [b2bMessage, setB2bMessage] = useState('');
  const [b2bLoading, setB2bLoading] = useState(false);

  // Helper to detect visitor source details (Google Ads, UTM, Google Business, Organic, etc.)
  const getCampaignSource = (defaultSource: string) => {
    if (typeof window === 'undefined') return defaultSource;
    
    const params = new URLSearchParams(window.location.search);
    let utmSource = params.get('utm_source');
    let utmMedium = params.get('utm_medium');
    let utmCampaign = params.get('utm_campaign');
    let gclid = params.get('gclid');
    let fbclid = params.get('fbclid');

    // fallback to sessionStorage
    try {
      const savedCampaignStr = sessionStorage.getItem('original_campaign_info');
      if (savedCampaignStr) {
        const savedCampaign = JSON.parse(savedCampaignStr);
        if (!utmSource && savedCampaign.utm_source) utmSource = savedCampaign.utm_source;
        if (!utmMedium && savedCampaign.utm_medium) utmMedium = savedCampaign.utm_medium;
        if (!utmCampaign && savedCampaign.utm_campaign) utmCampaign = savedCampaign.utm_campaign;
        if (!gclid && savedCampaign.gclid) gclid = savedCampaign.gclid;
        if (!fbclid && savedCampaign.fbclid) fbclid = savedCampaign.fbclid;
      }
    } catch (e) {
      console.error("Error reading saved campaign info", e);
    }

    const parts = [];
    if (utmSource) parts.push(`origen: ${utmSource}`);
    if (utmMedium) parts.push(`medio: ${utmMedium}`);
    if (utmCampaign) parts.push(`campaña: ${utmCampaign}`);
    if (gclid) parts.push('Google Ads GCLID');
    if (fbclid) parts.push('Facebook Ads FBCLID');

    // Automatically flag Google My Business if utm_source is google_business or similar
    if (utmSource === 'google_business' || utmSource === 'gmb') {
      parts.push('Google Business Profile (Maps)');
    }

    return parts.length > 0 
      ? `${defaultSource} [${parts.join(' | ')}]` 
      : defaultSource;
  };
  return (
    <div className="bg-black min-h-screen text-white pt-24 font-sans pb-24">
      <Helmet>
        <title>Contacto | Argensalta Propiedades</title>
      </Helmet>

      {/* Vendedores Particulares Section */}
      <div className="relative z-20 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row items-stretch gap-12 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12">
               {/* Info Area */}
               <div className="lg:w-1/2 flex flex-col justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#EFC46C] to-[#DFA238] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <HomeIcon className="w-8 h-8 text-black" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-md">
                    Vendé tu <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EFC46C] to-[#DFA238]">Propiedad</span>
                  </h2>
                  <p className="text-gray-300 font-light text-lg mb-8 leading-relaxed max-w-xl">
                    ¿Querés vender tu casa, departamento o terreno? En Argensalta Propiedades sumamos la fuerza de nuestra red global de clientes para vender tu inmueble de manera ágil, segura y al mejor valor de mercado.
                  </p>
                  
                  <div className="space-y-6">
                     <div className="flex bg-black/40 p-5 rounded-2xl border border-white/10">
                        <LineChart className="w-6 h-6 text-[#EFC46C] shrink-0 mr-4 mt-1" />
                        <div>
                          <h4 className="text-white font-bold uppercase tracking-wider text-sm">Tasación Precisa</h4>
                          <p className="text-gray-400 text-sm mt-1">Análisis de mercado profesional para fijar un valor real y competitivo.</p>
                        </div>
                     </div>
                     <div className="flex bg-black/40 p-5 rounded-2xl border border-white/10">
                        <Users className="w-6 h-6 text-[#EFC46C] shrink-0 mr-4 mt-1" />
                        <div>
                          <h4 className="text-white font-bold uppercase tracking-wider text-sm">Base de Inversores Activa</h4>
                          <p className="text-gray-400 text-sm mt-1">Ofrecemos tu propiedad a clientes que ya confían en nosotros y buscan diversificar su capital.</p>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Form Area */}
               <div className="lg:w-1/2">
                  <div className="bg-black/60 border border-white/10 rounded-[2rem] p-8 relative z-10 shadow-2xl backdrop-blur-md">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-[#EFC46C]/5 rounded-bl-[100%] opacity-50 pointer-events-none"></div>
                     <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-widest border-b border-white/10 pb-4">
                       Solicitar Tasación
                     </h3>
                     
                      <form className="space-y-5 relative z-10" onSubmit={async (e) => { 
                        e.preventDefault(); 
                        if (tasacionLoading) return;
                        setTasacionLoading(true);

                        try {
                          const leadData = {
                            name: tasacionName,
                            email: "tasacion@contacto.com", // default placeholder since email is not in this specific form
                            phone: tasacionPhone,
                            message: `Solicita Tasación - Tipo: ${tasacionType}. Ubicación: ${tasacionLocation}`,
                            source: getCampaignSource("Web - Tasación"),
                            status: "new" as const,
                            createdAt: Date.now()
                          };

                          await addDoc(collection(db, "leads"), leadData);

                          if (typeof window !== 'undefined' && (window as any).gtag) {
                            (window as any).gtag('event', 'submit_tasacion_form', {
                              'event_category': 'Lead',
                              'event_label': 'Solicitar Tasacion Form'
                            });
                          }
                          
                          alert('Solicitud de tasación enviada con éxito. Un asesor de Argensalta se contactará pronto.'); 
                          setTasacionName('');
                          setTasacionPhone('');
                          setTasacionType('');
                          setTasacionLocation('');
                        } catch (error) {
                          console.error("Error saving lead:", error);
                          alert("Error al enviar la solicitud. Por favor intente más tarde.");
                        } finally {
                          setTasacionLoading(false);
                        }
                      }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <input 
                              type="text" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#EFC46C] transition-colors" 
                              placeholder="Nombre y Apellido" 
                              required 
                              value={tasacionName}
                              onChange={(e) => setTasacionName(e.target.value)}
                            />
                          </div>
                          <div>
                            <input 
                              type="tel" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#EFC46C] transition-colors" 
                              placeholder="WhatsApp" 
                              required 
                              value={tasacionPhone}
                              onChange={(e) => setTasacionPhone(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                           <select 
                             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#EFC46C] transition-colors appearance-none bg-black" 
                             required 
                             value={tasacionType}
                             onChange={(e) => setTasacionType(e.target.value)}
                           >
                             <option value="" disabled className="text-gray-900">Tipo de Propiedad (Seleccioná uno)</option>
                             <option value="casa">🏠 Casa individual</option>
                             <option value="departamento">🏢 Departamento</option>
                             <option value="terreno">⛰️ Terreno / Lote</option>
                             <option value="local">🏪 Local Comercial</option>
                             <option value="otro">Otros</option>
                           </select>
                        </div>
                        
                        <div>
                          <input 
                            type="text" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#EFC46C] transition-colors" 
                            placeholder="Ubicación (Ej: B° Centro, Salta)" 
                            required 
                            value={tasacionLocation}
                            onChange={(e) => setTasacionLocation(e.target.value)}
                          />
                        </div>
                        
                        <div className="pt-4">
                          <button 
                            type="submit" 
                            disabled={tasacionLoading}
                            className="w-full bg-[#EFC46C] hover:bg-[#DFA238] text-black font-black uppercase tracking-widest py-4 rounded-xl shadow-lg transform transition-transform hover:-translate-y-1 active:scale-95 flex items-center justify-center group disabled:opacity-50"
                          >
                            {tasacionLoading ? 'Enviando...' : 'Quiero que me contacten'} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                     </form>
                  </div>
               </div>
           </div>
        </div>
      </div>

      {/* B2B / Partners Section */}
      <div className="relative z-20 py-24 bg-gradient-to-t from-gray-900 via-black to-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden backdrop-blur-xl shadow-2xl group hover:border-[#EFC46C]/30 transition-colors duration-500">
             <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#EFC46C]/10 rounded-full blur-3xl group-hover:bg-[#EFC46C]/20 transition-colors duration-700"></div>
             
             <div className="flex-1 relative z-10">
               <div className="w-16 h-16 bg-gradient-to-br from-[#EFC46C] to-[#8B4513] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                 <Building2 className="w-8 h-8 text-black" />
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-md">
                 Alianza B2B <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EFC46C] to-[#DFA238]">Desarrolladoras</span>
               </h2>
               <p className="text-gray-300 font-light text-lg mb-8 max-w-xl leading-relaxed">
                 ¿Eres líder de una firma inmobiliaria o agencia de desarrollo corporativo? En Argensalta Propiedades abrimos nuestro Masterplan para partners estratégicos. Potenciemos proyectos turísticos, hoteleros y de urbanización.
               </p>
               
               <ul className="space-y-4 mb-10 text-gray-400 font-medium">
                 <li className="flex items-center"><Target className="w-5 h-5 text-[#EFC46C] mr-4" /> Estructura Legal Sólida</li>
                 <li className="flex items-center"><Globe className="w-5 h-5 text-[#EFC46C] mr-4" /> Integración Tecnológica (Dashboard Partners)</li>
                 <li className="flex items-center"><ShieldCheck className="w-5 h-5 text-[#EFC46C] mr-4" /> Respaldo Patrimonial y Financiero</li>
               </ul>
             </div>
             
             <div className="w-full md:w-[400px] bg-black/60 border border-white/10 rounded-[2rem] p-8 relative z-10 shadow-2xl backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-center border-b border-white/10 pb-4">Agendar Videollamada</h3>
                <form className="space-y-4" onSubmit={async (e) => { 
                   e.preventDefault(); 
                   if (b2bLoading) return;
                   setB2bLoading(true);

                   try {
                     const leadData = {
                       name: b2bName,
                       email: b2bEmail,
                       phone: "Socio B2B",
                       message: b2bMessage,
                       source: getCampaignSource("Web - Sinergia B2B"),
                       status: "new" as const,
                       createdAt: Date.now()
                     };

                     await addDoc(collection(db, "leads"), leadData);

                     if (typeof window !== 'undefined' && (window as any).gtag) {
                       (window as any).gtag('event', 'submit_b2b_form', {
                         'event_category': 'Lead',
                         'event_label': 'B2B Partner Form'
                       });
                     }

                     alert('Socio estratégico registrado. Un representante comercial de Argensalta se contactará a la brevedad para coordinar la videollamada.'); 
                     setB2bName('');
                     setB2bEmail('');
                     setB2bMessage('');
                   } catch (error) {
                     console.error("Error saving B2B lead:", error);
                     alert("Error al enviar la solicitud. Por favor intente más tarde.");
                   } finally {
                     setB2bLoading(false);
                   }
                 }}>
                   <div>
                     <input 
                       type="text" 
                       placeholder="Nombre Comercial / Firma" 
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#EFC46C] transition-colors" 
                       required 
                       value={b2bName}
                       onChange={(e) => setB2bName(e.target.value)}
                     />
                   </div>
                   <div>
                     <input 
                       type="email" 
                       placeholder="Correo Corporativo" 
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#EFC46C] transition-colors" 
                       required 
                       value={b2bEmail}
                       onChange={(e) => setB2bEmail(e.target.value)}
                     />
                   </div>
                   <div>
                     <textarea 
                       placeholder="Breve motivo de la sinergia" 
                       rows={3} 
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#EFC46C] transition-colors resize-none" 
                       required
                       value={b2bMessage}
                       onChange={(e) => setB2bMessage(e.target.value)}
                     ></textarea>
                   </div>
                   <button 
                     type="submit" 
                     disabled={b2bLoading}
                     className="w-full bg-gradient-to-r from-[#EFC46C] to-[#DFA238] text-black font-black uppercase tracking-widest text-sm py-4 rounded-xl shadow-[0_0_20px_rgba(239,196,108,0.4)] hover:shadow-[0_0_30px_rgba(239,196,108,0.6)] transform hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
                   >
                     {b2bLoading ? 'Enviando...' : 'Solicitar Contacto'}
                   </button>
                </form>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
