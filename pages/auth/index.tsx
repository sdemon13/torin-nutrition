// pages/auth/index.tsx

import React from 'react'
import type { NextPage } from 'next'

const AuthPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Страница Регистрации / Входа</h1>
      {/* Тут в будущем будет форма логина или регистрации */}
      <p>Здесь будет форма аутентификации</p>
    </div>
  )
}

export default AuthPage
