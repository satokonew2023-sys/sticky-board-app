import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'オンライン付箋ボード',
  description: 'リアルタイム協働付箋ボードアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
