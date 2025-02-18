// pages/dashboard.tsx
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Следим за изменениями авторизации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Если пользователь не авторизован, перекидываем на /auth
      if (!user) {
        router.push('/auth')
      }
    })

    return () => unsubscribe()
  }, [router])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>
      <p>Здесь контент, доступный только авторизованным пользователям.</p>
    </div>
  )
}
