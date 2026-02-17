'use client'

import { useState } from 'react'
import { AxisLabels } from '@/types'

interface Props {
  currentLabels: AxisLabels
  onSave: (labels: AxisLabels) => void
  onClose: () => void
}

export default function AxisEditModal({ currentLabels, onSave, onClose }: Props) {
  const [labels, setLabels] = useState(currentLabels)

  const handleSave = () => {
    onSave(labels)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">四象限の軸を編集</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              上軸
            </label>
            <input
              type="text"
              value={labels.top}
              onChange={e => setLabels({ ...labels, top: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="例: 重要度 高い"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              下軸
            </label>
            <input
              type="text"
              value={labels.bottom}
              onChange={e => setLabels({ ...labels, bottom: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="例: 重要度 低い"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              左軸
            </label>
            <input
              type="text"
              value={labels.left}
              onChange={e => setLabels({ ...labels, left: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="例: 所要時間 短い"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              右軸
            </label>
            <input
              type="text"
              value={labels.right}
              onChange={e => setLabels({ ...labels, right: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="例: 所要時間 長い"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-medium"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  )
}
