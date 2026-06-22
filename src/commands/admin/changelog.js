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
          "🎉 FourCat v1.2.0"
        )
        .setDescription(
`🐱 Welcome to FourCat v1.2.0!

This update focuses on improving progression, collection tracking, achievements, and overall user experience.

✨ New Features

🐱 Shiny Cat System

Shiny Cats now appear in the catalogue.
Shiny Cats are displayed properly in inventory.
Shiny Cats can be traded between players.
Shiny variants are now counted separately from normal cats.

📚 Collection Improvements

Collection progress now correctly counts unique cats.
Better tracking for completion percentage.
Improved collection display across commands.

🔍 New Cat Information System

Added /catinfo
View detailed information about every cat:

  Name
  Rarity
  Reward
  Type
  Shiny reward value

📅 Daily Reward Improvements

Better daily reward progression.
Daily streak tracking improvements.
More informative reward messages.

🏆 Achievement Expansion

Added new Secret Cat achievements:

👑 Onde Mande Hunter
🌟 Onde Mande Collector
🔥 Onde Mande Master
⚡ Onde Mande God

📖 Improved Help Command

Updated command list.
Added information for newer features.
Cleaner category layout.

🎒 Inventory Improvements

Better shiny display.
Improved duplicate counting.
Legacy inventory protection.
Unknown cat protection to prevent crashes.

🤝 Trade Improvements

Better cat selection menu.
Improved shiny cat support.
Improved trade confirmation system.
Added trade cancellation button.
Better error handling.

📚 Catalogue Improvements

Separate sections for:

  Normal Cats
  Shiny Cats
  Secret Cats

Improved readability.

More accurate total cat count.

📊 Stats V2

New statistics tracking:

Total Shinies
Secret Cats Caught
Collection Completion
Fastest Catch
Daily Streak Progress

🏅 Leaderboards Expansion

Added new leaderboard categories:

📚 Top Collectors
✨ Shiny Hunters
👑 Secret Hunters

Leaderboard rankings now display:

🥇 Gold Rank
🥈 Silver Rank
🥉 Bronze Rank

instead of only #1, #2, #3.

🛠 Bug Fixes

Fixed shiny cats not displaying correctly.
Fixed collection progress showing incorrect totals.
Fixed trade crashes when trading shiny cats.
Fixed missing catalogue entries.
Fixed inventory issues with legacy cat data.
Improved stability across multiple commands.

🚀 What's Next?

Planned for v1.3.0:

Cat Packs V2
More Cat Types
New Secret Cats
Collection Rewards
Profile Cards
Seasonal Events

Thank you for playing FourCat! 🐾
`
        )
        .setFooter({
          text:
            "FourCat v1.2.0"
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