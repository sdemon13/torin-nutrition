// pages/dashboard.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

const DashboardPage = () => {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth') // если нет пользователя -> на /auth
      }
    })
    return () => unsubscribe()
  }, [router])

  return (
    <div>
      <h1>Личный кабинет</h1>
      <p>Здесь контент, доступный только для авторизованных пользователей.</p>
    </div>
  )
}

export default DashboardPage
