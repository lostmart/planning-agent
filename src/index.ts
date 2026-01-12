import express, { Request, Response } from "express"
import router from "./routes"
import { config } from "./config/env"

const app = express()

app.use(express.json())
app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
	res.json({
		success: true,
		status: "Server is running",
		timestamp: new Date().toISOString(),
	})
})

app.listen(config.port, () => {
	console.log(`Server running on http://localhost:${config.port}`)
})
