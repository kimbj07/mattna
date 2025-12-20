# 맛맞나 (MatMatNa) - 프로젝트 가이드

## 프로젝트 개요

**이름**: 맛맞나 (MatMatNa)
**태그라인**: "이 맛집, 맛 맞나?"
**목적**: 별점과 실제 경험의 갭을 측정하여 과대평가/숨은 맛집을 구별하는 서비스

## 핵심 아이디어

### 문제 인식
- 맛집 정보 과잉 + 신뢰도 낮음
- 네이버/구글 별점의 긍정 편향 (홍보성 리뷰, 별점 인플레이션)
- 사용자가 "별점 사기"를 경험하는 경우 많음

### 솔루션
**기대-현실 갭 측정 시스템**

```
사용자 플로우:
1. 음식점 선택 (별점 자동 표시)
2. "별점만큼 맛있었나요?" 질문
3. 5단계 감성 버튼 선택
   😡 완전 실망 (-2)
   😕 약간 아쉬움 (-1)
   😐 예상대로 (0)
   😊 기대 이상 (+1)
   🤩 완전 초월 (+2)
4. 갭 점수 집계 → 음식점 신뢰도 판별
```

### 차별화 포인트
- ✅ 단순한 별점 대신 "기대 대비 만족도" 측정
- ✅ 원스텝 평가 (방문 후 한 화면에서 완료)
- ✅ 감성 버튼으로 직관적 입력
- ✅ 법적 리스크 최소화 (주관적 평가, 긍정/부정 밸런스)

## 기술 스택

```
Frontend:
  - React 18.3.1
  - TypeScript 5.7.2
  - Vite 6.0.3 (개발 서버)
  - Tailwind CSS 3.4.17 (스타일링)
  - Kakao Map JavaScript SDK (지도)
  - Kakao Login JavaScript SDK (인증)

Backend:
  - Kotlin + Spring Boot 4.x (API 서버, Spring Framework 7 기반)
  - MySQL 8.x (데이터베이스)
  - Kakao Local API (음식점 검색)
  - Google Places API (구글 평점)
  - Naver Search API (네이버 정보, 제한적)

배포:
  - Vercel (프론트엔드)
  - AWS EC2 or Railway (백엔드)
```

## 프로젝트 구조

```
matmatna/
├─ src/                            # 프론트엔드 (React + TypeScript)
│   ├─ components/
│   │   └─ RestaurantCard.tsx      # 음식점 카드 컴포넌트
│   ├─ pages/
│   │   └─ RatingPage.tsx          # 평가 화면 (핵심 UI)
│   ├─ data/
│   │   └─ mockRestaurants.ts      # Mock 데이터 (5개 샘플)
│   ├─ utils/
│   │   └─ kakao.ts                # Kakao SDK 유틸리티
│   ├─ types.ts                    # TypeScript 타입 정의
│   ├─ App.tsx                     # 메인 앱 컴포넌트
│   ├─ main.tsx                    # 진입점
│   └─ index.css                   # Tailwind CSS
│
├─ backend/                        # 백엔드 (Kotlin + Spring Boot 4.x)
│   ├─ src/main/kotlin/kr/matmatna/
│   │   ├─ MatmatnaApplication.kt  # Spring Boot 애플리케이션 진입점
│   │   ├─ domain/
│   │   │   ├─ user/               # User 엔티티 & Repository
│   │   │   ├─ restaurant/         # Restaurant 엔티티 & Repository
│   │   │   └─ review/             # Review 엔티티 & Repository
│   │   ├─ api/                    # REST API Controllers
│   │   │   ├─ UserController.kt
│   │   │   ├─ RestaurantController.kt
│   │   │   └─ ReviewController.kt
│   │   └─ config/                 # 설정 클래스
│   ├─ src/main/resources/
│   │   └─ application.yml         # Spring 설정
│   ├─ build.gradle.kts            # Gradle 빌드 스크립트
│   └─ gradlew                     # Gradle Wrapper
│
├─ public/                         # 정적 파일
├─ .env.local                      # 환경 변수 (git-ignored)
├─ index.html                      # HTML 템플릿 (Kakao SDK 로드)
├─ package.json                    # 프론트엔드 의존성 관리
├─ vite.config.ts                  # Vite 설정
├─ tailwind.config.js              # Tailwind 설정
├─ tsconfig.json                   # TypeScript 설정
└─ CLAUDE.md                       # 이 파일 (프로젝트 가이드)
```

## 현재 구현 상태 (v0.0.1)

### ✅ 완료된 기능

**1. 음식점 리스트 화면**
- 검색 기능 (실시간 필터링)
- 음식점 카드 표시
  - 이름, 카테고리, 위치
  - 네이버/구글 별점
  - 갭 점수 (-2 ~ +2)
  - 평가 인원 수

**2. 평가 화면 (RatingPage)**
- 5단계 감성 버튼 UI
- 음식점 정보 표시 (별점 기준 명시)
- 현재 갭 점수 분포 표시
- 평가 제출 기능 (Mock)

**3. 평가 결과 화면**
- 내 평가와 다른 사람들 비교
- 갭 점수 분포 시각화 (막대 그래프)
- 피드백 메시지

**4. Mock 데이터**
- 5개 샘플 음식점
  - 과대평가 예시 (갭 점수 -1.5)
  - 숨은 맛집 예시 (갭 점수 +1.2)
  - 평범한 예시 (갭 점수 0.1)

**5. Kakao Login** ✅ (2025-12-16)
- Kakao JavaScript SDK 통합
- 로그인/로그아웃 기능 구현
- 사용자 프로필 표시 (닉네임, 프로필 이미지)
- 환경 변수 설정 완료 (.env.local, .bash_profile)

### ⏳ 미구현 (다음 단계)

**Phase 1: 인증 & 지도 기반 UX** (🔥 최우선)
- [x] **Kakao 로그인 구현** ✅ (2025-12-16 완료)
  - `src/utils/kakao.ts`: SDK 초기화, 로그인, 로그아웃, 사용자 정보 조회
  - `src/App.tsx`: 로그인 UI 통합 (헤더 우측에 버튼 추가)
  - `index.html`: Kakao Login SDK 스크립트 로드
  - `.env.local`: API 키 설정 완료
  - `.bash_profile`: 환경 변수 추가 완료
- [ ] Kakao Map 통합 (지도 위 음식점 표시) ← **다음 작업**
- [ ] Kakao Local API 연동 (음식점 검색/정보)
- [ ] 사용자 DB 스키마 설계

**Phase 2: 멀티플랫폼 평점 통합**
- [ ] Kakao Place 평점 수집
- [ ] 네이버 검색 API 연동 (평점)
- [ ] Google Places API 연동 (평점)
- [ ] 평점 통합 표시 UI

**Phase 3: 백엔드 구축** ✅ (2025-12-20 완료)
- [x] API 서버 구축 (Kotlin + Spring Boot 4.0.1)
- [x] 데이터베이스 설계 (MySQL 8.x - JPA 엔티티)
- [x] 사용자 평가 저장 API
- [x] 갭 점수 실시간 계산 로직

**Phase 4: 사용자 기능**
- [ ] GPS 기반 주변 맛집 필터
- [ ] 맛집 북마크
- [ ] 내 평가 히스토리
- [ ] 친구 평가 비교

**Phase 5: 배포 & 마케팅**
- [ ] Vercel 배포 (프론트엔드)
- [ ] Railway 배포 (백엔드)
- [ ] 랜딩 페이지 제작
- [ ] 베타 테스터 모집 (10-50명)

## 개발 가이드

### 프론트엔드 로컬 실행

```bash
# 프로젝트 디렉토리로 이동
cd /Users/tigger/workspace/matmatna

# 의존성 설치 (최초 1회)
npm install

# 개발 서버 실행
npm run dev
# → http://localhost:5173 자동 오픈

# 빌드 (배포용)
npm run build
```

### 백엔드 로컬 실행

```bash
# 백엔드 디렉토리로 이동
cd /Users/tigger/workspace/matmatna/backend

# MySQL 데이터베이스 생성 (최초 1회)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS matmatna CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 환경 변수 설정 (또는 application.yml 수정)
export MYSQL_USERNAME=root
export MYSQL_PASSWORD=your_password

# 빌드 & 실행
./gradlew bootRun
# → http://localhost:8080 에서 API 서버 실행

# 빌드만
./gradlew build

# JAR 파일로 실행
java -jar build/libs/matmatna-backend-0.0.1-SNAPSHOT.jar
```

### API 엔드포인트

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/kakao` | 카카오 로그인/회원가입 |
| GET | `/api/users/{id}` | 사용자 정보 조회 |
| GET | `/api/restaurants` | 음식점 목록 |
| GET | `/api/restaurants/{id}` | 음식점 상세 + 갭 점수 |
| GET | `/api/restaurants/search?query=` | 음식점 검색 |
| GET | `/api/restaurants/nearby?lat=&lng=` | 주변 음식점 |
| POST | `/api/reviews` | 평가 등록 |
| GET | `/api/reviews/restaurant/{id}` | 음식점별 리뷰 |
| GET | `/api/reviews/restaurant/{id}/stats` | 갭 점수 통계 |

### Git 작업

```bash
# 현재 상태 확인
git status

# 변경사항 커밋
git add .
git commit -m "feat: 기능 설명"

# GitHub push
git push origin main
```

**GitHub Repository**: https://github.com/kimbj07/mattna (→ matmatna로 변경 예정)

### 주요 파일 수정 가이드

**새 음식점 추가** (Mock 데이터):
- `src/data/mockRestaurants.ts` 수정

**평가 UI 수정**:
- `src/pages/RatingPage.tsx` 수정

**음식점 카드 디자인 변경**:
- `src/components/RestaurantCard.tsx` 수정

**타입 정의 추가/수정**:
- `src/types.ts` 수정

## 중요한 디자인 결정

### 1. 원스텝 평가 시스템
- **결정**: 방문 전 기대치 입력 제거, 방문 후 한 번에 평가
- **이유**: 사용자 편의성 최대화, 이탈률 감소
- **구현**: 별점을 기대치로 자동 설정

### 2. 감성 버튼 UI
- **결정**: 5단계 이모지 + 텍스트 버튼
- **이유**: 직관적, 모바일 친화적, 빠른 입력
- **스케일**: -2 (완전 실망) ~ +2 (완전 초월)

### 3. 갭 점수 계산 방식
```typescript
갭 점수 = 평균(사용자들의 만족도 차이)

