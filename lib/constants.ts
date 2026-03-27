/**
 * Global Constants & Configuration
 * Centralized design system values, colors, durations, and paths
 */

/**
 * Color Palette - Glass Design System
 */
export const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  whiteOff: '#F5F5F5',

  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    lighter: 'rgba(255, 255, 255, 0.08)',
    dark: 'rgba(0, 0, 0, 0.4)',
    border: 'rgba(255, 255, 255, 0.1)',
    borderHover: 'rgba(255, 255, 255, 0.2)',
  },

  accent: {
    emerald: '#10B981',
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

/**
 * Animation Durations (in milliseconds)
 */
export const DURATIONS = {
  instant: 0,
  fast: 150,
  base: 200,
  slow: 300,
  slower: 400,
  slowest: 600,
  verySlow: 1000,
} as const

/**
 * Z-Index Scale
 * Following stacking context best practices
 */
export const Z_INDEX = {
  base: 0,
  content: 1,
  dropdown: 10,
  modal: 50,
  tooltip: 100,
  notification: 200,
} as const

/**
 * Dashboard Navigation Paths
 */
export const NAV_PATHS = {
  dashboard: '/dashboard',
  overview: '/dashboard',
  contracts: '/dashboard/contracts',
  riskAlerts: '/dashboard/risk-alerts',
  taxFinancial: '/dashboard/tax-financial',
  settings: '/dashboard/settings',
  documents: '/dashboard/documents',
  upload: '/dashboard/upload',
  history: '/dashboard/history',
  login: '/login',
  signup: '/signup',
  logout: '/logout',
} as const

/**
 * Dashboard Navigation Items
 * Structure for sidebar/navbar navigation
 */
export const DASHBOARD_NAV_ITEMS = [
  {
    id: 'overview',
    label: 'Overview',
    href: NAV_PATHS.overview,
    icon: 'BarChart3',
  },
  {
    id: 'upload',
    label: 'Upload Document',
    href: NAV_PATHS.upload,
    icon: 'Upload',
  },
  {
    id: 'analysis',
    label: 'AI Analysis',
    href: '/dashboard/analysis',
    icon: 'Zap',
  },
] as const

/**
 * Document Status Types & Colors
 */
export const DOCUMENT_STATUS = {
  PROCESSING: {
    label: 'Processing',
    variant: 'warning' as const,
    color: COLORS.status.warning,
  },
  ANALYZED: {
    label: 'Analyzed',
    variant: 'success' as const,
    color: COLORS.status.success,
  },
  FLAGGED: {
    label: 'Flagged',
    variant: 'error' as const,
    color: COLORS.status.error,
  },
  REVIEWING: {
    label: 'Reviewing',
    variant: 'info' as const,
    color: COLORS.status.info,
  },
  ARCHIVED: {
    label: 'Archived',
    variant: 'default' as const,
    color: COLORS.text.muted,
  },
} as const

/**
 * Font Sizes for Typography (Tailwind scale)
 */
export const FONT_SIZES = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
} as const

/**
 * Spacing Scale (Tailwind)
 */
export const SPACING = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const

/**
 * Border Radius Values
 */
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.375rem',
  base: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
} as const

/**
 * Breakpoints (Tailwind standard)
 */
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

/**
 * Mock Data: KPI Statistics
 * Used for dashboard display until connected to backend
 */
export const MOCK_KPI_DATA = {
  documentsAnalyzed: {
    value: 248,
    trend: 12,
    label: 'Documents Analyzed',
  },
  criticalAlerts: {
    value: 7,
    trend: -3,
    label: 'Critical Risk Alerts',
  },
  pendingDeadlines: {
    value: 14,
    trend: 2,
    label: 'Pending Deadlines',
  },
} as const

/**
 * Mock Data: Recent Documents
 * Used for table display until connected to backend
 */
export const MOCK_DOCUMENTS = [
  {
    id: '1',
    name: 'NDA_AcmeCorp.pdf',
    status: 'ANALYZED' as const,
    date: '2024-03-20',
    riskLevel: 'low',
  },
  {
    id: '2',
    name: 'ServiceAgreement_TechInc.pdf',
    status: 'FLAGGED' as const,
    date: '2024-03-19',
    riskLevel: 'high',
  },
  {
    id: '3',
    name: 'LeaseAgreement_Building.pdf',
    status: 'PROCESSING' as const,
    date: '2024-03-18',
    riskLevel: 'medium',
  },
  {
    id: '4',
    name: 'EmploymentContract_John.pdf',
    status: 'ANALYZED' as const,
    date: '2024-03-17',
    riskLevel: 'low',
  },
  {
    id: '5',
    name: 'Partnership_Agreement.pdf',
    status: 'REVIEWED' as const,
    date: '2024-03-16',
    riskLevel: 'medium',
  },
] as const

/**
 * Mock Data: AI Insights for Sample Contract
 */
export const MOCK_AI_INSIGHTS = {
  summary:
    'This is a standard NDA between Acme Corp and our organization, covering the confidentiality of proprietary information for a 3-year period. The agreement includes typical mutual obligations and permitted disclosures for legal compliance. No major red flags detected.',
  actionItems: [
    'Review renewal date: March 2026',
    'Ensure compliance team acknowledges restrictions',
    'Verify third-party disclosure provisions align with policy',
  ],
} as const

/**
 * Grid Configurations
 */
export const GRID_CONFIGS = {
  dashboard: {
    gap: 'gap-6',
    cols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  },
  features: {
    gap: 'gap-8',
    cols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  },
  documents: {
    gap: 'gap-4',
    cols: 'grid-cols-1',
  },
} as const

/**
 * Transition Durations for CSS Transitions
 */
export const TRANSITIONS = {
  fast: 'transition-all duration-150',
  base: 'transition-all duration-300',
  slow: 'transition-all duration-500',
} as const

/**
 * Backdrop Blur Utilities
 */
export const BLUR = {
  sm: 'backdrop-blur-sm',
  base: 'backdrop-blur',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
  '2xl': 'backdrop-blur-2xl',
  '3xl': 'backdrop-blur-3xl',
} as const
