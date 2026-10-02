import { useState, useRef } from 'react';
import { UploadCloud, File, CheckCircle, Play, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function UploadData() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setUploadComplete(false);
    setIsUploading(true);
    
    // Simulate parsing
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Upload Data</h1>
        <p className="text-text-muted">Ingest new material lists for cleaning and standardization.</p>
      </div>

      <div 
        className={`glass-panel p-12 border-2 border-dashed transition-colors flex flex-col items-center justify-center relative overflow-hidden ${
          dragActive ? 'border-primary bg-primary/5' : 'border-dark-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef} 
          type="file" 
          className="hidden" 
          accept=".csv,.xlsx,.xls,.pdf" 
          onChange={handleChange} 
        />
        
        {!file && (
          <>
            <div className="w-20 h-20 rounded-full bg-dark-bg flex items-center justify-center mb-6 shadow-lg border border-dark-border">
              <UploadCloud className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Drop your material dataset here</h2>
            <p className="text-text-muted mb-6">Supports CSV, XLSX, and PDF extracts</p>
            <button onClick={() => inputRef.current?.click()} className="btn-secondary">
              Browse Files
            </button>
          </>
        )}

        {isUploading && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-dark-bg border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-white">Parsing and validating dataset...</p>
          </div>
        )}

        <AnimatePresence>
          {uploadComplete && file && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-accent-success/20 flex items-center justify-center border border-accent-success/50">
                  <CheckCircle className="w-8 h-8 text-accent-success" />
                </div>
              </div>
              
              <div className="bg-dark-bg/50 rounded-lg p-6 border border-dark-border mb-6">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-dark-border">
                  <File className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-white font-medium">{file.name}</h3>
                    <p className="text-text-muted text-sm">{(file.size / 1024).toFixed(2)} KB • CPSE Alpha Source</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">12,540</div>
                    <div className="text-xs text-text-muted uppercase tracking-wider">Records Detected</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-success">12,214</div>
                    <div className="text-xs text-text-muted uppercase tracking-wider">Valid</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-500">326</div>
                    <div className="text-xs text-text-muted uppercase tracking-wider">Needs Review</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={() => setFile(null)} className="btn-secondary">Upload Another</button>
                <button onClick={() => navigate('/matching')} className="btn-primary flex items-center gap-2">
                  <Play className="w-4 h-4" /> Start Standardization
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-white font-semibold flex items-center mb-4">
          <Database className="w-5 h-5 text-primary mr-2" /> Recent Uploads
        </h3>
        <div className="space-y-3">
          {['CPSE_B_Inventory_2026.csv', 'Legacy_Materials_Export.xlsx'].map((name, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-dark-bg rounded border border-dark-border">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-text-muted" />
                <div>
                  <div className="text-sm text-white">{name}</div>
                  <div className="text-xs text-text-muted">Uploaded 2 days ago • Fully processed</div>
                </div>
              </div>
              <span className="badge badge-success">Completed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
