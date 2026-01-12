import express, { Request, Response } from "express"
import router from "./routes"
import { config } from "./config/env"

const app = express()

app.use(express.json())
app.use("/", router)

app.get("/api/health", (req: Request, res: Response) => {
	res.json({ status: "Server is running" })
})

app.listen(config.port, () => {
	console.log(`Server running on http://localhost:${config.port}`)
})
