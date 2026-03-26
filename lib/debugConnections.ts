/**
 * Raptor Debug Utilities
 * Hidden diagnostic functions to identify documents table insert failures
 */

import { supabase } from '@/lib/supabaseClient'

export interface DiagnosticResult {
  stepA: {
    name: string
    status: 'success' | 'error'
    user?: { id: string; email?: string }
    error?: string
  }
  stepB: {
    name: string
    status: 'success' | 'error'
    rowCount?: number
    error?: string
  }
  stepC: {
    name: string
    status: 'success' | 'error'
    insertedData?: any
    error?: string
    errorCode?: string
    errorInterpretation?: string
  }
}

/**
 * Interprets Postgres error codes related to RLS and table access
 */
function interpretErrorCode(code?: string): string {
  const interpretations: { [key: string]: string } = {
    '42P01': 'TABLE_NOT_FOUND: The table name "documents" is spelled wrong or in the wrong schema.',
    '42501': 'RLS_VIOLATION: Row Level Security policy is blocking the insert. Check your RLS policies.',
    '23503': 'FOREIGN_KEY_VIOLATION: The user_id does not exist in the auth table.',
    '23505': 'UNIQUE_VIOLATION: A unique constraint is violated (likely duplicate entry).',
    '23502': 'NOT_NULL_VIOLATION: A required column has a NULL value.',
    'PGRST204': 'NO_AUTH_HEADER: Missing or invalid authentication.',
  }
  return interpretations[code || ''] || `UNKNOWN_ERROR: Code ${code || 'N/A'}`
}

/**
 * Step A: Check user session
 */
async function runAuthCheck(): Promise<DiagnosticResult['stepA']> {
  try {
    console.log('🔍 [RAPTOR] Step A: Checking user session...')
    
    if (!supabase) {
      throw new Error('Supabase client is not initialized')
    }

    const { data: user, error } = await supabase.auth.getUser()

    if (error) {
      console.error('❌ [RAPTOR] Step A Error:', error)
      return {
        name: 'Auth Check',
        status: 'error',
        error: `Error: ${error.message}`,
      }
    }

    if (!user || !user.user) {
      console.warn('⚠️ [RAPTOR] Step A: Error: No user session found.')
      return {
        name: 'Auth Check',
        status: 'error',
        error: 'Error: No user session found.',
      }
    }

    console.log('✅ [RAPTOR] Step A Success: User authenticated', {
      id: user.user.id,
      email: user.user.email,
    })

    return {
      name: 'Auth Check',
      status: 'success',
      user: {
        id: user.user.id,
        email: user.user.email,
      },
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('❌ [RAPTOR] Step A Exception:', message)
    return {
      name: 'Auth Check',
      status: 'error',
      error: message,
    }
  }
}

/**
 * Step B: Test table read access
 */
async function runTablePing(): Promise<DiagnosticResult['stepB']> {
  try {
    console.log('🔍 [RAPTOR] Step B: Testing table read access...')

    if (!supabase) {
      throw new Error('Supabase client is not initialized')
    }

    const { error, count } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .limit(1)

    if (error) {
      console.error('❌ [RAPTOR] Step B Error:', error)
      return {
        name: 'Table Ping',
        status: 'error',
        error: `Error: ${error.message} (Code: ${(error as any).code})`,
      }
    }

    console.log('✅ [RAPTOR] Step B Success: Table is accessible', {
      rowCount: count || 0,
    })

    return {
      name: 'Table Ping',
      status: 'success',
      rowCount: count || 0,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('❌ [RAPTOR] Step B Exception:', message)
    return {
      name: 'Table Ping',
      status: 'error',
      error: message,
    }
  }
}

/**
 * Step C: Force insert test
 */
async function runForceInsertTest(userId: string): Promise<DiagnosticResult['stepC']> {
  try {
    console.log('🔍 [RAPTOR] Step C: Attempting force insert with DEBUG data...')

    if (!supabase) {
      throw new Error('Supabase client is not initialized')
    }

    const debugRecord = {
      user_id: userId,
      file_name: 'DEBUG_TEST_RAPTOR.txt',
      file_url: 'https://test.com/debug_raptor.txt',
    }

    console.log('[RAPTOR] Inserting debug record:', debugRecord)

    const { data: insertedData, error } = await supabase
      .from('documents')
      .insert([debugRecord])
      .select()

    if (error) {
      const errorCode = (error as any).code || 'UNKNOWN'
      const interpretation = interpretErrorCode(errorCode)
      
      console.error('❌ [RAPTOR] Step C Insert Failed:')
      console.error(`   Code: ${errorCode}`)
      console.error(`   Message: ${error.message}`)
      console.error(`   Interpretation: ${interpretation}`)

      return {
        name: 'Force Insert Test',
        status: 'error',
        error: error.message,
        errorCode,
        errorInterpretation: interpretation,
      }
    }

    console.log('✅ [RAPTOR] Step C Success: Insert succeeded!', insertedData)

    return {
      name: 'Force Insert Test',
      status: 'success',
      insertedData: insertedData,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('❌ [RAPTOR] Step C Exception:', message)
    return {
      name: 'Force Insert Test',
      status: 'error',
      error: message,
    }
  }
}

/**
 * Run all diagnostic steps
 */
export async function runConnectionDiagnostics(): Promise<DiagnosticResult> {
  console.group('🚀 [RAPTOR] Starting Connection Diagnostics')
  console.log('Timestamp:', new Date().toISOString())
  console.log('Browser:', navigator.userAgent)

  try {
    // Step A: Auth Check
    const stepA = await runAuthCheck()

    // Step B: Table Ping
    const stepB = await runTablePing()

    // Step C: Force Insert (only if auth succeeded)
    let stepC: DiagnosticResult['stepC']
    if (stepA.status === 'success' && stepA.user?.id) {
      stepC = await runForceInsertTest(stepA.user.id)
    } else {
      stepC = {
        name: 'Force Insert Test',
        status: 'error',
        error: 'Skipped: User not authenticated (Step A failed)',
      }
    }

    const result: DiagnosticResult = { stepA, stepB, stepC }

    // Summary
    console.groupEnd()
    console.group('📊 [RAPTOR] Diagnostic Summary')
    console.table({
      'Step A (Auth)': stepA.status.toUpperCase(),
      'Step B (Table)': stepB.status.toUpperCase(),
      'Step C (Insert)': stepC.status.toUpperCase(),
    })
    console.log('Full Results:', result)
    console.groupEnd()

    return result
  } catch (err) {
    console.error('❌ [RAPTOR] Diagnostic run failed:', err)
    console.groupEnd()
    throw err
  }
}
