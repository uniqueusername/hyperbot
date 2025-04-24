export { command, execute }

const command = {
  name: "hello",
  description: "replies with world",
  contexts: [0, 1, 2]
}

function execute(interaction) {
  import("discord.js").then(async d => {
    await interaction.reply({ content: "hello world", flags: d.MessageFlags.Ephemeral })
  })
}
