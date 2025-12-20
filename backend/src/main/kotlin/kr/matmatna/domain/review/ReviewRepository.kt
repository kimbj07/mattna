package kr.matmatna.domain.review

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface ReviewRepository : JpaRepository<Review, Long> {
    fun findByRestaurantId(restaurantId: Long): List<Review>
    fun findByUserId(userId: Long): List<Review>
    fun existsByUserIdAndRestaurantId(userId: Long, restaurantId: Long): Boolean

    @Query("""
        SELECT AVG(r.satisfactionGap) FROM Review r
        WHERE r.restaurant.id = :restaurantId
    """)
    fun calculateAverageGapScore(restaurantId: Long): Double?

    @Query("""
        SELECT r.satisfactionGap, COUNT(r) FROM Review r
        WHERE r.restaurant.id = :restaurantId
        GROUP BY r.satisfactionGap
    """)
    fun getGapDistribution(restaurantId: Long): List<Array<Any>>
}
