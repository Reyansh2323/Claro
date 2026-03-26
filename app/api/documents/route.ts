import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabaseServer'

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('User fetch error:', userError)
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    const userId = user.id
    const { data: documents, error: docsError } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)

    if (docsError) {
      console.error('DETAILED DOCUMENTS QUERY ERROR:', docsError)
      console.error('Query target:', 'documents', 'user_id', userId)
      return NextResponse.json({ success: false, error: docsError.message, code: (docsError as any).code }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          documents: documents || [],
          total: (documents as any[] | null)?.length || 0,
          page: 1,
          pages: 1,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch documents' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('User fetch error:', userError)
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const { file_name, file_url } = body as { file_name?: string; file_url?: string }

    if (!file_name || !file_url) {
      return NextResponse.json({ success: false, error: 'file_name and file_url are required' }, { status: 400 })
    }

    const userId = user.id
    const { data, error } = await supabase
      .from('documents')
      .insert([
        {
          user_id: userId,
          file_name,
          file_url,
        },
      ])
      .select('id, user_id, file_name, file_url')

    if (error) {
      console.error('DETAILED DOCUMENTS INSERT ERROR:', error)
      console.error('Insert payload:', { user_id: userId, file_name, file_url })
      const sqlErrorCode = (error as any).code
      if (sqlErrorCode === '42P01') {
        console.error('DOCUMENTS ERROR ANALYSIS: table not found or schema mismatch (42P01)')
      } else if (sqlErrorCode === '42501') {
        console.error('DOCUMENTS ERROR ANALYSIS: RLS policy violation (42501)')
      } else if (sqlErrorCode === '23503') {
        console.error('DOCUMENTS ERROR ANALYSIS: foreign key violation user_id missing (23503)')
      }
      return NextResponse.json({ success: false, error: error.message, code: sqlErrorCode }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data ?? [] }, { status: 201 })
  } catch (error) {
    console.error('Error creating document:', error)
    return NextResponse.json({ success: false, error: 'Failed to create document' }, { status: 500 })
  }
}
