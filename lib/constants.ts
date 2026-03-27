export const COLORS = {
  obsidian: {
    void: '#000000',
    deep: '#050505',
    surface: '#0a0a0a',
  },
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    lighter: 'rgba(255, 255, 255, 0.08)',
    dark: 'rgba(0, 0, 0, 0.4)',
    border: 'rgba(255, 255, 255, 0.1)',
    borderHover: 'rgba(255, 255, 255, 0.2)',
  },
  accent: {
    emerald: '#059669',
    cyan: '#06B6D4',
    white: '#FFFFFF',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#E3E3E3',
    muted: '#A0A0A0',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
  },
} as const

export const DURATIONS = {
  instant: 0,
  fast: 150,
  base: 250,
  slow: 400,
  slower: 600,
  slowest: 1000,
} as const

export const NAV_PATHS = {
  dashboard: '/dashboard',
  overview: '/dashboard',
  analysis: '/dashboard/analysis',
  upload: '/dashboard/upload',
  history: '/dashboard/history',
  login: '/login',
  signup: '/signup',
  logout: '/logout',
} as const

export const DOCUMENT_STATUS = {
  PROCESSING: {
    label: 'Processing',
    variant: 'info' as const,
  },
  PENDING: {
    label: 'Pending',
    variant: 'warning' as const,
  },
  COMPLETED: {
    label: 'Analyzed',
    variant: 'success' as const,
  },
  FAILED: {
    label: 'Flagged',
    variant: 'error' as const,
  },
} as const

export const MOCK_DOCUMENTS = [
  {
    id: '1',
    name: 'NDA_AcmeCorp.pdf',
    fileName: 'NDA_AcmeCorp.pdf',
    fileType: 'pdf',
    fileSize: 1024000,
    status: 'COMPLETED',
    uploadedAt: new Date('2024-03-20T10:00:00Z').toISOString(),
    date: '2024-03-20',
    riskLevel: 'low',
  },
  {
    id: '2',
    name: 'ServiceAgreement_TechInc.pdf',
    fileName: 'ServiceAgreement_TechInc.pdf',
    fileType: 'pdf',
    fileSize: 2048000,
    status: 'FAILED',
    uploadedAt: new Date('2024-03-19T10:00:00Z').toISOString(),
    date: '2024-03-19',
    riskLevel: 'high',
  },
  {
    id: '3',
    name: 'LeaseAgreement_Building.pdf',
    fileName: 'LeaseAgreement_Building.pdf',
    fileType: 'pdf',
    fileSize: 3072000,
    status: 'PROCESSING',
    uploadedAt: new Date('2024-03-18T10:00:00Z').toISOString(),
    date: '2024-03-18',
    riskLevel: 'medium',
  },
  {
    id: '4',
    name: 'EmploymentContract_John.pdf',
    fileName: 'EmploymentContract_John.pdf',
    fileType: 'pdf',
    fileSize: 512000,
    status: 'COMPLETED',
    uploadedAt: new Date('2024-03-17T10:00:00Z').toISOString(),
    date: '2024-03-17',
    riskLevel: 'low',
  },
] as const

export const MOCK_AI_INSIGHTS = {
  summary:
    'This is a standard agreement covering confidentiality and liability for a 3-year period. The agreement includes typical mutual obligations and permitted disclosures for legal compliance. No major red flags detected.',
  actionItems: [
    'Review renewal date: March 2026',
    'Ensure compliance team acknowledges restrictions',
    'Verify third-party disclosure provisions align with policy',
  ],
} as const
