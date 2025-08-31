package de.ecompiraten.aireco.config

import org.springframework.context.annotation.Profile

@Profile("!$EMBEDDING_PROFILE")
annotation class OnlineProfile
