import { Tool } from "langchain/tools"
import type { AgentRuntime } from "../../agent"
import { XGetUser } from "../../tools/agent-twitter-client"

/**
 * Tool for getting user profiles on Twitter
 */
export class TwitterGetUserTool extends Tool {
	name = "twitter_get_user"
	description = "Get a user's profile information from Twitter. Input should be the username."

	private runtime: AgentRuntime

	constructor(runtime: AgentRuntime) {
		super()
		this.runtime = runtime
	}

	/** @ignore */
	async _call(username: string): Promise<string> {
		try {
			const result = await XGetUser(this.runtime, username)

			if (result.success && result.profile) {
				const { name = "Unknown", followers = 0, posts = 0 } = result.profile
				return `Profile for ${username}:\nName: ${name}\nFollowers: ${followers}\nTotal Posts: ${posts}`
			}
			return `Failed to get user profile: ${result.error || "Profile not found"}`
		} catch (error) {
			return `Error getting user profile: ${error instanceof Error ? error.message : String(error)}`
		}
	}
}
