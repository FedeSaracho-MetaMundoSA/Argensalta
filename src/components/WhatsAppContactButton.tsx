import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, X, ShieldCheck } from 'lucide-react';

export default function WhatsAppContactButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Show after 1.5 seconds delay for professional look & feel
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    // Auto-dismiss tooltip after 8 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[999] font-sans flex items-center">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="absolute left-16 bg-zinc-950 text-white border border-[#EFC46C]/30 py-2.5 px-4 rounded-2xl shadow-2xl flex flex-col min-w-[200px] sm:min-w-[240px]"
          >
            {/* Tooltip Header */}
            <div className="flex items-center justify-between pb-1 border-b border-white/5 mb-1.5">
              <span className="text-[9px] uppercase tracking-widest text-[#EFC46C] font-black flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> Contacto Directo
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            
            {/* Tooltip Content */}
            <p className="text-xs text-gray-200 font-extrabold font-sans">
              José Luis Sarapura
            </p>
            <p className="text-[10px] text-zinc-400 font-light mt-0.5 leading-relaxed">
              ¿Querés señar o comprar tu lote hoy? Hablá directamente con el socio fundador por WhatsApp.
            </p>

            <a
              href="https://wa.me/5493875557009?text=Hola%20Jos%C3%A9%20Luis%2C%20estoy%20interesado%20en%20los%20lotes%20de%20Argensalta%20Propiedades%20y%20quiero%20concretar%20una%20compra."
              target="_blank"
              referrerPolicy="no-referrer"
              onClick={() => {
                setShowTooltip(false);
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'click_whatsapp_direct', {
                    'event_category': 'Engagement',
                    'event_label': 'WhatsApp Tooltip Buy Button'
                  });
                }
              }}
              className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] sm:text-xs font-black uppercase text-center py-2 px-3 rounded-xl transition-all tracking-wider flex items-center justify-center space-x-1"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>INICIAR COMPRA</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main pulsing green floating button */}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-emerald-500/35 animate-ping opacity-75"></span>
        <motion.a
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/5493875557009?text=Hola%20Jos%C3%A9%20Luis%2C%20estoy%20interesado%20en%20los%20lotes%20de%20Argensalta%20Propiedades%20y%20quiero%20concretar%20una%20compra."
          target="_blank"
          referrerPolicy="no-referrer"
          className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-full text-white shadow-[0_10px_30px_rgba(16,185,129,0.5)] border-2 border-zinc-950 focus:outline-none transition-all cursor-pointer group"
          onClick={() => {
            setShowTooltip(false);
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'click_whatsapp_float', {
                'event_category': 'Engagement',
                'event_label': 'WhatsApp Pulsing Float Button'
              });
            }
          }}
        >
          {/* WhatsApp icon look-alike or classic message circle */}
          <MessageCircle className="w-6 h-6 fill-white stroke-emerald-600 group-hover:rotate-12 transition-transform duration-300" />
          
          {/* Tiny online active indicator dot */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-zinc-950 animate-pulse"></span>
        </motion.a>
      </div>
    </div>
  );
}
