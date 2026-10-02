export const DEMO_MATERIALS = [
  // VALVES
  { id: 'REC-001', code: 'MC-1021', description: 'Ball Valve 2in SS', cpse: 'CPSE A', category: 'Mechanical' },
  { id: 'REC-002', code: 'PV-554', description: 'SS valve ball type 2', cpse: 'CPSE B', category: 'Mechanical' },
  { id: 'REC-003', code: '77-VB-2', description: 'VALVE BALL SS 50MM', cpse: 'CPSE C', category: 'Mechanical' },
  
  // BEARINGS
  { id: 'REC-004', code: 'BRG-112', description: 'Bearing 6204 ZZ', cpse: 'CPSE A', category: 'Mechanical' },
  { id: 'REC-005', code: '6204-ZZ', description: '6204-ZZ Deep Groove Bearing', cpse: 'CPSE B', category: 'Mechanical' },
  { id: 'REC-006', code: 'B-6204', description: 'DEEP GROOVE BALL BEARING 6204 ZZ', cpse: 'CPSE C', category: 'Mechanical' },
  
  // CABLES
  { id: 'REC-007', code: 'CBL-99', description: 'PVC Copper Cable 2.5 SQMM', cpse: 'CPSE A', category: 'Electrical' },
  { id: 'REC-008', code: 'E-25CU', description: '2.5mm² Cu PVC Cable', cpse: 'CPSE B', category: 'Electrical' },
  { id: 'REC-009', code: '99-C-25', description: 'PVC INSULATED COPPER CABLE 2.5 SQ MM', cpse: 'CPSE C', category: 'Electrical' },
  
  // BOLTS
  { id: 'REC-010', code: 'BLT-10', description: 'M10 SS Hex Bolt', cpse: 'CPSE A', category: 'Hardware' },
  { id: 'REC-011', code: 'F-M10H', description: 'Stainless Steel Hexagonal Bolt M10', cpse: 'CPSE B', category: 'Hardware' },
  { id: 'REC-012', code: 'HB-SS10', description: 'HEX BOLT SS M10', cpse: 'CPSE C', category: 'Hardware' },
  
  // PIPES
  { id: 'REC-013', code: 'PIP-50', description: 'SS Pipe 50mm', cpse: 'CPSE A', category: 'Piping' },
  { id: 'REC-014', code: 'P-SS50', description: 'Stainless Steel Pipe DN50', cpse: 'CPSE B', category: 'Piping' },
  { id: 'REC-015', code: '55-P-2', description: 'SS PIPE 2 INCH', cpse: 'CPSE C', category: 'Piping' },
];

export const DEMO_STANDARD_MATERIALS = [
  {
    id: 'STD-000123',
    code: 'STD-000123',
    canonicalDesc: 'Stainless Steel Ball Valve, 50mm, Class 150',
    category: 'Mechanical',
    attributes: { Type: 'Ball Valve', Material: 'Stainless Steel', Size: '50 mm', 'Pressure Class': '150', Connection: 'Flanged' },
    equivalentCodes: ['MC-1021', 'PV-554', '77-VB-2'],
    sourceOrganizations: ['CPSE A', 'CPSE B', 'CPSE C'],
    status: 'STANDARDIZED',
    confidence: 96.8,
    createdAt: '2026-09-15',
    createdBy: 'AI Match Engine',
    approvedBy: 'Admin',
  },
  {
    id: 'STD-000124',
    code: 'STD-000124',
    canonicalDesc: 'Deep Groove Ball Bearing, 6204 ZZ',
    category: 'Mechanical',
    attributes: { Type: 'Bearing', SubType: 'Deep Groove Ball', Model: '6204 ZZ', Shielding: 'Double Metal Shield' },
    equivalentCodes: ['BRG-112', '6204-ZZ', 'B-6204'],
    sourceOrganizations: ['CPSE A', 'CPSE B', 'CPSE C'],
    status: 'STANDARDIZED',
    confidence: 98.1,
    createdAt: '2026-09-16',
    createdBy: 'AI Match Engine',
    approvedBy: 'Admin',
  },
  {
    id: 'STD-000125',
    code: 'STD-000125',
    canonicalDesc: 'Copper Cable, PVC Insulated, 2.5 mm²',
    category: 'Electrical',
    attributes: { Type: 'Cable', Conductor: 'Copper', Insulation: 'PVC', 'Cross Section': '2.5 mm²' },
    equivalentCodes: ['CBL-99', 'E-25CU', '99-C-25'],
    sourceOrganizations: ['CPSE A', 'CPSE B', 'CPSE C'],
    status: 'STANDARDIZED',
    confidence: 99.2,
    createdAt: '2026-09-18',
    createdBy: 'AI Match Engine',
    approvedBy: 'Admin',
  }
];

export const DEMO_AUDIT_LOGS = [
  { id: 'AL-1', timestamp: '2026-10-02T09:42:00Z', user: 'Administrator', action: 'Approved Match', material: 'STD-000123', status: 'Success' },
  { id: 'AL-2', timestamp: '2026-10-02T09:38:00Z', user: 'System (AI)', action: 'Generated Recommendation', material: 'STD-000123 (96.8%)', status: 'Info' },
  { id: 'AL-3', timestamp: '2026-10-02T09:30:00Z', user: 'Administrator', action: 'Uploaded Dataset', material: 'CPSE_A_Materials.xlsx', status: 'Success' },
  { id: 'AL-4', timestamp: '2026-10-02T09:28:00Z', user: 'System', action: 'Completed Normalization', material: 'Batch #4421', status: 'Success' },
];
