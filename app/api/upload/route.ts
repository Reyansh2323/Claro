import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabaseServer'

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

    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('User fetch error:', userError)
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    const userId = user.id

    // TODO: implement actual storage upload (Supabase storage or 3rd party)
    // for now, store metadata in public.documents

    const fileUrl = `documents/${Date.now()}_${encodeURIComponent(file.name)}`

    const { data: insertData, error: insertError } = await supabase
      .from('documents')
      .insert([
        {
          user_id: userId,
          file_name: file.name,
          file_url: fileUrl,
        },
      ])
      .select('id')

    if (insertError) {
      console.error('Documents insert error:', insertError)
      return NextResponse.json({ success: false, error: insertError.message }, { status: 500 })
    }

    const createdId = (insertData as any)?.[0]?.id

    return NextResponse.json(
      {
        success: true,
        data: {
          documentId: createdId ?? null,
          status: 'PROCESSING',
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
