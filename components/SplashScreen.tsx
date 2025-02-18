// components/SplashScreen.tsx

import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Логотип можно положить в папку public/logo.png (либо svg)
import logo from '../public/logo.png' // пример импорта, если логотип в public

interface SplashScreenProps {
  duration?: number
}

const SplashScreen: React.FC<SplashScreenProps> = ({ duration = 2000 }) => {
  const router = useRouter()

  useEffect(() => {
    // Через duration миллисекунд переходим на /auth (например, для экрана регистрации/входа)
    const timer = setTimeout(() => {
      router.push('/auth')
    }, duration)

    return () => clearTimeout(timer)
  }, [router, duration])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
      <div className="animate-bounce mb-4">
        <Image src={logo} alt="TorinNutrition Logo" width={150} height={150} />
      </div>
      {/* Простой прогресс/спиннер можно сделать обычным Tailwind-спиннером */}
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
      <style jsx>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s infinite linear;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default SplashScreen
