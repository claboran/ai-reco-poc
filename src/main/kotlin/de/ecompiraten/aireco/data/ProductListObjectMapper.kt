package de.ecompiraten.aireco.data

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import org.springframework.core.io.ClassPathResource

object ProductListObjectMapper {
    fun productListFromJson(fileName: String): List<Product> = ObjectMapper()
        .registerKotlinModule()
        .readValue(ClassPathResource(fileName).inputStream, Array<Product>::class.java).toList()
}
