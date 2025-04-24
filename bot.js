import fs from "node:fs"
import config from "./config.json" with { type: "json" }
import { Client, Events, REST, Routes } from "discord.js"

// globals
const commands = {}

// initialize
const client = new Client({ intents: [] })
client.on(Events.ClientReady, readyClient =>
  console.log(`logged in as ${readyClient.user.tag}`))

loadCommands() // load commands
// loadInteractions() // load interaction handlers

client.login(config.token) // log in to app

/* ----- */

// read slash commands from folder, submit
// to api, and initialize interactions
function loadCommands() {
  const commandFiles = fs.readdirSync("./commands/")
  const promises = []

  // create command array from files
  for (const file of commandFiles) {
    promises.push(import(`./commands/${file}`)
      .then(command =>
        commands[file.substring(0, file.length-3)] = command)
      .catch(error => console.error(error)))
  }

  // when promises resolve send to api
  Promise.all(promises).then(async () => {
    // build list of api objects
    const commandObjects = Object.values(commands)
      .map(value => value.command)
    const rest = new REST({ version: "10" })
      .setToken(config.token)

    try {
      await rest.put(
        Routes.applicationCommands(config.clientId),
        { body: commandObjects }
      )
      console.log("refreshed commands")
    } catch (error) {
      console.error(error)
    }
  })
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if(Object.keys(commands).includes(interaction.commandName)) {
    await commands[interaction.commandName].execute(interaction)
  }
})
