import type { AgentRuntime } from "../../agent"
import { getAuthenticatedScraper } from "./utils"

export async function XRetweet(runtime: AgentRuntime, tweetId: string) {
	try {
		const scraper = await getAuthenticatedScraper(runtime)
		await scraper.retweet(tweetId)

		return {
			success: true,
			message: "Tweet retweeted successfully",
		}
	} catch (error) {
		console.error("Error retweeting:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : String(error),
		}
	}
}
