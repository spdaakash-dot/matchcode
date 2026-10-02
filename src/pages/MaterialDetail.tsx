import { useParams, useNavigate } from 'react-router-dom';
import { useMatchCodeStore } from '../store';
import { 
  ArrowLeft, CheckCircle, Database, GitMerge, FileText, Activity, BrainCircuit
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MaterialDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { standardMaterials, materials } = useMatchCodeStore();
  
  const material = standardMaterials.find(m => m.id === id);

  if (!material) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-text-muted">
        <Database className="w-12 h-12 mb-4 opacity-50" />
        <p>Material not found.</p>
        <button onClick={() => navigate('/materials')} className="mt-4 btn-secondary">Go Back</button>
      </div>
    );
  }

  // Find source records
  const sourceRecords = materials.filter(m => material.equivalentCodes.includes(m.code));

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <button 
        onClick={() => navigate('/materials')}
        className="flex items-center text-sm text-text-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Materials
      </button>

      {/* Header */}
      <div className="glass-panel p-6 border-l-4 border-l-primary flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold font-mono text-white">{material.code}</h1>
            <span className="badge badge-success flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> {material.status}
            </span>
          </div>
          <p className="text-lg text-text-main">{material.canonicalDesc}</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">Export Record</button>
          <button className="btn-primary">Edit Master</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Attributes */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-primary" />
              Standard Identity
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm border-b border-dark-border pb-3">
                <span className="text-text-muted">Category</span>
                <span className="text-white font-medium text-right">{material.category}</span>
              </div>
              {Object.entries(material.attributes).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-2 text-sm border-b border-dark-border pb-3 last:border-0 last:pb-0">
                  <span className="text-text-muted">{key}</span>
                  <span className="text-white font-medium text-right">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-secondary" />
              Metadata
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Created</span>
                <span className="text-white">{material.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Created By</span>
                <span className="text-primary">{material.createdBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Approved By</span>
                <span className="text-white">{material.approvedBy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Explanation & Sources */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Explainable AI */}
          <div className="glass-panel p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full blur-2xl"></div>
            
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
              <BrainCircuit className="w-5 h-5 mr-2 text-primary" />
              Explainable AI Analysis
            </h2>
            
            <div className="mb-6 bg-dark-bg/50 p-4 rounded-lg border border-dark-border relative">
              <h3 className="text-xs uppercase tracking-widest text-text-muted mb-2">Why MatchCode considers these the same</h3>
              <p className="text-sm text-text-main leading-relaxed">
                All constituent records describe a <strong>{material.attributes.Type}</strong> made from <strong>{material.attributes.Material || 'identical materials'}</strong> with matching primary dimensions. Differences are primarily naming conventions, abbreviations, and organizational coding.
              </p>
              
              <div className="absolute top-4 right-4 flex flex-col items-end">
                <span className="text-2xl font-bold text-primary font-mono">{material.confidence}%</span>
                <span className="text-xs text-text-muted">Confidence Score</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Description similarity', score: 94 },
                { label: 'Material match', score: 100 },
                { label: 'Type match', score: 100 },
                { label: 'Size match', score: 98 },
                { label: 'Specification match', score: 95 },
                { label: 'Unit normalization', score: 100 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-muted">{item.label}</span>
                    <span className="text-white font-mono">{item.score}%</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-6 text-sm text-primary hover:text-primary-hover flex items-center transition-colors">
              <FileText className="w-4 h-4 mr-2" /> View detailed comparison matrix
            </button>
          </div>

          {/* Source Records */}
          <div className="glass-panel p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
              <GitMerge className="w-5 h-5 mr-2 text-secondary" />
              Source Records ({sourceRecords.length})
            </h2>
            
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-6 top-4 bottom-4 w-px bg-dark-border"></div>
              
              <div className="space-y-4">
                {sourceRecords.map((record, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={record.id} 
                    className="relative pl-12"
                  >
                    <div className="absolute left-[21px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-dark-panel border-2 border-primary z-10"></div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-px bg-dark-border"></div>
                    
                    <div className="glass-card p-4 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-primary">{record.cpse}</span>
                        <span className="text-xs font-mono text-text-muted">{record.code}</span>
                      </div>
                      <p className="text-sm text-white font-medium">{record.description}</p>
                    </div>
                  </motion.div>
                ))}
                
                {sourceRecords.length === 0 && (
                  <div className="pl-12 text-sm text-text-muted">No source records linked.</div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
