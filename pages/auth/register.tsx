// pages/auth/register.tsx
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config' // Ваш путь
import axios from 'axios'

const RegisterPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setError('')
    if (!email || !password) {
      setError('Введите e-mail и пароль')
      return
    }
    try {
      // 1. Создаём пользователя в Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const userId = userCredential.user.uid

      // 2. Сразу вызываем наш API /api/checkout, чтобы получить ссылку на оплату
      const response = await axios.post('/api/checkout', {
        userId: userId,
        price: 1, // 1€ 
      })

      // 3. Перенаправляем в Stripe Checkout
      window.location.href = response.data.url
    } catch (err: any) {
      console.error('Ошибка при регистрации:', err)
      setError('Ошибка регистрации или создания оплаты. Возможно, e-mail уже используется.')
    }
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700">
      {/* Фон с плавными переливами */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-blue-500 to-indigo-400 opacity-60 blur-lg" />
      
      {/* Карточка формы */}
      <div className="relative z-10 max-w-md w-full p-6 bg-white/30 backdrop-blur-lg rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Регистрация (с оплатой)</h2>

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
          onClick={handleRegister}
          className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:bg-green-600 focus:ring-2 focus:ring-blue-300 transition-all duration-200"
        >
          Зарегистрироваться (1 €)
        </button>
      </div>
    </div>
  )
}

export default RegisterPage
