import { create } from 'zustand'
import { Document, DocumentAnalysis } from '@/types/document'

interface DocumentStore {
  documents: Document[]
  selectedDocument: Document | null
  selectedAnalysis: DocumentAnalysis | null
  isLoading: boolean
  searchTerm: string
  selectedTags: string[]

  setDocuments: (documents: Document[]) => void
  setSelectedDocument: (document: Document | null) => void
  setSelectedAnalysis: (analysis: DocumentAnalysis | null) => void
  setIsLoading: (loading: boolean) => void
  setSearchTerm: (term: string) => void
  setSelectedTags: (tags: string[]) => void
  addDocument: (document: Document) => void
  removeDocument: (documentId: string) => void
  updateDocument: (documentId: string, updates: Partial<Document>) => void

  // Filtered documents
  getFilteredDocuments: () => Document[]
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  selectedDocument: null,
  selectedAnalysis: null,
  isLoading: false,
  searchTerm: '',
  selectedTags: [],

  setDocuments: (documents) => set({ documents }),
  setSelectedDocument: (document) => set({ selectedDocument: document }),
  setSelectedAnalysis: (analysis) => set({ selectedAnalysis: analysis }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),

  addDocument: (document) =>
    set((state) => ({
      documents: [document, ...state.documents],
    })),

  removeDocument: (documentId) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== documentId),
    })),

  updateDocument: (documentId, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId ? { ...doc, ...updates } : doc
      ),
    })),

  getFilteredDocuments: () => {
    const state = get()
    const normalizedTerm = (state.searchTerm || '').toLowerCase().trim()

    return state.documents.filter((doc) => {
      const fileName = (doc.fileName || '').toString().trim()
      const matchesSearch = normalizedTerm === '' || fileName.toLowerCase().includes(normalizedTerm)
      const matchesTags =
        state.selectedTags.length === 0 ||
        doc.tags?.some((tag) => state.selectedTags.includes(tag.id))
      return matchesSearch && matchesTags
    })
  },
}))
