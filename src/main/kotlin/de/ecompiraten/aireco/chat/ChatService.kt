package de.ecompiraten.aireco.chat

import de.ecompiraten.aireco.config.OnlineProfile
import de.ecompiraten.aireco.data.ChatResult
import de.ecompiraten.aireco.model.dto.ChatMessageDto
import de.ecompiraten.aireco.model.dto.ChatRequestDto
import de.ecompiraten.aireco.search.SearchService
import de.ecompiraten.aireco.util.logging.LoggingAware
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
    /**
     * Handles the main chat logic using a RAG (Retrieval-Augmented Generation) pattern.
     * @param request The incoming chat request DTO generated from the OpenAPI spec.
     * @return A ChatResult object containing the AI's answer and any found domain model products.
     */
    fun chat(request: ChatRequestDto): ChatResult {
        // 1. RETRIEVE: Use the SearchService to find products related to the user's latest query.
        val relevantProducts = searchService.search(request.query, topN = 3) ?: emptyList()
        val context = if (relevantProducts.isEmpty()) {
            "No relevant products found."
        } else {
            relevantProducts.joinToString("\n") {
                "Product ID: ${it.id}, Category: ${it.category}, Description: ${it.description}"
            }
        }

        // Convert the DTO history to a simple string for the prompt's context.
        val historyString = request.history.joinToString("\n") { "${it.role.value}: ${it.content}" }

        // 2. AUGMENT: Create the prompt with all the necessary information.
        val prompt = promptTemplate.create(
            mapOf(
                "history" to historyString,
                "context" to context,
                "question" to request.query
            )
        )

        // Convert the DTO history into the Message objects that Spring AI requires.
        val conversationHistory: List<Message> = request.history.map {
            when (it.role) {
                ChatMessageDto.RoleEnum.USER -> UserMessage(it.content)
                ChatMessageDto.RoleEnum.ASSISTANT -> AssistantMessage(it.content)
                else -> UserMessage(it.content) // Fallback for safety
            }
        }

        // 3. GENERATE: Build the chat client, provide the full history and the new detailed prompt, and call the AI model.
        val chatClient = chatClientBuilder.build()
        val assistantAnswer = chatClient.prompt()
            .messages(conversationHistory) // Previous turns
            .user(prompt.contents) // The new, fully-formed user prompt with context
            .call()
            .content()

        // Return a structured result containing the AI's textual answer and the list of products we retrieved.
        return ChatResult(
            answer = assistantAnswer ?: "Sorry, I encountered an error and could not respond.",
            recommendedProducts = relevantProducts,
        )
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
