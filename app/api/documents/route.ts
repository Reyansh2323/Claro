import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(_request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ success: false, error: 'Supabase connection is not initialized' }, { status: 500 })
  }

  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) {
      console.error('Session fetch error:', sessionError)
      return NextResponse.json({ success: false, error: sessionError.message }, { status: 401 })
    }

    const userId = sessionData?.session?.user?.id
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    const { data: documents, error: docsError } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)

    if (docsError) {
      console.error('Error querying documents:', docsError)
      return NextResponse.json({ success: false, error: docsError.message }, { status: 500 })
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

