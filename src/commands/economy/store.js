const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("store")
      .setDescription(
        "Buy Cat Packs!"
      ),

  async execute(
    interaction
  ) {
    const embed =
      new EmbedBuilder()
        .setTitle(
          "🛒 FourCat Store"
        )
        .setDescription(
`Use:
/buy <item>

📦 **Normal Pack**
100 cats

🎁 **Rare Pack**
500 cats

✨ **Epic Pack**
1500 cats`
        );

    await interaction.reply({
      embeds: [embed]
    });
  }
};