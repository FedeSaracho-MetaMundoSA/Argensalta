import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, HelpCircle, FileText } from 'lucide-react';
import ArgensaltaLogo from './ArgensaltaLogo';

// Custom high-quality SVG paths for modern social networks styled to match Lucide perfectly
const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.525.02c1.31 0 2.569.344 3.673.957.1-.064.215-.118.324-.176.223-.119.462-.212.716-.277.585-.15 1.157-.042 1.666.27.3.185.556.442.741.745.2.33.298.718.283 1.125a3.868 3.868 0 0 1-2.457 3.328 10.371 10.371 0 0 0 .041 1.253A8.913 8.913 0 0 1 12.525 15.11a8.913 8.913 0 0 1-8.913-8.913A8.913 8.913 0 0 1 12.525.02m0 2.015a6.898 6.898 0 0 0-6.898 6.898 6.898 6.898 0 0 0 6.898 6.898 6.898 6.898 0 0 0 6.136-3.73v-.08a11.956 11.956 0 0 1-3.644-2.228l-.348-.305a4.872 4.872 0 0 1-2.144.137l-.146-.03a4.032 4.032 0 0 1-2.822-4.14 4.03 4.03 0 0 1 3.125-3.37l.217-.033a5.88 5.88 0 0 0-1.724 3.766v.12a6.9 6.9 0 0 0 1.22 3.107c.026-.145.056-.29.091-.433.228-.908.68-1.742 1.309-2.42A3.87 3.87 0 0 1 12.525 2.035z"/>
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const ThreadsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 11.5c0-.6-.1-1.2-.4-1.8a5.5 5.5 0 0 0-3.1-3.1c-1.2-.4-2.6-.4-3.8 0A5.5 5.5 0 0 0 11.6 9.7a5.5 5.5 0 0 0 0 3.6 5.5 5.5 0 0 0 3.1 3.1c1.2.4 2.6.4 3.8 0a5.5 5.5 0 0 0 3.1-3.1c.3-.6.4-1.2.4-1.8zm-2.1 0c0 1.1-.3 2-1 2.7-.8.7-1.8 1-2.9 1-1.1 0-2-.3-2.7-1-.7-.8-1-1.7-1-2.7s.3-2 1-2.7c.8-.7 1.8-1 2.9-1s2.1.3 2.9 1c.7.8 1 1.7 1 2.7zm-2 0c0-.6-.2-1.1-.5-1.5-.4-.4-.9-.6-1.5-.6s-1.1.2-1.5.6c-.4.4-.6.9-.6 1.5s.2 1.1.5 1.5c.4.4.9.6 1.5.6s1.1-.2 1.5-.6c.3-.4.5-1 .5-1.5z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-30 bg-black pt-28 pb-12 border-t border-[#EFC46C]/10 overflow-hidden" id="main-footer" role="contentinfo">
      {/* Decorative Golden Ambient Fog */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-b from-[#EFC46C]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      
      {/* Dynamic Gold Laser Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#EFC46C]/30 to-transparent animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Column A: Logo & Brand Identity */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" onClick={handleScrollToTop} className="inline-block mb-6 group transition-transform duration-300">
                <ArgensaltaLogo className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105" />
              </Link>
              <p className="text-gray-400 font-light text-sm leading-relaxed max-w-sm mb-6">
                Desarrollo inmobiliario, consultoría y estructuración de inmuebles de alta gama en la provincia de Salta. Profesionalismo inmobiliario con enfoque moderno.
              </p>
            </div>

            {/* Premium Social Media Suite */}
            <div>
              <p className="text-[#EFC46C] text-xs font-bold uppercase tracking-widest mb-4">Nuestras Redes Corporativas</p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { href: 'https://instagram.com/argensaltapropiedades', icon: 'IG', name: 'Instagram', label: 'Instagram' },
                  { href: 'https://facebook.com/argensaltapropiedades', icon: 'FB', name: 'Facebook', label: 'Facebook' },
                  { href: 'https://tiktok.com/@argensalta', icon: 'TK', name: 'TikTok', label: 'TikTok' },
                  { href: 'https://twitter.com/argensalta', icon: 'X', name: 'X', label: 'X (Twitter)' },
                  { href: 'https://youtube.com/@argensaltapropiedades', icon: 'YT', name: 'YouTube', label: 'YouTube' },
                  { href: 'https://linkedin.com/company/argensaltapropiedades', icon: 'LI', name: 'LinkedIn', label: 'LinkedIn' },
                  { href: 'https://threads.net/@argensaltapropiedades', icon: 'TH', name: 'Threads', label: 'Threads' },
                ].map((social, index) => {
                  return (
                    <motion.a 
                      key={index}
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, translateY: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#EFC46C] hover:text-black hover:border-transparent transition-all duration-300 group shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(239,196,108,0.4)]"
                    >
                      <span className="text-white group-hover:text-black flex items-center justify-center">
                        {social.icon === 'IG' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5h.01" /></svg>
                        )}
                        {social.icon === 'FB' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                        )}
                        {social.icon === 'TK' && <TikTokIcon />}
                        {social.icon === 'X' && <XIcon />}
                        {social.icon === 'YT' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        )}
                        {social.icon === 'LI' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.59 7-2.78 7 2.48v6.75z"/></svg>
                        )}
                        {social.icon === 'TH' && <ThreadsIcon />}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Column B: Contact & Local Address (Salta) */}
          <div className="lg:col-span-4 lg:pl-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 relative pl-3.5 flex items-center">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#EFC46C] rounded" />
              Contacto y Oficinas Centrales
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-lg bg-[#EFC46C]/10 flex items-center justify-center mr-3 border border-[#EFC46C]/20 text-[#EFC46C] shrink-0 mt-0.5 group-hover:bg-[#EFC46C] group-hover:text-black transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-wider">Dirección Local</p>
                  <p className="text-gray-400 font-light text-sm leading-relaxed mt-0.5">
                    Oficinas Corporativas, Salta Capital, Argentina.
                  </p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-lg bg-[#EFC46C]/10 flex items-center justify-center mr-3 border border-[#EFC46C]/20 text-[#EFC46C] shrink-0 mt-0.5 group-hover:bg-[#EFC46C] group-hover:text-black transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-wider">Teléfonos / WhatsApp</p>
                  <a href="https://wa.me/5493875557009" target="_blank" rel="noreferrer" className="text-gray-400 font-light text-sm leading-relaxed block mt-0.5 hover:text-[#EFC46C] transition-colors">
                    +54 9 387 555-7009 (Venta Directa)
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-lg bg-[#EFC46C]/10 flex items-center justify-center mr-3 border border-[#EFC46C]/20 text-[#EFC46C] shrink-0 mt-0.5 group-hover:bg-[#EFC46C] group-hover:text-black transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-wider">Correo Institucional</p>
                  <a href="mailto:argensaltapropiedades@gmail.com" className="text-gray-400 font-light text-sm leading-relaxed block mt-0.5 hover:text-[#EFC46C] transition-colors">
                    argensaltapropiedades@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-lg bg-[#EFC46C]/10 flex items-center justify-center mr-3 border border-[#EFC46C]/20 text-[#EFC46C] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#EFC46C]" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-wider">Horario de Atención</p>
                  <p className="text-gray-500 font-light text-xs leading-relaxed mt-0.5 uppercase tracking-widest">
                    Lunes a Viernes: 09:00 - 18:00 hs
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column C: Ecosystem Crawler Map (Sitemap & Navigation) */}
          <div className="lg:col-span-4 lg:pl-8">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 relative pl-3.5 flex items-center">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#EFC46C] rounded" />
              Sitemap Corporativo
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-3.5 text-gray-400 font-light text-sm tracking-wide">
                <li>
                  <Link to="/" onClick={handleScrollToTop} className="hover:text-[#EFC46C] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 text-[#EFC46C]/40 group-hover:translate-x-1 group-hover:text-[#EFC46C] transition-all" /> 
                    <span>Inicio</span>
                  </Link>
                </li>
                <li>
                  <Link to="/proyectos" onClick={handleScrollToTop} className="hover:text-[#EFC46C] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 text-[#EFC46C]/40 group-hover:translate-x-1 group-hover:text-[#EFC46C] transition-all" /> 
                    <span>Proyectos</span>
                  </Link>
                </li>
                <li>
                  <Link to="/modulos" onClick={handleScrollToTop} className="hover:text-[#EFC46C] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 text-[#EFC46C]/40 group-hover:translate-x-1 group-hover:text-[#EFC46C] transition-all" />
                    <span>Módulos Cube</span>
                  </Link>
                </li>
                <li>
                  <Link to="/nosotros" onClick={handleScrollToTop} className="hover:text-[#EFC46C] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 text-[#EFC46C]/40 group-hover:translate-x-1 group-hover:text-[#EFC46C] transition-all" /> 
                    <span>Nosotros</span>
                  </Link>
                </li>
              </ul>
              <ul className="space-y-3.5 text-gray-400 font-light text-sm tracking-wide">
                <li>
                  <Link to="/contacto" onClick={handleScrollToTop} className="hover:text-[#EFC46C] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 text-[#EFC46C]/40 group-hover:translate-x-1 group-hover:text-[#EFC46C] transition-all" /> 
                    <span>Contacto</span>
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={handleScrollToTop} className="hover:text-[#EFC46C] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 text-[#EFC46C]/40 group-hover:translate-x-1 group-hover:text-[#EFC46C] transition-all" /> 
                    <span>Portal Clientes</span>
                  </Link>
                </li>
                <li>
                  <Link to="/proyecto/riveras-de-pucheta" onClick={handleScrollToTop} className="hover:text-[#EFC46C] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 text-[#EFC46C]/40 group-hover:translate-x-1 group-hover:text-[#EFC46C] transition-all" /> 
                    <span>Riveras</span>
                  </Link>
                </li>
                <li>
                  <Link to="/proyecto/don-borromeo" onClick={handleScrollToTop} className="hover:text-[#EFC46C] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 text-[#EFC46C]/40 group-hover:translate-x-1 group-hover:text-[#EFC46C] transition-all" /> 
                    <span>Don Borromeo</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Metadata & Legal Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest font-black">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="w-2 h-2 rounded-full bg-[#EFC46C] mr-2.5 animate-pulse" />
            <p>
              © {currentYear} ARGENSALTA PROPIEDADES. <span className="hidden sm:inline">Todos los derechos reservados. Matrícula Profesional en trámite.</span>
            </p>
          </div>
          <div className="flex space-x-6 text-[10px] text-gray-500 font-bold">
            <a href="#" className="hover:text-[#EFC46C] transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-[#EFC46C] transition-colors">Seguridad de Datos</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
