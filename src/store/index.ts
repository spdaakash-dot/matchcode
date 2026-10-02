import { create } from 'zustand';
// Removing mockData import as we fetch from API

interface MatchCodeState {
  user: any | null;
  materials: any[];
  standardMaterials: any[];
  auditLogs: any[];
  isLoading: boolean;
  login: (user: any) => void;
  logout: () => void;
  fetchData: () => Promise<void>;
  addStandardMaterial: (material: any) => void;
  addAuditLog: (log: any) => void;
}

export const useMatchCodeStore = create<MatchCodeState>((set) => ({
  user: null,
  materials: [],
  standardMaterials: [],
  auditLogs: [],
  isLoading: false,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  fetchData: async () => {
    set({ isLoading: true });
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const [matRes, stdRes, logRes] = await Promise.all([
        fetch(`${API_URL}/api/materials`),
        fetch(`${API_URL}/api/standard-materials`),
        fetch(`${API_URL}/api/audit-logs`)
      ]);
      const materials = await matRes.json();
      const standardMaterials = await stdRes.json();
      const auditLogs = await logRes.json();
      
      set({ materials, standardMaterials, auditLogs, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch data:', error);
      set({ isLoading: false });
    }
  },
  addStandardMaterial: (material) => set((state) => ({ 
    standardMaterials: [material, ...state.standardMaterials] 
  })),
  addAuditLog: (log) => set((state) => ({
    auditLogs: [log, ...state.auditLogs]
  }))
}));
