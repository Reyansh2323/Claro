'use client'

import { KeyMetric } from '@/types/document'

interface MetricsDisplayProps {
  metrics: KeyMetric[]
}

const categoryIcons = {
  financial: '💰',
  date: '📅',
  count: '🔢',
  percentage: '📊',
  other: 'i',
} as const

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Numbers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">
                {categoryIcons[metric.category]}
              </span>
              <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                {metric.category}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {metric.value}
            </p>
            <p className="text-xs text-gray-700">{metric.explanation}</p>
            {metric.confidence !== undefined && (
              <div className="mt-2">
                <p className="text-xs text-gray-600 mb-1">
                  Confidence: {(metric.confidence * 100).toFixed(0)}%
                </p>
                <div className="w-full bg-gray-300 rounded-full h-1">
                  <div
                    className="bg-blue-600 h-1 rounded-full"
                    style={{ width: `${metric.confidence * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        {metrics.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-8">
            No metrics extracted from this document
          </p>
        )}
      </div>
    </div>
  )
}
