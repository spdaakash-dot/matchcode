
import { useNavigate } from 'react-router-dom';
import { 
  Network, 
  BrainCircuit, 
  Search, 
  CheckCircle, 
  Database, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-bg text-text-main overflow-x-hidden relative font-sans">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-dark-panel flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-widest text-white">MATCH<span className="text-primary">CODE</span></span>
        </div>
        <div className="space-x-4">
          <button onClick={() => navigate('/login')} className="btn-secondary hidden md:inline-block">Login</button>
          <button onClick={() => navigate('/login')} className="btn-primary">Enter Workspace</button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-dark-panel border border-primary/30 text-primary text-sm font-medium mb-8 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            AI-POWERED MATERIAL INTELLIGENCE
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white"
          >
            One Material.<br/>
            <span className="text-text-muted">Many Names.</span><br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-secondary">One Standard Identity.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            MatchCode intelligently harmonizes material descriptions and codes across CPSEs using semantic matching, engineering attributes and human-verified decisions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button onClick={() => navigate('/login')} className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 group">
              Launch MatchCode
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/login')} className="btn-secondary text-lg px-8 py-4 flex items-center justify-center">
              Explore Demo
            </button>
          </motion.div>
        </div>

        {/* Animated Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 max-w-5xl mx-auto glass-panel p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            
            {/* Input Sources */}
            <div className="flex flex-col gap-4 w-full md:w-1/3">
              {[
                { org: 'CPSE A', code: 'MC-1021', desc: 'Ball Valve 2in SS' },
                { org: 'CPSE B', code: 'PV-554', desc: 'SS valve ball type 2' },
                { org: 'CPSE C', code: '77-VB-2', desc: 'VALVE BALL SS 50MM' }
              ].map((item, i) => (
                <div key={i} className="glass-card p-4 relative group">
                  <div className="text-xs text-primary mb-1">{item.org}</div>
                  <div className="text-sm font-mono text-text-muted">{item.code}</div>
                  <div className="text-sm text-white">{item.desc}</div>
                  
                  {/* Connection Line start */}
                  <div className="hidden md:block absolute right-[-16px] top-1/2 w-4 h-0.5 bg-dark-border group-hover:bg-primary/50 transition-colors"></div>
                </div>
              ))}
            </div>

            {/* AI Engine */}
            <div className="my-8 md:my-0 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
              <div className="w-32 h-32 rounded-full border border-primary/50 bg-dark-panel/80 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <BrainCircuit className="w-12 h-12 text-primary" />
                <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-50" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="10 5" />
                </svg>
              </div>
              <div className="mt-4 text-sm font-semibold tracking-widest text-primary z-10">AI MATCH ENGINE</div>
            </div>

            {/* Output */}
            <div className="w-full md:w-1/3 flex justify-end">
              <div className="glass-card p-6 border-primary/50 bg-primary/5 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur opacity-20 rounded-lg"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-accent-success" />
                    <span className="text-xs font-bold tracking-widest text-accent-success">STANDARDIZED</span>
                  </div>
                  <div className="text-lg font-mono text-white mb-2">STD-000123</div>
                  <div className="text-sm text-text-main font-medium mb-4">Stainless Steel Ball Valve, 50mm, Class 150</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-dark-panel px-2 py-1 rounded border border-dark-border">Type: Ball Valve</div>
                    <div className="bg-dark-panel px-2 py-1 rounded border border-dark-border">Material: SS</div>
                    <div className="bg-dark-panel px-2 py-1 rounded border border-dark-border">Size: 50mm</div>
                    <div className="bg-dark-panel px-2 py-1 rounded border border-dark-border">Class: 150</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>

        {/* Features */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Built for cross-organization material harmonization</h2>
          <p className="text-text-muted mb-16 max-w-2xl mx-auto">Advanced intelligence layers designed to clean, match, and standardize disparate inventory data seamlessly.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Network, title: 'Intelligent Matching', desc: 'Semantic search and NLP identifies similarities despite drastically different naming conventions.' },
              { icon: Search, title: 'Attribute Extraction', desc: 'Automatically parses technical specifications (size, material, class) from messy free-text descriptions.' },
              { icon: BrainCircuit, title: 'Explainable AI', desc: 'Clear, transparent explanations for why items were matched, including confidence scores and attribute breakdowns.' },
              { icon: CheckCircle, title: 'Human-in-the-Loop', desc: 'Designed for safe governance with built-in review queues for authorized officers to approve or reject matches.' },
              { icon: Database, title: 'Standard Material Master', desc: 'Maintains the golden source of truth for all materials across the entire organization network.' },
              { icon: ShieldCheck, title: 'Audit & Traceability', desc: 'Every AI recommendation, human decision, and data mutation is securely logged for compliance.' }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-6 text-left hover:translate-y-[-5px] transition-transform duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-16 text-white">From messy descriptions to trusted material identities</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium text-text-muted">
            {['Upload', 'Normalize', 'Extract', 'Match', 'Review', 'Standardize'].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="px-4 py-2 glass-card rounded-full">{step}</div>
                {i < 5 && <ChevronRight className="w-4 h-4 mx-2 text-primary opacity-50" />}
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-32 glass-panel p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-dark-bg/0 to-transparent"></div>
          <h2 className="text-3xl font-bold mb-8 text-white relative z-10">Works across material categories</h2>
          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            {['Mechanical', 'Electrical', 'Piping', 'Chemicals', 'Safety', 'Electronics', 'Automotive', 'Industrial'].map(cat => (
              <span key={cat} className="px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-text-muted hover:border-secondary hover:text-white transition-colors">
                {cat}
              </span>
            ))}
          </div>
          
          <div className="mt-12 relative z-10">
            <button onClick={() => navigate('/login')} className="btn-primary text-lg px-8 py-3">
              Enter the MatchCode Workspace
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
