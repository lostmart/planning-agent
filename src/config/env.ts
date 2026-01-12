import dotenv from "dotenv"

dotenv.config()

export const config = {
	port: process.env.PORT || 3000,
	anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
	nodeEnv: process.env.NODE_ENV || "development",
}

// Validate required environment variables
if (!config.anthropicApiKey) {
	throw new Error("ANTHROPIC_API_KEY is required in .env file")
}
