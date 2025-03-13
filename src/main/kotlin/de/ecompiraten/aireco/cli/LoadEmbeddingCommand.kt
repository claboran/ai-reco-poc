package de.ecompiraten.aireco.cli

import de.ecompiraten.aireco.config.EmbeddingProfile
import de.ecompiraten.aireco.data.DataLoaderService
import de.ecompiraten.aireco.util.CliCommand
import org.springframework.context.ApplicationContext
import org.springframework.stereotype.Component

@Component
@EmbeddingProfile
class LoadEmbeddingCommand(private val applicationContext: ApplicationContext): CliCommand(
    command = {
        val dataLoader = applicationContext.getBean(DataLoaderService::class.java)
        dataLoader.loadEmbeddings()
    }
)
