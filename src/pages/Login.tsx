import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, ShieldCheck, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Login() {
  const { loginWithGoogle, loginWithEmail, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useEmailAuth, setUseEmailAuth] = useState(true); // default to email to bypassed login in iframes

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google login failed:', err);
      setError('No se pudo abrir el acceso de Google. Probá usando el acceso con Email abajo que funciona 100% dentro del editor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, ingresá tu correo electrónico.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await loginWithEmail(email, password || 'argensalta2026');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Email login failed:', err);
      setError('Error al ingresar con email. Probá un acceso directo abajo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAccess = async (targetEmail: string) => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithEmail(targetEmail, 'argensalta2026');
      navigate('/dashboard');
    } catch (err) {
      setError('Error al iniciar acceso rápido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] py-12 px-4 sm:px-6 lg:px-8 mt-[-64px] min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-0"></div>
      
      {/* Background aesthetics */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EFC46C]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-zinc-950/90 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative z-10 border border-white/10"
      >
        <div className="text-center">
          <div className="inline-flex p-3 bg-[#EFC46C]/10 border border-[#EFC46C]/20 rounded-2xl mb-4">
            <ShieldCheck className="w-8 h-8 text-[#EFC46C]" />
          </div>
          <h2 className="text-3xl font-serif text-[#EFC46C] uppercase tracking-widest">
            Portal de Acceso
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Ingreso y registro para Propietarios y Administradores
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {useEmailAuth ? (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Correo Electrónico</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tuemail@ejemplo.com"
                  className="w-full bg-zinc-900 border border-white/10 focus:border-[#EFC46C]/50 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none transition-all font-mono"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Contraseña</label>
                <span className="text-[10px] text-zinc-500">(Opcional, podés dejar vacío)</span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-white/10 focus:border-[#EFC46C]/50 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl text-black bg-[#EFC46C] hover:bg-[#DFA238] disabled:opacity-50 focus:outline-none transition-all transform hover:scale-[1.01] active:scale-98 shadow-lg mt-6"
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión / Registrarme'}
            </button>

            <div className="flex items-center justify-between pt-2">
              <button 
                type="button"
                onClick={() => setUseEmailAuth(false)}
                className="text-[11px] text-[#EFC46C] hover:underline uppercase tracking-wide"
              >
                O usar Google Sign-In
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl text-white bg-zinc-900 hover:bg-zinc-850 focus:outline-none transition-all transform hover:scale-[1.01] active:scale-98 shadow-lg"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <LogIn className="h-5 w-5 text-[#EFC46C]" />
              </span>
              Ingresar con Google
            </button>

            <button 
              type="button" 
              onClick={() => setUseEmailAuth(true)}
              className="w-full text-center text-xs text-gray-400 hover:text-white underline pt-2"
            >
              O usar Formulario de Email
            </button>
          </div>
        )}

        {/* QUICK ACCESS ACCOUNTS BLOCK FOR THE DEVELOPER AND OWNER */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
          <p className="text-[10px] text-center text-zinc-500 uppercase tracking-widest font-black">
            Accesos Rápidos Directos (Editor AI Studio)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Admin entry */}
            <button
              type="button"
              onClick={() => handleQuickAccess('argensaltapropiedades@gmail.com')}
              className="flex items-center justify-between p-3 bg-[#EFC46C]/10 border border-[#EFC46C]/20 hover:bg-[#EFC46C]/20 text-[#EFC46C] rounded-xl transition-all font-sans text-left"
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4" />
                <div>
                  <span className="block font-bold uppercase text-[9px] tracking-wider text-[#EFC46C]/70">Acceso</span>
                  <span className="font-extrabold text-[11px] block text-white">ADMINISTRADOR</span>
                </div>
              </div>
            </button>

            {/* Client entry */}
            <button
              type="button"
              onClick={() => handleQuickAccess('propietario@argensalta.com')}
              className="flex items-center justify-between p-3 bg-zinc-900/60 border border-white/10 hover:bg-zinc-805 text-zinc-300 rounded-xl transition-all font-sans text-left"
            >
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <div>
                  <span className="block font-bold uppercase text-[9px] tracking-wider text-zinc-500">Acceso</span>
                  <span className="font-extrabold text-[11px] block text-white">PROPIETARIO / CLIENTE</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        <p className="text-[10px] text-center text-gray-500 font-sans leading-relaxed pt-2">
          Área de clientes autorizada para los proyectos Riveras de Pucheta y Don Borromeo de Argensalta Propiedades.
        </p>
      </motion.div>
    </div>
  );
}
