import type { Restaurant } from '../types'

interface Props {
  restaurant: Restaurant
  onClick: () => void
}

export default function RestaurantCard({ restaurant, onClick }: Props) {
  const getGapEmoji = (score: number) => {
    if (score <= -1) return '😞'
    if (score < 0) return '😕'
    if (score < 0.5) return '😐'
    if (score < 1) return '😊'
    return '🤩'
  }

  const getGapText = (score: number) => {
    if (score <= -1) return '기대 이하'
    if (score < 0) return '약간 아쉬움'
    if (score < 0.5) return '예상대로'
    if (score < 1) return '기대 이상'
    return '숨은 맛집'
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
          <p className="text-sm text-gray-500">{restaurant.category} · {restaurant.location}</p>
        </div>
      </div>

      <div className="flex gap-4 text-sm text-gray-600 mb-3">
        <span>네이버 ⭐ {restaurant.naverRating.toFixed(1)}</span>
        <span>구글 ⭐ {restaurant.googleRating.toFixed(1)}</span>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">
              우리 갭 점수: <span className={`font-bold ${restaurant.ourGapScore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {restaurant.ourGapScore > 0 ? '+' : ''}{restaurant.ourGapScore.toFixed(1)} {getGapEmoji(restaurant.ourGapScore)}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              "{getGapText(restaurant.ourGapScore)}" ({restaurant.visitCount}명 평가)
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
            평가하기
          </button>
        </div>
      </div>
    </div>
  )
}
