'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Trash2, ExternalLink, Search, MoreHorizontal } from 'lucide-react'
import { useDocuments } from '@/hooks/useDocuments'
import { useDocumentStore } from '@/store/documentStore'
import { DOCUMENT_STATUS } from '@/lib/constants'
import { formatDistanceToNow } from 'date-fns'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 18 } },
}

export default function HistoryPage() {
  const { fetchDocuments, deleteDocument, isLoading } = useDocuments()
  const documents = useDocumentStore((state) => state.documents)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const filteredDocs = documents.filter((doc) =>
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { dotClass: string; badgeClass: string }> = {
      PENDING: { dotClass: 'bg-yellow-400', badgeClass: 'badge-warning' },
      PROCESSING: { dotClass: 'bg-accent-cyan status-dot--processing', badgeClass: 'badge-info' },
      COMPLETED: { dotClass: 'bg-accent-emerald', badgeClass: 'badge-success' },
      FAILED: { dotClass: 'bg-red-400', badgeClass: 'badge-error' },
    }
    const info = DOCUMENT_STATUS[status as keyof typeof DOCUMENT_STATUS]
    const config = configs[status] || { dotClass: 'bg-text-dim', badgeClass: '' }
    return { ...config, label: info?.label || status }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1200px]">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-display text-3xl text-white mb-1">Risk Intelligence</h1>
          <p className="text-sm text-text-dim">Complete history of processed documents</p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="mb-6">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Documents List */}
      <motion.div
        variants={item}
        className="rounded-xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {isLoading ? (
          <div className="px-6 py-16 text-center">
            <div className="inline-block w-6 h-6 rounded-full border-2 border-white/10 border-t-accent-emerald animate-spin mb-3" />
            <p className="text-xs text-text-dim">Loading documents...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FileText size={32} className="text-text-dim mx-auto mb-3" />
            <p className="text-sm text-text-muted mb-1">
              {searchQuery ? 'No documents match your search' : 'No documents yet'}
            </p>
            <p className="text-xs text-text-dim">
              {searchQuery ? 'Try a different search term' : 'Upload your first document to get started'}
            </p>
          </div>
        ) : (
          <div>
            {/* Table Header */}
            <div className="px-6 py-3 border-b border-white/[0.06] grid grid-cols-12 gap-4">
              <div className="col-span-5 text-[10px] text-text-dim font-medium tracking-wider uppercase">Document</div>
              <div className="col-span-2 text-[10px] text-text-dim font-medium tracking-wider uppercase">Status</div>
              <div className="col-span-3 text-[10px] text-text-dim font-medium tracking-wider uppercase">Date</div>
              <div className="col-span-2 text-[10px] text-text-dim font-medium tracking-wider uppercase text-right">Actions</div>
            </div>

            {filteredDocs.map((doc) => {
              const status = getStatusBadge(doc.status)
              return (
                <div key={doc.id} className="table-row-glass px-6 py-3.5 grid grid-cols-12 gap-4 items-center group">
                  <div className="col-span-5 flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                      <FileText size={14} className="text-text-dim" />
                    </div>
                    <Link
                      href={`/dashboard/documents/${doc.id}`}
                      className="text-sm text-text-secondary hover:text-white transition-colors truncate font-medium"
                    >
                      {doc.fileName}
                    </Link>
                  </div>

                  <div className="col-span-2">
                    <span className={`badge-obsidian ${status.badgeClass} text-[10px]`}>
                      <span className={`status-dot ${status.dotClass}`} />
                      {status.label}
                    </span>
                  </div>

                  <div className="col-span-3">
                    <span className="text-xs text-text-dim">
                      {doc.uploadedAt
                        ? formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })
                        : 'Unknown'}
                    </span>
                  </div>

                  <div className="col-span-2 flex justify-end relative">
                    <button
                      onClick={() => setMenuOpenId(menuOpenId === doc.id ? null : doc.id)}
                      className="p-1.5 rounded-md text-text-dim hover:text-text-secondary hover:bg-white/[0.04] transition-all opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                    {menuOpenId === doc.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 top-8 w-36 rounded-lg py-1 z-50"
                        style={{
                          background: 'rgba(10, 10, 10, 0.95)',
                          border: '1px solid rgba(255, 255, 255, 0.10)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                        }}
                      >
                        <Link
                          href={`/dashboard/documents/${doc.id}`}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs text-text-secondary hover:text-white hover:bg-white/[0.04] transition-colors"
                        >
                          <ExternalLink size={12} /> View Details
                        </Link>
                        <button
                          onClick={async () => {
                            await deleteDocument(doc.id)
                            setMenuOpenId(null)
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
