import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documentId = params.id
    const body = await request.json()
    const { question } = body

    if (!question) {
      return NextResponse.json(
        { success: false, error: 'No question provided' },
        { status: 400 }
      )
    }

    // TODO: Implement Claude API call for chat (documentId: {documentId})
    // TODO: Stream response using SSE

    console.log('Chat request for document:', documentId)

    return NextResponse.json(
      {
        success: true,
        data: {
          message: {
            id: Math.random().toString(36).substr(2, 9),
            role: 'assistant',
            content: 'This is a placeholder response. API integration coming soon.',
            createdAt: new Date().toISOString(),
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
