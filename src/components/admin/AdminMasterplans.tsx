import React, { useState, useEffect } from 'react';
import { UploadCloud, Map as MapIcon, Image as ImageIcon, Save, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminMasterplans() {
  const [riverasImage, setRiverasImage] = useState<string | null>(null);
  const [donBorromeoImage, setDonBorromeoImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const rImg = localStorage.getItem('masterplan_riveras');
    if (rImg) setRiverasImage(rImg);

    const dbImg = localStorage.getItem('masterplan_don_borromeo');
    if (dbImg) setDonBorromeoImage(dbImg);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, project: 'riveras' | 'don_borromeo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (project === 'riveras') {
        setRiverasImage(base64);
      } else {
        setDonBorromeoImage(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Save to local storage for now
    if (riverasImage) {
      localStorage.setItem('masterplan_riveras', riverasImage);
    }
    if (donBorromeoImage) {
      localStorage.setItem('masterplan_don_borromeo', donBorromeoImage);
    }

    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      
      // Dispatch a custom event so other components can catch the updated image without a refresh
      window.dispatchEvent(new Event('masterplan_updated'));
    }, 800);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wider flex items-center">
             <MapIcon className="w-6 h-6 mr-3 text-[#EFC46C]" /> Gestor de Planos Masterplan
          </h2>
          <p className="text-gray-500 text-sm mt-1">Sube las imágenes actualizadas de los terrenos vendidos para cada proyecto.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-[#EFC46C] to-[#DFA238] text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 flex items-center"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
          ) : savedSuccess ? (
            <CheckCircle2 className="w-5 h-5 mr-2" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {savedSuccess ? 'Guardado' : 'Guardar Cambios'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Riveras de Pucheta */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-900 uppercase tracking-widest text-lg">Riveras de Pucheta</h3>
          </div>
          <div className="p-6 flex flex-col space-y-4">
             <div className="relative w-full aspect-video bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden group">
                {riverasImage ? (
                  <img src={riverasImage} alt="Riveras de Pucheta" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm font-medium">Usando imagen por defecto</p>
                  </div>
                )}
                
                <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <UploadCloud className="w-10 h-10 text-white mb-2" />
                  <span className="text-white font-bold tracking-widest uppercase text-sm">Cambiar Plano</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'riveras')} />
                </label>
             </div>
             <p className="text-xs text-gray-500 text-center">Se recomienda usar imágenes en alta resolución (JPG o PNG).</p>
          </div>
        </div>

        {/* Don Borromeo */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-900 uppercase tracking-widest text-lg">Don Borromeo</h3>
          </div>
          <div className="p-6 flex flex-col space-y-4">
             <div className="relative w-full aspect-video bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden group">
                {donBorromeoImage ? (
                  <img src={donBorromeoImage} alt="Don Borromeo" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm font-medium">Sin plano personalizado</p>
                  </div>
                )}

                <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <UploadCloud className="w-10 h-10 text-white mb-2" />
                  <span className="text-white font-bold tracking-widest uppercase text-sm">Cambiar Plano</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'don_borromeo')} />
                </label>
             </div>
             <p className="text-xs text-gray-500 text-center">Se recomienda usar imágenes en alta resolución (JPG o PNG).</p>
          </div>
        </div>

      </div>
    </div>
  );
}
