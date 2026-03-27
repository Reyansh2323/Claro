'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  FileText,
  AlertCircle,
  CheckCircle,
  Download,
  Share2,
  Archive,
} from 'lucide-react'
import {
  MOCK_DOCUMENTS,
  DOCUMENT_STATUS,
  MOCK_AI_INSIGHTS,
} from '@/lib/constants'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 18 } },
}

export default function DocumentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const documentId = params.id as string

  const document = MOCK_DOCUMENTS.find((d) => d.id === documentId)
  const statusConfig = document
    ? DOCUMENT_STATUS[document.status as keyof typeof DOCUMENT_STATUS] ||
      DOCUMENT_STATUS.PROCESSING
    : null

  if (!document || !statusConfig) {
    return (
      <div className="space-y-6">
        <motion.button
          onClick={() => router.back()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 text-text-dim hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        <div
          className="p-12 rounded-xl text-center"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Document Not Found</h2>
          <p className="text-sm text-text-dim">
            The document you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    )
  }

  const documentDate = new Date(document.date)

  const riskConfig: Record<string, { dot: string; text: string; label: string }> = {
    low: { dot: 'bg-accent-emerald', text: 'text-accent-emerald', label: 'Low' },
    medium: { dot: 'bg-yellow-400', text: 'text-yellow-400', label: 'Medium' },
    high: { dot: 'bg-red-400', text: 'text-red-400', label: 'High' },
  }
  const risk = riskConfig[document.riskLevel] || riskConfig.low

  const statusBadgeColors: Record<string, string> = {
    success: 'badge-success',
    info: 'badge-info',
    warning: 'badge-warning',
    error: 'badge-error',
    default: '',
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1200px]">
      {/* Back Button */}
      <motion.button
        variants={item}
        onClick={() => router.back()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 text-text-dim hover:text-white transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </motion.button>

      {/* Page Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(6, 182, 212, 0.08)' }}
          >
            <FileText size={22} className="text-accent-cyan" />
          </div>
          <div>
            <h1 className="text-display text-2xl text-white">{document.name}</h1>
            <p className="text-sm text-text-dim mt-1">
              Uploaded {documentDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <span className={`badge-obsidian ${statusBadgeColors[statusConfig.variant] || ''} text-xs`}>
          {statusConfig.label}
        </span>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Info */}
          <motion.div
            variants={item}
            className="p-6 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <h2 className="text-sm font-semibold text-white mb-5">Document Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] text-text-dim font-medium tracking-wider uppercase mb-1.5">Status</p>
                <span className={`badge-obsidian ${statusBadgeColors[statusConfig.variant] || ''} text-[10px]`}>
                  {statusConfig.label}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-text-dim font-medium tracking-wider uppercase mb-1.5">Upload Date</p>
                <p className="text-sm text-white font-medium">
                  {documentDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-text-dim font-medium tracking-wider uppercase mb-1.5">File Name</p>
                <p className="text-sm text-text-secondary truncate">{document.name}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-dim font-medium tracking-wider uppercase mb-1.5">Risk Level</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${risk.dot}`} />
                  <span className={`${risk.text} font-medium text-sm`}>{risk.label}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Analysis */}
          <motion.div
            variants={item}
            className="p-6 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <h2 className="text-sm font-semibold text-white mb-4">AI Analysis Summary</h2>
            <p className="text-sm text-text-muted leading-relaxed">
              {MOCK_AI_INSIGHTS.summary}
            </p>
          </motion.div>
        </div>

        {/* Sidebar — 1 col */}
        <div className="space-y-6">
          {/* Action Items */}
          <motion.div
            variants={item}
            className="p-6 rounded-xl"
            style={{
              background: 'rgba(0, 0, 0, 0.30)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <h3 className="text-sm font-semibold text-white mb-4">Action Items</h3>
            <ul className="space-y-3">
              {MOCK_AI_INSIGHTS.actionItems.map((actionItem, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.08 }}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle size={14} className="text-accent-cyan mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-text-muted leading-relaxed">{actionItem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={item}
            className="p-6 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: Download, label: 'Download Report' },
                { icon: Share2, label: 'Share Document' },
                { icon: Archive, label: 'Archive' },
              ].map((action, i) => {
                const Icon = action.icon
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-medium text-text-secondary flex items-center gap-2 transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <Icon size={14} />
                    {action.label}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
