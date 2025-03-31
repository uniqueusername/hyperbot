import config from "./config.json" with { type: "json" }
import { REST, Routes, SimpleContextFetchingStrategy } from "discord.js"

const commands = [
  {
    name: "ping",
    description: "replies with pong",
    contexts: [0, 1, 2]
  }
]

const rest = new REST({ version: "10" }).setToken(config.token)

try {
  console.log("started refreshing commands")
  await rest.put(Routes.applicationCommands(config.clientId), { body: commands })
  console.log("finished refreshing commands")
} catch (error) {
  console.error(error)
}
