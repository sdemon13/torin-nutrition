import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const PaymentSuccessPage = () => {
  const router = useRouter()
  const [showCheckmark, setShowCheckmark] = useState(false)

  useEffect(() => {
    // Запускаем анимацию галочки
    setShowCheckmark(true)

    // Через 3 секунды направляем пользователя в личный кабинет
    const timer = setTimeout(() => {
      router.push('/auth/login')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      {/* Слой для придания глубины фону */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/60" />

      {/* Модальное окно */}
      <div className="relative z-10 bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl p-6 max-w-md w-full text-center border border-white/10">
        {/* Галочка */}
        <div className={`text-center mb-4 ${showCheckmark ? 'animate-checkmark' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-green-500 mx-auto glow-check"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2l4-4"
            />
          </svg>
        </div>
        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Оплата прошла успешно!
        </h1>
        <p className="text-gray-200 mb-4">
          Благодарим вас за оплату. Теперь у вас есть доступ ко всем функциям TorinNutrition.
        </p>
      </div>

      <style jsx>{`
        .glow-check {
          text-shadow: 0px 0px 15px rgba(0, 255, 100, 0.75);
        }

        .animate-checkmark {
          animation: fadeInCheckmark 1.2s forwards;
        }

        @keyframes fadeInCheckmark {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default PaymentSuccessPage
