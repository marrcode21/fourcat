const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const getUser =
  require("../../utils/getUser");

const achievementMap = {
  first_catch:
    "🏆 First Catch",
  "10_cats":
    "😼 Cat Hunter",
  "100_cats":
    "👑 Cat Master"
};

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName(
        "achievements"
      )
      .setDescription(
        "View your achievements"
      ),

  async execute(
    interaction
  ) {
    const user =
      await getUser(
        interaction.user.id
      );

    const achs =
      user.achievements
        .map(
          ach =>
            achievementMap[
              ach
            ] || ach
        )
        .join("\n");

    const embed =
      new EmbedBuilder()
        .setTitle(
          "🏆 Achievements"
        )
        .setDescription(
          achs ||
            "No achievements yet."
        );

    await interaction.reply({
      embeds: [embed]
    });
  }
};