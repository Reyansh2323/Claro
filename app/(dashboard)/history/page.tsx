'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDocuments } from '@/hooks/useDocuments'
import { Button } from '@/components/shared/Button'
import { Badge } from '@/components/shared/Badge'
import { Loading } from '@/components/shared/Loading'
import { formatDistanceToNow } from 'date-fns'

export default function HistoryPage() {
  const { documents, isLoading, fetchDocuments, deleteDocument } =
    useDocuments()
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date')

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const sortedDocuments = [...documents].sort((a, b) => {
    if (sortBy === 'date') {
      return (
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )
    } else {
      return a.fileName.localeCompare(b.fileName)
    }
  })

  const handleDelete = async (documentId: string, fileName: string) => {
    if (window.confirm(`Delete "${fileName}"?`)) {
      await deleteDocument(documentId)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Document History
        </h1>
        <p className="text-gray-600">
          View and manage all your analyzed documents
        </p>
      </div>

      {/* Sort Controls */}
      <div className="card mb-6">
        <div className="flex justify-between items-center">
          <div>
            <label className="label">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
              className="input w-32"
            >
              <option value="date">Most Recent</option>
              <option value="name">File Name</option>
            </select>
          </div>
          <Link href="/upload">
            <Button variant="primary">Upload New Document</Button>
          </Link>
        </div>
      </div>

      {/* Documents List */}
      {isLoading ? (
        <Loading message="Loading document history..." />
      ) : documents.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No documents yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start by uploading your first document
          </p>
          <Link href="/upload">
            <Button variant="primary">Upload Document</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedDocuments.map((doc) => (
            <div key={doc.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">📄</span>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {doc.fileName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {(doc.fileSize / 1024 / 1024).toFixed(2)} MB • Type:{' '}
                        {doc.fileType.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <Badge
                      label={doc.status}
                      variant={
                        doc.status === 'COMPLETED'
                          ? 'success'
                          : doc.status === 'PROCESSING'
                            ? 'info'
                            : doc.status === 'FAILED'
                              ? 'error'
                              : 'warning'
                      }
                      size="sm"
                    />
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex gap-1">
                        {doc.tags.map((tag) => (
                          <Badge
                            key={tag.id}
                            label={tag.name}
                            variant="info"
                            size="sm"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    Uploaded{' '}
                    {formatDistanceToNow(new Date(doc.uploadedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                <div className="flex gap-2">
                  {doc.status === 'COMPLETED' && (
                    <Link href={`/documents/${doc.id}`}>
                      <Button variant="primary" size="sm">
                        View Analysis
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(doc.id, doc.fileName)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {doc.errorMessage && (
                <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
                  <p className="text-red-800 text-sm">{doc.errorMessage}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
