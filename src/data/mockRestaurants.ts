import type { Restaurant } from '../types'

export const mockRestaurants: Restaurant[] = [
  {
    id: 'rest_001',
    name: '맛있는 파스타',
    category: '이탈리안',
    location: '서울 강남구 논현동',
    naverRating: 4.5,
    googleRating: 4.2,
    ourGapScore: -0.8,
    visitCount: 127,
    gapDistribution: {
      '-2': 45,
      '-1': 32,
      '0': 20,
      '1': 18,
      '2': 12
    }
  },
  {
    id: 'rest_002',
    name: '숨은 맛집 돈까스',
    category: '일식',
    location: '서울 마포구 연남동',
    naverRating: 3.8,
    googleRating: 3.6,
    ourGapScore: 1.2,
    visitCount: 89,
    gapDistribution: {
      '-2': 5,
      '-1': 8,
      '0': 25,
      '1': 31,
      '2': 20
    }
  },
  {
    id: 'rest_003',
    name: '평범한 초밥집',
    category: '일식',
    location: '서울 송파구 잠실동',
    naverRating: 4.3,
    googleRating: 4.1,
    ourGapScore: 0.1,
    visitCount: 203,
    gapDistribution: {
      '-2': 12,
      '-1': 38,
      '0': 102,
      '1': 41,
      '2': 10
    }
  },
  {
    id: 'rest_004',
    name: '과대평가 된 햄버거',
    category: '양식',
    location: '서울 강남구 신사동',
    naverRating: 4.7,
    googleRating: 4.5,
    ourGapScore: -1.5,
    visitCount: 156,
    gapDistribution: {
      '-2': 78,
      '-1': 45,
      '0': 18,
      '1': 10,
      '2': 5
    }
  },
  {
    id: 'rest_005',
    name: '진짜 맛있는 쌀국수',
    category: '베트남음식',
    location: '서울 용산구 이태원동',
    naverRating: 3.9,
    googleRating: 4.0,
    ourGapScore: 0.9,
    visitCount: 112,
    gapDistribution: {
      '-2': 8,
      '-1': 15,
      '0': 34,
      '1': 42,
      '2': 13
    }
  }
]
