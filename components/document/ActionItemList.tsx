'use client'

import { ActionItem } from '@/types/document'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/shared/Badge'

interface ActionItemListProps {
  items: ActionItem[]
}

const priorityColors = {
  CRITICAL: 'error',
  HIGH: 'warning',
  MEDIUM: 'info',
  LOW: 'success',
} as const

const priorityIcons = {
  CRITICAL: '🔴',
  HIGH: '🟠',
  MEDIUM: '🟡',
  LOW: '🟢',
} as const

export function ActionItemList({ items }: ActionItemListProps) {
  const sortedItems = [...items].sort((a, b) => {
    const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Action Items</h2>
      <div className="space-y-4">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-2xl">{priorityIcons[item.priority]}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <Badge
                    label={item.priority}
                    variant={priorityColors[item.priority]}
                    size="sm"
                  />
                </div>
              </div>
              {item.dueDate && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Due {formatDistanceToNow(new Date(item.dueDate), { addSuffix: true })}
                  </p>
                </div>
              )}
            </div>
            <p className="text-gray-700 mb-3">{item.description}</p>
            <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
              <p className="text-sm text-yellow-900">
                <strong>Why it matters:</strong> {item.consequence}
              </p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No action items found for this document
          </p>
        )}
      </div>
    </div>
  )
}
