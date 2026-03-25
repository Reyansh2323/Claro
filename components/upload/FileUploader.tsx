'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface FileUploaderProps {
  onUpload: (file: File) => Promise<void>
  isLoading?: boolean
  maxSize?: number
}

export function FileUploader({
  onUpload,
  isLoading = false,
  maxSize = 50 * 1024 * 1024,
}: FileUploaderProps) {
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null)

      if (rejectedFiles.length > 0) {
        setError('Some files were rejected. Please check file size and type.')
        return
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        if (file.size > maxSize) {
          setError(`File size exceeds ${maxSize / 1024 / 1024}MB limit`)
          return
        }
        setSelectedFile(file)
      }
    },
    [maxSize]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'text/plain': ['.txt'],
    },
    disabled: isLoading,
  })

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        await onUpload(selectedFile)
        setSelectedFile(null)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Upload failed. Try again.'
        )
      }
    }
  }

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="mb-3 flex items-center justify-center text-brand-primary">
          <FileText className="h-10 w-10" />
        </div>
        <p className="text-lg font-semibold text-brand-text mb-1">
          Drag and drop your document here
        </p>
        <p className="text-gray-500 text-sm mb-4">
          or click to browse (PDF, DOCX, TXT up to 50MB)
        </p>
      </div>

      {selectedFile && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-800">{selectedFile.name}</p>
              <p className="text-sm text-gray-600">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <Button
            onClick={handleUpload}
            variant="primary"
            loading={isLoading}
            fullWidth
          >
            {isLoading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}
