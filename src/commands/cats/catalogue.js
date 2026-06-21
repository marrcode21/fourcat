const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const cats =
  require("../../data/cats");

const secretCats =
  require("../../data/secretCats");

function rarityEmoji(
  rarity
) {
  switch (rarity) {
    case "Common":
      return "⚪ Common";

    case "Rare":
      return "🔵 Rare";

    case "Epic":
      return "🟣 Epic";

    case "Legendary":
      return "🟠 Legendary";

    default:
      return rarity;
  }
}

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName(
        "catalogue"
      )
      .setDescription(
        "View all cat types"
      ),

  async execute(
    interaction
  ) {

    const normalCats =
      cats
        .map(
          cat =>
`${cat.emoji} ${cat.name}
💰 ${cat.reward.toLocaleString()}
${rarityEmoji(
  cat.rarity
)}`
        )
        .join("\n\n");

    const secretList =
      secretCats
        .map(
          cat =>
`👑 ${cat.name}
💰 ${cat.rewardMin.toLocaleString()} - ${cat.rewardMax.toLocaleString()}
👑 Secret`
        )
        .join("\n\n");

    const embed =
      new EmbedBuilder()
        .setTitle(
          "📚 FourCat Catalogue"
        )
        .setDescription(
          "Collect every cat in FourCat!"
        )
        .addFields(
          {
            name:
              "🐱 Normal Cats",
            value:
              normalCats
          },
          {
            name:
              "👑 Secret Cats",
            value:
              secretList
          }
        )
        .setFooter({
          text:
            `Total Cats: ${
              cats.length +
              secretCats.length
            }`
        });

    await interaction.reply({
      embeds: [embed]
    });
  }
};