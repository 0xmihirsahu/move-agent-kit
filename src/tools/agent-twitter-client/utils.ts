import { Scraper } from "agent-twitter-client"
import type { AgentRuntime } from "../../agent"

interface TwitterConfig {
	username: string
	password: string
}

export async function getAuthenticatedScraper(runtime: AgentRuntime): Promise<Scraper> {
	const scraper = new Scraper()

	const twitterConfig = runtime.config.twitter as TwitterConfig | undefined
	const username = twitterConfig?.username
	const password = twitterConfig?.password

	if (!username || !password) {
		throw new Error("Twitter credentials not found in runtime config")
	}

	await scraper.login(username, password)
	return scraper
}
