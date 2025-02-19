import React, { useState } from 'react'
import { useRouter } from 'next/router'

const BloodTypePage: React.FC = () => {
  const router = useRouter()
  const [hovered, setHovered] = useState('')

  const handleMouseEnter = (card: string) => setHovered(card)
  const handleMouseLeave = () => setHovered('')

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-black p-4`}
      style={{
        backgroundPosition: hovered === 'I' ? '100% 50%' :
                          hovered === 'II' ? '50% 0%' :
                          hovered === 'III' ? '0% 50%' :
                          hovered === 'IV' ? '50% 100%' : 'center',
        transition: 'background-position 3s ease',
        backgroundSize: '200% 200%',
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-10">
        Выберите группу крови
      </h1>

      <div className="grid grid-cols-2 gap-8 max-w-xl w-full">
        <div
          onMouseEnter={() => handleMouseEnter('I')}
          onMouseLeave={handleMouseLeave}
          onClick={() => router.push(`/recipes/I`)}
          className="card"
        >
          <h2 className="text-xl font-semibold">I (Первая)</h2>
        </div>
        <div
          onMouseEnter={() => handleMouseEnter('II')}
          onMouseLeave={handleMouseLeave}
          onClick={() => router.push(`/recipes/II`)}
          className="card"
        >
          <h2 className="text-xl font-semibold">II (Вторая)</h2>
        </div>
        <div
          onMouseEnter={() => handleMouseEnter('III')}
          onMouseLeave={handleMouseLeave}
          onClick={() => router.push(`/recipes/III`)}
          className="card"
        >
          <h2 className="text-xl font-semibold">III (Третья)</h2>
        </div>
        <div
          onMouseEnter={() => handleMouseEnter('IV')}
          onMouseLeave={handleMouseLeave}
          onClick={() => router.push(`/recipes/IV`)}
          className="card"
        >
          <h2 className="text-xl font-semibold">IV (Четвёртая)</h2>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: linear-gradient(145deg, #667eea, #764ba2);
          color: white;
          padding: 1.5rem;
          text-align: center;
          border-radius: 1rem;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.9s ease-in-out;
          position: relative;
        }

        .card:hover {
          transform: scale(1.08) rotate(1deg);
          z-index: 10;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}

export default BloodTypePage
