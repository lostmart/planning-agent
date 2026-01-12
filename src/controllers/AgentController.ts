import { Request, Response } from "express"
import { AgentService } from "../services/AgentService"

const agentService = new AgentService()

export class AgentController {
	createAgent = async (req: Request, res: Response) => {
		try {
			const agentId = agentService.createAgent()

			res.json({
				success: true,
				agentId,
				message: "Agent created successfully",
			})
		} catch (error: any) {
			res.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}

	askAgent = async (req: Request, res: Response) => {
		try {
			const { agentId } = req.params
			const { message } = req.body

			if (!message) {
				return res.status(400).json({
					success: false,
					error: "Message is required",
				})
			}

			const response = await agentService.askAgent(agentId, message)

			res.json({
				success: true,
				agentId,
				userMessage: message,
				agentResponse: response,
			})
		} catch (error: any) {
			res.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}

	getHistory = async (req: Request, res: Response) => {
		try {
			const { agentId } = req.params

			const history = agentService.getHistory(agentId)

			res.json({
				success: true,
				agentId,
				history,
			})
		} catch (error: any) {
			res.status(404).json({
				success: false,
				error: error.message,
			})
		}
	}

	resetAgent = async (req: Request, res: Response) => {
		try {
			const { agentId } = req.params

			agentService.resetAgent(agentId)

			res.json({
				success: true,
				agentId,
				message: "Agent history reset",
			})
		} catch (error: any) {
			res.status(404).json({
				success: false,
				error: error.message,
			})
		}
	}

	deleteAgent = async (req: Request, res: Response) => {
		try {
			const { agentId } = req.params

			agentService.deleteAgent(agentId)

			res.json({
				success: true,
				agentId,
				message: "Agent deleted",
			})
		} catch (error: any) {
			res.status(404).json({
				success: false,
				error: error.message,
			})
		}
	}
}
