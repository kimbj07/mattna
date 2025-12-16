import { useState } from 'react'
import type { Restaurant, GapScore, GapOption } from '../types'

interface Props {
  restaurant: Restaurant
  onBack: () => void
}

const gapOptions: GapOption[] = [
  {
    score: -2,
    emoji: '😡',
    label: '완전 실망',
    description: '별점 사기 수준'
  },
  {
    score: -1,
    emoji: '😕',
    label: '약간 아쉬움',
    description: '기대보단 못함'
  },
  {
    score: 0,
    emoji: '😐',
    label: '예상대로',
    description: '별점만큼 맛있음'
  },
  {
    score: 1,
    emoji: '😊',
    label: '기대 이상',
    description: '생각보다 맛있음'
  },
  {
    score: 2,
    emoji: '🤩',
    label: '완전 초월',
    description: '숨은 맛집 발견!'
  }
]

export default function RatingPage({ restaurant, onBack }: Props) {
  const [selectedGap, setSelectedGap] = useState<GapScore | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selectedGap === null) return

    // TODO: API 호출로 서버에 저장
    console.log('Submitting rating:', {
      restaurantId: restaurant.id,
      gap: selectedGap,
      referenceRating: restaurant.naverRating
    })

    setSubmitted(true)
  }

  const getDistributionPercentage = (count: number) => {
    return ((count / restaurant.visitCount) * 100).toFixed(0)
  }

  if (submitted && selectedGap !== null) {
    const selectedOption = gapOptions.find(opt => opt.score === selectedGap)!

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={onBack}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              ← 뒤로가기
            </button>
          </div>
        </header>

        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">평가 완료!</h2>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-lg mb-2">
                당신: <span className="text-3xl">{selectedOption.emoji}</span> {selectedOption.label}
              </p>
            </div>

            <div className="text-left space-y-2 mb-6">
              <p className="font-semibold text-gray-700 mb-3">다른 사람들은 이렇게 평가했어요:</p>
              {gapOptions.map(option => {
                const count = restaurant.gapDistribution[option.score.toString() as keyof typeof restaurant.gapDistribution]
                const percentage = getDistributionPercentage(count)
                const isYou = option.score === selectedGap

                return (
                  <div key={option.score} className="flex items-center gap-2">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-sm w-20">{option.label}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                      <div
                        className={`h-full ${isYou ? 'bg-blue-500' : 'bg-gray-400'} transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm w-12 text-right">{percentage}%</span>
                    {isYou && <span className="text-blue-500 font-medium">← 당신</span>}
                  </div>
                )
              })}
            </div>

            <p className="text-gray-600 mb-6">
              {restaurant.ourGapScore > 0
                ? '💬 "역시 숨은 맛집이었구나!"'
                : restaurant.ourGapScore < -0.5
                ? '💬 "역시 과대평가였구나..."'
                : '💬 "별점 그대로네"'
              }
            </p>

            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                다른 맛집 찾기
              </button>
              <button
                onClick={onBack}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors"
              >
                홈으로
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            ← 뒤로가기
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h2>
          <p className="text-sm text-gray-500 mb-4">
            📍 {restaurant.location} · {restaurant.category}
          </p>
          <div className="flex gap-4 text-sm">
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded">
              ⭐ {restaurant.naverRating.toFixed(1)} (네이버 기준)
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded">
              ⭐ {restaurant.googleRating.toFixed(1)} (구글 기준)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700 mb-2">
              💬 <span className="font-semibold">네이버 {restaurant.naverRating.toFixed(1)}점</span> 기준으로...
            </p>
            <p className="text-2xl font-bold text-gray-900">
              실제로는 어땠나요?
            </p>
          </div>

          <div className="space-y-3">
            {gapOptions.map(option => (
              <button
                key={option.score}
                onClick={() => setSelectedGap(option.score)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedGap === option.score
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{option.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-lg">{option.label}</p>
                    <p className="text-sm text-gray-500">{option.description} ({option.score > 0 ? '+' : ''}{option.score})</p>
                  </div>
                  {selectedGap === option.score && (
                    <span className="text-blue-500 text-2xl">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={selectedGap === null}
            className={`w-full mt-6 py-4 rounded-lg font-semibold text-lg transition-colors ${
              selectedGap === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {selectedGap === null ? '평가를 선택해주세요' : '제출하기'}
          </button>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            💡 {restaurant.visitCount}명이 이미 평가했어요
          </p>
          <p className="text-sm text-gray-600">
            평균 갭 점수: <span className={`font-bold ${restaurant.ourGapScore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {restaurant.ourGapScore > 0 ? '+' : ''}{restaurant.ourGapScore.toFixed(1)}
            </span> ({restaurant.ourGapScore > 0 ? '기대 이상' : restaurant.ourGapScore < -0.5 ? '기대 이하' : '예상대로'})
          </p>
        </div>
      </main>
    </div>
  )
}
