import type { AgentRuntime } from "../../agent"
import { getAuthenticatedScraper } from "./utils"

export async function XGetUser(runtime: AgentRuntime, username: string) {
	try {
		const scraper = await getAuthenticatedScraper(runtime)
		const profile = await scraper.getProfile(username)

		return {
			success: true,
			profile: {
				name: profile.name,
				followers: profile.followersCount,
				posts: profile.statusesCount,
			},
		}
	} catch (error) {
		console.error("Error getting user profile:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : String(error),
		}
	}
}
