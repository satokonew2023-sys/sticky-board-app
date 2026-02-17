'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          📌 オンライン付箋ボード
        </h1>
        <p className="text-gray-600 mb-8">
          リアルタイムで共同編集できる付箋ボードを作成しましょう
        </p>
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
