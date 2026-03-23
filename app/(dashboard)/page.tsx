'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDocumentStore } from '@/store/documentStore'
import { useDocuments } from '@/hooks/useDocuments'
import { Button } from '@/components/shared/Button'
import { Badge } from '@/components/shared/Badge'
import { Loading } from '@/components/shared/Loading'
import { formatDistanceToNow } from 'date-fns'

export default function DashboardPage() {
  const { documents, isLoading, fetchDocuments } = useDocuments()
  const { setSearchTerm, searchTerm, getFilteredDocuments } =
    useDocumentStore()
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const filteredDocuments = getFilteredDocuments().filter(
    (doc) => statusFilter === 'ALL' || doc.status === statusFilter
  )

  const stats = {
    total: documents.length,
    completed: documents.filter((d) => d.status === 'COMPLETED').length,
    processing: documents.filter((d) => d.status === 'PROCESSING').length,
    failed: documents.filter((d) => d.status === 'FAILED').length,
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Manage and analyze your documents
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Documents', value: stats.total, icon: '📄' },
          { label: 'Completed', value: stats.completed, icon: '✅' },
          { label: 'Processing', value: stats.processing, icon: '⏳' },
          { label: 'Failed', value: stats.failed, icon: '❌' },
        ].map((stat, i) => (
          <div key={i} className="card text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Search</label>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <Link href="/upload" className="flex-1">
              <Button variant="primary" fullWidth>
                Upload Document
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Documents List */}
      {isLoading ? (
        <Loading message="Loading documents..." />
      ) : filteredDocuments.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No documents yet
          </h3>
          <p className="text-gray-600 mb-6">
            Upload your first document to get started
          </p>
          <Link href="/upload">
            <Button variant="primary">Upload Document</Button>
          </Link>
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Document
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Uploaded
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {doc.fileName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {formatDistanceToNow(new Date(doc.uploadedAt), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="py-4 px-4">
                      {doc.status === 'COMPLETED' && (
                        <Link href={`/documents/${doc.id}`}>
                          <Button variant="primary" size="sm">
                            View
                          </Button>
                        </Link>
                      )}
                      {doc.status === 'PROCESSING' && (
                        <span className="text-gray-500 text-sm">
                          Analyzing...
                        </span>
                      )}
                      {doc.status === 'FAILED' && (
                        <span className="text-red-600 text-sm">Failed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    PENDING: { label: 'Pending', variant: 'warning' as const },
    PROCESSING: { label: 'Processing', variant: 'info' as const },
    COMPLETED: { label: 'Completed', variant: 'success' as const },
    FAILED: { label: 'Failed', variant: 'error' as const },
  } as const

  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    variant: 'info' as const,
  }

  return <Badge label={config.label} variant={config.variant} />
}
