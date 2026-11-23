import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CircleDollarSign, FileText, Download, Filter, Search, PlusCircle, CheckCircle, Clock } from 'lucide-react';

export default function AdminFinances({ payments }: { payments: any[] }) {
  const [filter, setFilter] = useState('all');

  // mock data if payments is empty for presentation purposes
  const displayPayments = payments.length > 0 ? payments : [
    { id: '1', userName: 'Juan Pérez', lotInfo: 'Mza 2 - Lote 14', amount: 500, status: 'paid', dueDate: Date.now() - 86400000, installmentNumber: 1, totalInstallments: 36 },
    { id: '2', userName: 'María Gómez', lotInfo: 'Mza 5 - Lote 2', amount: 750, status: 'pending', dueDate: Date.now() + 86400000 * 5, installmentNumber: 5, totalInstallments: 24 },
    { id: '3', userName: 'Carlos Ruiz', lotInfo: 'Mza 1 - Lote 1', amount: 1200, status: 'late', dueDate: Date.now() - 86400000 * 3, installmentNumber: 2, totalInstallments: 12 },
  ];

  const filteredPayments = displayPayments.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wider flex items-center">
             <CircleDollarSign className="w-6 h-6 mr-3 text-[#EFC46C]" /> Facturación & Finanzas
          </h2>
          <p className="text-gray-500 text-sm mt-1">Centralización de contratos, recibos e historial de pagos.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-xl shadow-sm flex items-center uppercase tracking-wider transition-colors">
             <FileText className="w-4 h-4 mr-2 text-gray-400" /> Nuevo Contrato
           </button>
           <button className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl shadow-lg flex items-center uppercase tracking-wider transition-colors">
             <PlusCircle className="w-4 h-4 mr-2" /> Registrar Pago
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" /> Flujo de Cuotas Recientes
                  </h3>
                  <div className="flex space-x-2 border border-gray-200 p-1 rounded-xl bg-white">
                     <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors ${filter === 'all' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Todas</button>
                     <button onClick={() => setFilter('pending')} className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors ${filter === 'pending' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Pendientes</button>
                     <button onClick={() => setFilter('late')} className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors ${filter === 'late' ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Mora</button>
                  </div>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <tbody className="divide-y divide-gray-50">
                     {filteredPayments.map((p, i) => (
                       <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="p-4">
                            <p className="font-bold text-gray-900">{p.userName || 'Cliente Anónimo'}</p>
                            <p className="text-xs text-gray-500">{p.lotInfo || 'Lote N/A'}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-medium text-gray-600">Cuota {p.installmentNumber}/{p.totalInstallments}</p>
                            <p className="text-xs text-gray-400">Vence: {new Date(p.dueDate).toLocaleDateString()}</p>
                          </td>
                          <td className="p-4">
                            <span className="font-black text-gray-900">${p.amount.toLocaleString()}</span>
                          </td>
                          <td className="p-4 text-right">
                             <span className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                               p.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                               p.status === 'late' ? 'bg-red-50 text-red-600 border-red-100' :
                               'bg-amber-50 text-amber-600 border-amber-100'
                             }`}>
                               {p.status === 'paid' ? 'Pagado' : p.status === 'late' ? 'En Mora' : 'Pendiente'}
                             </span>
                          </td>
                          <td className="p-4 text-right">
                            {p.status === 'paid' && (
                               <button className="text-gray-400 hover:text-[#EFC46C] transition-colors" title="Descargar Recibo">
                                  <Download className="w-4 h-4" />
                               </button>
                            )}
                          </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 shadow-2xl border border-gray-800 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFC46C]/10 rounded-bl-full blur-2xl"></div>
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Ingresos Estimados (Mes)</h3>
             <p className="text-4xl font-black mb-1">$45,200 <span className="text-lg text-gray-500 font-medium">USD</span></p>
             <p className="text-sm text-emerald-400 flex items-center mb-6">
               <CheckCircle className="w-4 h-4 mr-1" /> +12.5% vs mes anterior
             </p>
             
             <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-center">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Acreditado</span>
                  <span className="font-bold text-white">$28,500</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-center">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Pendiente / Mora</span>
                  <span className="font-bold text-[#EFC46C]">$16,700</span>
                </div>
             </div>
           </div>

           <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl">
             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center">
               <FileText className="w-4 h-4 mr-2 text-gray-400" /> Contratos Activos
             </h3>
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-2">
                <div className="flex items-center">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                     <FileText className="w-4 h-4 text-indigo-500" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-gray-900">Boleto Compraventa</p>
                     <p className="text-[10px] text-gray-500 uppercase">Estándar (Firma Digital)</p>
                   </div>
                </div>
                <span className="text-xs font-black bg-white px-2 py-1 border border-gray-200 rounded-md">145</span>
             </div>
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                   <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                     <FileText className="w-4 h-4 text-amber-500" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-gray-900">Reserva Ad-Referendum</p>
                     <p className="text-[10px] text-gray-500 uppercase">Pre-Aprobación</p>
                   </div>
                </div>
                <span className="text-xs font-black bg-white px-2 py-1 border border-gray-200 rounded-md">23</span>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
