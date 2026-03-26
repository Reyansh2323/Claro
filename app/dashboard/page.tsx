'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, CheckCircle2, Clock, XCircle, Inbox } from 'lucide-react'
import { useDocumentStore } from '@/store/documentStore'
import { useDocuments } from '@/hooks/useDocuments'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/shared/Badge'
import { Loading } from '@/components/shared/Loading'
import { ThemeSwitch } from '@/components/shared/ThemeSwitch'
import { runConnectionDiagnostics } from '@/lib/debugConnections'
import { formatDistanceToNow } from 'date-fns'

export default function DashboardPage() {
  const { documents, isLoading, fetchDocuments, createDocument } = useDocuments()
  const { setSearchTerm, searchTerm, getFilteredDocuments } =
    useDocumentStore()
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const filteredDocuments = getFilteredDocuments().filter(
    (doc) => statusFilter === 'ALL' || doc.status === statusFilter
  )

  const formatUploadedAt = (uploadedAt: string | undefined | null) => {
    if (!uploadedAt) return 'Unknown upload time'
    const date = new Date(uploadedAt)
    if (Number.isNaN(date.getTime())) return 'Unknown upload time'
    return formatDistanceToNow(date, { addSuffix: true })
  }

  const stats = {
    total: documents.length,
    completed: documents.filter((d) => d.status === 'COMPLETED').length,
    processing: documents.filter((d) => d.status === 'PROCESSING').length,
    failed: documents.filter((d) => d.status === 'FAILED').length,
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-slate-300">
            Manage and analyze your documents
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/upload" className="btn btn-primary">
            Upload Document
          </Link>
          <button
            onClick={async () => {
              try {
                await createDocument?.('test.png', 'https://example.com/test.png')
              } catch (err) {
                console.error('Create test doc failed', err)
              }
            }}
            className="btn btn-secondary"
          >
            Insert Test Document
          </button>
          <button
            onClick={async () => {
              setIsRunningDiagnostics(true)
              try {
                await runConnectionDiagnostics()
              } catch (err) {
                console.error('Diagnostics failed:', err)
              } finally {
                setIsRunningDiagnostics(false)
              }
            }}
            disabled={isRunningDiagnostics}
            className="px-2 py-1 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded opacity-50 hover:opacity-100"
            title="Run Connection Test (Raptor Debug)"
          >
            {isRunningDiagnostics ? 'Running...' : '🔧'}
          </button>
          <ThemeSwitch />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Documents', value: stats.total, icon: <FileText className="h-8 w-8" /> },
          { label: 'Completed', value: stats.completed, icon: <CheckCircle2 className="h-8 w-8" /> },
          { label: 'Processing', value: stats.processing, icon: <Clock className="h-8 w-8" /> },
          { label: 'Failed', value: stats.failed, icon: <XCircle className="h-8 w-8" /> },
        ].map((stat, i) => (
          <Card key={i} className="text-center">
            <div className="mb-2 text-brand-primary flex items-center justify-center">{stat.icon}</div>
            <p className="text-brand-muted text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-brand-text">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              label="Search"
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Status"
              as="select"
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
              className="text-brand-text"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
            </Input>
          </div>
          <div className="flex items-end gap-2">
            <Link href="/dashboard/upload" className="flex-1">
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
        <Card className="text-center py-12">
          <div className="mb-4 flex items-center justify-center text-brand-primary">
            <Inbox className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-semibold text-brand-text mb-2">
            No documents yet
          </h3>
          <p className="text-gray-600 mb-6">
            Upload your first document to get started
          </p>
          <Link href="/dashboard/upload">
            <Button variant="primary">Upload Document</Button>
          </Link>
        </Card>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-slate-200">
                    Document
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-slate-200">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-slate-200">
                    Uploaded
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-slate-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-slate-100">
                          {doc.fileName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-slate-400">
                      {formatUploadedAt(doc.uploadedAt)}
                    </td>
                    <td className="py-4 px-4">
                      {doc.status === 'COMPLETED' && (
                        <Link href={`/dashboard/documents/${doc.id}`}>
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
