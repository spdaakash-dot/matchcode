import { useState } from 'react';
import { useMatchCodeStore } from '../store';
import { CheckCircle, XCircle, AlertTriangle, User, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewQueue() {
  const { addStandardMaterial, addAuditLog, user } = useMatchCodeStore();
  
  // Dummy data for review queue
  const [queue, setQueue] = useState([
    {
      id: 'RQ-001',
      confidence: 96.8,
      type: 'HIGH CONFIDENCE',
      recordA: { cpse: 'CPSE A', code: 'MC-1021', description: 'Ball Valve 2in SS' },
      recordB: { cpse: 'CPSE B', code: 'PV-554', description: 'SS valve ball type 2' },
      recordC: { cpse: 'CPSE C', code: '77-VB-2', description: 'VALVE BALL SS 50MM' },
      attributes: { Type: 'Ball Valve', Material: 'Stainless Steel', Size: '50mm', Category: 'Mechanical' },
      explanation: 'All three records describe a ball valve made from stainless steel with a nominal size of approximately 50 mm. Differences are primarily naming conventions, abbreviations and organizational coding.',
      differences: ['Naming conventions', 'Organization codes'],
      risks: 'None detected'
    },
    {
      id: 'RQ-002',
      confidence: 91.4,
      type: 'MEDIUM CONFIDENCE',
      recordA: { cpse: 'CPSE B', code: '6204-ZZ', description: '6204-ZZ Deep Groove Bearing' },
      recordB: { cpse: 'CPSE C', code: 'B-6204', description: 'DEEP GROOVE BALL BEARING 6204 ZZ' },
      attributes: { Type: 'Bearing', Model: '6204 ZZ', Category: 'Mechanical' },
      explanation: 'Records share identical model numbers (6204 ZZ) and types. Highly likely to be the exact same material.',
      differences: ['Word order', 'Casing'],
      risks: 'Verify ZZ suffix meaning across organizations'
    },
    {
      id: 'RQ-003',
      confidence: 81.2,
      type: 'LOW CONFIDENCE',
      recordA: { cpse: 'CPSE A', code: 'CBL-99', description: 'PVC Copper Cable 2.5 SQMM' },
      recordB: { cpse: 'CPSE B', code: 'E-40CU', description: '4mm² Cu PVC Cable' },
      attributes: { Type: 'Cable', Material: 'Copper', Insulation: 'PVC', Category: 'Electrical' },
      explanation: 'Materials and types match, but technical specifications (Cross-sectional area) differ significantly (2.5 vs 4.0).',
      differences: ['Cross-sectional area'],
      risks: 'Not standardizable. Do not merge.'
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [actionType, setActionType] = useState('');

  const handleAction = (item: any, type: string) => {
    setSelectedItem(item);
    setActionType(type);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (actionType === 'APPROVE') {
      const newStandard = {
        id: `STD-00${Math.floor(Math.random()*10000)}`,
        code: `STD-00${Math.floor(Math.random()*10000)}`,
        canonicalDesc: selectedItem.attributes.Type + ' - Standardized',
        category: selectedItem.attributes.Category,
        attributes: selectedItem.attributes,
        equivalentCodes: [selectedItem.recordA?.code, selectedItem.recordB?.code, selectedItem.recordC?.code].filter(Boolean),
        sourceOrganizations: [selectedItem.recordA?.cpse, selectedItem.recordB?.cpse, selectedItem.recordC?.cpse].filter(Boolean),
        status: 'STANDARDIZED',
        confidence: selectedItem.confidence,
        createdAt: new Date().toISOString().split('T')[0],
        createdBy: 'AI Match Engine',
        approvedBy: user?.name || 'Demo Administrator',
      };
      
      addStandardMaterial(newStandard);
      addAuditLog({
        id: `AL-${Date.now()}`,
        timestamp: new Date().toISOString(),
        user: user?.name || 'Demo Administrator',
        action: 'Officer approved match',
        material: newStandard.code,
        status: 'Success'
      });
    }

    setQueue(q => q.filter(item => item.id !== selectedItem.id));
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Review Queue</h1>
        <p className="text-text-muted">Human-in-the-loop verification for AI generated recommendations.</p>
      </div>

      <div className="flex gap-4 border-b border-dark-border pb-2">
        <button className="text-primary font-medium border-b-2 border-primary px-2 pb-2">All Pending ({queue.length})</button>
        <button className="text-text-muted hover:text-white px-2 pb-2">High Confidence (1)</button>
        <button className="text-text-muted hover:text-white px-2 pb-2">Needs Manual Review (1)</button>
      </div>

      <AnimatePresence>
        {queue.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Left Side: Confidence & Type */}
            <div className={`w-full lg:w-48 p-6 flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-dark-border ${
              item.confidence > 95 ? 'bg-accent-success/5' : item.confidence > 85 ? 'bg-primary/5' : 'bg-amber-500/5'
            }`}>
              <div className="text-4xl font-bold font-mono text-white mb-2">{item.confidence}%</div>
              <div className={`text-xs font-bold text-center tracking-wider ${
                item.confidence > 95 ? 'text-accent-success' : item.confidence > 85 ? 'text-primary' : 'text-amber-500'
              }`}>
                {item.type}
              </div>
            </div>

            {/* Middle: Records and AI Explain */}
            <div className="flex-1 p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1 space-y-3">
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Source Records</h3>
                  {[item.recordA, item.recordB, item.recordC].filter(Boolean).map((rec: any, i) => (
                    <div key={i} className="bg-dark-bg/50 p-3 rounded border border-dark-border flex justify-between items-center">
                      <div>
                        <div className="text-xs text-primary">{rec.cpse}</div>
                        <div className="text-sm text-white font-medium">{rec.description}</div>
                      </div>
                      <div className="text-xs font-mono text-text-muted">{rec.code}</div>
                    </div>
                  ))}
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">AI Extraction</h3>
                  <div className="bg-dark-bg/50 p-4 rounded border border-dark-border">
                    <div className="flex items-start gap-3 mb-3 pb-3 border-b border-dark-border">
                      <BrainCircuit className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-sm text-text-main">{item.explanation}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(item.attributes).map(([k, v]) => (
                        <div key={k} className="flex flex-col">
                          <span className="text-text-muted">{k}</span>
                          <span className="text-white font-medium">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Risk: {item.risks}
                </div>
                <div className="text-text-muted">Differences: {item.differences.join(', ')}</div>
              </div>
            </div>

            {/* Right Side: Actions */}
            <div className="w-full lg:w-48 p-6 border-t lg:border-t-0 lg:border-l border-dark-border bg-dark-bg/30 flex flex-col gap-3 justify-center">
              <button 
                onClick={() => handleAction(item, 'APPROVE')}
                className="btn-success w-full flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Approve
              </button>
              <button 
                onClick={() => handleAction(item, 'REJECT')}
                className="btn-danger w-full flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
              <button className="btn-secondary w-full flex items-center justify-center gap-2 text-sm mt-2">
                <User className="w-4 h-4" /> Escalate
              </button>
            </div>
          </motion.div>
        ))}
        {queue.length === 0 && (
          <div className="glass-panel p-12 text-center text-text-muted">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-accent-success/50" />
            <h2 className="text-xl text-white mb-2">Queue Empty</h2>
            <p>All pending recommendations have been reviewed.</p>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel relative z-10 max-w-md w-full p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Confirm {actionType === 'APPROVE' ? 'Approval' : 'Rejection'}</h2>
              <p className="text-text-main mb-6">
                Are you sure you want to {actionType.toLowerCase()} this match? 
                {actionType === 'APPROVE' ? ' This will create a new standardized record in the master database.' : ' These records will remain separate.'}
              </p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
                <button 
                  onClick={confirmAction} 
                  className={actionType === 'APPROVE' ? 'btn-success' : 'btn-danger'}
                >
                  Confirm {actionType === 'APPROVE' ? 'Approval' : 'Rejection'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
