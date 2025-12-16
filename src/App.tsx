import { useState } from 'react'
import RestaurantCard from './components/RestaurantCard'
import RatingPage from './pages/RatingPage'
import { mockRestaurants } from './data/mockRestaurants'
import type { Restaurant } from './types'

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRestaurants = mockRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (selectedRestaurant) {
    return (
      <RatingPage
        restaurant={selectedRestaurant}
        onBack={() => setSelectedRestaurant(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            맞나 - 이 별점, 맞나?
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="음식점 이름 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute right-4 top-3 text-2xl">🔍</span>
          </div>
        </div>
      </header>

      {/* Restaurant List */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다
          </div>
        ) : (
          filteredRestaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => setSelectedRestaurant(restaurant)}
            />
          ))
        )}
      </main>
    </div>
  )
}

export default App
