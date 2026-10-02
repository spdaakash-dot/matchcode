import { useState } from 'react';
import { useMatchCodeStore } from '../store';
import { calculateMatchScore } from '../services/matchingEngine';
import { 
  BrainCircuit, Database, SlidersHorizontal, Play, CheckCircle, 
  XCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function MatchingEngine() {
  const { materials } = useMatchCodeStore();
  const navigate = useNavigate();
  
  const [sourceData, setSourceData] = useState('CPSE A');
  const [targetData, setTargetData] = useState('CPSE B');
  const [threshold, setThreshold] = useState(85);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [results, setResults] = useState<any[]>([]);

  const steps = [
    'Cleaning descriptions...',
    'Normalizing units...',
    'Extracting attributes...',
    'Comparing semantic embeddings...',
    'Checking specifications...',
    'Generating confidence scores...'
  ];

  const handleRunMatch = () => {
    setIsProcessing(true);
    setResults([]);
    setProcessingStep(0);
    
    // Simulate steps
    const stepInterval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        
        // Generate results
        setTimeout(() => {
          setIsProcessing(false);
          generateResults();
        }, 500);
        return prev;
      });
    }, 800);
  };

  const generateResults = () => {
    const sourceRecords = materials.filter(m => m.cpse === sourceData);
    const targetRecords = materials.filter(m => m.cpse === targetData);
    
    const matches = [];
    
    for (const src of sourceRecords) {
      for (const tgt of targetRecords) {
        const match = calculateMatchScore(src, tgt);
        if (parseFloat(match.score) >= threshold) {
          matches.push({
            id: `MATCH-${Math.floor(Math.random()*10000)}`,
            recordA: src,
            recordB: tgt,
            ...match
          });
        }
      }
    }
    
    setResults(matches.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">AI Matching Engine</h1>
        <p className="text-text-muted">Configure and execute intelligent material harmonization between datasets.</p>
      </div>

      <div className="glass-panel p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2 flex items-center">
              <Database className="w-4 h-4 mr-2" /> Source Dataset
            </label>
            <select 
              className="input-field w-full"
              value={sourceData}
              onChange={(e) => setSourceData(e.target.value)}
            >
              <option value="CPSE A">CPSE A (Upload_2026_v1)</option>
              <option value="CPSE B">CPSE B (Materials_Master)</option>
              <option value="CPSE C">CPSE C (Legacy_System)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2 flex items-center">
              <Database className="w-4 h-4 mr-2" /> Target Dataset
            </label>
            <select 
              className="input-field w-full"
              value={targetData}
              onChange={(e) => setTargetData(e.target.value)}
            >
              <option value="CPSE A">CPSE A (Upload_2026_v1)</option>
              <option value="CPSE B">CPSE B (Materials_Master)</option>
              <option value="CPSE C">CPSE C (Legacy_System)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2 flex items-center justify-between">
              <span className="flex items-center"><SlidersHorizontal className="w-4 h-4 mr-2" /> Confidence Threshold</span>
              <span className="text-primary font-mono">{threshold}%</span>
            </label>
            <input 
              type="range" 
              min="50" max="100" 
              value={threshold} 
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>Broader</span>
              <span>Stricter</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-dark-border">
          <button 
            onClick={handleRunMatch}
            disabled={isProcessing || sourceData === targetData}
            className="btn-primary flex items-center gap-2"
          >
            {isProcessing ? (
              <BrainCircuit className="w-5 h-5 animate-pulse" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            Run Match Analysis
          </button>
        </div>
      </div>

      {sourceData === targetData && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-400 text-sm">Please select different source and target datasets to run a cross-organization match analysis.</p>
        </div>
      )}

      {/* Processing State */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel p-8 flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="w-20 h-20 relative mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
              <div className="relative z-10 w-full h-full bg-dark-panel border-2 border-primary rounded-full flex items-center justify-center">
                <BrainCircuit className="w-10 h-10 text-primary animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Analyzing Datasets</h3>
            
            <div className="w-full max-w-md bg-dark-bg h-2 rounded-full mt-4 mb-6 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-secondary"
                animate={{ width: `${((processingStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="text-sm font-mono text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {steps[processingStep]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {!isProcessing && results.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Analysis Results</h2>
            <span className="text-sm text-text-muted">Found {results.length} potential matches above {threshold}%</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {results.map((match, i) => (
              <div key={i} className="glass-panel p-0 overflow-hidden group">
                <div className={`h-1 w-full ${match.classification === 'EXACT MATCH' ? 'bg-accent-success' : 'bg-primary'}`}></div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    
                    {/* Record A */}
                    <div className="flex-1">
                      <div className="text-xs text-text-muted mb-1">{match.recordA.cpse} <span className="font-mono ml-2 text-white/50">{match.recordA.code}</span></div>
                      <div className="text-lg font-medium text-white mb-2">{match.recordA.description}</div>
                      <span className="text-xs bg-dark-bg border border-dark-border px-2 py-1 rounded text-text-muted">{match.recordA.category}</span>
                    </div>

                    {/* Match Info */}
                    <div className="flex flex-col items-center justify-center px-4 md:border-x border-dark-border">
                      <div className="text-3xl font-bold font-mono text-white mb-1">{match.score}%</div>
                      <span className={`badge mb-2 ${match.classification === 'EXACT MATCH' ? 'badge-success' : 'badge-primary'}`}>
                        {match.classification}
                      </span>
                    </div>

                    {/* Record B */}
                    <div className="flex-1">
                      <div className="text-xs text-text-muted mb-1">{match.recordB.cpse} <span className="font-mono ml-2 text-white/50">{match.recordB.code}</span></div>
                      <div className="text-lg font-medium text-white mb-2">{match.recordB.description}</div>
                      <span className="text-xs bg-dark-bg border border-dark-border px-2 py-1 rounded text-text-muted">{match.recordB.category}</span>
                    </div>
                  </div>

                  {/* AI Explanation Area */}
                  <div className="mt-6 p-4 bg-dark-bg/50 border border-dark-border rounded-lg text-sm">
                    <p className="text-text-muted"><span className="text-primary font-semibold">AI Reasoning:</span> {match.explanation}</p>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button className="btn-secondary flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button onClick={() => navigate('/review')} className="btn-primary flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Send to Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
      {!isProcessing && results.length === 0 && sourceData !== targetData && (
        <div className="glass-panel p-12 text-center text-text-muted">
          <BrainCircuit className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Run match analysis to see results.</p>
        </div>
      )}
    </div>
  );
}
