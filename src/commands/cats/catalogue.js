const {
  SlashCommandBuilder,
  EmbedBuilder
} = require(
  "discord.js"
);

const cats =
  require(
    "../../data/cats"
  );

const secretCats =
  require(
    "../../data/secretCats"
  );

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
`${cat.emoji}
**${cat.name}**
(${cat.rarity})
💰 ${cat.reward}`
        )
        .join("\n\n");

    const secretList =
      secretCats
        .map(
          (
            cat,
            index
          ) =>
`👑 **Onde Mande #${index + 1}**
💰 ${cat.rewardMin.toLocaleString()} - ${cat.rewardMax.toLocaleString()}`
        )
        .join("\n\n");

    const embed =
      new EmbedBuilder()
        .setTitle(
          "📚 FourCat Catalogue"
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
        );

    await interaction.reply({
      embeds: [embed]
    });
  }
};