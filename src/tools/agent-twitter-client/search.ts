import { SearchMode, type Tweet } from "agent-twitter-client"
import type { AgentRuntime } from "../../agent"
import { getAuthenticatedScraper } from "./utils"

export async function XSearch(runtime: AgentRuntime, query: string, limit = 10) {
	try {
		const scraper = await getAuthenticatedScraper(runtime)
		const searchIterator = scraper.searchTweets(query, limit, SearchMode.Latest)

		const posts: Tweet[] = []
		for await (const post of searchIterator) {
			posts.push(post)
			if (posts.length >= limit) break
		}

		const postList = posts.map((post) => ({
			text: post.text,
			username: post.username,
			timestamp: post.timestamp,
		}))

		return {
			success: true,
			posts: postList,
		}
	} catch (error) {
		console.error("Error searching tweets:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : String(error),
		}
	}
}
