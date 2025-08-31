package de.ecompiraten.aireco.chat

import de.ecompiraten.aireco.config.OnlineProfile
import de.ecompiraten.aireco.data.ChatResult
import de.ecompiraten.aireco.model.dto.ChatMessageDto
import de.ecompiraten.aireco.model.dto.ChatRequestDto
import de.ecompiraten.aireco.search.SearchService
import de.ecompiraten.aireco.util.logging.LoggingAware
import de.ecompiraten.aireco.util.logging.logger
import org.springframework.ai.chat.client.ChatClient
import org.springframework.ai.chat.messages.AssistantMessage
import org.springframework.ai.chat.messages.Message
import org.springframework.ai.chat.messages.UserMessage
import org.springframework.ai.chat.prompt.PromptTemplate
import org.springframework.stereotype.Service

@OnlineProfile
@Service
class ChatService(
    private val searchService: SearchService,
    private val chatClientBuilder: ChatClient.Builder,
) : LoggingAware {
    fun chat(request: ChatRequestDto): ChatResult {
        val (prompt, relevantProducts) = request.buildPromptAndProducts()

        val conversationHistory: List<Message> = request.history.map {
            when (it.role) {
                ChatMessageDto.RoleEnum.USER -> UserMessage(it.content)
                ChatMessageDto.RoleEnum.ASSISTANT -> AssistantMessage(it.content)
                else -> UserMessage(it.content) // Fallback for safety
            }
        }
        val chatClient = chatClientBuilder.build()
        val assistantAnswer = chatClient.prompt()
            .messages(conversationHistory) // Previous turns
            .user(prompt.contents) // The new, fully-formed user prompt with context
            .call()
            .content()

        return ChatResult(
            answer = assistantAnswer ?: "Sorry, I encountered an error and could not respond.",
            recommendedProducts = relevantProducts,
        ).also {
            logger().info("Chat completed. Assistant answer: '{}', products: {}", it.answer, it.recommendedProducts)
        }
    }

    private fun ChatRequestDto.buildPromptAndProducts() = run {
        val relevantProducts = searchService.search(query, topN = 3) ?: emptyList()
        val context = if (relevantProducts.isEmpty()) {
            "No relevant products found."
        } else {
            relevantProducts.joinToString("\n") {
                "Product ID: ${it.id}, Category: ${it.category}, Description: ${it.description}"
            }
        }
        val historyString = history.joinToString("\n") { "${it.role.value}: ${it.content}" }
        val prompt = promptTemplate.create(
            mapOf(
                "history" to historyString,
                "context" to context,
                "question" to query
            )
        )
        prompt to relevantProducts
    }

    companion object {
        private val promptTemplate = PromptTemplate(
                """
            You are a friendly and helpful e-commerce assistant.
            Answer the user's QUESTION based only on the provided CONTEXT.
            Use the PREVIOUS CONVERSATION for context if the user asks a follow-up question.
            If the context does not contain the answer, say that you couldn't find a relevant product.
    
            --- PREVIOUS CONVERSATION ---
            {history}
            --- CONTEXT ---
            {context}
            --- QUESTION ---
            {question}
            """.trimIndent(),
        )
    }
}
