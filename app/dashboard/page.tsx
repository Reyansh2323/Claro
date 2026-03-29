'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FileText,
  ShieldAlert,
  DollarSign,
  Clock,
  Upload,
  ArrowRight,
  MoreHorizontal,
  Trash2,
  ExternalLink,
  Activity,
  Sparkles,
} from 'lucide-react'
import { useDocuments } from '@/hooks/useDocuments'
import { useDocumentStore } from '@/store/documentStore'
import { DOCUMENT_STATUS } from '@/lib/constants'
import { formatDistanceToNow } from 'date-fns'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 18 } },
}

export default function DashboardPage() {
  const { fetchDocuments, deleteDocument, isLoading } = useDocuments()
  const documents = useDocumentStore((state) => state.documents)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  // KPI calculations from real data
  const totalDocs = documents.length
  const criticalFlags = documents.filter((d) => d.status === 'FAILED').length
  const processedDocs = documents.filter((d) => d.status === 'COMPLETED').length
  const pendingDocs = documents.filter((d) => d.status === 'PROCESSING' || d.status === 'PENDING').length

  const KPI_CARDS = [
    {
      label: 'Documents Processed',
      value: totalDocs.toString(),
      delta: `${processedDocs} analyzed`,
      icon: FileText,
      color: 'text-accent-cyan',
      glowColor: 'rgba(6, 182, 212, 0.08)',
      borderColor: 'rgba(6, 182, 212, 0.15)',
    },
    {
      label: 'Critical Risks',
      value: criticalFlags.toString(),
      delta: 'Flagged items',
      icon: ShieldAlert,
      color: criticalFlags > 0 ? 'text-red-400' : 'text-accent-emerald',
      glowColor: criticalFlags > 0 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
      borderColor: criticalFlags > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
    },
    {
      label: 'Financial Liability',
      value: '$0',
      delta: 'Extracted value',
      icon: DollarSign,
      color: 'text-yellow-400',
      glowColor: 'rgba(245, 158, 11, 0.08)',
      borderColor: 'rgba(245, 158, 11, 0.15)',
    },
    {
      label: 'Pending Deadlines',
      value: pendingDocs.toString(),
      delta: 'Awaiting review',
      icon: Clock,
      color: 'text-purple-400',
      glowColor: 'rgba(147, 51, 234, 0.08)',
      borderColor: 'rgba(147, 51, 234, 0.15)',
    },
  ]

  const getStatusConfig = (status: string) => {
    const statusInfo = DOCUMENT_STATUS[status as keyof typeof DOCUMENT_STATUS]
    if (!statusInfo) return { dotClass: 'bg-text-dim', label: status, badgeClass: '' }

    const configs: Record<string, { dotClass: string; badgeClass: string }> = {
      PENDING: { dotClass: 'bg-yellow-400', badgeClass: 'badge-warning' },
      PROCESSING: { dotClass: 'bg-accent-cyan status-dot--processing', badgeClass: 'badge-info' },
      COMPLETED: { dotClass: 'bg-accent-emerald', badgeClass: 'badge-success' },
      FAILED: { dotClass: 'bg-red-400', badgeClass: 'badge-error' },
    }

    const config = configs[status] || { dotClass: 'bg-text-dim', badgeClass: '' }
    return { ...config, label: statusInfo.label }
  }

  const handleDelete = async (docId: string) => {
    try {
      await deleteDocument(docId)
      setMenuOpenId(null)
    } catch (error) {
      console.error('Failed to delete document:', error)
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-[1400px]"
    >
      {/* Page Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-3xl text-white mb-1">Command Center</h1>
          <p className="text-sm text-text-dim">Real-time overview of your document intelligence pipeline</p>
        </div>
        <Link href="/dashboard/upload">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-cyan text-black text-sm font-semibold transition-all"
            style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)' }}
          >
            <Upload size={16} />
            Upload Document
          </motion.button>
        </Link>
      </motion.div>

      {/* KPI Matrix */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.3 + index * 0.08 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="relative p-5 rounded-xl transition-all duration-300 group cursor-default"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${kpi.borderColor}`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px ${kpi.glowColor}`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: kpi.glowColor }}
                >
                  <Icon size={18} className={kpi.color} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1 tracking-tight">{kpi.value}</p>
              <p className="text-xs text-text-dim font-medium">{kpi.label}</p>
              <p className="text-[10px] text-text-dim mt-1">{kpi.delta}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Documents Table — 2 columns */}
        <motion.div
          variants={item}
          className="lg:col-span-2 rounded-xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white tracking-wide">Recent Documents</h2>
            <Link
              href="/dashboard/history"
              className="text-xs text-text-dim hover:text-text-secondary transition-colors flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          {/* Table Body */}
          {isLoading ? (
            <div className="px-6 py-16 text-center">
              <div className="inline-block w-6 h-6 rounded-full border-2 border-white/10 border-t-accent-emerald animate-spin mb-3" />
              <p className="text-xs text-text-dim">Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <FileText size={32} className="text-text-dim mx-auto mb-3" />
              <p className="text-sm text-text-muted mb-1">No documents yet</p>
              <p className="text-xs text-text-dim">Upload your first document to get started</p>
            </div>
          ) : (
            <div>
              {documents.slice(0, 8).map((doc) => {
                const statusConfig = getStatusConfig(doc.status)
                return (
                  <div
                    key={doc.id}
                    className="table-row-glass px-6 py-3.5 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                        <FileText size={14} className="text-text-dim" />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/dashboard/documents/${doc.id}`}
                          className="text-sm text-text-secondary hover:text-white transition-colors truncate block font-medium"
                        >
                          {doc.fileName}
                        </Link>
                        <p className="text-[11px] text-text-dim">
                          {doc.uploadedAt
                            ? formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })
                            : 'Unknown date'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status Badge */}
                      <span className={`badge-obsidian ${statusConfig.badgeClass} text-[10px]`}>
                        <span className={`status-dot ${statusConfig.dotClass}`} />
                        {statusConfig.label}
                      </span>

                      {/* Actions */}
                      <div className="relative">
                        <button
                          onClick={() => setMenuOpenId(menuOpenId === doc.id ? null : doc.id)}
                          className="p-1.5 rounded-md text-text-dim hover:text-text-secondary hover:bg-white/[0.04] transition-all opacity-0 group-hover:opacity-100"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                        {menuOpenId === doc.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="absolute right-0 mt-1 w-36 rounded-lg py-1 z-50"
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
                              onClick={() => handleDelete(doc.id)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* Latest Analysis & AI Neural Panel — 1 column */}
        <div className="space-y-6">
          {/* Latest Analysis */}
          <motion.div
            variants={item}
            className="rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-accent-cyan" />
                <h2 className="text-sm font-semibold text-white tracking-wide">Latest Analysis</h2>
              </div>
            </div>

            <div className="p-6">
              {documents.some(d => d.status && (d.status as string) === 'ANALYZED') ? (
                (() => {
                  const latestAnalyzed = documents
                    .filter(d => d.status && (d.status as string) === 'ANALYZED')
                    .sort((a, b) => new Date(b.uploadedAt || 0).getTime() - new Date(a.uploadedAt || 0).getTime())[0]
                  
                  return (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-text-dim font-medium mb-1">Document</p>
                        <Link
                          href={`/dashboard/documents/${latestAnalyzed.id}`}
                          className="text-sm text-accent-cyan hover:text-accent-emerald transition-colors truncate block font-medium"
                        >
                          {latestAnalyzed.fileName}
                        </Link>
                      </div>
                      <div>
                        <p className="text-xs text-text-dim font-medium mb-1">Analyzed</p>
                        <p className="text-sm text-text-secondary">
                          {latestAnalyzed.uploadedAt
                            ? formatDistanceToNow(new Date(latestAnalyzed.uploadedAt), { addSuffix: true })
                            : 'Recently'}
                        </p>
                      </div>
                      <Link
                        href={`/dashboard/documents/${latestAnalyzed.id}`}
                        className="block mt-4"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 rounded-lg text-xs font-medium text-black transition-all flex items-center justify-center gap-2"
                          style={{
                            background: 'rgba(6, 182, 212, 0.8)',
                            boxShadow: '0 0 12px rgba(6, 182, 212, 0.2)',
                          }}
                        >
                          <ExternalLink size={12} />
                          View Full Analysis
                        </motion.button>
                      </Link>
                    </div>
                  )
                })()
              ) : (
                <div className="text-center py-4">
                  <p className="text-xs text-text-dim mb-2">No documents analyzed yet</p>
                  <Link href="/dashboard/upload">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 rounded-lg text-xs font-medium text-black transition-all flex items-center justify-center gap-2"
                      style={{
                        background: 'rgba(6, 182, 212, 0.8)',
                        boxShadow: '0 0 12px rgba(6, 182, 212, 0.2)',
                      }}
                    >
                      <Upload size={12} />
                      Upload Your First Document
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* AI Neural Panel */}
          <motion.div
            variants={item}
            className="relative rounded-xl overflow-hidden scanner-container"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {/* Scanner Line */}
            <div className="scanner-line" />

          <div className="px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-accent-emerald" />
              <h2 className="text-sm font-semibold text-white tracking-wide">AI Neural Activity</h2>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* System Status */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                <span className="text-xs text-accent-emerald font-medium tracking-wider uppercase">System Online</span>
              </div>
              <div
                className="p-3 rounded-lg space-y-2"
                style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-text-dim">Neural Engine</span>
                  <span className="text-[11px] text-accent-emerald font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-text-dim">Processing Queue</span>
                  <span className="text-[11px] text-text-secondary font-medium">{pendingDocs} pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-text-dim">Model Version</span>
                  <span className="text-[11px] text-text-secondary font-medium">v2.4.1</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-xs text-text-dim font-medium tracking-wider uppercase mb-3">Latest Activity</h3>
              <div className="space-y-3">
                {documents.slice(0, 4).map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="mt-1.5">
                      <Sparkles size={10} className="text-accent-cyan" />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary leading-tight">{doc.fileName}</p>
                      <p className="text-[10px] text-text-dim mt-0.5">
                        {doc.uploadedAt
                          ? formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })
                          : 'Recently'}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {documents.length === 0 && (
                  <p className="text-xs text-text-dim">No recent activity</p>
                )}
              </div>
            </div>

            {/* Quick Action */}
            <Link href="/dashboard/upload">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 rounded-lg text-xs font-medium text-text-secondary transition-all flex items-center justify-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <Upload size={13} />
                Quick Upload
              </motion.button>
            </Link>
          </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
