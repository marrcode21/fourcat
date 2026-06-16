const {
  SlashCommandBuilder
} = require("discord.js");

const getUser =
  require("../../utils/getUser");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("gift")
      .setDescription(
        "Donate cats"
      )
      .addUserOption(
        option =>
          option
            .setName(
              "user"
            )
            .setDescription(
              "User"
            )
            .setRequired(
              true
            )
      )
      .addIntegerOption(
        option =>
          option
            .setName(
              "amount"
            )
            .setDescription(
              "Amount"
            )
            .setRequired(
              true
            )
      ),

  async execute(
    interaction
  ) {
    const target =
      interaction.options.getUser(
        "user"
      );

    const amount =
      interaction.options.getInteger(
        "amount"
      );

    if (
      target.bot
    ) {
      return interaction.reply({
        content:
          "❌ You can't gift bots.",
        flags: 64
      });
    }

    if (
      target.id ===
      interaction.user.id
    ) {
      return interaction.reply({
        content:
          "❌ You can't gift yourself.",
        flags: 64
      });
    }

    if (
      amount <= 0
    ) {
      return interaction.reply({
        content:
          "❌ Invalid amount.",
        flags: 64
      });
    }

    const sender =
      await getUser(
        interaction.user.id
      );

    if (
      sender.cats <
      amount
    ) {
      return interaction.reply({
        content:
          "❌ Not enough cats.",
        flags: 64
      });
    }

    const receiver =
      await getUser(
        target.id
      );

    sender.cats -=
      amount;

    receiver.cats +=
      amount;

    await sender.save();
    await receiver.save();

    await interaction.reply(
      `🎁 ${interaction.user} gifted **${amount} cats** to ${target}`
    );
  }
};