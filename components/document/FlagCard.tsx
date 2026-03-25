'use client'

import { Flag } from '@/types/document'
import { Badge } from '@/components/shared/Badge'
import { AlertCircle, Triangle, Zap, Info } from 'lucide-react'

interface FlagCardProps {
  flags: Flag[]
}

const severityIcons = {
  CRITICAL: <AlertCircle className="h-5 w-5 text-red-400" />,
  HIGH: <Triangle className="h-5 w-5 text-orange-400" />,
  MEDIUM: <Zap className="h-5 w-5 text-yellow-400" />,
  LOW: <Info className="h-5 w-5 text-blue-400" />,
  INFO: <Info className="h-5 w-5 text-sky-400" />,
} as const

const severityColors = {
  CRITICAL: 'error',
  HIGH: 'warning',
  MEDIUM: 'warning',
  LOW: 'info',
  INFO: 'info',
} as const

export function FlagCard({ flags }: FlagCardProps) {
  const groupedByCategory = flags.reduce(
    (acc, flag) => {
      if (!acc[flag.category]) {
        acc[flag.category] = []
      }
      acc[flag.category].push(flag)
      return acc
    },
    {} as Record<string, Flag[]>
  )

  const categoryLabels = {
risk: 'Risks',
  inconsistency: 'Inconsistencies',
  opportunity: 'Opportunities',
  missing_info: 'Missing Information',
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Alerts & Flags</h2>
      <div className="space-y-6">
        {Object.entries(groupedByCategory).map(([category, categoryFlags]) => (
          <div key={category}>
            <h3 className="font-semibold text-gray-900 mb-3">
              {categoryLabels[category as keyof typeof categoryLabels] || category}
            </h3>
            <div className="space-y-3">
              {categoryFlags.map((flag) => (
                <div
                  key={flag.id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-xl flex-shrink-0">
                      {severityIcons[flag.severity]}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {flag.title}
                      </h4>
                      <Badge
                        label={flag.severity}
                        variant={severityColors[flag.severity]}
                        size="sm"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm ml-10">
                    {flag.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {flags.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No flags or alerts for this document
          </p>
        )}
      </div>
    </div>
  )
}
