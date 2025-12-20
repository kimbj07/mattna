package kr.matmatna.domain.user

import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserRepository : JpaRepository<User, Long> {
    fun findByKakaoId(kakaoId: String): Optional<User>
    fun existsByKakaoId(kakaoId: String): Boolean
}
