import { Router } from "express"
import agentRoutes from "./agent.routes"
import healthRoutes from "./health.routes"

const router = Router()

router.use("/agent", agentRoutes)
router.use("/health", healthRoutes)

export default router
