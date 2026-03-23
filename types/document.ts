// Document types
export interface Document {
  id: string
  fileName: string
  fileType: 'pdf' | 'docx' | 'txt'
  uploadedAt: string
  fileSize: number
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  errorMessage?: string
  tags?: DocumentTag[]
  analysis?: DocumentAnalysis
}

export interface DocumentTag {
  id: string
  name: string
  color?: string
}

// Analysis types
export interface DocumentAnalysis {
  id: string
  documentId: string
  summary: SummaryData
  keyMetrics: KeyMetric[]
  actionItems: ActionItem[]
  flags: Flag[]
  tokensUsed: number
  analysisTime: number
  modelUsed: string
  createdAt: string
}

export interface SummaryData {
  overview: string
  documentType: string
  userImpactStatement: string
}

export interface KeyMetric {
  id: string
  label: string
  value: string
  category: 'financial' | 'date' | 'count' | 'percentage' | 'other'
  explanation: string
  confidence: number
}

export interface ActionItem {
  id: string
  title: string
  description: string
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  dueDate?: string
  dueInDays?: number
  consequence: string
  completed: boolean
  completedAt?: string
}

export interface Flag {
  id: string
  title: string
  description: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO'
  category: 'risk' | 'inconsistency' | 'opportunity' | 'missing_info'
}

// Chat types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export interface DocumentChat {
  id: string
  documentId: string
  messages: ChatMessage[]
}
