'use client'

import { useState, useRef, useEffect } from 'react'
import { Sticky } from '@/types'

interface Props {
  sticky: Sticky
  onUpdate: (id: string, updates: Partial<Sticky>) => void
  onDelete: (id: string) => void
  onBringToFront: (id: string) => void
}

export default function StickyNote({ sticky, onUpdate, onDelete, onBringToFront }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(sticky.text)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setText(sticky.text)
  }, [sticky.text])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return
    e.stopPropagation()
    
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - sticky.x,
      y: e.clientY - sticky.y,
    })
    onBringToFront(sticky.id)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y

    onUpdate(sticky.id, { x: newX, y: newY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      e.stopPropagation()
      setIsEditing(true)
      setTimeout(() => textareaRef.current?.focus(), 0)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (text !== sticky.text) {
      onUpdate(sticky.id, { text })
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(sticky.id)
  }

  return (
    <div
      className="sticky-note absolute shadow-lg rounded-lg p-4 cursor-move select-none"
      style={{
        left: sticky.x,
        top: sticky.y,
        width: sticky.width,
        minHeight: sticky.height,
        backgroundColor: sticky.color,
        zIndex: sticky.z_index,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-bold transition opacity-0 group-hover:opacity-100"
        style={{ opacity: 1 }}
      >
        ✕
      </button>

      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={handleBlur}
          className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-800 font-medium"
          style={{ minHeight: '120px' }}
        />
      ) : (
        <p className="text-gray-800 font-medium whitespace-pre-wrap break-words">
          {text || '(空の付箋)'}
        </p>
      )}
    </div>
  )
}
