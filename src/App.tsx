import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Menu, X, Home as HomeIcon, LogIn, UserPlus, Briefcase, ChevronRight, Phone, Users, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Home from './pages/Home';
import ProjectRiveras from './pages/ProjectRiveras';
import ProjectDonBorromeo from './pages/ProjectDonBorromeo';
import ProjectCalderilla from './pages/ProjectCalderilla';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Proyectos from './pages/Proyectos';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Modulos from './pages/Modulos';
import PropertyCaminoColon from './pages/PropertyCaminoColon';
import PropertyPotreros from './pages/PropertyPotreros';
import { AuthProvider } from './contexts/AuthContext';
import IntelligentBot from './components/IntelligentBot';
import ArgensaltaLogo from './components/ArgensaltaLogo';
import WhatsAppContactButton from './components/WhatsAppContactButton';
import Footer from './components/Footer';

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get('utm_source');
      const utmMedium = params.get('utm_medium');
      const utmCampaign = params.get('utm_campaign');
      const gclid = params.get('gclid');
      const fbclid = params.get('fbclid');

      if (utmSource || utmMedium || utmCampaign || gclid || fbclid) {
        const campaignData = {
          utm_source: utmSource || '',
          utm_medium: utmMedium || '',
          utm_campaign: utmCampaign || '',
          gclid: gclid || '',
          fbclid: fbclid || '',
          timestamp: Date.now()
        };
        sessionStorage.setItem('original_campaign_info', JSON.stringify(campaignData));
      }
    }
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen font-sans flex flex-col bg-gray-900 relative">
      <nav className="relative w-full z-40 bg-black backdrop-blur-md border-b border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" onClick={closeSidebar} className="flex items-center group">
                <div className="transition-transform group-hover:scale-105 flex items-center shrink-0">
                   <ArgensaltaLogo className="h-16 sm:h-20 lg:h-24 w-auto object-contain" />
                </div>
              </Link>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="text-white hover:text-[#EFC46C] p-2 transition-colors relative z-50 flex items-center gap-2"
              >
                <span className="hidden sm:block font-bold uppercase tracking-widest text-sm text-[#EFC46C]">Menú</span>
                {isSidebarOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar HUD Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
                        {/* Sidebar sidebar */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-950 border-l border-white/10 z-50 shadow-2xl flex flex-col pt-16"
            >
              <button 
                onClick={closeSidebar}
                className="absolute top-4 right-4 text-white hover:text-[#EFC46C] transition-colors p-2 z-50"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="px-6 py-4 border-b border-white/5 flex flex-col items-center">
                <div className="mb-2 transition-transform hover:scale-105">
                   <ArgensaltaLogo className="h-14 sm:h-16 w-auto object-contain" />
                </div>
                <p className="text-[#EFC46C] text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center">
                  Patrimonio & Innovación Inmobiliaria
                </p>
              </div>

              <div className="flex-grow overflow-y-auto px-6 py-4 pb-24 space-y-4">
                <Link to="/" onClick={closeSidebar} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group">
                  <div className="flex items-center">
                    <HomeIcon className="w-5 h-5 text-[#EFC46C] mr-3" />
                    <span className="text-white font-bold tracking-widest uppercase text-sm group-hover:text-[#EFC46C] transition-colors">Inicio</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#EFC46C] transition-colors" />
                </Link>

                <div className="px-3 pt-2 pb-1">
                  <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest border-b border-gray-900 pb-1.5">Proyectos & Desarrollos</p>
                </div>

                <Link to="/proyectos" onClick={closeSidebar} className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#EFC46C]/30 transition-all group">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-[#EFC46C] mr-3 shrink-0" />
                    <span className="text-white font-black tracking-widest uppercase text-xs group-hover:text-[#EFC46C] transition-colors">Todos los Desarrollos</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#EFC46C] transition-colors" />
                </Link>

                {/* DESARROLLOS */}
                <div className="px-3 pt-2">
                  <p className="text-[9px] uppercase text-emerald-400 font-black tracking-widest">1. Desarrollos (Inversión Completa)</p>
                </div>

                <Link to="/proyecto/la-calderilla" onClick={closeSidebar} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 hover:from-emerald-500/30 hover:to-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 transition-all group relative overflow-hidden">
                  <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-emerald-500/20 w-16 h-16 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center relative z-10 w-full">
                    <span className="text-[16px] mr-3">🌳</span>
                    <div className="flex flex-col flex-1 pl-1 border-l border-emerald-500/30">
                      <span className="text-emerald-400 font-black tracking-widest uppercase text-[10px]">Loteo Ecológico</span>
                      <span className="text-white text-[9px] uppercase tracking-wider font-bold">La Calderilla • Bosque & Río</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-400 relative z-10 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* URBANIZACIONES / LOTEOS */}
                <div className="px-3 pt-2">
                  <p className="text-[9px] uppercase text-[#EFC46C] font-black tracking-widest">2. Urbanizaciones / Loteos</p>
                </div>

                <Link to="/proyecto/don-borromeo" onClick={closeSidebar} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#EFC46C]/20 to-[#EFC46C]/5 hover:from-[#EFC46C]/30 hover:to-[#EFC46C]/10 border border-[#EFC46C]/50 hover:border-[#EFC46C] transition-all group relative overflow-hidden">
                  <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-[#EFC46C]/20 w-16 h-16 rounded-full blur-xl pointer-events-none group-hover:bg-[#EFC46C]/30 transition-colors" />
                  <div className="flex items-center relative z-10 w-full">
                    <span className="text-[16px] mr-3 animate-pulse">🌟</span>
                    <div className="flex flex-col flex-1 pl-1 border-l border-[#EFC46C]/30">
                      <span className="text-[#EFC46C] font-black tracking-widest uppercase text-[10px] sm:text-xs">VIP Combo • Súper Oferta</span>
                      <span className="text-white text-[9px] uppercase tracking-wider font-bold">Don Borromeo Lote + VivaCube 30m²</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#EFC46C] relative z-10 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link to="/proyecto/riveras-de-pucheta" onClick={closeSidebar} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-500/10 to-transparent hover:from-gray-500/20 border border-white/5 hover:border-gray-500 transition-all group relative overflow-hidden">
                  <div className="flex items-center relative z-10 w-full">
                    <span className="text-[16px] mr-3">🌄</span>
                    <div className="flex flex-col flex-1 pl-1 border-l border-white/10">
                      <span className="text-gray-400 font-black tracking-widest uppercase text-[10px]">La Caldera</span>
                      <span className="text-white text-[9px] uppercase tracking-wider font-bold">Riveras de Pucheta</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 relative z-10 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="px-3 pt-3 pb-1">
                  <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest border-b border-gray-900 pb-1.5">Viviendas Modulares</p>
                </div>

                <Link to="/modulos" onClick={closeSidebar} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#EFC46C]/10 to-transparent hover:from-[#EFC46C]/20 border border-[#EFC46C]/20 hover:border-[#EFC46C]/60 transition-all group shadow-[0_0_15px_rgba(239,196,108,0.05)] hover:shadow-[0_0_20px_rgba(239,196,108,0.15)]">
                  <div className="flex items-center">
                    <Box className="w-5 h-5 text-[#EFC46C] mr-3 animate-pulse shrink-0" />
                    <div className="text-left">
                      <span className="text-white font-black tracking-widest uppercase text-xs group-hover:text-[#EFC46C] transition-colors block">Módulos CUBE</span>
                      <span className="text-[9px] text-gray-400 lowercase tracking-wider block">Plug & Live • Alta Gama</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[9px] bg-[#EFC46C] text-black font-black uppercase tracking-widest px-1.5 py-0.5 rounded animate-pulse">Últimos</span>
                    <ChevronRight className="w-4 h-4 text-[#EFC46C]" />
                  </div>
                </Link>

                <div className="px-3 pt-3 pb-1">
                  <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest border-b border-gray-900 pb-1.5">Empresa</p>
                </div>

                <Link to="/nosotros" onClick={closeSidebar} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-[#EFC46C] mr-3" />
                    <span className="text-white font-bold tracking-widest uppercase text-xs group-hover:text-[#EFC46C] transition-colors">Nosotros</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#EFC46C] transition-colors" />
                </Link>

                <Link to="/contacto" onClick={closeSidebar} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#EFC46C] mr-3" />
                    <span className="text-white font-bold tracking-widest uppercase text-xs group-hover:text-[#EFC46C] transition-colors">Contacto</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#EFC46C] transition-colors" />
                </Link>

                <div className="px-3 pt-3 pb-1">
                  <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest border-b border-gray-900 pb-1.5">Portal y Cuenta</p>
                </div>

                <Link to="/login" onClick={closeSidebar} className="flex items-center justify-between p-4 rounded-xl bg-black/40 hover:bg-[#EFC46C]/10 border border-white/5 hover:border-[#EFC46C]/30 transition-all group">
                  <div className="flex items-center">
                    <LogIn className="w-5 h-5 text-[#EFC46C] mr-3" />
                    <span className="text-white font-bold tracking-widest uppercase text-xs group-hover:text-[#EFC46C] transition-colors">Iniciar sesión</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#EFC46C] transition-colors" />
                </Link>

                <Link to="/login?mode=register" onClick={closeSidebar} className="flex items-center justify-between p-4 rounded-xl bg-[#EFC46C]/10 hover:bg-[#EFC46C]/20 border border-[#EFC46C]/20 hover:border-[#EFC46C]/50 transition-all group">
                  <div className="flex items-center">
                    <UserPlus className="w-5 h-5 text-[#EFC46C] mr-3" />
                    <span className="text-white font-black tracking-widest uppercase text-xs group-hover:text-white transition-colors">Crear Cuenta Libre</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#EFC46C] transition-colors" />
                </Link>
              </div>
              
              <div className="p-6 border-t border-white/5 bg-black/40">
                <p className="text-xs text-gray-500 uppercase tracking-widest text-center">
                  Argensalta Propiedades © {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <IntelligentBot />
      <WhatsAppContactButton />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route
              path="*"
              element={
                <DefaultLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/proyectos" element={<Proyectos />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/modulos" element={<Modulos />} />
                    <Route path="/riverasdepucheta" element={<ProjectRiveras />} />
                    <Route path="/donborromeo" element={<ProjectDonBorromeo />} />
                    <Route path="/lacalderilla" element={<ProjectCalderilla />} />
                    <Route path="/proyecto/riveras-de-pucheta" element={<ProjectRiveras />} />
                    <Route path="/proyecto/don-borromeo" element={<ProjectDonBorromeo />} />
                    <Route path="/proyecto/la-calderilla" element={<ProjectCalderilla />} />
                    <Route path="/propiedad/camino-a-colon" element={<PropertyCaminoColon />} />
                    <Route path="/propiedad/potreros" element={<PropertyPotreros />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </DefaultLayout>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
