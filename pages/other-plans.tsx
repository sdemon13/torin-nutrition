// pages/other-plans.tsx
import React from 'react'
import Link from 'next/link'

export default function OtherPlansPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-4">Другие планы</h1>
        <p className="mb-4">Здесь может быть список дополнительных планов, которые можно приобрести или просто посмотреть.</p>
        <Link href="/recipes/I" className="underline text-blue-500">Вернуться к рецептам</Link>
      </div>
    </div>
  )
}
