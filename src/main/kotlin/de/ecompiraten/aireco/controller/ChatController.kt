package de.ecompiraten.aireco.controller

import de.ecompiraten.aireco.api.ChatApi
import de.ecompiraten.aireco.chat.ChatService
import de.ecompiraten.aireco.config.OnlineProfile
import de.ecompiraten.aireco.data.Product
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
    override fun postChatMessage(
        chatRequestDto: ChatRequestDto,
    ): ResponseEntity<ChatResponseDto> = with(chatService) {
        chat(chatRequestDto).also {
            logger().info("Received chat request with query: '{}'", chatRequestDto.query)
        }.let {
            ResponseEntity.ok(
                ChatResponseDto(
                    it.answer,
                    it.recommendedProducts.map(Product::toDto),
                ),
            )
        }.also {
            logger().info(
                "Responding with answer: '{}' and {} recommended products",
                it.body?.answer,
                it.body?.recommendedProducts?.size,
            )
        }
    }
}
