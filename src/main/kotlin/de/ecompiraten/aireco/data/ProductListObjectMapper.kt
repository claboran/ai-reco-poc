package de.ecompiraten.aireco.data

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import de.ecompiraten.aireco.util.logging.LoggingAware
import de.ecompiraten.aireco.util.logging.logger
import org.springframework.core.io.ClassPathResource
import java.io.IOException

object ProductListObjectMapper : LoggingAware {
    private val mapper: ObjectMapper = jacksonObjectMapper()

    fun productListFromJson(fileName: String): List<Product> = try {
        mapper.readValue<List<Product>>(ClassPathResource(fileName).inputStream)
    } catch (e: IOException) {
        throw RuntimeException("Failed to parse product list from $fileName", e).also {
            logger().error("Failed to parse product list from $fileName", e)
        }
    }
}
