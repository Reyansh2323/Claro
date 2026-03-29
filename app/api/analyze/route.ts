import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@/lib/supabaseServer'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a PDF, TXT, or DOC file.' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are a legal document expert. Analyze this document and 
provide a clear, plain-English summary structured as follows:

## Plain English Summary
A 2-3 sentence overview of what this document is and what it does.
Write as if explaining to someone with no legal background.

## Key Parties
List the main people or organizations involved and their roles.

## Key Terms & Dates
List the most important terms, deadlines, amounts, and dates.

## Action Items
List what the reader needs to do, by when, in plain English.

## Risk Flags
List any clauses, terms, or conditions that could be problematic.
Flag anything unusual, unfavorable, or that requires legal attention.

## Financial Summary
List all amounts, payments, fees, penalties, and financial obligations.

Keep all language simple. Avoid legal jargon. If a term must be used, 
explain it in brackets immediately after.`

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: file.type,
          data: base64
        }
      }
    ])

    const summary = result.response.text()

    // Save to Supabase
    try {
      const supabase = await createClient()

      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        console.error('User fetch error:', userError)
        // Return the summary anyway, but don't save to DB
        return NextResponse.json({ summary }, { status: 200 })
      }

      const fileUrl = `documents/${Date.now()}_${encodeURIComponent(file.name)}`

      const { error: insertError } = await supabase
        .from('documents')
        .insert([
          {
            user_id: user.id,
            file_name: file.name,
            file_url: fileUrl,
            file_size: file.size,
            summary: summary,
            analyzed_at: new Date().toISOString(),
            status: 'ANALYZED',
          },
        ])

      if (insertError) {
        console.error('Document save error:', insertError)
        // Still return the summary even if save failed
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
      // Still return the summary even if DB operations fail
    }

    return NextResponse.json({ summary }, { status: 200 })

  } catch (error) {
    console.error('Gemini analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze document. Please try again.' },
      { status: 500 }
    )
  }
}

