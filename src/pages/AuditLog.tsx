import { useMatchCodeStore } from '../store';
import { User, BrainCircuit, UploadCloud, FileCog } from 'lucide-react';

export default function AuditLog() {
  const { auditLogs } = useMatchCodeStore();

  const getIcon = (user: string, action: string) => {
    if (user.includes('System') || user.includes('AI')) return <BrainCircuit className="w-4 h-4 text-primary" />;
    if (action.includes('Upload')) return <UploadCloud className="w-4 h-4 text-amber-500" />;
    if (action.includes('Normaliz')) return <FileCog className="w-4 h-4 text-text-muted" />;
    return <User className="w-4 h-4 text-accent-success" />;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Audit Trail</h1>
        <p className="text-text-muted">Immutable record of all system events, AI decisions, and human actions.</p>
      </div>

      <div className="glass-panel p-6">
        <div className="relative">
          <div className="absolute left-8 top-4 bottom-4 w-px bg-dark-border"></div>
          
          <div className="space-y-6">
            {auditLogs.map((log) => {
              const time = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const date = new Date(log.timestamp).toLocaleDateString();
              
              return (
                <div key={log.id} className="relative pl-16">
                  <div className="absolute left-[24px] top-4 w-8 h-8 rounded-full bg-dark-panel border border-dark-border flex items-center justify-center z-10 shadow-md">
                    {getIcon(log.user, log.action)}
                  </div>
                  
                  <div className="bg-dark-bg/50 border border-dark-border p-4 rounded-lg hover:border-primary/30 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
                      <div className="text-sm text-text-muted font-mono">{date} {time}</div>
                      <span className={`badge ${log.status === 'Success' ? 'badge-success' : 'badge-primary'}`}>
                        {log.status}
                      </span>
                    </div>
                    
                    <div className="text-white font-medium mb-1">{log.action}</div>
                    
                    <div className="flex items-center gap-4 text-sm mt-3">
                      <span className="text-text-muted">User: <span className="text-white">{log.user}</span></span>
                      <span className="text-dark-border">|</span>
                      <span className="text-text-muted">Target: <span className="text-primary font-mono">{log.material}</span></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
