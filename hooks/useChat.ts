'use client'

import { useCallback, useState } from 'react'
import { ChatMessage } from '@/types/document'

export function useChat(documentId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      setError(null)
      setIsLoading(true)

      try {
        // Add user message to chat
        const userMessage: ChatMessage = {
          id: Math.random().toString(36).substr(2, 9),
          role: 'user',
          content,
          createdAt: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, userMessage])

        // TODO: Stream response from API
        // const response = await fetch(`/api/documents/${documentId}/ask`, {
        //   method: 'POST',
        //   body: JSON.stringify({ question: content, conversationHistory: messages }),
        // })

        // Simulate assistant response
        const assistantMessage: ChatMessage = {
          id: Math.random().toString(36).substr(2, 9),
          role: 'assistant',
          content: 'This is a placeholder response. API integration coming soon.',
          createdAt: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send message')
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [documentId]
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearMessages }
}
