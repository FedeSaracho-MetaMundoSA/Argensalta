import React from 'react';
import { motion } from 'motion/react';
import { FolderLock, FileText, Download, CheckCircle2, AlertCircle, FileDigit } from 'lucide-react';

export default function ClientDocuments() {
  const mockDocs = [
    { name: 'Boleto de Compraventa - Mza 3 Lt 14.pdf', date: '15/04/2026', size: '2.4 MB', type: 'Legal', status: 'Firmado' },
    { name: 'Plano de Mensura Aprobado.pdf', date: '20/02/2026', size: '5.1 MB', type: 'Técnico', status: 'Vigente' },
    { name: 'Reglamento Interno Barrios Cerrados.pdf', date: '10/01/2026', size: '1.2 MB', type: 'Normativa', status: 'Vigente' },
    { name: 'Acuerdo de Financiación.pdf', date: '15/04/2026', size: '1.8 MB', type: 'Financiero', status: 'Firmado' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="absolute right-0 top-0 w-64 h-64 bg-[#EFC46C]/10 rounded-full blur-3xl pointer-events-none"></div>
         <div className="relative z-10 text-white">
            <h2 className="text-2xl font-black uppercase tracking-wider flex items-center">
               <FolderLock className="w-6 h-6 mr-3 text-[#EFC46C]" /> Bóveda Documental
            </h2>
            <p className="text-gray-400 mt-2 max-w-lg">Todos los documentos legales y técnicos respaldatorios de tu inversión, firmados digitalmente y disponibles 24/7.</p>
         </div>
         <div className="relative z-10 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4">
              <FileDigit className="w-8 h-8 text-[#EFC46C]" />
              <div>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Documentos Certificados</p>
                 <p className="text-xl font-black">4 Archivos</p>
              </div>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Nombre del Documento</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Categoría</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Fecha</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Estado</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Descargar</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {mockDocs.map((doc, idx) => (
                   <motion.tr 
                     key={idx}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                   >
                      <td className="p-4 flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3 group-hover:text-[#EFC46C] transition-colors" />
                        <div>
                           <p className="font-bold text-gray-900 group-hover:text-black">{doc.name}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{doc.size} - PDF</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-600">
                          {doc.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-600">{doc.date}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${doc.status === 'Firmado' || doc.status === 'Vigente' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {doc.status === 'Firmado' || doc.status === 'Vigente' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                          {doc.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                         <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                           <Download className="w-5 h-5" />
                         </button>
                      </td>
                   </motion.tr>
                 ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
