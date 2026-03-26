'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassBadge } from '@/components/ui/GlassBadge'
import {
  BarChart3,
  AlertTriangle,
  Calendar,
  TrendingUp,
  TrendingDown,
  FileText,
  Eye,
} from 'lucide-react'
import {
  MOCK_KPI_DATA,
  MOCK_DOCUMENTS,
  DOCUMENT_STATUS,
  MOCK_AI_INSIGHTS,
} from '@/lib/constants'
import { getEntranceAnimation, getStaggerContainerAnimation } from '@/hooks/useAnimations'

export default function DashboardPage() {
  const [selectedDocId, setSelectedDocId] = useState<string>(MOCK_DOCUMENTS[0]?.id || '')

  const selectedDoc = MOCK_DOCUMENTS.find((d) => d.id === selectedDocId)

  const kpiCards = [
    {
      id: 'documents',
      icon: FileText,
      label: MOCK_KPI_DATA.documentsAnalyzed.label,
      value: MOCK_KPI_DATA.documentsAnalyzed.value,
      trend: MOCK_KPI_DATA.documentsAnalyzed.trend,
      color: 'text-accent-cyan',
    },
    {
      id: 'alerts',
      icon: AlertTriangle,
      label: MOCK_KPI_DATA.criticalAlerts.label,
      value: MOCK_KPI_DATA.criticalAlerts.value,
      trend: MOCK_KPI_DATA.criticalAlerts.trend,
      color: 'text-red-400',
    },
    {
      id: 'deadlines',
      icon: Calendar,
      label: MOCK_KPI_DATA.pendingDeadlines.label,
      value: MOCK_KPI_DATA.pendingDeadlines.value,
      trend: MOCK_KPI_DATA.pendingDeadlines.trend,
      color: 'text-yellow-400',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="heading-md text-text-primary mb-2">Dashboard</h1>
        <p className="text-text-secondary">Monitor your legal documents and insights at a glance</p>
      </motion.div>

      {/* KPI Cards Section */}
      <motion.div
        {...getStaggerContainerAnimation()}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {kpiCards.map((card, idx) => {
          const Icon = card.icon
          const isTrendingUp = card.trend >= 0

          return (
            <motion.div
              key={card.id}
              {...getEntranceAnimation(idx)}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
            >
              <GlassCard variant="default" hover>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-glass-light ${card.color}`}>
                    <Icon size={24} />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      isTrendingUp
                        ? 'text-accent-emerald bg-emerald-500/10'
                        : 'text-red-400 bg-red-500/10'
                    }`}
                  >
                    {isTrendingUp && <TrendingUp size={14} />}
                    {!isTrendingUp && <TrendingDown size={14} />}
                    <span>{Math.abs(card.trend)}%</span>
                  </div>
                </div>

                <p className="text-text-muted text-sm mb-2">{card.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-text-primary">
                    {card.value}
                  </span>
                  <span className="text-text-muted text-sm">this month</span>
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Main Content Grid: Table + AI Panel */}
      <motion.div
        {...getStaggerContainerAnimation()}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Documents Table Section - 2 columns */}
        <motion.div
          {...getEntranceAnimation(0)}
          className="lg:col-span-2"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
        >
          <GlassCard variant="default">
            {/* Table Header */}
            <div className="mb-6">
              <h2 className="heading-sm text-text-primary mb-1">Recent Documents</h2>
              <p className="text-text-muted text-sm">
                {MOCK_DOCUMENTS.length} documents in your library
              </p>
            </div>

            {/* Documents Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="px-4 py-3 text-left text-text-muted font-semibold">
                      Document
                    </th>
                    <th className="px-4 py-3 text-left text-text-muted font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-text-muted font-semibold">
                      Date
                    </th>
                    <th className="px-4 py-3 text-center text-text-muted font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass-border">
                  {MOCK_DOCUMENTS.map((doc, idx) => {
                    const statusConfig = DOCUMENT_STATUS[doc.status as keyof typeof DOCUMENT_STATUS] || DOCUMENT_STATUS.PROCESSING
                    const isSelected = selectedDocId === doc.id

                    return (
                      <motion.tr
                        key={doc.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 100,
                          damping: 15,
                          delay: idx * 0.05,
                        }}
                        viewport={{ once: true }}
                        className={`hover:bg-glass-light transition-colors cursor-pointer ${
                          isSelected ? 'bg-glass-light' : ''
                        }`}
                        onClick={() => setSelectedDocId(doc.id)}
                      >
                        {/* Document Name */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-text-muted" />
                            <span className="text-text-primary truncate font-medium">
                              {doc.name}
                            </span>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="px-4 py-3">
                          <GlassBadge
                            label={statusConfig.label}
                            variant={statusConfig.variant}
                            size="sm"
                          />
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3">
                          <span className="text-text-secondary">
                            {new Date(doc.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </td>

                        {/* Action Button */}
                        <td className="px-4 py-3 text-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center p-2 hover:bg-glass-light rounded-lg transition-colors"
                          >
                            <Eye size={16} className="text-accent-cyan" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Insights Panel - 1 column */}
        <motion.div
          {...getEntranceAnimation(1)}
          className="lg:col-span-1"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
        >
          <GlassCard variant="dark" hover={false}>
            {/* Panel Header */}
            <div className="mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-accent-cyan" />
              <h3 className="heading-sm text-text-primary">AI Summary</h3>
            </div>

            {/* Selected Document Info */}
            {selectedDoc && (
              <div className="space-y-4">
                {/* Document Title */}
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">
                    Selected Document
                  </p>
                  <p className="text-text-primary truncate text-sm font-medium">
                    {selectedDoc.name}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-glass-border"></div>

                {/* Plain English Summary */}
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                    Summary
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {MOCK_AI_INSIGHTS.summary}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-glass-border"></div>

                {/* Action Items */}
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                    Action Items
                  </p>
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
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="text-accent-cyan mt-1">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Divider */}
                <div className="border-t border-glass-border"></div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 px-3 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/20 transition-colors"
                >
                  View Full Analysis
                </motion.button>
              </div>
            )}

            {!selectedDoc && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText size={32} className="text-glass-border mb-3" />
                <p className="text-text-muted text-sm">
                  Select a document to view AI insights
                </p>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  )
}
