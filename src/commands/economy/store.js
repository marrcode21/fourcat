const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("store")
      .setDescription(
        "Buy FourCat items"
      ),

  async execute(
    interaction
  ) {

    const embed =
      new EmbedBuilder()
        .setTitle(
          "🛒 FourCat Store"
        )
        .setColor(
          0xffcc00
        )
        .setDescription(
`Use:
/buy <item>

📦 Normal Pack
💰 100 Cats

🎁 Rare Pack
💰 500 Cats

✨ Epic Pack
💰 1500 Cats

🔮 Cat Prism
💰 250 Cats

☕ Coffee Beans
💰 150 Cats`
        )
        .setFooter({
          text:
            "FourCat v1.1.0"
        });

    await interaction.reply({
      embeds: [embed]
    });
  }
};