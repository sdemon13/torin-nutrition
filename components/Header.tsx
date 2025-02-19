// components/Header.tsx
import React, { useState } from 'react'
import Link from 'next/link'

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="w-full bg-white shadow fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Логотип */}
        <div className="text-xl font-bold">
          <Link href="/">TorinNutrition</Link>
        </div>

        {/* Кнопка бургера (видна только на маленьких экранах) */}
        <button
          className="block md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {/* Иконка бургера (3 полоски) можно заменить на svg */}
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>

        {/* Навигация (скрыта на маленьких, показывается на md+) */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/dashboard" className="hover:text-blue-500">Главная</Link>
          <Link href="/blood-type" className="hover:text-blue-500">Группы крови</Link>
          <Link href="/recipes/I" className="hover:text-blue-500">Рецепты</Link>
          <Link href="/plan" className="hover:text-blue-500">30-дневный план</Link>
        </nav>
      </div>

      {/* Мобильное меню (отображается, если menuOpen = true) */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow px-4 py-2">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/dashboard"
              className="hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              Главная
            </Link>
            <Link
              href="/blood-type"
              className="hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              Группы крови
            </Link>
            <Link
              href="/recipes/I"
              className="hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              Рецепты
            </Link>
            <Link
              href="/plan"
              className="hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              30-дневный план
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
