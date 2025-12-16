import { useState, useEffect } from 'react'
import RestaurantCard from './components/RestaurantCard'
import RatingPage from './pages/RatingPage'
import { mockRestaurants } from './data/mockRestaurants'
import type { Restaurant } from './types'
import { initKakao, loginWithKakao, logoutKakao, getKakaoUserInfo } from './utils/kakao'

interface KakaoUser {
  id: number
  kakao_account?: {
    profile?: {
      nickname?: string
      profile_image_url?: string
    }
  }
}

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<KakaoUser | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Kakao SDK 초기화
  useEffect(() => {
    initKakao()
  }, [])

  // 로그인 처리
  const handleLogin = async () => {
    try {
      setIsLoggingIn(true)
      await loginWithKakao()
      const userInfo = await getKakaoUserInfo()
      setUser(userInfo as KakaoUser)
    } catch (error) {
      console.error('Login failed:', error)
      alert('로그인에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await logoutKakao()
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              맛맞나 - 이 맛집, 맛 맞나?
            </h1>
            {user ? (
              <div className="flex items-center gap-3">
                {user.kakao_account?.profile?.profile_image_url && (
                  <img
                    src={user.kakao_account.profile.profile_image_url}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-700">
                  {user.kakao_account?.profile?.nickname || '사용자'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-medium disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>로그인 중...</>
                ) : (
                  <>
                    <span>💬</span>
                    <span>카카오 로그인</span>
                  </>
                )}
              </button>
            )}
          </div>
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
