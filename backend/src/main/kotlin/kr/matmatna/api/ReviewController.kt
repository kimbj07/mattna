package kr.matmatna.api

import jakarta.validation.Valid
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import kr.matmatna.domain.restaurant.RestaurantRepository
import kr.matmatna.domain.review.RatingSource
import kr.matmatna.domain.review.Review
import kr.matmatna.domain.review.ReviewRepository
import kr.matmatna.domain.review.SatisfactionLevel
import kr.matmatna.domain.user.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.math.BigDecimal
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = ["http://localhost:3000", "http://localhost:5173"])
class ReviewController(
    private val reviewRepository: ReviewRepository,
    private val userRepository: UserRepository,
    private val restaurantRepository: RestaurantRepository
) {

    @PostMapping
    fun createReview(@Valid @RequestBody request: CreateReviewRequest): ResponseEntity<ReviewResponse> {
        val user = userRepository.findById(request.userId)
            .orElseThrow { NoSuchElementException("User not found: ${request.userId}") }

        val restaurant = restaurantRepository.findById(request.restaurantId)
            .orElseThrow { NoSuchElementException("Restaurant not found: ${request.restaurantId}") }

        if (reviewRepository.existsByUserIdAndRestaurantId(request.userId, request.restaurantId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build()
        }

        val satisfactionLevel = SatisfactionLevel.fromGap(request.satisfactionGap)

        val review = Review(
            user = user,
            restaurant = restaurant,
            referenceRating = request.referenceRating,
            referenceSource = request.referenceSource,
            satisfactionGap = request.satisfactionGap,
            gapLabel = satisfactionLevel.label
        )

        val saved = reviewRepository.save(review)
        return ResponseEntity.status(HttpStatus.CREATED).body(saved.toResponse())
    }

    @GetMapping("/restaurant/{restaurantId}")
    fun getReviewsByRestaurant(@PathVariable restaurantId: Long): ResponseEntity<List<ReviewResponse>> {
        val reviews = reviewRepository.findByRestaurantId(restaurantId)
        return ResponseEntity.ok(reviews.map { it.toResponse() })
    }

    @GetMapping("/user/{userId}")
    fun getReviewsByUser(@PathVariable userId: Long): ResponseEntity<List<ReviewResponse>> {
        val reviews = reviewRepository.findByUserId(userId)
        return ResponseEntity.ok(reviews.map { it.toResponse() })
    }

    @GetMapping("/restaurant/{restaurantId}/stats")
    fun getRestaurantStats(@PathVariable restaurantId: Long): ResponseEntity<GapStatsResponse> {
        val avgScore = reviewRepository.calculateAverageGapScore(restaurantId)
        val distribution = reviewRepository.getGapDistribution(restaurantId)
        val reviewCount = reviewRepository.findByRestaurantId(restaurantId).size

        return ResponseEntity.ok(
            GapStatsResponse(
                restaurantId = restaurantId,
                averageGapScore = avgScore,
                reviewCount = reviewCount,
                distribution = distribution.associate {
                    val gap = it[0] as Int
                    val count = (it[1] as Long).toInt()
                    SatisfactionLevel.fromGap(gap).name to count
                }
            )
        )
    }

    private fun Review.toResponse() = ReviewResponse(
        id = id,
        userId = user.id,
        restaurantId = restaurant.id,
        restaurantName = restaurant.name,
        referenceRating = referenceRating,
        referenceSource = referenceSource,
        satisfactionGap = satisfactionGap,
        gapLabel = gapLabel,
        emoji = SatisfactionLevel.fromGap(satisfactionGap).emoji,
        createdAt = createdAt
    )
}

data class CreateReviewRequest(
    val userId: Long,
    val restaurantId: Long,
    val referenceRating: BigDecimal?,
    val referenceSource: RatingSource?,

    @field:Min(-2)
    @field:Max(2)
    val satisfactionGap: Int
)

data class ReviewResponse(
    val id: Long,
    val userId: Long,
    val restaurantId: Long,
    val restaurantName: String,
    val referenceRating: BigDecimal?,
    val referenceSource: RatingSource?,
    val satisfactionGap: Int,
    val gapLabel: String?,
    val emoji: String,
    val createdAt: LocalDateTime
)

data class GapStatsResponse(
    val restaurantId: Long,
    val averageGapScore: Double?,
    val reviewCount: Int,
    val distribution: Map<String, Int>
)
