import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const { date } = await request.json()

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'date (YYYY-MM-DD) is required' }, { status: 400 })
    }

    // 同じ日付の日次ボードが既に存在するか確認
    const { data: existing } = await supabase
      .from('boards')
      .select('id, host_key')
      .eq('board_type', 'daily')
      .eq('board_date', date)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ id: existing.id, hostKey: existing.host_key })
    }

    // 新しい日次ボードを作成
    const boardId = uuidv4()
    const hostKey = uuidv4()

    const { error } = await supabase
      .from('boards')
      .insert({
        id: boardId,
        host_key: hostKey,
        board_type: 'daily',
        board_date: date,
        axis_top: '達成度 高い',
        axis_bottom: '達成度 低い',
        axis_left: '緊急度 高い',
        axis_right: '緊急度 低い',
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // テンプレート付箋を追加
    const templates = [
      { text: '今日やること', color: '#FEF08A', x: 60,  y: 60  },
      { text: '完了したこと', color: '#86EFAC', x: 300, y: 60  },
      { text: '気づき・学び',  color: '#93C5FD', x: 60,  y: 280 },
      { text: '明日への持ち越し', color: '#FCA5A5', x: 300, y: 280 },
    ]

    await supabase.from('stickies').insert(
      templates.map(t => ({
        id: uuidv4(),
        board_id: boardId,
        text: t.text,
        color: t.color,
        x: t.x,
        y: t.y,
        width: 180,
        height: 120,
        z_index: 0,
      }))
    )

    return NextResponse.json({ id: boardId, hostKey })
  } catch (error) {
    console.error('Daily board creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
