package de.ecompiraten.aireco.controller

import de.ecompiraten.aireco.api.ProductRecommendationApi
import de.ecompiraten.aireco.data.Product
import de.ecompiraten.aireco.data.toDto
import de.ecompiraten.aireco.model.dto.ProductDto
import de.ecompiraten.aireco.model.dto.SearchRequestDto
import de.ecompiraten.aireco.search.SearchService
import de.ecompiraten.aireco.util.logging.LoggingAware
import de.ecompiraten.aireco.util.logging.logger
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class SearchController(
    private val searchService: SearchService,
) : ProductRecommendationApi, LoggingAware {

    override fun getProductRecommendations(searchRequestDto: SearchRequestDto?): ResponseEntity<MutableList<ProductDto>> =
        ResponseEntity.ok(runQuery(searchRequestDto?.query).map { it.toDto() }.toMutableList())

    private fun runQuery(query: String?): List<Product> =
        query?.also { logger().info("Searching for products with query: $query") }
            ?.let { searchService.search(it) } ?: emptyList()
}
