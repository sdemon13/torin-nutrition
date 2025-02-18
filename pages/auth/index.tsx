import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { auth } from '../../firebase/config' // Убедитесь, что путь корректный

const AuthPage: React.FC = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null)
  const [error, setError] = useState<string>('')

  // 1. Проверка, есть ли пользователь по email
  const handleCheckUserExists = async () => {
    setError('')
    if (!email) {
      setError('Введите email')
      return
    }
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email)
      if (signInMethods.length > 0) {
        // Пользователь существует -> форма входа
        setIsNewUser(false)
      } else {
        // Пользователь не существует -> форма регистрации
        setIsNewUser(true)
      }
    } catch (err) {
      console.error('Ошибка при проверке пользователя:', err)
      setError('Ошибка. Попробуйте снова.')
    }
  }

  // 2. Вход
  const handleLogin = async () => {
    setError('')
    if (!email || !password) {
      setError('Заполните все поля')
      return
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Если вход успешен — перенаправляем
      router.push('/dashboard')
    } catch (err) {
      console.error('Ошибка при входе:', err)
      setError('Неверный email или пароль.')
    }
  }

  // 3. Регистрация (Firebase требует минимум 6 символов в пароле)
  const handleSignup = async () => {
    setError('')
    if (!email || !password) {
      setError('Заполните все поля')
      return
    }
    if (password.length < 6) {
      setError('Пароль должен быть не короче 6 символов.')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      // Регистрация прошла успешно — перенаправляем
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

        {/* Поле для E-mail */}
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

        {/* Поле пароля (показываем только когда isNewUser уже определён) */}
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

        {/* Вывод ошибок */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        {/* Кнопки */}
        {isNewUser === null ? (
          // Сначала проверяем, есть ли такой email
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleCheckUserExists}
          >
            Продолжить
          </button>
        ) : isNewUser ? (
          // Пользователя нет -> регистрация
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
            onClick={handleSignup}
          >
            Зарегистрироваться
          </button>
        ) : (
          // Пользователь есть -> вход
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleLogin}
          >
            Войти
          </button>
        )}

        {/* Кнопка вернуться назад (сменить режим) */}
        {isNewUser !== null && (
          <button
            onClick={() => {
              setIsNewUser(null)
              setPassword('')
            }}
            className="mt-3 underline text-sm text-gray-600"
          >
            Вернуться к проверке E-mail
          </button>
        )}
      </div>
    </div>
  )
}

export default AuthPage
