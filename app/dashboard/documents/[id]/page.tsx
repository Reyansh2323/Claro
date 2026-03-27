'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassBadge } from '@/components/ui/GlassBadge'
import { GlassButton } from '@/components/ui/GlassButton'
import { ArrowLeft, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import {
  MOCK_DOCUMENTS,
  DOCUMENT_STATUS,
  MOCK_AI_INSIGHTS,
} from '@/lib/constants'
import { getEntranceAnimation } from '@/hooks/useAnimations'

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
      <div className="space-y-8">
        <motion.button
          onClick={() => router.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-accent-cyan hover:text-accent-white transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        <GlassCard>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle size={48} className="text-red-400 mb-4" />
            <h2 className="heading-md text-red-400 mb-2">Document Not Found</h2>
            <p className="text-text-muted">
              The document you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </GlassCard>
      </div>
    )
  }

  const documentDate = new Date(document.date)

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-accent-cyan hover:text-accent-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Dashboard</span>
      </motion.button>

      {/* Page Header */}
      <motion.div
        {...getEntranceAnimation()}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-glass-light">
              <FileText size={24} className="text-accent-cyan" />
            </div>
            <div>
              <h1 className="heading-md text-text-primary">{document.name}</h1>
              <p className="text-text-secondary text-sm mt-1">
                Uploaded {documentDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <GlassBadge
            label={statusConfig.label}
            variant={statusConfig.variant}
            size="md"
          />
        </div>
      </motion.div>

      {/* Content Grid */}
      <motion.div
        {...getEntranceAnimation(0.2)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Main Content - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Info Card */}
          <motion.div
            {...getEntranceAnimation(0.3)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          >
            <GlassCard>
              <h2 className="heading-sm text-text-primary mb-4">Document Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">
                    Status
                  </p>
                  <GlassBadge
                    label={statusConfig.label}
                    variant={statusConfig.variant}
                    size="sm"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">
                    Upload Date
                  </p>
                  <p className="text-text-primary font-medium">
                    {documentDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">
                    File Name
                  </p>
                  <p className="text-text-secondary text-sm truncate">{document.name}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">
                    Risk Level
                  </p>
                  <div className="flex items-center gap-2">
                    {document.riskLevel === 'low' && (
                      <>
                        <div className="w-2 h-2 rounded-full bg-accent-emerald"></div>
                        <span className="text-accent-emerald font-medium text-sm">Low</span>
                      </>
                    )}
                    {document.riskLevel === 'medium' && (
                      <>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <span className="text-yellow-400 font-medium text-sm">Medium</span>
                      </>
                    )}
                    {document.riskLevel === 'high' && (
                      <>
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <span className="text-red-400 font-medium text-sm">High</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* AI Analysis Card */}
          <motion.div
            {...getEntranceAnimation(0.4)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          >
            <GlassCard>
              <h2 className="heading-sm text-text-primary mb-4">AI Analysis Summary</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                {MOCK_AI_INSIGHTS.summary}
              </p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Sidebar - 1 col */}
        <div className="space-y-6">
          {/* Action Items Card */}
          <motion.div
            {...getEntranceAnimation(0.5)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          >
            <GlassCard variant="dark">
              <h3 className="heading-sm text-text-primary mb-4">Action Items</h3>
              <ul className="space-y-2">
                {MOCK_AI_INSIGHTS.actionItems.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 15,
                      delay: idx * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="flex items-start gap -3"
                  >
                    <CheckCircle size={16} className="text-accent-cyan mt-1 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            {...getEntranceAnimation(0.6)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          >
            <GlassCard>
              <h3 className="heading-sm text-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <GlassButton variant="secondary" fullWidth size="sm">
                  Download Report
                </GlassButton>
                <GlassButton variant="secondary" fullWidth size="sm">
                  Share Document
                </GlassButton>
                <GlassButton variant="secondary" fullWidth size="sm" >
                  Archive
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
