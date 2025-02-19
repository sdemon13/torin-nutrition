// pages/payment-failed.tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const PaymentFailedPage = () => {
  const router = useRouter()
  const { userId } = router.query
  const [showIcon, setShowIcon] = useState(false)

  useEffect(() => {
    // Показываем иконку ошибки с анимацией
    setShowIcon(true)
  }, [])

  const handleRetry = () => {
    // Вернёмся к /auth/register (или /payment)
    router.push('/auth/register')
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
      {/* Полупрозрачный вспомогательный слой */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-0" />
      
      {/* Модальное окно с сообщением */}
      <div className="relative z-10 bg-white/40 backdrop-blur-xl rounded-xl shadow-2xl p-6 w-full max-w-md text-center border border-white/10">
        {/* Иконка ошибки */}
        <div className={`text-center mb-4 ${showIcon ? 'animate-errorIcon' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-red-500 mx-auto glow-error"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-.01 6A9 9 0 1112 3a9 9 0 010 18zm0 0l-3-3m3 3l3-3"
            />
          </svg>
        </div>
        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Платёж не прошёл
        </h1>
        <p className="text-gray-300 text-lg">
          Попробуйте снова или вернитесь к регистрации.
        </p>
        {/* Кнопка "Попробовать снова" */}
        <button
          onClick={handleRetry}
          className="mt-6 w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all duration-200"
        >
          Попробовать снова
        </button>
      </div>

      <style jsx>{`
        .glow-error {
          text-shadow: 0px 0px 15px rgba(255, 0, 0, 0.75);
        }

        .animate-errorIcon {
          animation: fadeInErrorIcon 1.2s forwards;
        }

        @keyframes fadeInErrorIcon {
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

export default PaymentFailedPage
