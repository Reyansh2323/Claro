import { Document, DocumentAnalysis, ChatMessage } from './document'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface DocumentsResponse {
  documents: Document[]
  total: number
  page: number
  pages: number
}

export interface UploadResponse {
  documentId: string
  status: string
}

export interface DocumentDetailResponse {
  document: Document
  analysis: DocumentAnalysis
}

export interface ChatResponse {
  message: ChatMessage
}
