import { BarChart3 } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-text-muted">Deep insights into material harmonization and procurement efficiency.</p>
      </div>

      <div className="glass-panel p-12 text-center text-text-muted">
        <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <h2 className="text-xl text-white mb-2">Advanced Analytics</h2>
        <p>This module is currently being provisioned for your workspace.</p>
      </div>
    </div>
  );
}
