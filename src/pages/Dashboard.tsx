import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, User as UserIcon, Calendar, CircleDollarSign, TrendingUp, AlertCircle, Plus, Info, Users, Database, LayoutDashboard, Map as MapIcon, Settings, MessageSquare, Home as HomeIcon, FileText, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { LocalDB } from '../lib/localDb';

import AdminStock from '../components/admin/AdminStock';
import AdminFinances from '../components/admin/AdminFinances';
import AdminUsers from '../components/admin/AdminUsers';
import AdminSettings from '../components/admin/AdminSettings';
import AdminMasterplans from '../components/admin/AdminMasterplans';
import AdminTransparency from '../components/admin/AdminTransparency';
import AdminLeads from '../components/admin/AdminLeads';
import ClientLots from '../components/client/ClientLots';
import ClientPayments from '../components/client/ClientPayments';
import ClientDocuments from '../components/client/ClientDocuments';
import ClientSupport from '../components/client/ClientSupport';
import WhatsAppContactButton from '../components/WhatsAppContactButton';

export default function Dashboard() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [worksProgress, setWorksProgress] = useState({
    riveras_calles: 85,
    riveras_luz: 70,
    riveras_agua: 95,
    riveras_cerco: 60,
    borromeo_calles: 90,
    borromeo_luz: 45,
    borromeo_agua: 80,
    borromeo_cerco: 30,
  });
  const [newLeadsCount, setNewLeadsCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('argensalta_transparency_works');
    if (saved) {
      try {
        setWorksProgress(JSON.parse(saved));
      } catch (err) {}
    }
  }, []);
  
  const {
    lots, setLots,
    payments, setPayments,
    totalUsers, setTotalUsers,
    isLoading, setIsLoading,
    activeTab, setActiveTab
  } = useAppStore();

  // Firestore real-time queries + LocalDB robust fallback integration
  useEffect(() => {
    if (!user) return;

    // Load from LocalDB first to guarantee instantaneous premium loading and offline persistence
    const localLots = LocalDB.getLots();
    const localPayments = LocalDB.getPayments();
    const localUsers = LocalDB.getUsers();

    if (profile?.role === 'admin') {
      setLots(localLots);
      setTotalUsers(localUsers.length);
      setPayments(localPayments);
      setIsLoading(false);

      // Attempt real-time Firebase sync in the background if configured
      try {
        const qLots = query(collection(db, 'lots'));
        const unLots = onSnapshot(qLots, (snapshot) => {
          if (!snapshot.empty) {
            const fbLots = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLots(fbLots);
            // Sync to LocalDB so it stays updated
            fbLots.forEach(l => LocalDB.saveLot(l as any));
          }
        }, (err) => console.warn("Firebase lots sync bypass (using LocalDB):", err));

        // Sync leads count in real-time
        const qLeads = query(collection(db, 'leads'), where('status', '==', 'new'));
        const unLeads = onSnapshot(qLeads, (snapshot) => {
          setNewLeadsCount(snapshot.size);
        }, (err) => console.warn("Firebase leads sync bypass:", err));

        getDocs(collection(db, 'users'))
          .then(snap => {
            if (!snap.empty) {
              setTotalUsers(snap.size);
            }
          })
          .catch(err => console.warn("Firebase users sync bypass (using LocalDB):", err));

        return () => {
          unLots();
          unLeads();
        };
      } catch (err) {
        console.warn("Firebase background connection failed. Running in 100% cloud-free LocalDB mode.");
      }
    } else {
      // Client queries - filter by logged-in client UID (or Demo Client UID)
      const isDemo = user.uid === 'local-client-uid-456' || user.email === 'propietario@argensalta.com';
      const filterUid = isDemo ? 'local-client-uid-456' : user.uid;
      
      const clientLots = localLots.filter(l => l.clientId === filterUid);
      const clientPayments = localPayments.filter(p => p.userId === filterUid);
      
      setLots(clientLots);
      setPayments(clientPayments);
      setIsLoading(false);

      try {
        const qPayments = query(collection(db, 'payments'), where('userId', '==', filterUid));
        const unPayments = onSnapshot(qPayments, (snapshot) => {
          if (!snapshot.empty) {
            const fbPayments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPayments(fbPayments);
          }
        }, (err) => console.warn("Firebase payments sync bypass:", err));

        const qLots = query(collection(db, 'lots'), where('clientId', '==', filterUid));
        const unLots = onSnapshot(qLots, (snapshot) => {
          if (!snapshot.empty) {
            const fbLots = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLots(fbLots);
          }
        }, (err) => console.warn("Firebase lots sync bypass:", err));

        return () => {
          unPayments();
          unLots();
        };
      } catch (err) {
        console.warn("Firebase client background connection failed. Running in 100% cloud-free LocalDB mode.");
      }
    }
  }, [user, profile, setLots, setPayments, setTotalUsers, setIsLoading]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  if (!user) return null;

  return (
    <div className="flex w-full min-h-screen bg-gray-50 flex-col md:flex-row font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] text-white flex flex-col shadow-2xl relative z-20 shrink-0">
        <div className="p-6 border-b border-white/10 flex items-center justify-center">
            <Link to="/" className="text-white font-serif font-bold text-center block leading-tight">
              PORTAL<br /><span className="text-[#EFC46C] tracking-widest text-lg">INVERSOR</span>
            </Link>
        </div>
        
        <div className="flex-grow p-4 flex flex-col space-y-2">
           <motion.button 
             whileHover={{ x: 5 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => setActiveTab('overview')}
             className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-[#EFC46C] text-black font-bold shadow-[0_0_15px_rgba(239,196,108,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
           >
             <LayoutDashboard className="w-5 h-5" />
             <span>Resumen</span>
           </motion.button>
           
           {profile?.role !== 'admin' && (
             <>
               <motion.button 
                 whileHover={{ x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setActiveTab('lots')}
                 className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'lots' ? 'bg-[#EFC46C] text-black font-bold shadow-[0_0_15px_rgba(239,196,108,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
               >
                 <MapIcon className="w-5 h-5" />
                 <span>Mis Lotes</span>
               </motion.button>
               <motion.button 
                 whileHover={{ x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setActiveTab('payments')}
                 className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'payments' ? 'bg-[#EFC46C] text-black font-bold shadow-[0_0_15px_rgba(239,196,108,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
               >
                 <CircleDollarSign className="w-5 h-5" />
                 <span>Pagos & Cuotas</span>
               </motion.button>
               <motion.button 
                 whileHover={{ x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setActiveTab('documents')}
                 className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'documents' ? 'bg-[#EFC46C] text-black font-bold shadow-[0_0_15px_rgba(239,196,108,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
               >
                 <FileText className="w-5 h-5" />
                 <span>Documentos Privados</span>
               </motion.button>
               <motion.button 
                 whileHover={{ x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setActiveTab('support')}
                 className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'support' ? 'bg-[#EFC46C] text-black font-bold shadow-[0_0_15px_rgba(239,196,108,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
               >
                 <MessageSquare className="w-5 h-5" />
                 <span>Soporte 24/7</span>
               </motion.button>
             </>
           )}
           
           {profile?.role === 'admin' && (
             <>
               <div className="mt-4 mb-2 px-4 text-[10px] font-black uppercase tracking-widest text-gray-600 border-t border-white/5 pt-4">Operaciones</div>
               
               <motion.button 
                 whileHover={{ x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setActiveTab('admin_lots')}
                 className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'admin_lots' ? 'bg-gradient-to-r from-[#EFC46C] to-[#DFA238] text-black font-bold shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
               >
                 <MapIcon className="w-5 h-5" />
                 <span>Control de Stock</span>
               </motion.button>

               <motion.button 
                 whileHover={{ x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setActiveTab('admin_finances')}
                 className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'admin_finances' ? 'bg-gradient-to-r from-[#EFC46C] to-[#DFA238] text-black font-bold shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
               >
                 <CircleDollarSign className="w-5 h-5" />
                 <span>Finanzas & Recibos</span>
               </motion.button>

               <div className="mt-4 mb-2 px-4 text-[10px] font-black uppercase tracking-widest text-gray-600 border-t border-white/5 pt-4">Gestión CRM</div>

               <motion.button 
                 whileHover={{ x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setActiveTab('admin_leads')}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'admin_leads' ? 'bg-gradient-to-r from-[#EFC46C] to-[#DFA238] text-black font-bold shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <MessageSquare className="w-5 h-5 animate-pulse text-[#EFC46C]" />
                  <span className="flex items-center justify-between w-full">
                    <span>Leads Web / WP</span>
                    {newLeadsCount > 0 && (
                      <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none animate-bounce">
                        {newLeadsCount}
                      </span>
                    )}
                  </span>
                </motion.button>

                <motion.button 
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('admin_users')}
                 className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'admin_users' ? 'bg-gradient-to-r from-[#EFC46C] to-[#DFA238] text-black font-bold shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
               >
                 <Users className="w-5 h-5" />
                 <span>Directorio de Clientes</span>
               </motion.button>
               <motion.button 
                 whileHover={{ x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setActiveTab('admin_masterplans')}
                 className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'admin_masterplans' ? 'bg-gradient-to-r from-[#EFC46C] to-[#DFA238] text-black font-bold shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
               >
                 <MapIcon className="w-5 h-5" />
                 <span>Gestionar Planos</span>
                </motion.button>
                <motion.button 
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('admin_transparency')}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'admin_transparency' ? 'bg-[#EFC46C] text-black font-bold shadow-[0_0_15px_rgba(239,196,108,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Auditoría de Transparencia</span>
               </motion.button>
               <motion.button 
                 whileHover={{ x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setActiveTab('admin_settings')}
                 className={`flex items-center space-x-3 px-4 py-3 mt-4 rounded-xl transition-colors ${activeTab === 'admin_settings' ? 'bg-white/10 text-white font-bold shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
               >
                 <Settings className="w-5 h-5" />
                 <span>Ajustes Avanzados</span>
               </motion.button>
             </>
           )}
        </div>

        <div className="p-4 border-t border-white/10 mt-auto flex flex-col space-y-3">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
             <HomeIcon className="w-5 h-5" />
             <span>Volver a la Web</span>
          </Link>
          <button 
             onClick={handleLogout}
             className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors w-full text-left font-bold"
          >
             <LogOut className="w-5 h-5" />
             <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT HEADER & BODY */}
      <main className="flex-grow flex flex-col relative overflow-hidden h-screen overflow-y-auto">
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200 p-6 flex justify-between items-center shadow-sm">
           <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-900 uppercase tracking-widest">
             {activeTab === 'overview' && 'Panel Principal'}
             {activeTab === 'lots' && 'Mis Propiedades'}
             {activeTab === 'payments' && 'Estado de Cuenta'}
             {activeTab === 'documents' && 'Bóveda Documental'}
             {activeTab === 'support' && 'Soporte Administrativo'}
             {activeTab === 'admin_lots' && 'Control de Stock'}
             {activeTab === 'admin_finances' && 'Finanzas & Facturación'}
             {activeTab === 'admin_leads' && 'Bandeja de Leads CRM'}
             {activeTab === 'admin_users' && 'Directorio de Clientes'}
             {activeTab === 'admin_masterplans' && 'Gestor de Planos'}
             {activeTab === 'admin_transparency' && 'Bóveda de Transparencia'}
             {activeTab === 'admin_settings' && 'Ajustes de Plataforma'}
           </h1>
           <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                 <p className="text-sm font-bold text-gray-900">{user.displayName}</p>
                 <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{profile?.role === 'admin' ? 'Administrador' : 'Inversor / Propietario'}</p>
              </div>
              <div className={`w-12 h-12 rounded-full p-0.5 bg-gradient-to-br shadow-md ${profile?.role === 'admin' ? 'from-purple-500 to-indigo-600' : 'from-[#EFC46C] to-[#8B4513]'}`}>
                <img src={user.photoURL || 'https://via.placeholder.com/64'} alt="Avatar" className="w-full h-full rounded-full border-2 border-white object-cover" />
              </div>
           </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 w-full">
               <div className="w-12 h-12 border-4 border-[#EFC46C]/30 border-t-[#EFC46C] rounded-full animate-spin shadow-lg"></div>
            </div>
          ) : profile?.role === 'admin' ? (
            /* ADMIN VIEW */
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center shadow-lg transition-shadow hover:shadow-xl">
                      <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl mr-4"><Users className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Clientes</h3>
                        <p className="text-3xl font-black text-gray-900">{totalUsers}</p>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center shadow-lg transition-shadow hover:shadow-xl">
                      <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl mr-4"><Database className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Lotes Vendidos</h3>
                        <p className="text-3xl font-black text-gray-900">{lots.filter(l => l.status === 'sold').length}</p>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center shadow-lg transition-shadow hover:shadow-xl">
                      <div className="p-4 bg-amber-50 text-amber-600 rounded-xl mr-4"><TrendingUp className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Progreso Obra</h3>
                        <p className="text-3xl font-black text-gray-900">45%</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-3xl shadow-2xl relative overflow-hidden text-white border border-gray-800">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#EFC46C]/10 rounded-bl-[100%] opacity-50 pointer-events-none"></div>
                    <h2 className="text-2xl font-black mb-4 uppercase tracking-wider">Bienvenido, Admin</h2>
                    <p className="text-gray-300 max-w-xl font-light leading-relaxed">
                      Utilice la barra lateral para acceder a la carga de lotes, registro de pagos y seguimiento CRM. 
                      Todo el sistema en la palma de su mano.
                    </p>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'admin_lots' && <AdminStock lots={lots} />}
              {activeTab === 'admin_finances' && <AdminFinances payments={payments} />}
              {activeTab === 'admin_leads' && <AdminLeads />}
              {activeTab === 'admin_users' && <AdminUsers totalUsersStat={totalUsers} />}
              {activeTab === 'admin_masterplans' && <AdminMasterplans />}
              {activeTab === 'admin_transparency' && <AdminTransparency />}
              {activeTab === 'admin_settings' && <AdminSettings />}
            </div>
          ) : (
            /* CLIENT VIEW */
            <div className="space-y-8">
              {activeTab === 'overview' && (
                <>
                  {lots.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-6">
                        {lots.map(lot => (
                          <motion.div 
                            key={lot.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:border-[#EFC46C]/30 transition-colors"
                          >
                            <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-[#EFC46C]/10 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:from-[#EFC46C]/20 transition-colors"></div>
                            
                            <div className="flex justify-between items-start mb-8 relative z-10">
                              <div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight drop-shadow-sm">Mza {lot.block} - Lote {lot.lotNumber}</h2>
                                <p className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-widest">Riveras de Pucheta</p>
                              </div>
                              <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100 shadow-sm flex items-center">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                                Activo
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 z-10 relative mb-8">
                              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Total</p>
                                <p className="text-2xl font-black text-gray-900">USD {lot.price}</p>
                              </div>
                              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
                                <p className="text-xs text-emerald-600 uppercase font-bold tracking-wider mb-2">Abonado</p>
                                <p className="text-2xl font-black text-emerald-700">USD {payments.filter(p => p.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0)}</p>
                              </div>
                              <div className="p-4 bg-red-50 rounded-2xl border border-red-100 shadow-sm">
                                <p className="text-xs text-red-600 uppercase font-bold tracking-wider mb-2">Saldo</p>
                                <p className="text-2xl font-black text-red-700">USD {lot.price - payments.filter(p => p.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0)}</p>
                              </div>
                              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm flex flex-col justify-center">
                                <p className="text-xs text-indigo-600 uppercase font-bold tracking-wider mb-1">Superficie</p>
                                <p className="text-xl font-bold text-indigo-900">{lot.surface} m²</p>
                              </div>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Progreso Estimado de Pagos</span>
                                  <span className="text-sm font-black text-gray-900">20%</span>
                                </div>
                                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                  <div className="h-full bg-gradient-to-r from-[#EFC46C] to-[#DFA238] rounded-full w-1/5 shadow-[0_0_15px_rgba(239,196,108,0.8)]"></div>
                                </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="space-y-6">
                        {/* Próximo Vencimiento */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gray-900 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden h-full min-h-[300px] border border-gray-800"
                        >
                          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                          {payments.filter(p => p.status === 'pending').length > 0 ? (
                            (() => {
                              const pending = payments.filter(p => p.status === 'pending').sort((a,b) => a.dueDate - b.dueDate)[0];
                              return (
                                <div className="relative z-10 flex flex-col justify-between h-full">
                                  <div>
                                    <h2 className="text-sm font-bold text-[#EFC46C] mb-6 uppercase tracking-widest flex items-center">
                                      <Calendar className="w-5 h-5 mr-3" /> Próxima Cuota
                                    </h2>
                                    <p className="text-5xl font-black mb-2 tracking-tighter drop-shadow-lg">USD {pending.amount}</p>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Cuota {pending.installmentNumber} de {pending.totalInstallments}</p>
                                  </div>
                                  <div className="bg-gradient-to-r from-red-600/30 to-transparent border-l-4 border-red-500 p-5 rounded-r-2xl mt-8 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                                     <div className="flex items-center text-red-400 font-bold mb-2 text-sm uppercase tracking-wider">
                                       <AlertCircle className="w-4 h-4 mr-2" /> Vence en breve
                                     </div>
                                     <p className="text-2xl text-white font-black">{new Date(pending.dueDate).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              );
                            })()
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center h-full relative z-10 py-12">
                              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                                <Calendar className="w-10 h-10 text-gray-500" />
                              </div>
                              <p className="text-gray-300 font-bold text-xl mb-2">Su cuenta está al día.</p>
                              <p className="text-sm text-gray-500">No registramos cuotas pendientes para este período.</p>
                            </div>
                          )}
                        </motion.div>

                        {/* Avances de Obra en Tiempo Real */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-white p-6 rounded-3xl shadow-xl border border-gray-150 relative overflow-hidden"
                        >
                          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                            <h2 className="text-xs uppercase tracking-widest font-black text-gray-500 flex items-center">
                              <ShieldCheck className="w-4 h-4 text-[#EFC46C] mr-2" /> Avance de Obras Oficial
                            </h2>
                            <span className="text-[10px] bg-emerald-100 text-emerald-850 font-bold px-2 py-0.5 rounded uppercase font-mono">
                              ACTIVO Y REAL
                            </span>
                          </div>

                          <div className="space-y-4">
                            {/* Project Riveras de Pucheta */}
                            <div>
                              <p className="text-xs font-black text-gray-900 uppercase tracking-tight mb-2">Riveras de Pucheta (La Caldera)</p>
                              <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-600">
                                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                  <span className="block text-zinc-400 uppercase font-black">Calles</span>
                                  <span className="text-sm font-bold text-gray-800">{worksProgress.riveras_calles}%</span>
                                </div>
                                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                  <span className="block text-zinc-400 uppercase font-black">Tendido Eléctrico</span>
                                  <span className="text-sm font-bold text-gray-800">{worksProgress.riveras_luz}%</span>
                                </div>
                                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                  <span className="block text-zinc-400 uppercase font-black">Agua Potable</span>
                                  <span className="text-sm font-bold text-gray-800">{worksProgress.riveras_agua}%</span>
                                </div>
                                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                  <span className="block text-zinc-400 uppercase font-black">Cerco y Accesos</span>
                                  <span className="text-sm font-bold text-gray-800">{worksProgress.riveras_cerco}%</span>
                                </div>
                              </div>
                            </div>

                            {/* Project Don Borromeo */}
                            <div className="pt-2 border-t border-gray-100">
                              <p className="text-xs font-black text-gray-900 uppercase tracking-tight mb-2">Don Borromeo (San Carlos)</p>
                              <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-600">
                                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                  <span className="block text-zinc-400 uppercase font-black">Compactación Calles</span>
                                  <span className="text-sm font-bold text-gray-800">{worksProgress.borromeo_calles}%</span>
                                </div>
                                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                  <span className="block text-zinc-400 uppercase font-black">Tendido de Red</span>
                                  <span className="text-sm font-bold text-gray-800">{worksProgress.borromeo_luz}%</span>
                                </div>
                                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                  <span className="block text-zinc-400 uppercase font-black">Agua de Red</span>
                                  <span className="text-sm font-bold text-gray-800">{worksProgress.borromeo_agua}%</span>
                                </div>
                                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                  <span className="block text-zinc-400 uppercase font-black">Pórtico y Paisaje</span>
                                  <span className="text-sm font-bold text-gray-800">{worksProgress.borromeo_cerco}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 text-center relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 w-80 h-80 bg-[#EFC46C]/10 rounded-bl-[100%]"></div>
                       <div className="relative z-10 max-w-xl mx-auto">
                         <div className="w-28 h-28 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-gray-200">
                           <Info className="w-14 h-14 text-[#EFC46C]" />
                         </div>
                         <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter drop-shadow-sm">Aún no cuentas con propiedades vinculadas</h2>
                         <p className="text-gray-500 mb-10 font-light text-lg leading-relaxed">Contacta a tu asesor comercial para que asocie tu reserva de lote a este panel. Aquí podrás realizar el seguimiento de tus pagos, visualizar planos y mucho más.</p>
                         <a href="https://wa.me/5493875557009" target="_blank" rel="noreferrer" className="inline-flex px-10 py-5 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95">
                           Contactar Asesor Comercial
                         </a>
                       </div>
                    </motion.div>
                  )}
                </>
              )}

              {activeTab === 'lots' && <ClientLots lots={lots} />}
              {activeTab === 'payments' && <ClientPayments payments={payments} />}
              {activeTab === 'documents' && <ClientDocuments />}
              {activeTab === 'support' && <ClientSupport />}
            </div>
          )}

        </div>
      </main>
      <WhatsAppContactButton />
    </div>
  );
}
