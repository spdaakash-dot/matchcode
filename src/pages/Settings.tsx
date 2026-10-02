import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">System Settings</h1>
        <p className="text-text-muted">Configure workspace preferences and AI thresholds.</p>
      </div>

      <div className="glass-panel p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-dark-border">
          <SettingsIcon className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-medium text-white">General Preferences</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-white font-medium text-sm">Theme</div>
              <div className="text-xs text-text-muted">MatchCode is optimized for dark mode.</div>
            </div>
            <select className="input-field py-1" disabled>
              <option>Dark Mode (Default)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
