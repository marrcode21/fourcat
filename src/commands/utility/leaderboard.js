const {
SlashCommandBuilder,
EmbedBuilder
} = require(
"discord.js"
);

const User =
require(
"../../models/User"
);

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

const fastest =
  await User.find({
    fastestCatch: {
      $ne: null
    }
  })
    .sort({
      fastestCatch: 1
    })
    .limit(10);

const slowest =
  await User.find({
    slowestCatch: {
      $ne: null
    }
  })
    .sort({
      slowestCatch: -1
    })
    .limit(10);

const traders =
  await User.find()
    .sort({
      totalTrades:
        -1
    })
    .limit(10);

const packOpeners =
  await User.find()
    .sort({
      totalPacksOpened:
        -1
    })
    .limit(10);

const collectors =
    await User.find();

const shinies =
    await User.find();

const secrets =
    await User.find();

collectors.sort(
  (a, b) => {

    const aUnique =
      new Set(
        a.inventory.map(
          cat =>
            cat.replace(
              "shiny_",
              ""
            )
        )
      ).size;

    const bUnique =
      new Set(
        b.inventory.map(
          cat =>
            cat.replace(
              "shiny_",
              ""
            )
        )
      ).size;

    return (
      bUnique -
      aUnique
    );
  }
);

shinies.sort(
  (a, b) => {

    const aCount =
      a.inventory.filter(
        cat =>
          cat.startsWith(
            "shiny_"
          )
      ).length;

    const bCount =
      b.inventory.filter(
        cat =>
          cat.startsWith(
            "shiny_"
          )
      ).length;

    return (
      bCount -
      aCount
    );
  }
);

secrets.sort(
  (a, b) =>
    (b.secretCatsCaught || 0) -
    (a.secretCatsCaught || 0)
);

const getRank =
  index =>
    ["🥇", "🥈", "🥉"][index] ||
    `#${index + 1}`;

const richText =
  richest
    .map(
      (
        user,
        index
      ) =>
        `${getRank(index)} <@${user.userId}> • 💰 ${user.cats}`
    )
    .join("\n");

const catchText =
  catchers
    .map(
      (
        user,
        index
      ) =>
        `${getRank(index)} <@${user.userId}> • 💰 ${user.totalCatsCaught}`
    )
    .join("\n");

const fastText =
  fastest
    .map(
      (
        user,
        index
      ) =>
        `${getRank(index)} <@${user.userId}> • ⚡ ${user.fastestCatch.toFixed(2)}s`
    )
    .join("\n");

const slowText =
  slowest
    .map(
      (
        user,
        index
      ) =>
        `${getRank(index)} <@${user.userId}> • 🐌 ${user.slowestCatch.toFixed(2)}s`
    )
    .join("\n");

const tradeText =
  traders
    .map(
      (
        user,
        index
      ) =>
        `${getRank(index)} <@${user.userId}> • 🤝 ${user.totalTrades}`
    )
    .join("\n");

const packText =
  packOpeners
    .map(
      (
        user,
        index
      ) =>
        `${getRank(index)} <@${user.userId}> • 🎁 ${user.totalPacksOpened}`
    )
    .join("\n");

const collectorText =
  collectors
    .slice(0, 10)
    .map(
      (
        user,
        index
      ) => {

        const unique =
          new Set(
            user.inventory.map(
              cat =>
                cat.replace(
                  "shiny_",
                  ""
                )
            )
          ).size;

        return `${getRank(index)} <@${user.userId}> • 📚 ${unique}`;
      }
    )
    .join("\n");

const shinyText =
  shinies
    .slice(0, 10)
    .map(
      (
        user,
        index
      ) => {

        const count =
          user.inventory.filter(
            cat =>
              cat.startsWith(
                "shiny_"
              )
          ).length;

        return `${getRank(index)} <@${user.userId}> • ✨ ${count}`;
      }
    )
    .join("\n");

const secretText =
  secrets
    .slice(0, 10)
    .map(
      (
        user,
        index
      ) =>
        `${getRank(index)} <@${user.userId}> • 👑 ${user.secretCatsCaught || 0}`
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
          "💰 Richest Cats",
        value:
          richText ||
          "No data",
        inline:
          true
      },
      {
        name:
          "🐱 Top Catchers",
        value:
          catchText ||
          "No data",
        inline:
          true
      },
      {
        name:
          "⚡ Fastest Catch",
        value:
          fastText ||
          "No data",
        inline:
          false
      },
      {
        name:
          "🐌 Slowest Catch",
        value:
          slowText ||
          "No data",
        inline:
          false
      },
      {
        name:
          "🤝 Top Traders",
        value:
          tradeText ||
          "No data",
        inline:
          false
      },
      {
        name:
          "🎁 Pack Openers",
        value:
          packText ||
          "No data",
        inline:
          false
      },
      {
        name:
          "📚 Top Collectors",
        value:
          collectorText ||
          "No data",
        inline:
          false
      },
      {
        name:
          "✨ Shiny Hunters",
        value:
          shinyText ||
          "No data",
        inline:
          false
      },
      {
        name:
          "👑 Secret Hunters",
        value:
          secretText ||
          "No data",
        inline:
          false
      }
    )
    .setTimestamp();

await interaction.reply({
  embeds: [
    embed
  ]
});

}
};
