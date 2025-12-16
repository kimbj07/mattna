export interface Restaurant {
  id: string
  name: string
  category: string
  location: string
  naverRating: number
  googleRating: number
  ourGapScore: number
  visitCount: number
  gapDistribution: {
    '-2': number  // 완전 실망
    '-1': number  // 약간 아쉬움
    '0': number   // 예상대로
    '1': number   // 기대 이상
    '2': number   // 완전 초월
  }
}

export interface Review {
  id: string
  restaurantId: string
  userId: string
  referenceRating: number
  referenceSource: 'naver' | 'google'
  satisfactionGap: -2 | -1 | 0 | 1 | 2
  gapLabel: string
  timestamp: string
}

export type GapScore = -2 | -1 | 0 | 1 | 2

export interface GapOption {
  score: GapScore
  emoji: string
  label: string
  description: string
}
