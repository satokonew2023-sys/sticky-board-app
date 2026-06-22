'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [isDailyCreating, setIsDailyCreating] = useState(false)

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const todayDisplay = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  const createBoard = async () => {
    setIsCreating(true)
    try {
      const response = await fetch('/api/boards', {
        method: 'POST',
      })
      const data = await response.json()

      if (data.id && data.hostKey) {
        router.push(`/board/${data.id}?role=host&key=${data.hostKey}`)
      }
    } catch (error) {
      console.error('ボード作成エラー:', error)
      alert('ボードの作成に失敗しました')
      setIsCreating(false)
    }
  }

  const createDailyRecord = async () => {
    setIsDailyCreating(true)
    try {
      const response = await fetch('/api/boards/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: todayStr }),
      })
      const data = await response.json()

      if (data.id && data.hostKey) {
        router.push(`/board/${data.id}?role=host&key=${data.hostKey}`)
      }
    } catch (error) {
      console.error('今日の記録作成エラー:', error)
      alert('今日の記録の作成に失敗しました')
      setIsDailyCreating(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          📌 オンライン付箋ボード
        </h1>
        <p className="text-gray-600 mb-8">
          リアルタイムで共同編集できる付箋ボードを作成しましょう
        </p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">📅</span>
            <h2 className="text-lg font-bold text-indigo-800">今日の記録</h2>
          </div>
          <p className="text-sm text-indigo-600 mb-4">{todayDisplay}</p>
          <button
            onClick={createDailyRecord}
            disabled={isDailyCreating}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
          >
            {isDailyCreating ? '準備中...' : '今日の記録を始める'}
          </button>
          <p className="text-xs text-indigo-400 mt-2">
            ※ 今日のボードが既にある場合は開きます
          </p>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-400">または</span>
          </div>
        </div>

        <button
          onClick={createBoard}
          disabled={isCreating}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-lg transition duration-200 text-lg shadow-lg"
        >
          {isCreating ? '作成中...' : '新しいボードを作成'}
        </button>
        <div className="mt-6 text-sm text-gray-500">
          <p>✨ 付箋の作成・編集・移動</p>
          <p>🔄 リアルタイム同期</p>
          <p>📊 四象限ガイド線</p>
        </div>
      </div>
    </div>
  )
}
