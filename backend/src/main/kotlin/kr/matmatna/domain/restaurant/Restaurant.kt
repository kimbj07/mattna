package kr.matmatna.domain.restaurant

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(
    name = "restaurants",
    indexes = [
        Index(name = "idx_kakao_place_id", columnList = "kakao_place_id"),
        Index(name = "idx_location", columnList = "lat, lng")
    ]
)
class Restaurant(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "kakao_place_id")
    var kakaoPlaceId: String? = null,

    @Column(name = "google_place_id")
    var googlePlaceId: String? = null,

    @Column(name = "naver_place_id")
    var naverPlaceId: String? = null,

    @Column(nullable = false)
    var name: String,

    @Column(length = 100)
    var category: String? = null,

    @Column(columnDefinition = "TEXT")
    var address: String? = null,

    @Column(precision = 10, scale = 8)
    var lat: BigDecimal? = null,

    @Column(precision = 11, scale = 8)
    var lng: BigDecimal? = null,

    @Column(name = "kakao_rating", precision = 2, scale = 1)
    var kakaoRating: BigDecimal? = null,

    @Column(name = "naver_rating", precision = 2, scale = 1)
    var naverRating: BigDecimal? = null,

    @Column(name = "google_rating", precision = 2, scale = 1)
    var googleRating: BigDecimal? = null,

    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now()
) {
    @PreUpdate
    fun onUpdate() {
        updatedAt = LocalDateTime.now()
    }
}
