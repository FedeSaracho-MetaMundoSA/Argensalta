import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, Paperclip, Clock, ShieldCheck } from 'lucide-react';

export default function ClientSupport() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola, bienvenido al sistema de consultas directo de Argensalta Propiedades para propietarios. Soy Sofía, ¿en qué te puedo ayudar hoy con tu lote en Riveras de Pucheta?", type: 'admin', time: '10:00 AM' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setMessages([...messages, { id: Date.now(), text: inputValue, type: 'client', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInputValue('');

    // Simulate response
    setTimeout(() => {
       setMessages(prev => [...prev, { id: Date.now() + 1, text: "Recibimos tu mensaje. Un asesor revisará tu perfil de inversor y te responderá a la brevedad dentro de las próximas 24 horas hábiles.", type: 'admin', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500);
  };

  return (
    <div className="h-[750px] flex gap-6">
       
       <div className="w-full lg:w-2/3 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EFC46C]/5 rounded-bl-full pointer-events-none z-0"></div>
          
          {/* Support Header */}
          <div className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-md relative z-10 flex justify-between items-center">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EFC46C] to-[#8B4513] flex items-center justify-center shadow-lg">
                   <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                   <h3 className="font-black text-gray-900 uppercase tracking-wider text-sm flex items-center">Contacto Administrativo <span className="w-2 h-2 rounded-full bg-emerald-500 ml-2 animate-pulse"></span></h3>
                   <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-0.5">Asistente de Inversores - Respuesta en 24h</p>
                </div>
             </div>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6 relative z-10 bg-gray-50/50">
             <div className="text-center">
                <span className="inline-block bg-white border border-gray-200 text-gray-400 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">Hoy</span>
             </div>
             {messages.map((msg) => (
               <motion.div 
                 key={msg.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex ${msg.type === 'client' ? 'justify-end' : 'justify-start'}`}
               >
                 <div className={`max-w-[80%] rounded-2xl p-4 shadow-md ${msg.type === 'client' ? 'bg-gray-900 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'}`}>
                    <p className="leading-relaxed text-sm">{msg.text}</p>
                    <p className={`text-[10px] mt-2 font-bold uppercase tracking-widest ${msg.type === 'client' ? 'text-gray-400' : 'text-gray-400'}`}>{msg.time}</p>
                 </div>
               </motion.div>
             ))}
          </div>

          {/* Form */}
          <div className="p-4 bg-white border-t border-gray-100 relative z-10">
             <form onSubmit={handleSend} className="flex gap-2">
                <button type="button" className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Redactá tu consulta aquí, ej: ¿Cuándo es mi próximo vencimiento?..."
                  className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#EFC46C] focus:ring-1 focus:ring-[#EFC46C] transition-shadow text-sm"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-[#EFC46C] hover:bg-[#DFA238] disabled:opacity-50 disabled:hover:bg-[#EFC46C] text-black rounded-xl px-6 py-3 font-bold shadow-lg transition-colors flex items-center justify-center uppercase tracking-wider text-xs"
                >
                  <Send className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Enviar</span>
                </button>
             </form>
          </div>
       </div>

       {/* FAQ Sidebar */}
       <div className="hidden lg:block w-1/3 space-y-6">
          <div className="bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-800 relative overflow-hidden">
             <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#EFC46C]/10 rounded-full blur-3xl pointer-events-none"></div>
             <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center relative z-10">
               <Clock className="w-5 h-5 mr-3 text-[#EFC46C]" /> Respuestas Cotidianas
             </h3>
             <div className="space-y-4 relative z-10">
               {[
                 "¿Cómo adhiero al débito automático?", 
                 "¿Dónde descargo mi libreta de pagos?", 
                 "¿Qué significa plano de mensura en trámite?",
                 "Adelantar cuotas para congelar precio"
               ].map((faq, i) => (
                 <button key={i} className="w-full text-left bg-white/5 hover:bg-white/10 p-4 border border-white/10 rounded-2xl transition-colors group">
                    <p className="text-gray-300 group-hover:text-white text-sm font-medium">{faq}</p>
                 </button>
               ))}
             </div>
          </div>
       </div>

    </div>
  );
}
