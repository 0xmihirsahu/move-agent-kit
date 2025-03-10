import type { AgentRuntime } from "../../agent"
import { getAuthenticatedScraper } from "./utils"

export async function XLike(runtime: AgentRuntime, tweetId: string) {
	try {
		const scraper = await getAuthenticatedScraper(runtime)
		await scraper.likeTweet(tweetId)

		return {
			success: true,
			message: "Tweet liked successfully",
		}
	} catch (error) {
		console.error("Error liking tweet:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : String(error),
		}
	}
}
