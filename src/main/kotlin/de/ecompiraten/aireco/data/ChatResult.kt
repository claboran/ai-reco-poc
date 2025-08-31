package de.ecompiraten.aireco.data

data class ChatResult(
    val answer: String,
    val recommendedProducts: List<Product>,
)

