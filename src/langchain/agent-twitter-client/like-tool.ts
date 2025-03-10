import { Tool } from "langchain/tools"
import type { AgentRuntime } from "../../agent"
import { XLike } from "../../tools/agent-twitter-client"

/**
 * Tool for liking tweets on Twitter
 */
export class TwitterLikeTool extends Tool {
	name = "twitter_like"
	description = "Like a tweet on Twitter. Input should be the tweet ID."

	private runtime: AgentRuntime

	constructor(runtime: AgentRuntime) {
		super()
		this.runtime = runtime
	}

	/** @ignore */
	async _call(tweetId: string): Promise<string> {
		try {
			const result = await XLike(this.runtime, tweetId)

			if (result.success) {
				return `Successfully liked tweet with ID: ${tweetId}`
			}
			return `Failed to like tweet: ${result.error}`
		} catch (error) {
			return `Error liking tweet: ${error instanceof Error ? error.message : String(error)}`
		}
	}
}
