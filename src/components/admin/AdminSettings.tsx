import React from 'react';
import { motion } from 'motion/react';
import { Settings, Shield, Bell, Key, Database, Globe, Smartphone, Lock } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wider flex items-center">
             <Settings className="w-6 h-6 mr-3 text-[#EFC46C]" /> Ajustes del Sistema
          </h2>
          <p className="text-gray-500 text-sm mt-1">Configuración general de la plataforma y seguridad.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden group hover:border-[#EFC46C]/30 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -z-10 group-hover:bg-[#EFC46C]/10 transition-colors"></div>
            <Shield className="w-8 h-8 text-gray-400 mb-4 group-hover:text-[#EFC46C] transition-colors" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Roles y Permisos</h3>
            <p className="text-sm text-gray-500 mb-4">Gestiona los niveles de acceso para tu equipo de la inmobiliaria.</p>
            <button className="text-xs font-bold uppercase tracking-widest text-[#8B4513] hover:text-[#EFC46C] transition-colors">Configurar →</button>
         </div>

         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden group hover:border-[#EFC46C]/30 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -z-10 group-hover:bg-[#EFC46C]/10 transition-colors"></div>
            <Bell className="w-8 h-8 text-gray-400 mb-4 group-hover:text-[#EFC46C] transition-colors" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Notificaciones Automáticas</h3>
            <p className="text-sm text-gray-500 mb-4">Emails y SMS para recordatorios de vencimiento de cuotas.</p>
            <button className="text-xs font-bold uppercase tracking-widest text-[#8B4513] hover:text-[#EFC46C] transition-colors">Configurar →</button>
         </div>

         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden group hover:border-[#EFC46C]/30 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -z-10 group-hover:bg-[#EFC46C]/10 transition-colors"></div>
            <Globe className="w-8 h-8 text-gray-400 mb-4 group-hover:text-[#EFC46C] transition-colors" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Integraciones</h3>
            <p className="text-sm text-gray-500 mb-4">Conecta pasarelas de pago, AFIP y sistemas de facturación externa.</p>
            <button className="text-xs font-bold uppercase tracking-widest text-[#8B4513] hover:text-[#EFC46C] transition-colors">Conectar →</button>
         </div>
      </div>

      <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl relative overflow-hidden mt-8">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#EFC46C]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
           <div>
             <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2 flex items-center">
                <Database className="w-6 h-6 mr-3 text-[#EFC46C]" /> Respaldo y Seguridad
             </h3>
             <p className="text-gray-400 max-w-xl">
               La base de datos se respalda automáticamente cada 24hs. La información de los inversores está encriptada cumpliendo altos estándares de seguridad.
             </p>
           </div>
           <button className="whitespace-nowrap px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-colors flex items-center">
             <Lock className="w-4 h-4 mr-2" /> Forzar Backup Manual
           </button>
        </div>
      </div>
    </div>
  );
}
