// pages/payment.tsx
import React from 'react'
import axios from 'axios'

interface PaymentProps {
  userId: string // передайте / получите, как удобно
}

const PaymentPage: React.FC<PaymentProps> = ({ userId }) => {
  const handleCheckout = async () => {
    try {
      // Вызываем наш API /api/checkout
      const { data } = await axios.post('/api/checkout', {
        userId, // передаём userId
        price: 1,
      })
      // data.url = session.url
      window.location.href = data.url
    } catch (error) {
      console.error('Payment error:', error)
      alert('Ошибка при инициации платежа')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Оплатить доступ</h1>
      <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">
        Оплатить 1 €
      </button>
    </div>
  )
}

export default PaymentPage
