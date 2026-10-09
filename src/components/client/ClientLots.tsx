import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Map, Download, FileText, Camera, Video, AlertCircle } from 'lucide-react';
import InteractiveMasterplan from '../InteractiveMasterplan';

export default function ClientLots({ lots }: { lots: any[] }) {
  const [selectedLot, setSelectedLot] = useState<any | null>(lots[0] || null);

  if (lots.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 text-center relative overflow-hidden">
         <div className="relative z-10 max-w-xl mx-auto">
           <Map className="w-14 h-14 text-gray-300 mx-auto mb-8" />
           <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter drop-shadow-sm">Aún no cuentas con propiedades vinculadas</h2>
         </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Selector */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Tus Propiedades</h3>
          {lots.map(lot => (
            <motion.button
              key={lot.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedLot(lot)}
              className={`w-full text-left p-5 rounded-2xl border transition-all ${
                selectedLot?.id === lot.id 
                ? 'bg-gray-900 border-gray-800 text-white shadow-xl' 
                : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-black uppercase tracking-tight text-lg">Mza {lot.block} - Lt {lot.lotNumber}</span>
                {selectedLot?.id === lot.id && <div className="w-2 h-2 bg-[#EFC46C] rounded-full animate-pulse" />}
              </div>
              <p className={`text-xs uppercase tracking-widest font-bold ${selectedLot?.id === lot.id ? 'text-gray-400' : 'text-gray-500'}`}>Riveras de Pucheta</p>
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        {selectedLot && (
          <div className="flex-grow space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative min-h-[500px]">
              <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10 flex items-center shadow-lg">
                <Map className="w-4 h-4 mr-2 text-[#EFC46C]" /> Ubicación en Masterplan
              </div>
              <InteractiveMasterplan lotsProp={lots} selectedLotId={selectedLot.id} selectedLotData={selectedLot} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
                <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                   <FileText className="w-6 h-6 text-emerald-600 mr-3" />
                   <h4 className="text-gray-900 font-bold uppercase tracking-wider">Documentación</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    { name: 'Boleto de Compraventa', status: 'Firmado' },
                    { name: 'Plano de Mensura', status: 'Aprobado' },
                    { name: 'Reglamento de Copropiedad', status: 'Pendiente' }
                  ].map((doc, i) => (
                    <li key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group/item">
                       <span className="text-gray-600 text-sm font-medium">{doc.name}</span>
                       <div className="flex items-center">
                          <span className={`text-[10px] font-bold uppercase tracking-widest mr-3 ${doc.status === 'Firmado' || doc.status === 'Aprobado' ? 'text-emerald-600' : 'text-amber-500'}`}>{doc.status}</span>
                          <Download className="w-4 h-4 text-gray-400 group-hover/item:text-gray-900" />
                       </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#EFC46C]/10 rounded-full blur-3xl group-hover:bg-[#EFC46C]/20 transition-colors"></div>
                <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                   <Camera className="w-6 h-6 text-[#EFC46C] mr-3" />
                   <h4 className="text-gray-900 font-bold uppercase tracking-wider">Avance de Obra</h4>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 border-dashed">
                   <Video className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                   <p className="text-sm text-gray-600">Galería de imágenes y videos del drone en actualización mensual.</p>
                   <button className="mt-4 px-4 py-2 bg-white text-gray-900 border border-gray-200 text-xs font-bold uppercase tracking-widest rounded-xl shadow-sm hover:bg-gray-50 transition-colors">Ver Galería Completa</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
