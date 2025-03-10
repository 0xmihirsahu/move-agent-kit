import { Tool } from "langchain/tools"
import type { AgentRuntime } from "../../agent"
import { XPost } from "../../tools/agent-twitter-client"

/**
 * Tool for posting tweets to Twitter using agent-twitter-client
 */
export class TwitterPostTool extends Tool {
	name = "twitter_post"
	description = "Post a tweet to Twitter. Input should be the text content of the tweet."

	private runtime: AgentRuntime

	constructor(runtime: AgentRuntime) {
		super()
		this.runtime = runtime
	}

	/** @ignore */
	async _call(input: string): Promise<string> {
		try {
			const result = await XPost(this.runtime, input)

			if (result.success) {
				return `Successfully posted tweet: "${input}"`
			}
			return `Failed to post tweet: ${result.error}`
		} catch (error) {
			return `Error posting tweet: ${error instanceof Error ? error.message : String(error)}`
		}
	}
}
