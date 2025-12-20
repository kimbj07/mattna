package kr.matmatna.api

import kr.matmatna.domain.restaurant.Restaurant
import kr.matmatna.domain.restaurant.RestaurantRepository
import kr.matmatna.domain.review.ReviewRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.math.BigDecimal

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = ["http://localhost:3000", "http://localhost:5173"])
class RestaurantController(
    private val restaurantRepository: RestaurantRepository,
    private val reviewRepository: ReviewRepository
) {

    @GetMapping
    fun getAllRestaurants(): ResponseEntity<List<RestaurantResponse>> {
        val restaurants = restaurantRepository.findAll()
        return ResponseEntity.ok(restaurants.map { it.toResponse() })
    }

    @GetMapping("/{id}")
    fun getRestaurant(@PathVariable id: Long): ResponseEntity<RestaurantDetailResponse> {
        val restaurant = restaurantRepository.findById(id)
            .orElseThrow { NoSuchElementException("Restaurant not found: $id") }

        val avgGapScore = reviewRepository.calculateAverageGapScore(id)
        val distribution = reviewRepository.getGapDistribution(id)
        val reviewCount = reviewRepository.findByRestaurantId(id).size

        return ResponseEntity.ok(restaurant.toDetailResponse(avgGapScore, reviewCount, distribution))
    }

    @GetMapping("/search")
    fun searchRestaurants(@RequestParam query: String): ResponseEntity<List<RestaurantResponse>> {
        val restaurants = restaurantRepository.findByNameContaining(query)
        return ResponseEntity.ok(restaurants.map { it.toResponse() })
    }

    @GetMapping("/nearby")
    fun getNearbyRestaurants(
        @RequestParam lat: BigDecimal,
        @RequestParam lng: BigDecimal,
        @RequestParam(defaultValue = "0.01") radius: BigDecimal
    ): ResponseEntity<List<RestaurantResponse>> {
        val restaurants = restaurantRepository.findByLocationBounds(
            minLat = lat - radius,
            maxLat = lat + radius,
            minLng = lng - radius,
            maxLng = lng + radius
        )
        return ResponseEntity.ok(restaurants.map { it.toResponse() })
    }

    private fun Restaurant.toResponse() = RestaurantResponse(
        id = id,
        name = name,
        category = category,
        address = address,
        lat = lat,
        lng = lng,
        kakaoRating = kakaoRating,
        naverRating = naverRating,
        googleRating = googleRating,
        gapScore = reviewRepository.calculateAverageGapScore(id)
    )

    private fun Restaurant.toDetailResponse(
        avgGapScore: Double?,
        reviewCount: Int,
        distribution: List<Array<Any>>
    ) = RestaurantDetailResponse(
        id = id,
        name = name,
        category = category,
        address = address,
        lat = lat,
        lng = lng,
        kakaoRating = kakaoRating,
        naverRating = naverRating,
        googleRating = googleRating,
        gapScore = avgGapScore,
        reviewCount = reviewCount,
        gapDistribution = distribution.associate {
            (it[0] as Int) to (it[1] as Long).toInt()
        }
    )
}

data class RestaurantResponse(
    val id: Long,
    val name: String,
    val category: String?,
    val address: String?,
    val lat: BigDecimal?,
    val lng: BigDecimal?,
    val kakaoRating: BigDecimal?,
    val naverRating: BigDecimal?,
    val googleRating: BigDecimal?,
    val gapScore: Double?
)

data class RestaurantDetailResponse(
    val id: Long,
    val name: String,
    val category: String?,
    val address: String?,
    val lat: BigDecimal?,
    val lng: BigDecimal?,
    val kakaoRating: BigDecimal?,
    val naverRating: BigDecimal?,
    val googleRating: BigDecimal?,
    val gapScore: Double?,
    val reviewCount: Int,
    val gapDistribution: Map<Int, Int>
)
