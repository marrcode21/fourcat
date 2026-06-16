const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const User =
  require("../../models/User");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName(
        "leaderboards"
      )
      .setDescription(
        "View leaderboards"
      ),

  async execute(
    interaction
  ) {
    const richest =
      await User.find()
        .sort({
          cats: -1
        })
        .limit(10);

    const catchers =
      await User.find()
        .sort({
          totalCatsCaught:
            -1
        })
        .limit(10);

    const richText =
      richest
        .map(
          (
            user,
            index
          ) =>
            `#${index + 1} <@${user.userId}> • 💰 ${user.cats}`
        )
        .join("\n");

    const catchText =
      catchers
        .map(
          (
            user,
            index
          ) =>
            `#${index + 1} <@${user.userId}> • 🐱 ${user.totalCatsCaught}`
        )
        .join("\n");

    const embed =
      new EmbedBuilder()
        .setTitle(
          "🏆 FourCat Leaderboards"
        )
        .addFields(
          {
            name:
              "💰 Richest",
            value:
              richText ||
              "No data"
          },
          {
            name:
              "🐱 Top Catchers",
            value:
              catchText ||
              "No data"
          }
        );

    await interaction.reply({
      embeds: [embed]
    });
  }
};