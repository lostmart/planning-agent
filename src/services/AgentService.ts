import { Agent } from "../components/agent/Agent"

export class AgentService {
	private agents: Map<string, Agent> = new Map()

	createAgent(): string {
		const agentId = Date.now().toString()
		const agent = new Agent(agentId)
		this.agents.set(agentId, agent)
		return agentId
	}

	async askAgent(agentId: string, message: string): Promise<string> {
		const agent = this.agents.get(agentId)

		if (!agent) {
			throw new Error("Agent not found")
		}

		return await agent.thinkAndAct(message)
	}

	getHistory(agentId: string): any[] {
		const agent = this.agents.get(agentId)

		if (!agent) {
			throw new Error("Agent not found")
		}

		return agent.getHistory()
	}

	resetAgent(agentId: string): void {
		const agent = this.agents.get(agentId)

		if (!agent) {
			throw new Error("Agent not found")
		}

		agent.resetHistory()
	}

	deleteAgent(agentId: string): void {
		if (!this.agents.has(agentId)) {
			throw new Error("Agent not found")
		}

		this.agents.delete(agentId)
	}

	getActiveAgentsCount(): number {
		return this.agents.size
	}
}
