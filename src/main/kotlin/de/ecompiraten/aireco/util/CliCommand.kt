package de.ecompiraten.aireco.util

import de.ecompiraten.aireco.util.logging.LoggingAware
import de.ecompiraten.aireco.util.logging.logger
import org.springframework.boot.CommandLineRunner
import kotlin.system.exitProcess

abstract class CliCommand(
    private val command: () -> Unit,
): CommandLineRunner, LoggingAware {
    override fun run(vararg args: String?) {
        logger().info("[CliCommand] Running command with arguments: {}", args.joinToString(separator = ", "))
        try {
            command()
            exitWithSuccess()
        } catch (exc: Exception) {
            logger().error("[CliCommand] Error running command: {}", exc.message)
            exitWithError()
        }
    }

    internal fun exitWithSuccess() {
        exitProcess(0)
    }

    internal fun exitWithError() {
        exitProcess(-1)
    }
}
