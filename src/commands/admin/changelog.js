const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const checkOwner =
  require("../../utils/checkOwner");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("changelog")
      .setDescription(
        "Send update changelog"
      ),

  async execute(
    interaction
  ) {

    const isOwner =
      await checkOwner(
        interaction.user.id
      );

    if (!isOwner) {
      return interaction.reply({
        content:
          "❌ Owner only.",
        flags: 64
      });
    }

    const embed =
      new EmbedBuilder()
        .setTitle(
          "🎉 FourCat v1.1.0"
        )
        .setDescription(
`Thank you for playing FourCat!

🚀 New Features

☕ /brew
🔮 /prism
🎲 /roulette

👑 Secret Cats
Onde Mande has arrived!
4 secret variants can now appear.

🏆 New Achievements
• Onde Mande Hunter
• Onde Mande Collector
• Onde Mande Master
• Onde Mande God

📚 Catalogue Update
Secret Cats added.

📊 Stats Update
Secret Cat statistics added.

⚡ Coffee Boost
Catch rewards can now be boosted.

🛠️ Bug Fixes
Various improvements and balancing changes.

Happy hunting! 🐱`
        )
        .setFooter({
          text:
            "FourCat v1.1.0"
        })
        .setTimestamp();

    await interaction.channel.send({
      embeds: [embed]
    });

    await interaction.reply({
      content:
        "✅ Changelog sent.",
      flags: 64
    });
  }
};