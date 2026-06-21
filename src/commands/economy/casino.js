const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const User = require("../../models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("casino")
    .setDescription("Gamble your cats!")
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Amount of cats to gamble")
        .setRequired(true)
        .setMinValue(1)
    ),

  async execute(interaction) {
    const amount =
      interaction.options.getInteger(
        "amount"
      );

    const user =
      await User.findOne({
        userId:
          interaction.user.id
      });

    if (!user) {
      return interaction.reply({
        content:
          "❌ Create data first using /daily or /catch",
        flags: 64
      });
    }

    if (
      user.cats < amount
    ) {
      return interaction.reply({
        content:
          "❌ You don't have enough cats.",
        flags: 64
      });
    }

    const roll =
      Math.random();

    let result;
    let winnings = 0;

    if (roll < 0.40) {
      // lose
      winnings = -amount;
      result =
        "💀 House wins!";
    }

    else if (roll < 0.75) {
      // x1.5
      winnings =
        Math.floor(
          amount * 0.5
        );

      result =
        "😺 Small Win!";

      user.casinoWins += 1;
    }

    else if (roll < 0.95) {
      // x2
      winnings =
        amount;

      result =
        "🎉 Big Win!";

      user.casinoWins += 1;
    }

    else {
      // x5 jackpot
      winnings =
        amount * 4;

      result =
        "💎 JACKPOT!";

      user.casinoWins += 1;
      user.casinoJackpots += 1;
    }

    user.cats += winnings;

    await user.save();

    const embed =
      new EmbedBuilder()
        .setTitle(
          "🎰 FourCat Casino"
        )
        .setDescription(
          result
        )
        .addFields(
          {
            name:
              "Bet",
            value:
              `${amount.toLocaleString()} 🐱`,
            inline:
              true
          },
          {
            name:
              "Profit",
            value:
              `${winnings >= 0 ? "+" : ""}${winnings.toLocaleString()} 🐱`,
            inline:
              true
          },
          {
            name:
              "Balance",
            value:
              `${user.cats.toLocaleString()} 🐱`,
            inline:
              true
          }
        );

    await interaction.reply({
      embeds: [embed]
    });
  }
};