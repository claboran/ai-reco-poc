package de.ecompiraten.aireco.data

import de.ecompiraten.aireco.model.dto.ProductDto
import java.util.*

data class Product(
    val id: String,
    val category: String,
    val description: String,
)

internal fun Product.toDto(): ProductDto = ProductDto().apply {
    this@toDto.id.let { id = UUID.fromString(it) }
    category = this@toDto.category
    description = if (this@toDto.description.length > 50) this@toDto.description.take(50) else this@toDto.description
}
