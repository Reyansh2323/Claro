'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '@/types/document'
import { Button } from '@/components/shared/Button'

interface ChatBarProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => Promise<void>
  isLoading?: boolean
}

export function ChatBar({
  messages,
  onSendMessage,
  isLoading = false,
}: ChatBarProps) {
  const [input, setInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (input.trim()) {
      const message = input
      setInput('')
      try {
        await onSendMessage(message)
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Ask Anything About This Document
      </h2>

      {/* Messages */}
      <div
        className={`bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4 transition-all ${
          isExpanded ? 'h-96' : 'h-48'
        } overflow-y-auto`}
      >
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No messages yet. Ask a question to get started!
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Ask a question about this document..."
          className="input flex-1"
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          variant="primary"
          size="md"
          loading={isLoading}
          disabled={!input.trim() || isLoading}
        >
          Send
        </Button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          {isExpanded ? '▼' : '▲'}
        </button>
      </div>
    </div>
  )
}
