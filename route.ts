import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function POST() {
  try {
    const boardId = uuidv4()
    const hostKey = uuidv4()

    const { data, error } = await supabase
      .from('boards')
      .insert({
        id: boardId,
        host_key: hostKey,
        axis_top: '重要度 高い',
        axis_bottom: '重要度 低い',
        axis_left: '所要時間 短い',
        axis_right: '所要時間 長い',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: boardId, hostKey })
  } catch (error) {
    console.error('Board creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
