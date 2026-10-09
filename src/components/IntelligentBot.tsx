import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IntelligentBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'bot' | 'user' }[]>([
    { text: "¡Hola! Soy el asistente virtual de Argensalta Propiedades. ¿En qué puedo ayudarte a potenciar tu capital hoy?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    "Quiero invertir",
    "Soy Inmobiliaria",
    "Ver Panel de Inversor",
    "Dudas Frecuentes"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInputValue('');

    // Simulate bot thinking and responding
    setTimeout(() => {
      let botResponse = "Entiendo. Un asesor especializado se pondrá en contacto pronto. Mientras tanto, te invito a explorar nuestro Masterplan.";
      
      if (text.toLowerCase().includes("invertir")) {
        botResponse = "Excelente decisión. En Argensalta Propiedades estructuramos desarrollos sólidos como Riveras de Pucheta. ¿Te gustaría agendar una reunión corporativa?";
      } else if (text.toLowerCase().includes("inmobiliaria")) {
        botResponse = "¡Nos encanta hacer alianzas! Si eres desarrollador o agencia, tenemos un esquema especial B2B. Mira nuestra sección de contacto al final de la página web.";
      } else if (text.toLowerCase().includes("panel")) {
        botResponse = "Si ya eres inversor, puedes ingresar al Panel usando tu cuenta de Google o credenciales pre-aprobadas en la sección superior derecha.";
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-black border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#EFC46C] to-[#DFA238] p-4 flex justify-between items-center text-black">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-wider text-sm">ARGENSALTA Assistant</h3>
                  <p className="text-xs font-medium">Asesor PropTech Virtual</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 h-80 bg-gray-900 p-4 overflow-y-auto flex flex-col space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-[#EFC46C] text-black rounded-br-sm font-medium' : 'bg-white/10 text-white rounded-bl-sm font-light'}`}>
                     {msg.text}
                   </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && (
              <div className="bg-gray-900 px-4 py-2 flex flex-wrap gap-2 border-t border-white/5">
                {quickReplies.map((reply, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSend(reply)}
                    className="text-xs border border-[#EFC46C]/40 text-[#EFC46C] hover:bg-[#EFC46C] hover:text-black transition-colors px-3 py-1.5 rounded-full"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 bg-black border-t border-white/10">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu consulta..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#EFC46C]"
                />
                <button type="submit" className="bg-[#EFC46C] text-black p-2 rounded-full hover:bg-white transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#EFC46C] to-[#DFA238] rounded-full shadow-[0_10px_30px_rgba(239,196,108,0.5)] z-50 flex items-center justify-center border-2 border-black group"
      >
        <MessageSquare className={`w-6 h-6 text-black transition-transform ${isOpen ? 'scale-0' : 'scale-100'}`} />
        <X className={`w-6 h-6 text-black absolute transition-transform ${isOpen ? 'scale-100' : 'scale-0'}`} />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
      </motion.button>
    </>
  );
}
