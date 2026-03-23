import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // TODO: Implement file upload to Supabase Storage
    // TODO: Trigger AI analysis

    return NextResponse.json(
      {
        success: true,
        data: {
          documentId: Math.random().toString(36).substr(2, 9),
          status: 'PROCESSING',
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    )
  }
}
