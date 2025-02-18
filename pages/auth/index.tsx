// pages/auth/index.tsx
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { auth } from '../../firebase/config' // <-- Укажите путь к вашему Firebase config
import { FirebaseError } from 'firebase/app'

const AuthPage: React.FC = () => {
  const router = useRouter()

  // Состояния
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null) 
  // null = ещё не знаем, есть ли пользователь, true = регистрируем, false = логинимся

  const [error, setError] = useState<string>('')

  // 1. Проверить, существует ли пользователь
  const handleCheckUserExists = async () => {
    setError('')
    if (!email) {
      setError('Введите email')
      return
    }
    try {
      // Проверяем, привязан ли этот email к какому-либо аккаунту
      const signInMethods = await fetchSignInMethodsForEmail(auth, email)
      if (signInMethods.length > 0) {
        // Пользователь уже существует, значит нужно войти
        setIsNewUser(false)
      } else {
        // Пользователя нет, значит регистрируемся
        setIsNewUser(true)
      }
    } catch (err) {
      console.error('Ошибка при проверке пользователя:', err)
      setError('Что-то пошло не так. Попробуйте ещё раз.')
    }
  }

  // 2. Логин
  const handleLogin = async () => {
    setError('')
    if (!email || !password) {
      setError('Заполните все поля')
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Если логин успешен — перенаправляем
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Login error:', err)
      // Обрабатываем наиболее частые коды ошибок
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Неверный email или пароль.')
      } else {
        setError('Ошибка при входе. Попробуйте ещё раз.')
      }
    }
  }

  // 3. Регистрация
  const handleSignup = async () => {
    setError('')
    if (!email || !password) {
      setError('Заполните все поля')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      // Регистрация успешна — перенаправляем
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Signup error:', err)
      if (err instanceof FirebaseError) {
        // Обрабатываем ошибку "auth/email-already-in-use" и т.д.
        if (err.code === 'auth/email-already-in-use') {
          setError('Пользователь с таким E-mail уже существует. Попробуйте войти.')
          // Или автоматически переключить на форму входа:
          // setIsNewUser(false)
        } else {
          setError('Ошибка при регистрации. ' + err.message)
        }
      } else {
        setError('Ошибка при регистрации.')
      }
    }
  }

  // 4. Разметка
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">TorinNutrition</h1>

        {/* Поле Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Введите E-mail"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Поле Пароль (показываем только если определили isNewUser) */}
        {isNewUser !== null && (
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              placeholder="Введите пароль"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {/* Вывод ошибок */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        {/* Кнопка действия */}
        {isNewUser === null ? (
          // Ещё не знаем, есть пользователь или нет
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleCheckUserExists}
          >
            Продолжить
          </button>
        ) : isNewUser ? (
          // Пользователь не существует — регистрация
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
            onClick={handleSignup}
          >
            Зарегистрироваться
          </button>
        ) : (
          // Пользователь существует — вход
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleLogin}
          >
            Войти
          </button>
        )}

        {/* Кнопка "назад" или "сброс" */}
        {isNewUser !== null && (
          <button
            onClick={() => {
              setIsNewUser(null)
              setPassword('')
              setError('')
            }}
            className="mt-3 underline text-sm text-gray-600 block mx-auto"
          >
            Вернуться к проверке Email
          </button>
        )}
      </div>
    </div>
  )
}

export default AuthPage
