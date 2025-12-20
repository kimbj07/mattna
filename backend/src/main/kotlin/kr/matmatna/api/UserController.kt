package kr.matmatna.api

import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import kr.matmatna.domain.user.User
import kr.matmatna.domain.user.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = ["http://localhost:3000", "http://localhost:5173"])
class UserController(
    private val userRepository: UserRepository
) {

    @PostMapping("/kakao")
    fun loginOrRegisterWithKakao(
        @Valid @RequestBody request: KakaoLoginRequest
    ): ResponseEntity<UserResponse> {
        val existingUser = userRepository.findByKakaoId(request.kakaoId)

        val user = if (existingUser.isPresent) {
            existingUser.get().apply {
                nickname = request.nickname
                profileImageUrl = request.profileImageUrl
                email = request.email
            }.let { userRepository.save(it) }
        } else {
            userRepository.save(
                User(
                    kakaoId = request.kakaoId,
                    nickname = request.nickname,
                    profileImageUrl = request.profileImageUrl,
                    email = request.email
                )
            )
        }

        return ResponseEntity.ok(user.toResponse())
    }

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: Long): ResponseEntity<UserResponse> {
        val user = userRepository.findById(id)
            .orElseThrow { NoSuchElementException("User not found: $id") }
        return ResponseEntity.ok(user.toResponse())
    }

    @GetMapping("/kakao/{kakaoId}")
    fun getUserByKakaoId(@PathVariable kakaoId: String): ResponseEntity<UserResponse> {
        val user = userRepository.findByKakaoId(kakaoId)
            .orElseThrow { NoSuchElementException("User not found with kakaoId: $kakaoId") }
        return ResponseEntity.ok(user.toResponse())
    }

    private fun User.toResponse() = UserResponse(
        id = id,
        kakaoId = kakaoId,
        nickname = nickname,
        profileImageUrl = profileImageUrl,
        email = email,
        createdAt = createdAt
    )
}

data class KakaoLoginRequest(
    @field:NotBlank
    val kakaoId: String,
    val nickname: String?,
    val profileImageUrl: String?,
    val email: String?
)

data class UserResponse(
    val id: Long,
    val kakaoId: String,
    val nickname: String?,
    val profileImageUrl: String?,
    val email: String?,
    val createdAt: LocalDateTime
)
