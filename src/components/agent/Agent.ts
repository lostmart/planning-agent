import Anthropic from "@anthropic-ai/sdk"
import { config } from "../../config/env"

const client = new Anthropic({
	apiKey: config.anthropicApiKey,
})

interface Message {
	role: "user" | "assistant"
	content: string
}

export class Agent {
	private agentId: string
	private conversationHistory: Message[] = []

	constructor(agentId: string) {
		this.agentId = agentId
	}

	private addMessage(role: "user" | "assistant", content: string): void {
		this.conversationHistory.push({ role, content })
	}

	async thinkAndAct(userInput: string): Promise<string> {
		this.addMessage("user", userInput)

		try {
			const response = await client.messages.create({
				model: "claude-opus-4-20250514",
				max_tokens: 1000,
				system: `You are a helpful lesson planning agent. 
When given course parameters, generate a structured lesson plan.
Be concise and practical.`,
				messages: this.conversationHistory,
			})

			const textBlock = response.content.find((block) => block.type === "text")
			const assistantMessage =
				textBlock && "text" in textBlock ? textBlock.text : ""

			this.addMessage("assistant", assistantMessage)

			return assistantMessage
		} catch (error: any) {
			throw new Error(`Agent error: ${error.message}`)
		}
	}

	getHistory(): Message[] {
		return this.conversationHistory
	}

	resetHistory(): void {
		this.conversationHistory = []
	}

	getAgentId(): string {
		return this.agentId
	}
}
