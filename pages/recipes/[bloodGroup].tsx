// pages/recipes/[bloodGroup].tsx
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface Meal {
  name: string
  products: string[]
  recipe: string
  calories: number
}

interface DayInfo {
  breakfast: Meal
  lunch: Meal
  dinner: Meal
}

const mockData: Record<string, Record<number, DayInfo>> = {
  I: {
    1: {
      breakfast: {
        name: 'Овсяная каша',
        products: ['Овсянка', 'Яблоко', 'Мёд'],
        recipe: 'Сварить овсянку, добавить яблоко и мёд.',
        calories: 300,
      },
      lunch: {
        name: 'Куриный суп',
        products: ['Курица', 'Лук', 'Морковь'],
        recipe: 'Сварить курицу, добавить овощи.',
        calories: 400,
      },
      dinner: {
        name: 'Салат из овощей',
        products: ['Огурцы', 'Помидоры', 'Салат', 'Оливковое масло'],
        recipe: 'Нарезать овощи, заправить маслом.',
        calories: 250,
      },
    },
  },
}

const RecipesByBloodGroup: React.FC = () => {
  const router = useRouter()
  const { bloodGroup } = router.query
  const [expandedDay, setExpandedDay] = useState<number | null>(null)

  useEffect(() => {
    document.body.classList.add('animated-gradient');
    return () => document.body.classList.remove('animated-gradient');
  }, []);

  if (!bloodGroup || typeof bloodGroup !== 'string') {
    return <div className="p-4 text-white">Неверный параметр группы крови.</div>
  }

  const planForGroup = mockData[bloodGroup]
  if (!planForGroup) {
    return <div className="p-4 text-white">Нет данных для группы крови {bloodGroup}.</div>
  }

  const days = Array.from({ length: 30 }, (_, i) => i + 1)

  const toggleDay = (day: number) => {
    setExpandedDay((prev) => (prev === day ? null : day))
  }

  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-6 shadow-lg">30-дневный план (Группа крови: {bloodGroup})</h1>
      <div className="space-y-4 w-full">
        {days.map((day) => {
          const hasData = planForGroup[day] !== undefined
          return (
            <div key={day} className="backdrop-blur-lg bg-white/30 border border-white/20 shadow-lg rounded-lg p-4 transition-all transform hover:scale-105 duration-700 ease-in-out">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">День {day}</span>
                {hasData && (
                  <button
                    onClick={() => toggleDay(day)}
                    className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded transition-all duration-500 ease-in-out"
                  >
                    {expandedDay === day ? 'Свернуть' : 'Развернуть'}
                  </button>
                )}
              </div>
              {!hasData && <div className="mt-2 text-gray-300">Нет данных для этого дня</div>}
              {expandedDay === day && hasData && (
                <div className="mt-4 space-y-4 animate-fadeIn duration-700 ease-in-out">
                  <MealCard title="Завтрак" meal={planForGroup[day].breakfast} />
                  <MealCard title="Обед" meal={planForGroup[day].lunch} />
                  <MealCard title="Ужин" meal={planForGroup[day].dinner} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const MealCard: React.FC<{ title: string; meal: Meal }> = ({ title, meal }) => {
  return (
    <div className="p-4 rounded-lg bg-white/40 shadow-md backdrop-blur-md transition-all transform hover:scale-105 duration-700 ease-in-out">
      <h4 className="font-semibold text-lg text-white mb-2">{title}: {meal.name}</h4>
      <p className="text-white"><strong>Продукты:</strong> {meal.products.join(', ')}</p>
      <p className="text-white"><strong>Как приготовить:</strong> {meal.recipe}</p>
      <p className="text-white"><strong>Калорийность:</strong> {meal.calories} ккал</p>
    </div>
  )
}

export default RecipesByBloodGroup