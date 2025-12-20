package kr.matmatna.domain.restaurant

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.math.BigDecimal
import java.util.*

interface RestaurantRepository : JpaRepository<Restaurant, Long> {
    fun findByKakaoPlaceId(kakaoPlaceId: String): Optional<Restaurant>
    fun findByGooglePlaceId(googlePlaceId: String): Optional<Restaurant>
    fun findByNameContaining(name: String): List<Restaurant>

    @Query("""
        SELECT r FROM Restaurant r
        WHERE r.lat BETWEEN :minLat AND :maxLat
        AND r.lng BETWEEN :minLng AND :maxLng
    """)
    fun findByLocationBounds(
        minLat: BigDecimal,
        maxLat: BigDecimal,
        minLng: BigDecimal,
        maxLng: BigDecimal
    ): List<Restaurant>
}
