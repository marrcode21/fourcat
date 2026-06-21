const {
  SlashCommandBuilder
} = require("discord.js");

const getUser =
  require("../../utils/getUser");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("brew")
      .setDescription(
        "Brew coffee to catch cats more efficiently"
      ),

  async execute(
    interaction
  ) {
    const user =
      await getUser(
        interaction.user.id
      );

    const now =
      Date.now();

    if (
      user.coffeeBoost &&
      user.coffeeBoost >
        now
    ) {
      const minutes =
        Math.ceil(
          (
            user.coffeeBoost -
            now
          ) /
            60000
        );

      return interaction.reply({
        content:
          `☕ Coffee already active.\n${minutes} minutes remaining.`,
        flags: 64
      });
    }

    user.coffeeBoost =
      new Date(
        now +
          30 *
            60 *
            1000
      );

    await user.save();

    await interaction.reply(
      "☕ Coffee brewed!\nFor the next 30 minutes all cat rewards are increased by **50%**."
    );
  }
};