import { useMatchCodeStore } from '../store';
import { Database, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StandardMaster() {
  const { standardMaterials } = useMatchCodeStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-dark-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Database className="text-primary" /> Standard Material Master
          </h1>
          <p className="text-text-muted mt-1">The authoritative, deduplicated registry for cross-organizational material procurement.</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Master
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-bg text-text-muted text-xs uppercase tracking-wider">
                <th className="p-4 font-medium border-b border-dark-border">Master ID</th>
                <th className="p-4 font-medium border-b border-dark-border">Canonical Description</th>
                <th className="p-4 font-medium border-b border-dark-border">Category</th>
                <th className="p-4 font-medium border-b border-dark-border">Linked Equivalent Codes</th>
                <th className="p-4 font-medium border-b border-dark-border">Status</th>
                <th className="p-4 font-medium border-b border-dark-border">Approved By</th>
                <th className="p-4 font-medium border-b border-dark-border"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {standardMaterials.map((mat) => (
                <tr key={mat.id} className="hover:bg-dark-hover/50 transition-colors">
                  <td className="p-4 text-sm font-bold text-white font-mono flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" /> {mat.code}
                  </td>
                  <td className="p-4 text-sm text-text-main max-w-[250px] truncate">{mat.canonicalDesc}</td>
                  <td className="p-4 text-sm text-text-muted">{mat.category}</td>
                  <td className="p-4 text-sm font-mono text-text-muted max-w-[200px] truncate">
                    {mat.equivalentCodes.join(', ')}
                  </td>
                  <td className="p-4">
                    <span className="badge badge-success">{mat.status}</span>
                  </td>
                  <td className="p-4 text-xs text-text-muted">
                    {mat.approvedBy}<br/>
                    <span className="opacity-50">{mat.createdAt}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => navigate(`/materials/${mat.id}`)} className="text-text-muted hover:text-primary transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
