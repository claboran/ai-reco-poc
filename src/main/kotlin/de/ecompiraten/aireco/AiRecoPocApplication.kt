package de.ecompiraten.aireco

import de.ecompiraten.aireco.cli.LoadEmbeddingCommand
import de.ecompiraten.aireco.config.EMBEDDING_PROFILE
import de.ecompiraten.aireco.util.logging.LoggingAware
import org.springframework.boot.WebApplicationType
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AiRecoPocApplication: LoggingAware {

    companion object {
        @JvmStatic
        fun main(args: Array<String>): Unit = when {
            args.contains("--loadEmbeddings") -> runEmbeddingAsCli()
            else -> runWebApp()
        }

        private fun runWebApp() {
            runApplication<AiRecoPocApplication>()
        }

        private fun runEmbeddingAsCli() {
           val ctx =  runApplication<AiRecoPocApplication> {
                setAdditionalProfiles(EMBEDDING_PROFILE)
                webApplicationType = WebApplicationType.NONE
            }
            ctx.getBean(LoadEmbeddingCommand::class.java)
        }
    }
}
