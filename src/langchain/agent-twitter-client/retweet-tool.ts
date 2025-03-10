import { Tool } from "langchain/tools"
import type { AgentRuntime } from "../../agent"
import { XRetweet } from "../../tools/agent-twitter-client"

/**
 * Tool for retweeting tweets on Twitter
 */
export class TwitterRetweetTool extends Tool {
	name = "twitter_retweet"
	description = "Retweet a tweet on Twitter. Input should be the tweet ID."

	private runtime: AgentRuntime

	constructor(runtime: AgentRuntime) {
		super()
		this.runtime = runtime
	}

	/** @ignore */
	async _call(tweetId: string): Promise<string> {
		try {
			const result = await XRetweet(this.runtime, tweetId)

			if (result.success) {
				return `Successfully retweeted tweet with ID: ${tweetId}`
			}
			return `Failed to retweet: ${result.error}`
		} catch (error) {
			return `Error retweeting: ${error instanceof Error ? error.message : String(error)}`
		}
	}
}
