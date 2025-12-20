# Matmatna Backend

맛맞나 백엔드 API 서버 (Kotlin + Spring Boot 4)

## Tech Stack

- **Language**: Kotlin 2.2.0
- **Framework**: Spring Boot 4.0.1 (Spring Framework 7)
- **Build**: Gradle 8.14
- **Database**:
  - 개발: H2 In-Memory
  - 운영: MySQL 8.x
- **ORM**: Spring Data JPA

## Quick Start

```bash
# 빌드
./gradlew build

# 실행 (H2 In-Memory - 기본)
./gradlew bootRun

# 운영 모드 (MySQL)
SPRING_PROFILES_ACTIVE=prod \
MYSQL_HOST=localhost \
MYSQL_USERNAME=root \
MYSQL_PASSWORD=xxxx \
./gradlew bootRun
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **User** |
| POST | `/api/users/kakao` | 카카오 로그인/회원가입 |
| GET | `/api/users/{id}` | 사용자 정보 조회 |
| **Restaurant** |
| GET | `/api/restaurants` | 음식점 목록 |
| GET | `/api/restaurants/{id}` | 음식점 상세 + 갭 점수 |
| GET | `/api/restaurants/search?query=` | 음식점 검색 |
| GET | `/api/restaurants/nearby?lat=&lng=` | 주변 음식점 |
| **Review** |
| POST | `/api/reviews` | 평가 등록 |
| GET | `/api/reviews/restaurant/{id}` | 음식점별 리뷰 |
| GET | `/api/reviews/restaurant/{id}/stats` | 갭 점수 통계 |

## Project Structure

```
src/main/kotlin/kr/matmatna/
├── MatmatnaApplication.kt     # Entry point
├── domain/
│   ├── user/                  # User entity & repository
│   ├── restaurant/            # Restaurant entity & repository
│   └── review/                # Review entity & repository
├── api/                       # REST Controllers
│   ├── UserController.kt
│   ├── RestaurantController.kt
│   └── ReviewController.kt
└── config/                    # Configuration
    └── GlobalExceptionHandler.kt
```

## Database

### H2 Console (개발 모드)
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:matmatna`
- Username: `sa`
- Password: (empty)

### MySQL (운영 모드)
```sql
CREATE DATABASE matmatna CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Profiles

| Profile | Database | DDL | 용도 |
|---------|----------|-----|------|
| `local` (default) | H2 In-Memory | create-drop | 개발/테스트 |
| `prod` | MySQL | validate | 운영 |

---

**Created**: 2025-12-20
**Version**: 0.0.1-SNAPSHOT
