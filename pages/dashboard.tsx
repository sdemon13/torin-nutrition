import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

const DashboardPage: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth/login')
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-800 via-indigo-800 to-gray-900 animate-gradientMove">
        {/* Загрузка */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Загрузка...</h1>
        </div>
        <style jsx>{`
          @keyframes gradientMove {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradientMove {
            background-size: 200% 200%;
            animation: gradientMove 6s ease infinite;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black overflow-hidden flex items-center justify-center animate-gradientMove">
      {/* Подвижные световые элементы */}
      <div className="absolute inset-0">
        <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] rounded-full bg-purple-400 opacity-10 blur-3xl animate-slowMove"></div>
        <div className="absolute right-[-200px] bottom-[-200px] w-[800px] h-[800px] rounded-full bg-blue-500 opacity-15 blur-3xl animate-slowMove delay-3000"></div>
      </div>

      {/* Центральный блок */}
      <div className="relative z-10 max-w-4xl mx-auto p-12 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-300 border-opacity-30">
        <h1 className="text-5xl font-bold text-center text-white mb-6 leading-tight tracking-wider">
          Добро пожаловать в TorinNutrition
        </h1>
        <p className="text-lg text-center text-gray-300 mb-8 leading-relaxed">
          Откройте для себя искусство идеального питания. Уникальные рецепты и персонализированные планы ждут вас.
        </p>
        <div className="text-center">
          <button
            onClick={() => router.push('/blood-type')}
            className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:from-yellow-600 hover:to-red-600 focus:ring-2 focus:ring-orange-400 transition-transform transform hover:-translate-y-1 duration-300"
          >
            Начать свой путь
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes slowMove {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 10s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default DashboardPage
