// pages/auth/login.tsx
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')
    if (!email || !password) {
      setError('Введите e-mail и пароль')
      return
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Успешный вход -> перенаправляем
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Ошибка при входе:', err)
      setError('Неверный e-mail или пароль.')
    }
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700">
      {/* Фон с плавными переливами */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-blue-500 to-indigo-400 opacity-60 blur-lg" />
      
      {/* Карточка формы */}
      <div className="relative z-10 max-w-md w-full p-6 bg-white/30 backdrop-blur-lg rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Вход</h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-200">E-mail</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите e-mail"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-200">Пароль</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-600 focus:ring-2 focus:ring-blue-300 transition-all duration-200"
        >
          Войти
        </button>
      </div>
    </div>
  )
}

export default LoginPage
