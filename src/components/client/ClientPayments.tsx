import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { CircleDollarSign, Calendar, CheckCircle2, AlertCircle, Download, Clock } from 'lucide-react';

export default function ClientPayments({ payments }: { payments: any[] }) {
  const sortedPayments = useMemo(() => {
    return [...payments].sort((a, b) => a.dueDate - b.dueDate);
  }, [payments]);

  const paidTotal = payments.filter(p => p.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingTotal = payments.filter(p => p.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFC46C]/10 rounded-bl-[100%] pointer-events-none"></div>
           <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Total Abonado</p>
           <p className="text-3xl font-black text-white">USD {paidTotal.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
           <p className="text-xs text-amber-600 uppercase font-bold tracking-wider mb-2">Saldo Pendiente</p>
           <p className="text-3xl font-black text-gray-900">USD {pendingTotal.toLocaleString()}</p>
        </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden flex items-center justify-between">
           <div>
             <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Próximo Vencimiento</p>
             {sortedPayments.filter(p => p.status === 'pending').length > 0 ? (
               <p className="text-xl font-black text-red-600 uppercase">
                 {new Date(sortedPayments.filter(p => p.status === 'pending')[0].dueDate).toLocaleDateString()}
               </p>
             ) : (
               <p className="text-sm font-bold text-emerald-600">Al día</p>
             )}
           </div>
           <Calendar className="w-10 h-10 text-gray-200" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
           <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest flex items-center">
             <CircleDollarSign className="w-5 h-5 mr-3 text-[#EFC46C]" /> Cronograma de Cuotas
           </h3>
           <button className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-lg flex items-center uppercase tracking-wider transition-colors w-full md:w-auto justify-center">
             <Download className="w-4 h-4 mr-2" /> Estado de Cuenta
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
             <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Cuota</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Vencimiento</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Monto</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Estado</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Comprobante</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {sortedPayments.map((payment, idx) => (
                 <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">Nº {payment.installmentNumber} / {payment.totalInstallments}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">Financiación Base</div>
                    </td>
                    <td className="p-4">
                      <div className={`font-bold ${payment.status === 'pending' && payment.dueDate < Date.now() ? 'text-red-600' : 'text-gray-900'}`}>
                        {new Date(payment.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 font-black">USD {payment.amount.toLocaleString()}</td>
                    <td className="p-4">
                      {payment.status === 'paid' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Pagado
                        </span>
                      ) : payment.status === 'pending' && payment.dueDate < Date.now() ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                          <AlertCircle className="w-3 h-3 mr-1" /> Vencido
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                          <Clock className="w-3 h-3 mr-1" /> Pendiente
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                       {payment.status === 'paid' ? (
                         <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors inline-flex">
                           <Download className="w-5 h-5" />
                         </button>
                       ) : (
                         <button className="px-4 py-2 bg-gradient-to-r from-[#EFC46C] to-[#DFA238] hover:shadow-lg text-black text-xs font-bold rounded-lg uppercase tracking-wider transition-all">
                           Pagar
                         </button>
                       )}
                    </td>
                 </tr>
               ))}
               {sortedPayments.length === 0 && (
                 <tr>
                   <td colSpan={5} className="p-12 text-center text-gray-500 font-medium">No se encontraron registros de pago.</td>
                 </tr>
               )}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
