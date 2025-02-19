// pages/auth/index.tsx
import React from 'react'
import Link from 'next/link'

const AuthIndexPage = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700">
      {/* Фон с плавными переливами */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-blue-500 to-indigo-400 opacity-60 blur-lg" />
      
      {/* Карточка с текстом и кнопками */}
      <div className="relative z-10 max-w-md w-full p-6 bg-white/30 backdrop-blur-lg rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-white mb-6">TorinNutrition</h1>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register">
            <button className="px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-green-400 to-blue-400 shadow-md hover:shadow-lg hover:from-green-500 hover:to-blue-500 focus:ring-2 focus:ring-green-300 transition-all duration-200">
              Зарегистрироваться
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-300 transition-all duration-200">
              Войти
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthIndexPage
