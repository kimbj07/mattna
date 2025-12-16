# 맛맞나 (MatMatNa)

> **"이 맛집, 맛 맞나?"** - 별점과 실제 경험의 갭을 측정하는 맛집 검증 서비스

## 프로젝트 소개

맛맞나는 Kakao/Google 별점이 실제로 "맛 맞는지" 검증하는 서비스입니다.
사용자들의 **기대 대비 만족도**를 측정하여 과대평가된 맛집과 숨은 맛집을 구별합니다.

### 핵심 기능

- 🗺️ **Kakao Map 기반** 주변 맛집 탐색
- ⭐ **멀티플랫폼 평점** 통합 (Kakao + Google)
- 😊 **5단계 감성 평가** 시스템
- 📊 **갭 점수** 시각화 및 분석
- 🔐 **Kakao Login** 간편 인증

## 기술 스택

### Frontend
- React 18.3 + TypeScript
- Vite 6.0
- Tailwind CSS 3.4
- Kakao Map/Login SDK

### Backend (예정)
- Node.js + Express or FastAPI
- PostgreSQL / Supabase
- Kakao Local API
- Google Places API

## 시작하기

### 설치

```bash
# 리포지토리 클론
git clone https://github.com/kimbj07/mattna.git
cd mattna

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 환경 변수 설정

```bash
# .env.local
VITE_KAKAO_JAVASCRIPT_KEY=your_kakao_js_key
VITE_KAKAO_LOGIN_REDIRECT_URI=http://localhost:3000/auth/kakao/callback
```

## 프로젝트 상태

**현재 버전**: v0.0.3 (Kakao Login 완료)

- ✅ 프론트엔드 프로토타입 (React + TypeScript)
- ✅ 5단계 감성 평가 UI
- ✅ Mock 데이터 기반 갭 점수 시각화
- ✅ Kakao Login 통합 (로그인, 로그아웃, 프로필 표시)
- 🔥 Kakao Map 통합 (다음 작업)
- 🔄 백엔드 API 서버 설계 (계획 중)

## 도메인

- ✅ matmatna.kr (사용 가능)
- ✅ matmatna.co.kr (사용 가능)
- ✅ matmatna.com (사용 가능)

## 라이센스

MIT

---

**작성자**: [@kimbj07](https://github.com/kimbj07)
**생성일**: 2025-12-16
