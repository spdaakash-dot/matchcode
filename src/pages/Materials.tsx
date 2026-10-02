import { useState } from 'react';
import { useMatchCodeStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Materials() {
  const { standardMaterials } = useMatchCodeStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = standardMaterials.filter(mat => 
    mat.canonicalDesc.toLowerCase().includes(searchTerm.toLowerCase()) || 
    mat.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Materials Database</h1>
          <p className="text-text-muted">Browse and search standardized material identities.</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-muted" />
          </div>
          <input 
            type="text" 
            placeholder="Search materials using natural language... (e.g. 'stainless steel ball valves around 50mm')" 
            className="input-field w-full pl-10 bg-dark-bg/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" /> Category
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Attributes
          </button>
        </div>
      </div>

      {/* Alert Component Example */}
      {searchTerm.toLowerCase().includes('duplicate') && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Search className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-amber-400 font-medium text-sm">Procurement Intelligence Alert</h3>
            <p className="text-white text-sm mt-1">Potential duplicate material record detected in current inventory search.</p>
            <div className="mt-2 text-xs text-text-muted">
              Current known inventory: <span className="text-white">127 units</span> | 
              Equivalent records: <span className="text-white">3</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-dark-bg/50 text-text-muted text-xs uppercase tracking-wider">
                <th className="p-4 font-medium border-b border-dark-border">Standard Code</th>
                <th className="p-4 font-medium border-b border-dark-border">Material Description</th>
                <th className="p-4 font-medium border-b border-dark-border">Category</th>
                <th className="p-4 font-medium border-b border-dark-border">Source CPSEs</th>
                <th className="p-4 font-medium border-b border-dark-border">Status</th>
                <th className="p-4 font-medium border-b border-dark-border text-center">Confidence</th>
                <th className="p-4 font-medium border-b border-dark-border text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {filteredMaterials.map((mat) => (
                <tr 
                  key={mat.id} 
                  className="hover:bg-dark-hover/50 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/materials/${mat.id}`)}
                >
                  <td className="p-4 text-sm font-mono text-primary">{mat.code}</td>
                  <td className="p-4 text-sm text-white font-medium max-w-[300px] truncate">{mat.canonicalDesc}</td>
                  <td className="p-4">
                    <span className="text-xs bg-dark-bg border border-dark-border px-2 py-1 rounded text-text-muted">
                      {mat.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-text-muted">
                    {mat.sourceOrganizations.length} CPSEs
                  </td>
                  <td className="p-4">
                    <span className="badge badge-success">{mat.status}</span>
                  </td>
                  <td className="p-4 text-center text-sm font-mono text-text-muted">
                    {mat.confidence}%
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-text-muted group-hover:text-primary transition-colors">
                      <ChevronRight className="w-5 h-5 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMaterials.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-text-muted">
                    No materials found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-dark-border flex items-center justify-between text-sm text-text-muted">
          <span>Showing {filteredMaterials.length} of {standardMaterials.length} results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-dark-bg border border-dark-border rounded hover:text-white transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-dark-bg border border-dark-border rounded hover:text-white transition-colors disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
