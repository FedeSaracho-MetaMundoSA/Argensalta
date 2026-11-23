import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Search, Mail, Phone, MapPin, MoreVertical, Edit2, ShieldCheck, Database, X } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { LocalDB } from '../../lib/localDb';

export default function AdminUsers({ totalUsersStat }: { totalUsersStat?: number }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      // Always load from local database first
      const localUsers = LocalDB.getUsers();
      setUsers(localUsers);
      setLoading(false);

      try {
        const snap = await getDocs(collection(db, 'users'));
        if (!snap.empty) {
          const usersData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUsers(usersData);
          // Keep local sync updated
          usersData.forEach(u => LocalDB.saveUser(u as any));
        }
      } catch (error) {
        console.warn("Bypassing Firebase users fetch, using LocalDB:", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    (u.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wider flex items-center">
             <Users className="w-6 h-6 mr-3 text-[#EFC46C]" /> Directorio CRM
          </h2>
          <p className="text-gray-500 text-sm mt-1">Gestión de inversores, prospectos y asignación de lotes.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EFC46C]/50 focus:border-[#EFC46C] transition-all bg-gray-50 uppercase text-xs font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col: Users List */}
        <div className="md:col-span-1 border border-gray-100 bg-white rounded-3xl shadow-xl overflow-hidden h-[600px] flex flex-col">
           <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Inversores ({filteredUsers.length})</span>
           </div>
           <div className="overflow-y-auto flex-grow p-2 space-y-2">
             {loading ? (
               <div className="flex justify-center p-8"><div className="w-8 h-8 border-4 border-[#EFC46C]/30 border-t-[#EFC46C] rounded-full animate-spin"></div></div>
             ) : (
               filteredUsers.map(u => (
                 <motion.button
                   key={u.id}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => setSelectedUser(u)}
                   className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-colors ${selectedUser?.id === u.id ? 'bg-gray-900 text-white shadow-xl' : 'bg-white hover:bg-gray-50 border border-gray-100 text-gray-900'}`}
                 >
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${selectedUser?.id === u.id ? 'bg-white/20 text-white' : 'bg-[#EFC46C]/20 text-[#8B4513]'}`}>
                     {u.name ? u.name.charAt(0).toUpperCase() : u.email?.charAt(0).toUpperCase()}
                   </div>
                   <div className="overflow-hidden">
                     <p className="font-bold truncate">{u.name || 'Usuario SF'}</p>
                     <p className={`text-xs truncate ${selectedUser?.id === u.id ? 'text-gray-400' : 'text-gray-500'}`}>{u.email}</p>
                   </div>
                   {u.role === 'admin' && (
                     <ShieldCheck className={`w-4 h-4 ml-auto shrink-0 ${selectedUser?.id === u.id ? 'text-[#EFC46C]' : 'text-indigo-500'}`} />
                   )}
                 </motion.button>
               ))
             )}
           </div>
        </div>

        {/* Right Col: User Details */}
        <div className="md:col-span-2">
           <AnimatePresence mode="wait">
             {selectedUser ? (
               <motion.div 
                 key={selectedUser.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-[600px] flex flex-col relative"
               >
                  <div className="h-32 bg-gradient-to-r from-gray-900 via-gray-800 to-black relative">
                    <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/10 rounded-full p-2 backdrop-blur-md">
                      <X className="w-5 h-5" />
                    </button>
                    <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-full p-1 shadow-2xl">
                       <div className="w-full h-full rounded-full bg-gradient-to-br from-[#EFC46C] to-[#8B4513] flex items-center justify-center text-3xl font-black text-white">
                         {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : selectedUser.email?.charAt(0).toUpperCase()}
                       </div>
                    </div>
                  </div>
                  
                  <div className="pt-16 pb-6 px-8 border-b border-gray-100 flex justify-between items-start">
                     <div>
                       <h3 className="text-2xl font-black text-gray-900">{selectedUser.name || 'Usuario SF'}</h3>
                       <p className="text-gray-500 font-medium mt-1">{selectedUser.email}</p>
                       <div className="flex gap-2 mt-3">
                         <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-600">ID: {selectedUser.id.substring(0,8)}</span>
                         <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${selectedUser.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                           {selectedUser.role === 'admin' ? 'Administrador' : 'Inversor'}
                         </span>
                       </div>
                     </div>
                     <button className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 shadow-sm">
                       <Edit2 className="w-5 h-5" />
                     </button>
                  </div>

                  <div className="flex-grow overflow-y-auto p-8 space-y-8 bg-gray-50/30">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                           <Phone className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                           <div>
                             <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Teléfono</p>
                             <p className="text-gray-900 font-medium">{selectedUser.phone || 'No registrado'}</p>
                           </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                           <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                           <div>
                             <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Dirección</p>
                             <p className="text-gray-900 font-medium">{selectedUser.address || 'No registrada'}</p>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center border-b border-gray-200 pb-2">
                          <Database className="w-4 h-4 mr-2" /> Propiedades Vinculadas
                        </h4>
                        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-inner">
                           {/* Fetch user's lots dynamically ideally, mocked UI for now */}
                           <p className="text-gray-500 text-sm">Este panel integrará próximamente el historial completo de propiedades y boletos asociados a este cliente.</p>
                           <button className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-colors">Vincular Propiedad</button>
                        </div>
                     </div>
                  </div>
               </motion.div>
             ) : (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="bg-white rounded-3xl shadow-xl border border-gray-100 h-[600px] flex items-center justify-center flex-col p-12 text-center relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-bl-[100%] pointer-events-none"></div>
                  <Users className="w-20 h-20 text-gray-200 mb-6" />
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">Seleccione un Inversor</h3>
                  <p className="text-gray-500">Visualice en detalle la información de contacto, propiedades vinculadas y estado de cuenta.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