예시:
- 네이버 별점 4.5
- 사용자 A: -2 (실망)
- 사용자 B: -1 (아쉬움)
- 사용자 C: 0 (예상대로)
→ 평균 갭 점수: (-2 + -1 + 0) / 3 = -1.0 (기대 이하)
```

### 4. Mock 데이터 설계
- **목적**: 프로토타입 단계에서 UX 테스트
- **샘플 수**: 5개 (다양한 갭 점수 분포)
- **향후 전환**: API 연동 시 `mockRestaurants.ts` 제거

## 다음 세션 시작 시 체크리스트

새 세션에서 Claude를 시작할 때:

1. **프로젝트 디렉토리 확인**
   ```bash
   cd /Users/tigger/workspace/matmatna
   ls -la
   ls -la backend/  # 백엔드 디렉토리 확인
   ```

2. **프론트엔드 개발 서버**
   ```bash
   lsof -i :5173  # Vite 포트 확인
   npm run dev    # 프론트엔드 시작
   ```

3. **백엔드 개발 서버**
   ```bash
   cd backend
   lsof -i :8080  # Spring Boot 포트 확인
   ./gradlew bootRun  # 백엔드 시작 (H2 In-Memory DB)
   ```

4. **이 파일(CLAUDE.md) 읽기**
   - 현재 구현 상태 파악
   - 다음 작업 선택

5. **Git 상태 확인**
   ```bash
   git status
   git log --oneline -5  # 최근 커밋 확인
   ```

## 작업 우선순위 (추천)

### 🔥 High Priority (다음 작업)
1. **프론트엔드 ↔ 백엔드 연동**
   - React에서 Spring Boot API 호출
   - Mock 데이터 → 실제 API 전환

2. **Kakao Map 통합**
   - 지도 컴포넌트 생성
   - 음식점 마커 표시

3. **Vercel + Railway 배포**
   - 프론트: Vercel
   - 백엔드: Railway (MySQL 포함)

### ✅ Completed (2025-12-20)
- ~~백엔드 구축~~ → Kotlin + Spring Boot 4.0.1 + H2/MySQL

### 📊 Medium Priority (기능 확장)
4. **GPS 기반 주변 맛집** (1일)
5. **소셜 로그인** (반나절)
6. **북마크/히스토리** (반나절)

### 🎨 Low Priority (개선)
7. UI/UX 개선
8. 로딩 상태 처리
9. 에러 처리 강화

## 도메인 & 브랜딩

- **도메인 (확인됨)**: matmatna.kr, matmatna.co.kr, matmatna.com 모두 사용 가능
- **슬로건**: "이 맛집, 맛 맞나?"
- **영문명**: MatMatNa
- **로고**: 체크마크(✓) + 별(⭐) + 맛(🍴) 조합 (미제작)
- **컬러**: 회의적 회색 → 확인된 블루 (미정)

## 참고 자료

**프로젝트 탄생 배경**:
- 2025-12-16 SK-Jack 세션에서 아이디어 발굴
- 초기 컨셉: "맛없다" 투표 → "기대-현실 갭" 측정으로 Pivot
- 브랜딩: "맞나" → "맛맞나"로 변경 (음식 서비스 정체성 강화)
- 법적 리스크 회피 + 사용자 편의성 최적화

**핵심 인사이트**:
- 별점 절대값보다 "기대 대비 만족도"가 더 유용
- 과대평가 회피 > 맛집 발굴 (실패 회피 욕구)
- 원스텝 평가가 핵심 (두 단계는 사용자 이탈)
- "맛맞나" 네이밍으로 서비스 성격 명확화

---

## API 통합 가이드

### Kakao API 통합

#### 1. Kakao Developers 앱 등록
```
1. https://developers.kakao.com 접속
2. 내 애플리케이션 > 애플리케이션 추가하기
3. 앱 이름: "맞나"
4. 앱 키 발급:
   - REST API 키
   - JavaScript 키
   - Admin 키
```

#### 2. Kakao Login 설정
```javascript
// 플랫폼 설정
- Web 플랫폼 등록
  - 사이트 도메인: http://localhost:3000, https://mattna.vercel.app

// Redirect URI 설정
- http://localhost:3000/auth/kakao/callback
- https://mattna.vercel.app/auth/kakao/callback

// 동의항목 설정
- 필수: 닉네임, 프로필 이미지
- 선택: 이메일 (선택적)
```

#### 3. Kakao Map JavaScript SDK
```html
<!-- index.html에 추가 -->
<script type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_JAVASCRIPT_KEY&libraries=services"></script>
```

```typescript
// src/utils/kakaoMap.ts
declare global {
  interface Window {
    kakao: any;
  }
}

