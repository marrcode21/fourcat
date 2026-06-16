const {
  SlashCommandBuilder,
  EmbedBuilder
} = require(
  "discord.js"
);

const getUser =
  require(
    "../../utils/getUser"
  );

const cats =
  require(
    "../../data/cats"
  );

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName(
        "stats"
      )
      .setDescription(
        "View advanced stats"
      ),

  async execute(
    interaction
  ) {
    const user =
      await getUser(
        interaction.user.id
      );

    const uniqueCats =
      new Set(
        user.inventory.map(
          c =>
            c.replace(
              "shiny_",
              ""
            )
        )
      ).size;

    const completion =
      (
        uniqueCats /
        cats.length
      ) *
      100;

    const shinyCount =
      user.inventory.filter(
        c =>
          c.startsWith(
            "shiny_"
          )
      ).length;

    const embed =
      new EmbedBuilder()
        .setTitle(
          `📊 ${interaction.user.username}'s Stats`
        )
        .addFields(
          {
            name:
              "🐱 Cats",
            value:
              `${user.cats}`,
            inline:
              true
          },
          {
            name:
              "🎯 Total Catches",
            value:
              `${user.totalCatsCaught}`,
            inline:
              true
          },
          {
            name:
              "✨ Shinies",
            value:
              `${shinyCount}`,
            inline:
              true
          },
          {
            name:
              "📚 Collection",
            value:
              `${uniqueCats}/${cats.length}
(${completion.toFixed(1)}%)`,
            inline:
              true
          },
          {
            name:
              "⚡ Fastest Catch",
            value:
              user.fastestCatch
                ? `${user.fastestCatch.toFixed(2)}s`
                : "None",
            inline:
              true
          }
        );

    await interaction.reply({
      embeds:
        [embed]
    });
  }
};