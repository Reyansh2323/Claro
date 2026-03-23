'use client'

import { SummaryData } from '@/types/document'

interface SummaryCardProps {
  summary: SummaryData
}

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <div className="card">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
          {summary.documentType}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">{summary.overview}</p>
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          What this means for you:
        </p>
        <p className="text-blue-800">{summary.userImpactStatement}</p>
      </div>
    </div>
  )
}