export const initMap = (container: HTMLElement, center: { lat: number; lng: number }) => {
  const options = {
    center: new window.kakao.maps.LatLng(center.lat, center.lng),
    level: 3
  };
  return new window.kakao.maps.Map(container, options);
};
```

#### 4. Kakao Local API (음식점 검색)
```typescript
// Backend API call
const searchPlaces = async (keyword: string, x: string, y: string) => {
  const response = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?` +
    `query=${encodeURIComponent(keyword)}&x=${x}&y=${y}&radius=1000&category_group_code=FD6`,
    {
      headers: {
        'Authorization': `KakaoAK ${process.env.KAKAO_REST_API_KEY}`
      }
    }
  );
  return await response.json();
};
```

### Google Places API 통합

#### 1. Google Cloud Console 설정
```
1. https://console.cloud.google.com
2. 새 프로젝트 생성: "Mattna"
3. API 및 서비스 > 라이브러리
4. "Places API" 검색 후 사용 설정
5. 사용자 인증 정보 > API 키 생성
6. API 키 제한 설정:
   - 애플리케이션 제한사항: HTTP 리퍼러
   - 허용된 리퍼러: localhost:3000, mattna.vercel.app
   - API 제한사항: Places API만 허용
```

#### 2. Places API 사용 (백엔드)
```typescript
// Backend: Google Places API call
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

const getPlaceDetails = async (placeId: string) => {
  const response = await client.placeDetails({
    params: {
      place_id: placeId,
      fields: ['name', 'rating', 'user_ratings_total', 'formatted_address'],
      key: process.env.GOOGLE_PLACES_API_KEY!
    }
  });
  return response.data.result;
};
```

**무료 한도**:
- 월 $200 크레딧 (약 28,500 Place Details 요청)
- Place Search: 요청당 $0.032
- Place Details: 요청당 $0.017

### Naver Search API 통합

#### 1. Naver Developers 앱 등록
```
1. https://developers.naver.com/apps/#/register
2. 애플리케이션 이름: "맞나"
3. 사용 API: 검색 (지역)
4. Client ID, Client Secret 발급
```

#### 2. Naver Local Search API
```typescript
// Backend: Naver Search API call
const searchNaverPlaces = async (query: string) => {
  const response = await fetch(
    `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=5`,
    {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!
      }
    }
  );
  return await response.json();
};
```

**제한사항**:
- 하루 25,000 요청
- 평점 정보는 제공되지 않음 (검색 결과만)
- 크롤링 대안 고려 필요

### 멀티플랫폼 평점 통합 전략

```typescript
// src/services/ratingAggregator.ts
interface PlaceRatings {
  kakao: { rating: number; reviewCount: number } | null;
  naver: { rating: number; reviewCount: number } | null;
  google: { rating: number; reviewCount: number } | null;
}

export const aggregateRatings = async (
  placeName: string,
  lat: number,
  lng: number
): Promise<PlaceRatings> => {
  // 병렬로 모든 플랫폼 API 호출
  const [kakaoData, naverData, googleData] = await Promise.allSettled([
    fetchKakaoRating(placeName, lat, lng),
    fetchNaverRating(placeName),
    fetchGoogleRating(placeName, lat, lng)
  ]);

  return {
    kakao: kakaoData.status === 'fulfilled' ? kakaoData.value : null,
    naver: naverData.status === 'fulfilled' ? naverData.value : null,
    google: googleData.status === 'fulfilled' ? googleData.value : null
  };
};
```

### 데이터베이스 스키마 (MySQL 8.x)

```sql
-- 사용자 테이블
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  kakao_id VARCHAR(255) UNIQUE NOT NULL,
  nickname VARCHAR(100),
  profile_image_url TEXT,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 음식점 테이블
CREATE TABLE restaurants (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  kakao_place_id VARCHAR(255),
  google_place_id VARCHAR(255),
  naver_place_id VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  address TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  kakao_rating DECIMAL(2, 1),
  naver_rating DECIMAL(2, 1),
  google_rating DECIMAL(2, 1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_kakao_place_id (kakao_place_id),
  INDEX idx_location (lat, lng)
);

-- 사용자 평가 테이블
CREATE TABLE reviews (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  restaurant_id BIGINT NOT NULL,
  reference_rating DECIMAL(2, 1),  -- 평가 시점의 별점
  reference_source VARCHAR(20),     -- 'kakao', 'naver', 'google'
  satisfaction_gap TINYINT CHECK (satisfaction_gap >= -2 AND satisfaction_gap <= 2),
  gap_label VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  INDEX idx_restaurant_id (restaurant_id),
  INDEX idx_user_id (user_id)
);

-- 갭 점수 통계 뷰
CREATE VIEW restaurant_gap_stats AS
SELECT
  restaurant_id,
  AVG(satisfaction_gap) as avg_gap_score,
  COUNT(*) as review_count,
  SUM(CASE WHEN satisfaction_gap = -2 THEN 1 ELSE 0 END) as very_disappointed,
  SUM(CASE WHEN satisfaction_gap = -1 THEN 1 ELSE 0 END) as disappointed,
  SUM(CASE WHEN satisfaction_gap = 0 THEN 1 ELSE 0 END) as as_expected,
  SUM(CASE WHEN satisfaction_gap = 1 THEN 1 ELSE 0 END) as better,
  SUM(CASE WHEN satisfaction_gap = 2 THEN 1 ELSE 0 END) as amazing
FROM reviews
GROUP BY restaurant_id;
```

### 환경 변수 설정

```bash
# .env.local (프론트엔드) ✅ 설정 완료
# ⚠️ 실제 키는 .env.local 파일에 저장 (git-ignored)
VITE_KAKAO_JAVASCRIPT_KEY=your_kakao_javascript_key
VITE_KAKAO_REST_API_KEY=your_kakao_rest_api_key
VITE_KAKAO_LOGIN_REDIRECT_URI=http://localhost:3000/auth/kakao/callback
VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key

# .bash_profile ✅ 추가 완료
# (위 환경 변수들이 .bash_profile에도 export로 추가됨)

# application.yml (백엔드 - Spring Boot) ⏳ 향후 추가 예정
# spring:
#   datasource:
#     url: jdbc:mysql://localhost:3306/matmatna?useSSL=false&serverTimezone=Asia/Seoul
#     username: your_mysql_username
#     password: your_mysql_password
#   jpa:
#     hibernate:
#       ddl-auto: validate
#     properties:
#       hibernate:
#         dialect: org.hibernate.dialect.MySQLDialect

# External API Keys (환경변수 또는 application-secret.yml)
KAKAO_REST_API_KEY=your_kakao_rest_key
KAKAO_ADMIN_KEY=your_kakao_admin_key
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
GOOGLE_PLACES_API_KEY=your_google_api_key
```

**중요**:
- `.env.local`은 `.gitignore`에 포함되어 GitHub에 푸시되지 않음
- `.bash_profile`의 환경 변수는 터미널 세션에서 전역으로 사용 가능

### 다음 단계 추천 순서

1. ~~**Kakao Login 구현**~~ ✅ **완료** (2025-12-16)
   - ✅ JavaScript SDK 통합
   - ✅ 로그인 버튼 + 콜백 처리
   - ✅ 사용자 정보 저장

2. **Kakao Map 통합** (2-3시간) 🔥 **← 다음 작업**
   - 지도 컴포넌트 생성 (`src/components/MapView.tsx`)
   - 현재 위치 기반 표시
   - 음식점 마커 표시
   - 지도 클릭 시 음식점 정보 팝업

3. **Kakao Local API** (2-3시간)
   - 주변 음식점 검색
   - 음식점 상세 정보 표시
   - Mock 데이터를 실제 API 데이터로 교체

4. **백엔드 API 서버** (1일)
   - Kotlin + Spring Boot 4.x (Spring Framework 7)
   - 기본 CRUD API (JPA + Spring Data)
   - MySQL 8.x 연동

5. **Google Places API 통합** (1일)
   - 평점 수집 로직
   - Kakao + Google 통합 표시 UI

---

**마지막 업데이트**: 2025-12-20 17:20 KST
**버전**: v0.0.5 (백엔드 프로젝트 셋업 완료)
**작성자**: SK-Jack with tigger.kim

**최근 변경사항** (v0.0.5):
- ✅ 백엔드 프로젝트 생성: Kotlin + Spring Boot 4.0.1 + Kotlin 2.2.0
- ✅ 엔티티 생성: User, Restaurant, Review (JPA)
- ✅ Repository 인터페이스 생성 (Spring Data JPA)
- ✅ REST API Controller 생성 (User, Restaurant, Review)
- ✅ Gradle 8.14 + Gradle Wrapper 설정
- ✅ 빌드 성공 확인
- 🔥 **다음**: MySQL 연동 테스트 & Kakao Map 통합

**이전 변경사항** (v0.0.4):
- ✅ 백엔드 기술 스택 변경: Kotlin + Spring Boot 4.x + MySQL 8.x
- ✅ DB 스키마를 MySQL 문법으로 업데이트

**이전 변경사항** (v0.0.3):
- ✅ Kakao Login 통합 완료 (SDK, UI, 환경변수)
- ✅ 사용자 프로필 표시 (닉네임, 프로필 이미지)
- ✅ 로그인/로그아웃 기능 구현
