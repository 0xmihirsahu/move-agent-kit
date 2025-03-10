import { Tool } from "langchain/tools"
import type { AgentRuntime } from "../../agent"
import { XSearch } from "../../tools/agent-twitter-client"

/**
 * Tool for searching tweets on Twitter
 */
export class TwitterSearchTool extends Tool {
	name = "twitter_search"
	description =
		"Search for tweets on Twitter. Input should be a search query. Returns up to 10 most recent tweets matching the query."

	private runtime: AgentRuntime

	constructor(runtime: AgentRuntime) {
		super()
		this.runtime = runtime
	}

	/** @ignore */
	async _call(query: string): Promise<string> {
		try {
			const result = await XSearch(this.runtime, query)

			if (result.success && result.posts?.length) {
				const tweets = result.posts.map((post) => `- ${post.text} (by @${post.username})`).join("\n")
				return `Search results for "${query}":\n${tweets}`
			}
			return `Failed to search tweets: ${result.error || "No results found"}`
		} catch (error) {
			return `Error searching tweets: ${error instanceof Error ? error.message : String(error)}`
		}
	}
}
