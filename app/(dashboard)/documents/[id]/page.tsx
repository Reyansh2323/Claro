'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useDocumentStore } from '@/store/documentStore'
import { useDocuments } from '@/hooks/useDocuments'
import { useChat } from '@/hooks/useChat'
import { SummaryCard } from '@/components/document/SummaryCard'
import { MetricsDisplay } from '@/components/document/MetricsDisplay'
import { ActionItemList } from '@/components/document/ActionItemList'
import { FlagCard } from '@/components/document/FlagCard'
import { ChatBar } from '@/components/document/ChatBar'
import { Loading } from '@/components/shared/Loading'

export default function DocumentResultsPage() {
  const params = useParams()
  const documentId = params.id as string

  const { fetchDocument } = useDocuments()
  const { selectedDocument, selectedAnalysis, isLoading } = useDocumentStore()
  const { messages, isLoading: isChatLoading, sendMessage } = useChat(documentId)

  useEffect(() => {
    if (documentId) {
      fetchDocument(documentId)
    }
  }, [documentId, fetchDocument])

  if (isLoading) {
    return <Loading message="Loading document analysis..." />
  }

  if (!selectedDocument || !selectedAnalysis) {
    return (
      <div className="card text-center py-12">
        <div className="text-5xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Document not found
        </h2>
        <p className="text-gray-600">
          The document you&apos;re looking for doesn&apos;t exist or hasn&apos;t been analyzed yet.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {selectedDocument.fileName}
        </h1>
        <p className="text-gray-600">
          Document status: <span className="font-semibold">{selectedDocument.status}</span>
        </p>
      </div>

      {/* Summary */}
      <SummaryCard summary={selectedAnalysis.summary} />

      {/* Key Metrics */}
      <MetricsDisplay metrics={selectedAnalysis.keyMetrics} />

      {/* Action Items */}
      <ActionItemList items={selectedAnalysis.actionItems} />

      {/* Flags and Alerts */}
      <FlagCard flags={selectedAnalysis.flags} />

      {/* Chat */}
      <ChatBar
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isChatLoading}
      />
    </div>
  )
}
