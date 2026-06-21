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

const fastText =
  fastest
    .map(
      (
        user,
        index
      ) =>
        `#${index + 1} <@${user.userId}> • ⚡ ${user.fastestCatch.toFixed(2)}s`
    )
    .join("\n");

const slowText =
  slowest
    .map(
      (
        user,
        index
      ) =>
        `#${index + 1} <@${user.userId}> • 🐌 ${user.slowestCatch.toFixed(2)}s`
    )
    .join("\n");

const tradeText =
  traders
    .map(
      (
        user,
        index
      ) =>
        `#${index + 1} <@${user.userId}> • 🤝 ${user.totalTrades}`
    )
    .join("\n");

const packText =
  packOpeners
    .map(
      (
        user,
        index
      ) =>
        `#${index + 1} <@${user.userId}> • 🎁 ${user.totalPacksOpened}`
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
