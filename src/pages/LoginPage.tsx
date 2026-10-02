import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Lock, Mail, Building, AlertCircle } from 'lucide-react';
import { useMatchCodeStore } from '../store';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useMatchCodeStore();
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login({ id: 'u1', name: 'Demo Administrator', role: 'Administrator' });
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-dark-panel flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-4">
            <BrainCircuit className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-widest text-white">MATCH<span className="text-primary">CODE</span></h1>
          <p className="text-text-muted mt-2">Secure Government Workspace</p>
        </div>

        <div className="glass-panel p-8">
          <div className="mb-6 flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>This is a demonstration environment. Please use the Demo Administrator login.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Organization ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-dark-border" />
                </div>
                <input type="text" disabled placeholder="ORG-CPSE" className="input-field w-full pl-10 opacity-50 cursor-not-allowed" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-dark-border" />
                </div>
                <input type="email" disabled placeholder="admin@cpse.gov" className="input-field w-full pl-10 opacity-50 cursor-not-allowed" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dark-border" />
                </div>
                <input type="password" disabled placeholder="••••••••" className="input-field w-full pl-10 opacity-50 cursor-not-allowed" />
              </div>
            </div>
          </form>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-dark-border"></div>
            <span className="flex-shrink-0 mx-4 text-text-muted text-sm">or</span>
            <div className="flex-grow border-t border-dark-border"></div>
          </div>

          <button 
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full btn-primary py-3 flex justify-center items-center relative overflow-hidden group"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <span className="relative z-10 font-bold">Login as Demo Administrator</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
