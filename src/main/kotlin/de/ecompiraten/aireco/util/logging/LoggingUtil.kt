package de.ecompiraten.aireco.util.logging

interface LoggingAware

inline fun <reified T : LoggingAware> T.logger() = org.slf4j.LoggerFactory.getLogger(T::class.java)
