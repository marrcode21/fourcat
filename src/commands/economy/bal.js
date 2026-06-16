const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const getUser =
  require("../../utils/getUser");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("bal")
      .setDescription(
        "Get your balance"
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
          "💰 FourCat Balance"
        )
        .setDescription(
          `🐱 Cats: **${user.cats}**`
        )
        .setFooter({
          text: interaction.user.username
        });

    await interaction.reply({
      embeds: [embed]
    });
  }
};