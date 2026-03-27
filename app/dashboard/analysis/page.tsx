'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassBadge } from '@/components/ui/GlassBadge'
import { Loading } from '@/components/shared/Loading'
import { ArrowLeft, AlertCircle, CheckCircle, Zap } from 'lucide-react'
import {
  DOCUMENT_STATUS,
} from '@/lib/constants'
import { createClient } from '@/lib/supabaseBrowser'
import { getEntranceAnimation } from '@/hooks/useAnimations'

interface DocumentRow {
  id: string
  file_name: string
  status: string
  created_at: string
  user_id: string
}

interface AnalysisRow {
  id: string
  document_id: string
  summary: string
  action_items: string[]
}

export default function AnalysisPage() {
  const router = useRouter()
  const [document, setDocument] = useState<DocumentRow | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get logged-in user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        // Fetch most recent document for this user
        const { data: docsData, error: docsError } = await supabase
          .from('documents')
          .select('id, file_name, status, created_at, user_id')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)

        if (docsError || !docsData || docsData.length === 0) {
          setError('No documents found')
          setLoading(false)
          return
        }

        const mostRecentDoc = docsData[0]
        setDocument(mostRecentDoc)

        // Fetch analysis for this document
        const { data: analysisData, error: analysisError } = await supabase
          .from('analyses')
          .select('id, document_id, summary, action_items')
          .eq('document_id', mostRecentDoc.id)
          .limit(1)

        if (!analysisError && analysisData && analysisData.length > 0) {
          setAnalysis(analysisData[0])
        }
      } catch (err) {
        console.error('Error fetching analysis:', err)
        setError('Failed to load analysis')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    )
  }

  if (error || !document) {
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
            <AlertCircle size={48} className="text-yellow-400 mb-4" />
            <h2 className="heading-md text-text-primary mb-2">No analyses available</h2>
            <p className="text-text-muted">
              {error || "You haven't uploaded any documents yet."}
            </p>
          </div>
        </GlassCard>
      </div>
    )
  }

  const statusConfig = DOCUMENT_STATUS[document.status?.toUpperCase() as keyof typeof DOCUMENT_STATUS] || DOCUMENT_STATUS.PROCESSING
  const documentDate = new Date(document.created_at)

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
              <Zap size={24} className="text-accent-cyan" />
            </div>
            <div>
              <h1 className="heading-md text-text-primary">Latest Analysis</h1>
              <p className="text-text-secondary text-sm mt-1">
                {document.file_name}
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
                  <p className="text-text-secondary text-sm truncate">{document.file_name}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* AI Analysis Card */}
          {analysis ? (
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
                  {analysis.summary}
                </p>
              </GlassCard>
            </motion.div>
          ) : (
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
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle size={40} className="text-yellow-400 mb-4" />
                  <h3 className="heading-sm text-text-primary mb-2">Analysis Not Available</h3>
                  <p className="text-text-muted text-sm">
                    AI analysis is being processed for this document.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>

        {/* Sidebar - 1 col */}
        <div className="space-y-6">
          {/* Action Items Card */}
          {analysis && Array.isArray(analysis.action_items) && analysis.action_items.length > 0 && (
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
                  {analysis.action_items.map((item: string, idx: number) => (
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
                      className="flex items-start gap-3"
                    >
                      <CheckCircle size={16} className="text-accent-cyan mt-1 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
