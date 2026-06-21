const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const User =
  require("../../models/User");

const symbols = [
  "🐱",
  "😺",
  "😸",
  "🙀",
  "😹"
];

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("slots")
      .setDescription(
        "Play the cat slots machine"
      )
      .addIntegerOption(
        option =>
          option
            .setName("amount")
            .setDescription(
              "Bet amount"
            )
            .setRequired(true)
            .setMinValue(1)
      ),

  async execute(
    interaction
  ) {

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
          "❌ No data found.",
        flags: 64
      });
    }

    if (
      user.cats <
      amount
    ) {
      return interaction.reply({
        content:
          "❌ Not enough cats.",
        flags: 64
      });
    }

    await interaction.deferReply();

    const reel1 =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    const reel2 =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    const reel3 =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    let winnings = 0;
    let result =
      "💀 You lost!";

    // 3 sama
    if (
      reel1 === reel2 &&
      reel2 === reel3
    ) {
      if (
        reel1 === "🐱"
      ) {
        winnings =
          amount * 10;
      }

      else if (
        reel1 === "😺"
      ) {
        winnings =
          amount * 5;
      }

      else {
        winnings =
          amount * 3;
      }

      result =
        "🎉 JACKPOT!";
    }

    // 2 sama
    else if (
      reel1 === reel2 ||
      reel1 === reel3 ||
      reel2 === reel3
    ) {
      winnings =
        Math.floor(
          amount * 1.5
        );

      result =
        "✨ Small Win!";
    }

    user.cats =
      user.cats -
      amount +
      winnings;

    await user.save();

    const embed =
      new EmbedBuilder()
        .setTitle(
          "🎰 FourCat Slots"
        )
        .setDescription(
`${reel1} | ${reel2} | ${reel3}`
        )
        .addFields(
          {
            name:
              "Result",
            value:
              result
          },
          {
            name:
              "Profit",
            value:
`${winnings - amount >= 0 ? "+" : ""}${(winnings - amount).toLocaleString()} 🐱`
          },
          {
            name:
              "Balance",
            value:
`${user.cats.toLocaleString()} 🐱`
          }
        );

    await interaction.editReply({
      embeds:
        [embed]
    });
  }
};