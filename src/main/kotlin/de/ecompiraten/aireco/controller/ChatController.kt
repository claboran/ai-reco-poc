package de.ecompiraten.aireco.controller

import de.ecompiraten.aireco.api.ChatApi
import de.ecompiraten.aireco.chat.ChatService
import de.ecompiraten.aireco.config.OnlineProfile
import de.ecompiraten.aireco.data.toDto
import de.ecompiraten.aireco.model.dto.ChatRequestDto
import de.ecompiraten.aireco.model.dto.ChatResponseDto
import de.ecompiraten.aireco.util.logging.LoggingAware
import de.ecompiraten.aireco.util.logging.logger
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@OnlineProfile
@RestController
class ChatController(
    private val chatService: ChatService,
) : ChatApi, LoggingAware {
    override fun postChatMessage(chatRequestDto: ChatRequestDto): ResponseEntity<ChatResponseDto> {
        logger().info("Received chat request with query: '${chatRequestDto.query}'")

        // Call the service to get the structured result (containing domain objects)
        val result = chatService.chat(chatRequestDto)

        // Map the service result to the response DTO defined by the OpenAPI spec
        val responseDto = ChatResponseDto(
            result.answer,
            result.recommendedProducts.map { it.toDto() } // Map domain Product to ProductDto
        )

        return ResponseEntity.ok(responseDto)
    }
}
