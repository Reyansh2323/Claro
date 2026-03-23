'use client'

import { useCallback, useState } from 'react'
import { useDocumentStore } from '@/store/documentStore'

export function useUpload() {
  const { addDocument } = useDocumentStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const uploadDocument = useCallback(
    async (file: File) => {
      setIsLoading(true)
      setError(null)
      setProgress(0)

      try {
        const formData = new FormData()
        formData.append('file', file)

        // TODO: Implement file upload
        // const response = await fetch('/api/upload', {
        //   method: 'POST',
        //   body: formData,
        // })
        // const data = await response.json()

        // Simulate document creation
        const fileType: 'pdf' | 'docx' | 'txt' = file.type.includes('pdf')
          ? 'pdf'
          : file.type.includes('word')
            ? 'docx'
            : 'txt'

        const newDocument = {
          id: Math.random().toString(36).substr(2, 9),
          fileName: file.name,
          fileType,
          uploadedAt: new Date().toISOString(),
          fileSize: file.size,
          status: 'PROCESSING' as const,
          tags: [],
        }

        addDocument(newDocument)
        setProgress(100)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [addDocument]
  )

  return { uploadDocument, isLoading, error, progress }
}
