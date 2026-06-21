const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const User =
  require("../../models/User");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("roulette")
      .setDescription(
        "Double or nothing!"
      )
      .addIntegerOption(
        option =>
          option
            .setName(
              "amount"
            )
            .setDescription(
              "Amount to gamble"
            )
            .setRequired(
              true
            )
            .setMinValue(
              1
            )
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

    const win =
      Math.random() <
      0.5;

    let result;

    if (win) {
      user.cats +=
        amount;

      result =
        `🟢 You won ${amount.toLocaleString()} 🐱`;
    } else {
      user.cats -=
        amount;

      result =
        `🔴 You lost ${amount.toLocaleString()} 🐱`;
    }

    await user.save();

    const embed =
      new EmbedBuilder()
        .setTitle(
          "🎲 Roulette"
        )
        .setDescription(
          result
        )
        .addFields({
          name:
            "Balance",
          value:
            `${user.cats.toLocaleString()} 🐱`
        });

    await interaction.deferReply();

    setTimeout(async () => {
        // hasil roulette
    }, 2000);
    
    await interaction.reply({
      embeds:
        [embed]
    });
  }
};