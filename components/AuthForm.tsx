// components/AuthForm.tsx
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { auth } from '../firebase/config'

const AuthForm: React.FC = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null)
  const [error, setError] = useState<string>('')

  // Шаг 1. Проверить, есть ли уже такой пользователь
  const handleCheckUserExists = async () => {
    setError('')
    if (!email) {
      setError('Введите email')
      return
    }
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email)
      // Если массив не пуст, значит пользователь есть -> показываем форму входа
      if (signInMethods.length > 0) {
        setIsNewUser(false)
      } else {
        // Если пуст, пользователя нет -> форма регистрации
        setIsNewUser(true)
      }
    } catch (err) {
      console.error('Ошибка при проверке пользователя:', err)
      setError('Ошибка. Проверьте консоль или попробуйте снова.')
    }
  }

  // Шаг 2а. Войти
  const handleLogin = async () => {
    setError('')
    if (!email || !password) {
      setError('Заполните все поля')
      return
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard') // после успешного входа
    } catch (err) {
      console.error('Ошибка при входе:', err)
      setError('Неверный email или пароль.')
    }
  }

  // Шаг 2б. Зарегистрироваться
  const handleSignup = async () => {
    setError('')
    if (!email || !password) {
      setError('Заполните все поля')
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      // можете здесь же создать документ в Firestore, если нужно
      router.push('/dashboard')
    } catch (err) {
      console.error('Ошибка при регистрации:', err)
      setError('Ошибка регистрации. Возможно, e-mail уже используется.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">TorinNutrition</h1>

        {/* Поле Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">E-mail</label>
          <input
            type="email"
            placeholder="Введите E-mail"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Поле Пароль (только если уже определили, вход или регистрация) */}
        {isNewUser !== null && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {/* Ошибки */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        {/* Кнопки */}
        {isNewUser === null ? (
          // Шаг 1: Проверяем e-mail
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleCheckUserExists}
          >
            Продолжить
          </button>
        ) : isNewUser ? (
          // Если пользователя нет -> регистрация
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
            onClick={handleSignup}
          >
            Зарегистрироваться
          </button>
        ) : (
          // Если пользователь есть -> вход
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleLogin}
          >
            Войти
          </button>
        )}

        {/* Ссылка "назад" для смены режима */}
        {isNewUser !== null && (
          <button
            onClick={() => {
              setIsNewUser(null)
              setPassword('')
            }}
            className="mt-3 underline text-sm text-gray-600"
          >
            Вернуться к проверке e-mail
          </button>
        )}
      </div>
    </div>
  )
}

export default AuthForm
