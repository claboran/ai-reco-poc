package de.ecompiraten.aireco.search

import de.ecompiraten.aireco.data.Product
import de.ecompiraten.aireco.util.logging.LoggingAware
import org.springframework.ai.vectorstore.SearchRequest
import org.springframework.ai.vectorstore.VectorStore
import org.springframework.stereotype.Service

@Service
class SearchService(
    private val vectorStore: VectorStore,
) : LoggingAware {

    fun search(query: String, topN: Int = 10): List<Product>? = vectorStore.similaritySearch(
        SearchRequest
            .builder()
            .query(query)
            .topK(topN)
            .build(),
    )?.map { document ->
        // Convert Document back to Product
        Product(
            id = document.id,
            category = document.metadata["category"] as String, // Cast metadata
            description = document.text as String,          // and description separately.
        )
    }
}
