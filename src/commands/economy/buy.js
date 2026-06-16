const {
  SlashCommandBuilder
} = require("discord.js");

const getUser =
require("../../utils/getUser");

const prices = {
  normal: 100,
  rare: 500,
  epic: 1500
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

    user.packs[
      item
    ] += 1;

    await user.save();

    await interaction.reply(
      `🛒 Bought **${item} pack** for **${price} cats**`
    );
  }
};