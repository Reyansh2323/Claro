'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FileText,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { useDocuments } from '@/hooks/useDocuments'
import { useDocumentStore } from '@/store/documentStore'
import { Loading } from '@/components/shared/Loading'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 18 } },
}

export default function AnalysisPage() {
  const { fetchDocuments, isLoading } = useDocuments()
  const documents = useDocumentStore((state) => state.documents)

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const analyzedDocs = documents.filter((d) => d.status === 'COMPLETED' || d.status === 'FAILED')
  const latestDoc = analyzedDocs[0]

  if (isLoading) {
    return <Loading message="Fetching analysis data..." />
  }

  if (!latestDoc) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center py-20"
      >
        <FileText size={48} className="text-text-dim mx-auto mb-4" />
        <h2 className="text-display text-2xl text-white mb-2">No Analysis Available</h2>
        <p className="text-sm text-text-dim mb-6">
          Upload and process a document to view AI-powered analysis.
        </p>
        <Link href="/dashboard/upload">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg bg-accent-cyan text-black font-semibold text-sm inline-flex items-center gap-2"
            style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)' }}
          >
            Upload Document <ArrowRight size={16} />
          </motion.button>
        </Link>
      </motion.div>
    )
  }

  // Build insight cards from available data
  const insights = [
    { icon: CheckCircle2, label: 'Status', value: latestDoc.status.toUpperCase(), color: 'text-accent-emerald', bg: 'rgba(16,185,129,0.08)' },
    { icon: FileText, label: 'Document', value: latestDoc.fileName, color: 'text-accent-cyan', bg: 'rgba(6,182,212,0.08)' },
    { icon: AlertTriangle, label: 'Flags', value: latestDoc.status === 'FAILED' ? 'Issues Detected' : 'Clear', color: latestDoc.status === 'FAILED' ? 'text-red-400' : 'text-accent-emerald', bg: latestDoc.status === 'FAILED' ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)' },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1200px]">
      {/* Header */}
      <motion.div variants={item} className="mb-8">
        <h1 className="text-display text-3xl text-white mb-1">Contract Analysis</h1>
        <p className="text-sm text-text-dim">AI-powered analysis of your most recent document</p>
      </motion.div>

      {/* Insight Cards */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {insights.map((insight, i) => {
          const Icon = insight.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-5 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: insight.bg }}>
                <Icon size={16} className={insight.color} />
              </div>
              <p className="text-xs text-text-dim mb-1">{insight.label}</p>
              <p className="text-sm text-white font-medium truncate">{insight.value}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Analyzed Documents List */}
      <motion.div
        variants={item}
        className="rounded-xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <Sparkles size={14} className="text-accent-cyan" />
          <h2 className="text-sm font-semibold text-white">Analyzed Documents</h2>
        </div>
        <div>
          {analyzedDocs.map((doc) => (
            <Link key={doc.id} href={`/dashboard/documents/${doc.id}`}>
              <div className="table-row-glass px-6 py-4 flex items-center justify-between hover:cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                    <FileText size={14} className="text-text-dim" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-medium">{doc.fileName}</p>
                    <p className="text-[11px] text-text-dim">{doc.status}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-text-dim" />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
