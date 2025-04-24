export { command, execute }

const command = {
  name: "ping",
  description: "replies with pong",
  contexts: [0, 1, 2]
}

function execute(interaction) {
  import("discord.js").then(async d => {
    await interaction.reply({ content: "pong", flags: d.MessageFlags.Ephemeral })
  })
}
