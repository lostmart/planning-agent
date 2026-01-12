import { Router } from "express"
import { AgentController } from "../controllers/AgentController"

const router = Router()
const agentController = new AgentController()

// Create a new agent
router.post("/create", agentController.createAgent)

// Send a message to an agent
router.post("/:agentId/ask", agentController.askAgent)

// Get conversation history
router.get("/:agentId/history", agentController.getHistory)

// Reset agent conversation
router.post("/:agentId/reset", agentController.resetAgent)

// Delete an agent
router.delete("/:agentId", agentController.deleteAgent)

export default router
