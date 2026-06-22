const normalOwned =
  new Set(
    user.inventory
      .filter(
        cat =>
          !cat.startsWith(
            "shiny_"
          )
      )
      .map(
        cat =>
          cat.replace(
            "shiny_",
            ""
          )
      )
  );

const shinyOwned =
  new Set(
    user.inventory
      .filter(
        cat =>
          cat.startsWith(
            "shiny_"
          )
      )
      .map(
        cat =>
          cat.replace(
            "shiny_",
            ""
          )
      )
  );

const secretOwned =
  new Set(
    user.inventory.filter(
      cat =>
        secretCats.some(
          s =>
            s.id ===
            cat.replace(
              "shiny_",
              ""
            )
        )
    )
  );

const normalCount =
  normalOwned.size;

const shinyCount =
  shinyOwned.size;

const secretCount =
  secretOwned.size;

const totalCollected =
  normalCount +
  shinyCount +
  secretCount;

const totalAvailable =
  cats.length +
  cats.length +
  secretCats.length;

const overall =
(
  totalCollected /
  totalAvailable
) * 100;

const embed =
  new EmbedBuilder()
    .setTitle(
      `📚 ${interaction.user.username}'s Collection`
    )
    .addFields(
      {
        name:
          "🐱 Normal Cats",
        value:
          `${normalCount}/${cats.length}`,
        inline: true
      },
      {
        name:
          "✨ Shiny Cats",
        value:
          `${shinyCount}/${cats.length}`,
        inline: true
      },
      {
        name:
          "👑 Secret Cats",
        value:
          `${secretCount}/${secretCats.length}`,
        inline: true
      },
      {
        name:
          "🎖 Rank",
        value:
          rank,
        inline: true
      },
      {
        name:
          "🏆 Overall",
        value:
`${totalCollected}/${totalAvailable}
(${overall.toFixed(1)}%)`
      }
    );

let rank = "🐣 Beginner";

if (overall >= 25)
  rank = "🥉 Bronze";

if (overall >= 50)
  rank = "🥈 Silver";

if (overall >= 75)
  rank = "🥇 Gold";

if (overall >= 100)
  rank = "👑 Master Collector";