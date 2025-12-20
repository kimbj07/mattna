package kr.matmatna.domain.review

import jakarta.persistence.*
import kr.matmatna.domain.restaurant.Restaurant
import kr.matmatna.domain.user.User
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(
    name = "reviews",
    indexes = [
        Index(name = "idx_restaurant_id", columnList = "restaurant_id"),
        Index(name = "idx_user_id", columnList = "user_id")
    ]
)
class Review(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    val restaurant: Restaurant,

    @Column(name = "reference_rating", precision = 2, scale = 1)
    val referenceRating: BigDecimal? = null,

    @Column(name = "reference_source", length = 20)
    @Enumerated(EnumType.STRING)
    val referenceSource: RatingSource? = null,

    @Column(name = "satisfaction_gap", nullable = false)
    val satisfactionGap: Int,

    @Column(name = "gap_label", length = 50)
    val gapLabel: String? = null,

    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
) {
    init {
        require(satisfactionGap in -2..2) { "satisfactionGap must be between -2 and 2" }
    }
}

enum class RatingSource {
    KAKAO, NAVER, GOOGLE
}

enum class SatisfactionLevel(val gap: Int, val label: String, val emoji: String) {
    VERY_DISAPPOINTED(-2, "완전 실망", "😡"),
    DISAPPOINTED(-1, "약간 아쉬움", "😕"),
    AS_EXPECTED(0, "예상대로", "😐"),
    BETTER(1, "기대 이상", "😊"),
    AMAZING(2, "완전 초월", "🤩");

    companion object {
        fun fromGap(gap: Int): SatisfactionLevel =
            entries.find { it.gap == gap }
                ?: throw IllegalArgumentException("Invalid gap value: $gap")
    }
}
