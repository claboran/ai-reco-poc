package de.ecompiraten.aireco.data

import de.ecompiraten.aireco.config.EmbeddingProfile
import de.ecompiraten.aireco.util.logging.LoggingAware
import de.ecompiraten.aireco.util.logging.logger
import org.springframework.ai.document.Document
import org.springframework.ai.vectorstore.VectorStore
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
@EmbeddingProfile
class DataLoaderService(
    @Value("\${dataLoader.inputFile}") private val inputFile: String,
    private val vectorStore: VectorStore,
) : LoggingAware {

    private fun loadDataFromFile(): List<Product> = try {
        ProductListObjectMapper.productListFromJson(inputFile)
    } catch (exc: Exception) {
        throw exc.also {
            logger().error("[Data Loading] Error loading data from file: {}", inputFile, exc)
        }
    }.also {
        logger().info("[Data Loading] Loaded {} products from file {}", it.size, inputFile)
    }

    fun loadEmbeddings() {
        val products = loadDataFromFile()
        val startTime = System.currentTimeMillis()
        logger().info("[Data Loader] {} Products to load. Start loading...", products.size)
        products.forEach {
            addProduct(it)
        }
        val endTime = System.currentTimeMillis()
        logger().info(
            "[Data Loader] Loading Finished {} Products loaded in {} seconds.",
            products.size,
            (endTime - startTime) / 1000.0,
        )
    }

    private fun addProduct(product: Product) {
        logger().info(
            "[Data Loader] Loading product {}, {}...",
            product.id,
            product.description.subSequence(
                0,
                if (product.description.length >= 20) 20 else product.description.length - 1,
            )
        )
        try {
            val document = Document(
                product.id,
                "${product.category} ${truncateText(product.description)}",
                mapOf<String, Any>( // Explicitly use Map<String, Any>
                    "category" to product.category,
                ),
            )
            vectorStore.add(listOf(document))
        } catch (exc: Exception) {
            throw exc.also {
                logger().error(
                    "[Data Loader] Error loading product {}, {}",
                    product.id,
                    product.description,
                    exc,
                )
            }
        }
    }

    // Truncate text to avoid long descriptions and overflow of
    // context window (maximum token limit)
    private fun truncateText(
        text: String,
        maxLengthChars: Int = MAX_TOKEN_ESTIMATION,
    ): String =
        if (text.length <= maxLengthChars) {
            text
        } else {
            "${text.substring(0, maxLengthChars)}...".also {
                logger().warn("[Data Loader] Truncated text to {} characters: {}", maxLengthChars, it)
            } // Add ellipsis for clarity
        }

    companion object {
        const val MAX_TOKEN_ESTIMATION = 6_000
    }
}
