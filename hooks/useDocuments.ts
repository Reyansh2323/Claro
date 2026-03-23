'use client'

import { useCallback, useEffect, useState } from 'react'
import { Document } from '@/types/document'
import { useDocumentStore } from '@/store/documentStore'

export function useDocuments() {
  const {
    documents,
    setDocuments,
    setSelectedDocument,
    setSelectedAnalysis,
    setIsLoading,
    isLoading,
    addDocument,
    removeDocument,
    updateDocument,
  } = useDocumentStore()

  const [error, setError] = useState<string | null>(null)

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true)
    try {
      // TODO: Call API endpoint
      // const response = await fetch('/api/documents')
      // const data = await response.json()
      // setDocuments(data.documents)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents')
    } finally {
      setIsLoading(false)
    }
  }, [setDocuments, setIsLoading])

  const fetchDocument = useCallback(
    async (documentId: string) => {
      setIsLoading(true)
      try {
        console.log('Fetching document:', documentId)
        // TODO: Call API endpoint
        // const response = await fetch(`/api/documents/${documentId}`)
        // const data = await response.json()
        // setSelectedDocument(data.document)
        // setSelectedAnalysis(data.analysis)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch document')
      } finally {
        setIsLoading(false)
      }
    },
    [setSelectedDocument, setSelectedAnalysis, setIsLoading]
  )

  const deleteDocument = useCallback(
    async (documentId: string) => {
      try {
        // TODO: Call API endpoint
        // await fetch(`/api/documents/${documentId}`, { method: 'DELETE' })
        removeDocument(documentId)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete document')
      }
    },
    [removeDocument]
  )

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  return {
    documents,
    isLoading,
    error,
    fetchDocuments,
    fetchDocument,
    deleteDocument,
    addDocument,
    updateDocument,
  }
}
