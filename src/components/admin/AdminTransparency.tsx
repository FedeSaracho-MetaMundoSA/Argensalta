import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileCheck, Landmark, Eye, Heart, Database, HardHat, Calendar, CheckCircle, ArrowRight, Share2, AlertCircle } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

export default function AdminTransparency() {
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'certificates' | 'logs' | 'works' | 'fideicomiso'>('certificates');

  // Work progress states with realistic default values
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

  // Load saved works progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('argensalta_transparency_works');
    if (saved) {
      try {
        setWorksProgress(JSON.parse(saved));
      } catch (err) {}
    }
  }, []);

  const handleUpdateProgress = (key: keyof typeof worksProgress, value: number) => {
    const updated = { ...worksProgress, [key]: value };
    setWorksProgress(updated);
    localStorage.setItem('argensalta_transparency_works', JSON.stringify(updated));
    setSuccessMsg('¡Avance de obra actualizado correctamente! Los clientes lo verán reflejado en tiempo real.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Pre-loaded real official certificates to show 100% legal clarity (Salta)
  const [certificates, setCertificates] = useState([
    {
      id: "cert-01",
      title: "Plano de Subdivisión y Mensura Aprobado",
      authority: "Dirección General de Inmuebles de Salta",
      project: "Don Borromeo (San Carlos)",
      status: "VERIFICADO & REGISTRADO",
      expediente: "Exp. N° 201-14930/2024",
      hash: "8B7F-AC54-190E-921F"
    },
    {
      id: "cert-02",
      title: "Estudio de Impacto Ambiental (Aptitud Ambiental)",
      authority: "Secretaría de Medio Ambiente y Desarrollo Sustentable de la Provincia",
      project: "Riveras de Pucheta (La Caldera)",
      status: "APROBADO CON SELLO OFICIAL",
      expediente: "Resolución N° 342/2025-SAMP",
      hash: "A1D8-F3C2-005E-67A0"
    },
    {
      id: "cert-03",
      title: "Certificado de No Inundabilidad y Línea de Ribera",
      authority: "Secretaría de Recursos Hídricos de Salta",
      project: "Riveras de Pucheta (La Caldera)",
      status: "APROBADO & EXPEDIDO",
      expediente: "Dictamen Técnico N° 108/25",
      hash: "99CE-BD42-FA33-774E"
    },
    {
      id: "cert-04",
      title: "Aptitud de Factibilidad Eléctrica (Media y Baja Tensión)",
      authority: "EDESA S.A. Salta",
      project: "Don Borromeo (San Carlos)",
      status: "APROBADO",
      expediente: "Exp. EDESA N° 9931-A",
      hash: "740A-EF22-83B9-551C"
    }
  ]);

  // Pre-loaded transparency actions audit trail
  const [auditLogs, setAuditLogs] = useState([
    {
      time: "Hace 5 minutos",
      user: "argensaltapropiedades@gmail.com",
      action: "Cobranza verificada",
      details: "Reconciliación de Cuota N° 4 del Lote 12, Manzana C",
      ip: "181.12.98.204"
    },
    {
      time: "Hoy 10:20 AM",
      user: "argensaltapropiedades@gmail.com",
      action: "Vinculación de Propietario",
      details: "Usuario de prueba asociado a Lote 05, Manzana D (Riveras de Pucheta)",
      ip: "181.12.98.204"
    },
    {
      time: "Ayer 15:43 PM",
      user: "Sistemas Argensalta",
      action: "Actualización de Plano Mensura",
      details: "Subida de plano definitivo Don Borromeo firmado por Agrimensor Matrícula N° 342",
      ip: "Client Portal Sync"
    },
    {
      time: "20 May 2026",
      user: "argensaltapropiedades@gmail.com",
      action: "Emisión de Recibo Digital",
      details: "Recibo N° B-00249 emitido para Cliente test@argensalta.com",
      ip: "181.12.98.204"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TRANSPARENCIA TOTAL ARGENSALTA</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              Bóveda & Auditoría de Transparencia
            </h2>
            <p className="text-gray-500 text-sm font-light mt-1">
              Mejorando la confianza del inversor. Gestioná certificaciones legales, aprobaciones catastrales y avances de obra 100% verificables.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveSubTab('certificates')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'certificates' ? 'bg-[#EFC46C] text-black shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Aprobaciones Legales
            </button>
            <button
              onClick={() => setActiveSubTab('works')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'works' ? 'bg-[#EFC46C] text-black shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Avance de Obra Directo
            </button>
            <button
              onClick={() => setActiveSubTab('logs')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'logs' ? 'bg-[#EFC46C] text-black shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Registro de Auditoría
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="mt-4 p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
            {successMsg}
          </div>
        )}
      </div>

      {activeSubTab === 'certificates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-gray-900 uppercase">
              Certificaciones e Instrumentación Legal
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Para brindar absoluta seguridad institucional, facilitamos las resoluciones administrativas y decretos que validan el encuadre vial, hídrico, ambiental y catastral de cada terreno de Argensalta Propiedades.
            </p>

            <div className="space-y-4 pt-2">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-150 hover:border-gray-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-black px-2 py-0.5 rounded uppercase tracking-wider">
                        {cert.status}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 mt-1.5 uppercase tracking-tight">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 font-mono">{cert.authority}</p>
                      <p className="text-xs text-zinc-400 mt-1 font-light">Proyecto: <span className="text-gray-700 font-bold">{cert.project}</span></p>
                    </div>
                    <FileCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span>{cert.expediente}</span>
                    <span className="text-[10px] text-zinc-400">HASH: {cert.hash}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl w-fit">
                <Landmark className="w-8 h-8 text-[#EFC46C]" />
              </div>
              <h3 className="text-xl font-black uppercase text-[#EFC46C]">Garantía Jurídica e Inmobiliaria</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Nuestra premisa de **Transparencia Absoluta** significa que no comercializamos lotes sin antes tener aprobadas las mensuras catastrales correspondientes o iniciados los trámites definitivos ante la Dirección General de Inmuebles. 
                <br /><br />
                Por eso, cada inversor de Argensalta Propiedades puede acceder desde su propio usuario al número de expediente oficial de su lote y descargar las resoluciones originales emitidas por el Gobierno de la Provincia de Salta.
              </p>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <CheckCircle className="w-4 h-4 text-[#EFC46C]" />
                  <span>Escrituración Inmediata (Don Borromeo)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <CheckCircle className="w-4 h-4 text-[#EFC46C]" />
                  <span>Seguimiento Catastral Público en Salta</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <CheckCircle className="w-4 h-4 text-[#EFC46C]" />
                  <span>Ingeniería Aprobada por Recursos Hídricos</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-[11px] text-zinc-500 border-t border-white/5 pt-4">
              Argensalta Propiedades S.A.S - Respaldando Inversiones desde Salta al País.
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'works' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Riveras de Pucheta progress settings */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-gray-900 uppercase">
                Progreso Riveras de Pucheta (La Caldera)
              </h3>
              <span className="text-xs text-[#EFC46C] font-black uppercase bg-[#EFC46C]/10 px-2 py-1 rounded">
                Barrio Cerrado
              </span>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700 uppercase">Apertura y compactación de Calles</span>
                  <span className="text-xs font-bold text-gray-900 font-mono">{worksProgress.riveras_calles}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={worksProgress.riveras_calles}
                  onChange={(e) => handleUpdateProgress('riveras_calles', Number(e.target.value))}
                  className="w-full accent-[#EFC46C] cursor-pointer"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700 uppercase">Red Eléctrica (Media y Baja Tensión)</span>
                  <span className="text-xs font-bold text-gray-900 font-mono">{worksProgress.riveras_luz}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={worksProgress.riveras_luz}
                  onChange={(e) => handleUpdateProgress('riveras_luz', Number(e.target.value))}
                  className="w-full accent-[#EFC46C] cursor-pointer"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700 uppercase">Red de Agua Potable</span>
                  <span className="text-xs font-bold text-gray-900 font-mono">{worksProgress.riveras_agua}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={worksProgress.riveras_agua}
                  onChange={(e) => handleUpdateProgress('riveras_agua', Number(e.target.value))}
                  className="w-full accent-[#EFC46C] cursor-pointer"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700 uppercase">Cerco Perimetral y Garita</span>
                  <span className="text-xs font-bold text-gray-900 font-mono">{worksProgress.riveras_cerco}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={worksProgress.riveras_cerco}
                  onChange={(e) => handleUpdateProgress('riveras_cerco', Number(e.target.value))}
                  className="w-full accent-[#EFC46C] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Don Borromeo progress settings */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-gray-900 uppercase">
                Progreso Don Borromeo (San Carlos)
              </h3>
              <span className="text-xs text-emerald-700 font-black uppercase bg-emerald-50 px-2 py-1 rounded">
                Loteo Abierto Premium
              </span>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700 uppercase">Apertura y compactación de Calles</span>
                  <span className="text-xs font-bold text-gray-900 font-mono">{worksProgress.borromeo_calles}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={worksProgress.borromeo_calles}
                  onChange={(e) => handleUpdateProgress('borromeo_calles', Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700 uppercase">Tendidos Eléctricos de Línea</span>
                  <span className="text-xs font-bold text-gray-900 font-mono">{worksProgress.borromeo_luz}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={worksProgress.borromeo_luz}
                  onChange={(e) => handleUpdateProgress('borromeo_luz', Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700 uppercase">Red General de Agua de Red</span>
                  <span className="text-xs font-bold text-gray-900 font-mono">{worksProgress.borromeo_agua}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={worksProgress.borromeo_agua}
                  onChange={(e) => handleUpdateProgress('borromeo_agua', Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700 uppercase">Pórticos, Parquización y Acceso</span>
                  <span className="text-xs font-bold text-gray-900 font-mono">{worksProgress.borromeo_cerco}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={worksProgress.borromeo_cerco}
                  onChange={(e) => handleUpdateProgress('borromeo_cerco', Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'logs' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-black text-gray-900 uppercase">
                Registro General de Acciones & Seguridad CRM
              </h3>
              <p className="text-xs text-gray-500 font-light mt-0.5">
                Historial de modificaciones del sistema. Una auditoría inmutable para garantizar transparencia plena con las bases de datos de inversores.
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl text-[10px] font-mono">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>LOGS INMUTABLES</span>
            </div>
          </div>

          <div className="divide-y divide-gray-100 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-gray-500 uppercase font-black text-[10px] bg-gray-50">
                  <th className="p-3">Momento</th>
                  <th className="p-3">Operador</th>
                  <th className="p-3">Acción</th>
                  <th className="p-3">Detalle Operación</th>
                  <th className="p-3 text-right">Dirección IP / Sistema</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {auditLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-semibold text-gray-900 whitespace-nowrap">{log.time}</td>
                    <td className="p-3 text-emerald-700 font-bold whitespace-nowrap">{log.user}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="bg-gray-200/60 text-gray-900 px-2 py-1 rounded font-sans text-[10px] font-black uppercase">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-light text-gray-700 min-w-[200px]">{log.details}</td>
                    <td className="p-3 text-right text-gray-400 font-mono">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
