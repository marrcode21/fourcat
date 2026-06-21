const {
  SlashCommandBuilder
} = require("discord.js");

const getUser =
  require("../../utils/getUser");

const prices = {
  normal: 100,
  rare: 500,
  epic: 1500,
  prism: 250,
  coffee: 150
};

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("buy")
      .setDescription(
        "Buy items"
      )
      .addStringOption(
        option =>
          option
            .setName(
              "item"
            )
            .setDescription(
              "Item"
            )
            .setRequired(
              true
            )
            .addChoices(
              {
                name:
                  "Normal Pack",
                value:
                  "normal"
              },
              {
                name:
                  "Rare Pack",
                value:
                  "rare"
              },
              {
                name:
                  "Epic Pack",
                value:
                  "epic"
              },
              {
                name:
                  "Cat Prism",
                value:
                  "prism"
              },
              {
                name:
                  "Coffee Beans",
                value:
                  "coffee"
              }
            )
      ),

  async execute(
    interaction
  ) {
    const user =
      await getUser(
        interaction.user.id
      );

    const item =
      interaction.options.getString(
        "item"
      );

    const price =
      prices[item];

    if (
      user.cats <
      price
    ) {
      return interaction.reply({
        content:
          "❌ Not enough cats.",
        flags: 64
      });
    }

    user.cats -=
      price;

    switch (item) {

      case "normal":
      case "rare":
      case "epic":
        user.packs[item] += 1;
        break;

      case "prism":
        user.prisms += 1;
        break;

      case "coffee":
        user.coffeeBeans += 1;
        break;
    }

    await user.save();

    await interaction.reply(
      `🛒 Bought **${item}** for **${price} cats**`
    );
  }
};