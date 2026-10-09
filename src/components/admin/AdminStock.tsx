import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Map, Plus, Filter, Search, Edit2, CheckCircle2, AlertCircle, XCircle, LayoutList, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import InteractiveMasterplan from '../InteractiveMasterplan';
import { useAdminStockStore } from '../../store/useAdminStockStore';
import { useAppStore } from '../../store/useAppStore';
import { collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { LocalDB } from '../../lib/localDb';

export default function AdminStock({ lots }: { lots: any[] }) {
  const { setLots } = useAppStore();
  const {
    filter, setFilter,
    searchTerm, setSearchTerm,
    viewMode, setViewMode,
    currentPage, setCurrentPage,
    itemsPerPage, setItemsPerPage
  } = useAdminStockStore();

  const [editingLotId, setEditingLotId] = React.useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newLot, setNewLot] = useState({
    block: '',
    lotNumber: '',
    surface: 0,
    price: 0
  });

  const handleAddLot = async () => {
    try {
      if (!newLot.block || !newLot.lotNumber || newLot.surface <= 0 || newLot.price <= 0) {
        alert("Completa todos los campos correctamente.");
        return;
      }

      // Add to LocalDB instantly
      const localAdded = LocalDB.addLot({
        block: newLot.block,
        lotNumber: newLot.lotNumber,
        surface: Number(newLot.surface),
        price: Number(newLot.price),
        status: 'available'
      });

      // Update the state instantly
      setLots(LocalDB.getLots());

      setIsAdding(false);
      setNewLot({ block: '', lotNumber: '', surface: 0, price: 0 });

      // Attempt background save to Firebase if active
      try {
        await addDoc(collection(db, 'lots'), {
          block: newLot.block,
          lotNumber: newLot.lotNumber,
          surface: Number(newLot.surface),
          price: Number(newLot.price),
          status: 'available',
          createdAt: Date.now()
        });
      } catch(e) {
        console.warn("Firebase save bypassed, lot saved securely in LocalDB", e);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'lots');
    }
  };

  const filteredLots = useMemo(() => {
    return lots.filter(l => {
      if (filter !== 'all' && l.status !== filter) return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase().trim();
        const blockStr = String(l.block || '').toLowerCase();
        const lotStr = String(l.lotNumber || '').toLowerCase();
        
        // Busqueda flexible por Mza/Lote
        const isMatch = blockStr.includes(searchLower) || 
                        lotStr.includes(searchLower) || 
                        `mza ${blockStr}`.includes(searchLower) || 
                        `lote ${lotStr}`.includes(searchLower) ||
                        `manzana ${blockStr}`.includes(searchLower) ||
                        `mza ${blockStr} lote ${lotStr}`.includes(searchLower);

        if (!isMatch) {
          return false;
        }
      }
      return true;
    });
  }, [lots, filter, searchTerm]);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm, setCurrentPage]);

  // Pagination logic
  const totalPages = Math.ceil(filteredLots.length / itemsPerPage);
  
  const paginatedLots = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLots.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLots, currentPage, itemsPerPage]);

  const availableCount = lots.filter(l => l.status === 'available').length;
  const reservedCount = lots.filter(l => l.status === 'reserved').length;
  const soldCount = lots.filter(l => l.status === 'sold').length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 flex flex-col h-full"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-0 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wider flex items-center">
             <Map className="w-6 h-6 mr-3 text-[#EFC46C]" /> Control de Stock
          </h2>
          <p className="text-gray-500 text-sm mt-1">Gestión de lotes y visualización 360.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 p-1">
             <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-lg flex items-center text-xs font-bold uppercase transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
               <LayoutList className="w-4 h-4 mr-2" /> Lista
             </button>
             <button onClick={() => setViewMode('map')} className={`px-4 py-2 rounded-lg flex items-center text-xs font-bold uppercase transition-colors ${viewMode === 'map' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
               <Map className="w-4 h-4 mr-2" /> Mapa
             </button>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl shadow-lg flex items-center uppercase tracking-wider transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" /> Nuevo
          </button>
        </div>
      </div>

      {isAdding && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg mb-4">
          <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-widest">Crear Nuevo Lote</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Manzana</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" value={newLot.block} onChange={e => setNewLot({...newLot, block: e.target.value})} placeholder="Ej: A" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lote</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" value={newLot.lotNumber} onChange={e => setNewLot({...newLot, lotNumber: e.target.value})} placeholder="Ej: 14" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Superficie (m²)</label>
              <input type="number" className="w-full border rounded-lg px-3 py-2" value={newLot.surface || ''} onChange={e => setNewLot({...newLot, surface: Number(e.target.value)})} placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio (USD)</label>
              <input type="number" className="w-full border rounded-lg px-3 py-2" value={newLot.price || ''} onChange={e => setNewLot({...newLot, price: Number(e.target.value)})} placeholder="0" />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
             <button onClick={() => setIsAdding(false)} className="px-4 py-2 border rounded-lg text-sm font-bold text-gray-500 uppercase hover:bg-gray-50">Cancelar</button>
             <button onClick={handleAddLot} className="px-5 py-2 bg-[#EFC46C] text-black font-bold uppercase text-sm rounded-lg hover:bg-[#DFA238] flex items-center shadow-lg"><Save className="w-4 h-4 mr-2" /> Guardar Lote</button>
          </div>
        </motion.div>
      )}

      {viewMode === 'list' ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
               <div>
                 <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Lotes</p>
                 <p className="text-2xl font-black text-gray-900">{lots.length}</p>
               </div>
               <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                 <Map className="w-5 h-5 text-gray-400" />
               </div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
               <div>
                 <p className="text-xs text-emerald-600 uppercase font-bold tracking-wider">Disponibles</p>
                 <p className="text-2xl font-black text-emerald-700">{availableCount}</p>
               </div>
               <div className="w-10 h-10 bg-emerald-100/50 rounded-full flex items-center justify-center">
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
               </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 shadow-sm flex items-center justify-between">
               <div>
                 <p className="text-xs text-amber-600 uppercase font-bold tracking-wider">Reservados</p>
                 <p className="text-2xl font-black text-amber-700">{reservedCount}</p>
               </div>
               <div className="w-10 h-10 bg-amber-100/50 rounded-full flex items-center justify-center">
                 <AlertCircle className="w-5 h-5 text-amber-500" />
               </div>
            </div>
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100 shadow-sm flex items-center justify-between">
               <div>
                 <p className="text-xs text-red-600 uppercase font-bold tracking-wider">Vendidos</p>
                 <p className="text-2xl font-black text-red-700">{soldCount}</p>
               </div>
               <div className="w-10 h-10 bg-red-100/50 rounded-full flex items-center justify-center">
                 <XCircle className="w-5 h-5 text-red-500" />
               </div>
            </div>
          </div>

          {/* Main Table Area */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex-grow">
             <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
            <div className="relative w-full sm:w-64">
               <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Buscar Mza o Lote..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EFC46C] focus:ring-1 focus:ring-[#EFC46C] transition-all"
               />
            </div>
            <div className="flex space-x-2 border border-gray-200 p-1 rounded-xl bg-white w-full sm:w-auto">
               <button onClick={() => setFilter('all')} className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${filter === 'all' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Todos</button>
               <button onClick={() => setFilter('available')} className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${filter === 'available' ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Disp.</button>
               <button onClick={() => setFilter('reserved')} className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${filter === 'reserved' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Reserv.</button>
               <button onClick={() => setFilter('sold')} className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${filter === 'sold' ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Vendidos</button>
            </div>
         </div>
         
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b-2 border-gray-200 text-gray-400 text-xs uppercase tracking-widest font-black bg-white">
                 <th className="py-4 px-6">Identificador</th>
                 <th className="py-4 px-6">Superficie</th>
                 <th className="py-4 px-6">Precio (USD)</th>
                 <th className="py-4 px-6">Estado</th>
                 <th className="py-4 px-6 text-right">Acciones</th>
               </tr>
             </thead>
             <tbody className="text-sm">
               {paginatedLots.length > 0 ? paginatedLots.map(l => (
                 <React.Fragment key={l.id}>
                   <tr className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                     <td className="py-4 px-6">
                        <p className="font-black text-gray-900 text-base">Mza {l.block} <span className="text-gray-400 font-normal ml-1">Lote {l.lotNumber}</span></p>
                        <p className="text-xs text-gray-500 mt-0.5">Riveras de Pucheta</p>
                     </td>
                     <td className="py-4 px-6 text-gray-600 font-medium">{l.surface} m²</td>
                     <td className="py-4 px-6 font-black text-gray-900">${l.price.toLocaleString()}</td>
                     <td className="py-4 px-6">
                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-sm border ${
                         l.status === 'sold' ? 'bg-red-50 text-red-600 border-red-200' : 
                         l.status === 'reserved' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                         'bg-emerald-50 text-emerald-600 border-emerald-200'
                       }`}>
                         {l.status === 'sold' && <XCircle className="w-3 h-3 mr-1.5" />}
                         {l.status === 'reserved' && <AlertCircle className="w-3 h-3 mr-1.5" />}
                         {l.status === 'available' && <CheckCircle2 className="w-3 h-3 mr-1.5" />}
                         {l.status === 'sold' ? 'Vendido' : l.status === 'reserved' ? 'Reservado' : 'Disponible'}
                       </span>
                     </td>
                     <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => setEditingLotId(editingLotId === l.id ? null : l.id)} 
                          className={`p-2 rounded-lg transition-colors border ${editingLotId === l.id ? 'bg-[#EFC46C] text-black border-[#EFC46C]' : 'text-gray-400 hover:text-[#EFC46C] hover:bg-[#EFC46C]/10 border-transparent hover:border-[#EFC46C]/30'}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                     </td>
                   </tr>
                   
                   {/* Expanded details for editing */}
                   {editingLotId === l.id && (
                     <tr className="bg-gray-50/50">
                       <td colSpan={5} className="p-0 border-b border-gray-100">
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           className="p-6 border-l-4 border-[#EFC46C]"
                         >
                           <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-4">Información Detallada del Lote</h4>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div>
                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">Información del Cliente</h5>
                                {l.clientName || l.status !== 'available' ? (
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Nombre Completo</p>
                                      <p className="font-medium text-gray-900">{l.clientName || 'Pendiente de Registro'}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Documento</p>
                                        <p className="font-medium text-gray-900">{l.clientDocument || 'No registrado'}</p>
                                      </div>
                                      <div>
                                        <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Teléfono</p>
                                        <p className="font-medium text-gray-900">{l.clientPhone || 'No registrado'}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Correo Electrónico</p>
                                      <p className="font-medium text-gray-900">{l.clientEmail || 'No registrado'}</p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center h-24 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                                    <p className="text-sm font-medium text-gray-400 italic">
                                      Lote disponible, sin cliente asignado.
                                    </p>
                                  </div>
                                )}
                             </div>
                             
                             <div>
                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">Fechas y Transacción</h5>
                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
                                  <div className="flex justify-between items-center">
                                    <p className="text-xs font-bold text-gray-500 uppercase">Estado Actual</p>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                                      l.status === 'sold' ? 'bg-red-50 text-red-600' : 
                                      l.status === 'reserved' ? 'bg-amber-50 text-amber-600' : 
                                      'bg-emerald-50 text-emerald-600'
                                    }`}>
                                      {l.status === 'sold' ? 'Vendido' : l.status === 'reserved' ? 'Reservado' : 'Disponible'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                                    <p className="text-xs font-bold text-gray-500 uppercase">Reserva</p>
                                    <p className="font-medium text-gray-900 text-sm">{l.reservationDate || (l.status !== 'available' ? 'Pendiente' : '-')}</p>
                                  </div>
                                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                                    <p className="text-xs font-bold text-gray-500 uppercase">Venta</p>
                                    <p className="font-medium text-gray-900 text-sm">{l.saleDate || (l.status === 'sold' ? 'Pendiente' : '-')}</p>
                                  </div>
                                </div>
                             </div>
                           </div>
                           
                           <div className="mt-6 flex justify-end gap-3">
                             <button onClick={() => setEditingLotId(null)} className="px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-gray-50 transition-colors">
                               Cerrar Detalles
                             </button>
                           </div>
                         </motion.div>
                       </td>
                     </tr>
                   )}
                 </React.Fragment>
               )) : (
                 <tr>
                   <td colSpan={5} className="py-12 text-center text-gray-500 font-medium">
                     No se encontraron lotes para los filtros seleccionados.
                   </td>
                 </tr>
               )}
             </tbody>
           </table>
         </div>

         {/* Pagination Controls */}
         {totalPages > 1 && (
           <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
             <div className="text-xs font-medium text-gray-500">
               Mostrando {Math.min(filteredLots.length, (currentPage - 1) * itemsPerPage + 1)} al {Math.min(filteredLots.length, currentPage * itemsPerPage)} de {filteredLots.length} lotes
             </div>
             <div className="flex items-center space-x-2">
               <button
                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                 disabled={currentPage === 1}
                 className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 <ChevronLeft className="w-4 h-4" />
               </button>
               <span className="text-xs font-bold px-2 py-1 bg-white border border-gray-200 rounded-md">
                 Página {currentPage} de {totalPages}
               </span>
               <button
                 onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                 disabled={currentPage === totalPages}
                 className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 <ChevronRight className="w-4 h-4" />
               </button>
             </div>
           </div>
         )}
      </div>
      </>
     ) : (
       <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex-grow relative min-h-[600px]">
          <InteractiveMasterplan lotsProp={lots} />
       </div>
     )}
    </motion.div>
  );
}
