'use client'

import { useCallback, useEffect, useState } from 'react'
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
      const response = await fetch('/api/documents')
      if (!response.ok) {
        const result = await response.json().catch(() => null)
        const message = (result && (result as any).error) || 'Failed to fetch documents'
        throw new Error(message)
      }
      const result = await response.json()
      setDocuments(result?.data?.documents ?? [])
      setError(null)
    } catch (err: any) {
      console.error('Fetching documents error:', err)
      if (err?.message?.includes('Failed to fetch')) {
        setError('Cannot connect to Supabase. Please check your internet or environment variables.')
      } else {
        setError(err?.message || 'Failed to fetch documents')
      }
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
