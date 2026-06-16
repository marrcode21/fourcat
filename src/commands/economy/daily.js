const {
  SlashCommandBuilder
} = require("discord.js");

const getUser =
  require("../../utils/getUser");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("daily")
      .setDescription(
        "Get Daily cats"
      ),

  async execute(
    interaction
  ) {
    const user =
      await getUser(
        interaction.user.id
      );

    const now =
      new Date();

    if (
      user.dailyCooldown &&
      user.dailyCooldown >
        now
    ) {
      const timeLeft =
        Math.floor(
          (
            user.dailyCooldown -
            now
          ) /
            1000 /
            60
        );

      return interaction.reply({
        content:
          `⏳ You already claimed daily.\nCome back in **${timeLeft} minutes**.`,
        flags: 64
      });
    }

    const reward =
      Math.floor(
        Math.random() *
          150
      ) + 150;

    user.cats += reward;

    user.dailyCooldown =
      new Date(
        now.getTime() +
          24 *
            60 *
            60 *
            1000
      );

    await user.save();

    await interaction.reply(
      `🐱 You claimed **${reward} cats**!`
    );
  }
};