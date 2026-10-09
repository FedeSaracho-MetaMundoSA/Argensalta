const fs = require('fs');

try {
  let content = fs.readFileSync('src/pages/ProjectRiveras.tsx', 'utf8');

  // Strip out the entire MapModal function and replace it.
  const startLine = 'function MapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {';
  const endLine = 'export default function App() {';

  const startIndex = content.indexOf(startLine);
  const endIndex = content.indexOf(endLine);

  if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find start or end token.");
    process.exit(1);
  }

  const replacement = `function MapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleClose = () => onClose();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-gray-900 flex flex-col pt-4 md:pt-8"
        >
          {/* Header */}
          <div className="bg-black/90 p-4 sm:p-6 flex justify-between items-center border-b-[3px] border-[#EFC46C] shadow-lg relative z-20">
            <div className="flex items-center">
              <MapIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-[#EFC46C]" /> 
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase relative z-10 drop-shadow-lg">
                   Plano de Lotes Completos
                </h2>
                <p className="text-[#EFC46C] tracking-widest text-[10px] sm:text-xs mt-1 font-bold">RIVERAS DE PUCHETA</p>
              </div>
            </div>
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="bg-black/60 hover:bg-white/10 p-3 rounded-full text-white transition-all shadow-md border border-white/20 hover:scale-110"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Full Screen Image Map */}
          <div className="flex-grow w-full h-[85vh] bg-gray-100 flex items-center justify-center p-2 overflow-auto relative">
             <InteractiveMasterplan />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

`;

  const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
  
  fs.writeFileSync('src/pages/ProjectRiveras.tsx', newContent, 'utf8');
  console.log("Successfully replaced MapModal.");
} catch (e) {
  console.error("Error modifying file:", e);
  process.exit(1);
}
