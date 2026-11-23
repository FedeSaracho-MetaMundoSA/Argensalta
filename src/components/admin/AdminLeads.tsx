import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Search, Mail, Phone, Calendar, Trash2, ShieldCheck, CheckCircle2, Clock, Check, X, ExternalLink, Globe } from "lucide-react";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  // Real-time Firestore sync
  useEffect(() => {
    setLoading(true);
    try {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const leadsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLeads(leadsData);
        setLoading(false);

        // Auto-select first lead if none selected
        if (leadsData.length > 0 && !selectedLead) {
          // Keep it simple, or select on demand
        }
      }, (error) => {
        console.error("Error fetching leads from Firestore:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Firestore leads collection setup error:", error);
      setLoading(false);
    }
  }, []);

  const handleUpdateStatus = async (leadId: string, newStatus: "new" | "contacted" | "closed") => {
    try {
      const leadRef = doc(db, "leads", leadId);
      await updateDoc(leadRef, { status: newStatus });
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
      alert("Error al actualizar el estado del lead.");
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este lead del CRM?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "leads", leadId));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Error al eliminar el lead.");
    }
  };

  // Filter and search
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (lead.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (lead.phone?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (lead.message?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (lead.source?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Count active new leads
  const newLeadsCount = leads.filter(l => l.status === "new").length;

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wider flex items-center">
            <MessageSquare className="w-6 h-6 mr-3 text-[#EFC46C]" /> Bandeja de Leads CRM
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Gestión y seguimiento de prospectos capturados desde argensaltapropiedades.com.ar y WordPress.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EFC46C]/50 focus:border-[#EFC46C] text-xs font-bold uppercase bg-white text-gray-700"
          >
            <option value="all">Todos los Estados ({leads.length})</option>
            <option value="new">Nuevos ({leads.filter(l => l.status === "new").length})</option>
            <option value="contacted">Contactados ({leads.filter(l => l.status === "contacted").length})</option>
            <option value="closed">Cerrados ({leads.filter(l => l.status === "closed").length})</option>
          </select>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar lead..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EFC46C]/50 focus:border-[#EFC46C] transition-all bg-gray-50 uppercase text-xs font-bold"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Leads List */}
        <div className="md:col-span-1 border border-gray-100 bg-white rounded-3xl shadow-xl overflow-hidden h-[600px] flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Contactos ({filteredLeads.length})
            </span>
            {newLeadsCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse uppercase">
                {newLeadsCount} Nuevos
              </span>
            )}
          </div>
          
          <div className="overflow-y-auto flex-grow p-2 space-y-2">
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-[#EFC46C]/30 border-t-[#EFC46C] rounded-full animate-spin"></div>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center p-8 text-gray-400 text-sm">
                No se encontraron leads con los filtros actuales.
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <motion.button
                  key={lead.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedLead(lead)}
                  className={`w-full text-left p-4 rounded-2xl flex flex-col gap-2 transition-colors border ${
                    selectedLead?.id === lead.id
                      ? "bg-gray-900 text-white shadow-xl border-gray-900"
                      : "bg-white hover:bg-gray-50 border-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="font-bold uppercase tracking-tight text-sm truncate max-w-[70%]">
                      {lead.name}
                    </span>
                    
                    {/* Status Badge */}
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                      lead.status === "new"
                        ? "bg-red-100 text-red-700"
                        : lead.status === "contacted"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {lead.status === "new" ? "Nuevo" : lead.status === "contacted" ? "Contactado" : "Cerrado"}
                    </span>
                  </div>

                  <p className={`text-xs truncate ${selectedLead?.id === lead.id ? "text-gray-400" : "text-gray-500"}`}>
                    {lead.email}
                  </p>

                  <div className="flex justify-between items-center w-full pt-1 border-t border-gray-100/10 text-[10px] text-gray-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {lead.source || "Web"}
                    </span>
                    <span>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Lead Detailed Card */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            {selectedLead ? (
              <motion.div
                key={selectedLead.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-[600px] flex flex-col relative"
              >
                {/* Header Background */}
                <div className="h-28 bg-gradient-to-r from-gray-900 via-gray-800 to-black relative flex items-center px-8 text-white">
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/10 rounded-full p-2 backdrop-blur-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-wider">{selectedLead.name}</h3>
                    <p className="text-gray-400 text-xs font-mono mt-1">ID Lead: {selectedLead.id}</p>
                  </div>
                </div>

                {/* Main Lead Details Panel */}
                <div className="flex-grow overflow-y-auto p-8 space-y-6 bg-gray-50/30">
                  
                  {/* Status Action bar */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Estado de Seguimiento</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`w-3 h-3 rounded-full ${
                          selectedLead.status === "new" ? "bg-red-500" : selectedLead.status === "contacted" ? "bg-amber-500" : "bg-emerald-500"
                        }`} />
                        <span className="text-sm font-bold text-gray-800 uppercase tracking-widest">
                          {selectedLead.status === "new" ? "Nuevo Lead Sin Contactar" : selectedLead.status === "contacted" ? "En Contacto / Negociación" : "Cerrado / Finalizado"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, "new")}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                          selectedLead.status === "new" 
                            ? "bg-red-500 text-white border-red-500 shadow-md" 
                            : "bg-white hover:bg-red-50 text-red-500 border-red-100"
                        }`}
                      >
                        Nuevo
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, "contacted")}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                          selectedLead.status === "contacted" 
                            ? "bg-amber-500 text-white border-amber-500 shadow-md" 
                            : "bg-white hover:bg-amber-50 text-amber-500 border-amber-100"
                        }`}
                      >
                        Contactado
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, "closed")}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                          selectedLead.status === "closed" 
                            ? "bg-emerald-500 text-white border-emerald-500 shadow-md" 
                            : "bg-white hover:bg-emerald-50 text-emerald-500 border-emerald-100"
                        }`}
                      >
                        Cerrado
                      </button>
                    </div>
                  </div>

                  {/* Info Blocks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Email de Contacto</p>
                        <a href={`mailto:${selectedLead.email}`} className="text-gray-900 font-bold hover:underline break-all">
                          {selectedLead.email}
                        </a>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Teléfono / WhatsApp</p>
                        <p className="text-gray-900 font-bold">{selectedLead.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Fecha de Recepción</p>
                        <p className="text-gray-900 font-bold">
                          {new Date(selectedLead.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                      <Globe className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Origen / Landing</p>
                        <p className="text-gray-900 font-bold uppercase text-xs">{selectedLead.source || "argensaltapropiedades.com.ar"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Message / Consultation Text */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Consulta Recibida</p>
                    <div className="p-4 bg-gray-50 rounded-xl text-gray-700 font-light text-sm leading-relaxed border border-gray-150 min-h-[80px] whitespace-pre-wrap">
                      {selectedLead.message || "Este lead no especificó un mensaje adicional."}
                    </div>
                  </div>
                </div>

                {/* Footer Actions: Contact on WhatsApp, Delete */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center gap-4">
                  {/* WhatsApp contact redirect */}
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-grow bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl shadow-md text-center flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    <Phone className="w-4 h-4 fill-white" /> Contactar por WhatsApp <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 p-4 rounded-xl border border-red-100 transition-colors shadow-sm"
                    title="Eliminar lead"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 h-[600px] flex items-center justify-center flex-col p-12 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-bl-[100%] pointer-events-none"></div>
                <MessageSquare className="w-20 h-20 text-gray-200 mb-6" />
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">Seleccione un Lead</h3>
                <p className="text-gray-500 max-w-sm">
                  Visualice el contenido completo del formulario, cambie el estado de seguimiento o contacte directamente a través de WhatsApp en un clic.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
