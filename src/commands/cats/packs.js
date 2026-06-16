const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const getUser =
require("../../utils/getUser");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("packs")
      .setDescription(
        "View your packs"
      ),

  async execute(
    interaction
  ) {
    const user =
      await getUser(
        interaction.user.id
      );

    const embed =
      new EmbedBuilder()
        .setTitle(
          "🎁 Your Packs"
        )
        .setDescription(
`📦 Normal: ${user.packs.normal}
🎁 Rare: ${user.packs.rare}
✨ Epic: ${user.packs.epic}`
        );

    await interaction.reply({
      embeds: [embed]
    });
  }
};