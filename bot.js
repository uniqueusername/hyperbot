import config from "./config.json" with { type: "json" }
import "./commands.js"
import { Client, Events, MessageFlags } from "discord.js"

const client = new Client({ "intents": [] })

client.on(Events.ClientReady, readyClient => {
  console.log(`logged in as ${readyClient.user.tag}`)
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply({ content: "pong", flags: MessageFlags.Ephemeral })
  }
})

client.login(config.token)
