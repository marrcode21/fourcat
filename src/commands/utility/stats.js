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

const secretCats =
  require(
    "../../data/secretCats"
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

const secretCats =
  require(
    "../../data/secretCats"
  );

const validIds =
  [
    ...cats,
    ...secretCats
  ].map(
    cat => cat.id
  );

const uniqueCats =
  new Set(
    user.inventory
      .map(
        c =>
          c.replace(
            "shiny_",
            ""
          )
      )
      .filter(
        id =>
          validIds.includes(id)
      )
  ).size;

const totalCats =
  cats.length +
  secretCats.length;

const completion =
(
  uniqueCats /
  totalCats
) * 100;

    const shinyCount =
      user.inventory.filter(
        c =>
          c.startsWith(
            "shiny_"
          )
      ).length;

    const secretCount =
      user.inventory.filter(
        catId => {

          const cleanId =
            catId.replace(
              "shiny_",
              ""
            );

          return secretCats.some(
            cat =>
              cat.id === cleanId
          );
        }
      ).length;

    let collectorRank =
      "Begineer";

    if (completion >= 100) {
      collectorRank =
        "Master Collector";
    }
    else if (
      completion >= 75
    ) {
      collectorRank =
        "Elite Collector";
    }
    else if (
      completion >= 50
    ) {
      collectorRank =
        "Collector";
    }
    else if (
      completion >= 25
    ) {
      collectorRank =
        "Hunter";
    }

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
              "✨ Shinies",
            value:
              `${shinyCount}`,
            inline:
              true
          },
          {
            name: "👑 Secret Cats",
            value: String(
            user.secretCatsCaught || 0
            ),
            inline: true
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
              "📚 Collection",
            value:
              `${uniqueCats}/${totalCats}
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
          },
          {
            name:
              "🤝 Trades",
            value:
              `${user.totalTrades || 0}`,
            inline:
              true
          },
          {
            name:
              "🏆 Rank",
            value:
              collectorRank,
            inline:
              true
          }
        );

    embed.setFooter({
      text:
        `FourCat v1.2.0`
    });

    await interaction.reply({
      embeds:
        [embed]
    });
  }
};