package de.ecompiraten.aireco.config

import org.springframework.context.annotation.Profile

const val EMBEDDING_PROFILE = "embedding"

@Profile(EMBEDDING_PROFILE)
annotation class EmbeddingProfile
