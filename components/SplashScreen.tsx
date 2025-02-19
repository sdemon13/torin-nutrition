// components/SplashScreen.tsx
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const SplashScreen: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth')
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-dark text-white">
      {/* Фон с плавными переливами */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-blue-500 to-indigo-400 animate-subtleGradient" />
      
      {/* Текстовый блок */}
      <div className="relative z-10 text-center px-6">
        {/* Название компании с мягким свечением */}
        <h1 className="text-6xl font-bold text-white relative inline-block">
          <span className="block relative text-white text-spotlight">
            TorinNutrition
          </span>
        </h1>
        {/* Подзаголовок ниже */}
        <p className="mt-4 text-xl font-light text-gray-200 animate-fadeIn delay-500">
          TorinLegasy создаёт для вас лучший план питания
        </p>
      </div>

      <style jsx>{`
        /* Мягкие переливы фона */
        .animate-subtleGradient {
          background-size: 200% 200%;
          animation: subtleGradient 15s ease infinite;
        }

        @keyframes subtleGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Мягкое свечение текста */
        .text-spotlight {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: spotlight 5s infinite linear;
        }

        @keyframes spotlight {
          0% {
            background-position: -100% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }

        /* Анимация появления подзаголовка */
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 2s forwards;
        }

        .animate-fadeIn.delay-500 {
          animation-delay: 0.5s;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default SplashScreen
