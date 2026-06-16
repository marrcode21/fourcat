const Guild =
  require("../models/Guild");

const cats =
require("../data/cats");

const activeCats =
  new Map();

const catTypes =
cats.map(cat => ({
...cat,
chance:
cat.rarity ===
"Common"
? 65
: cat.rarity ===
"Rare"
? 22
: cat.rarity ===
"Epic"
? 10
: 3
}));

function randomCat() {
  const rand =
    Math.random() * 100;

  let cumulative = 0;

  for (const cat of catTypes) {
    cumulative +=
      cat.chance;

    if (
      rand <= cumulative
    ) {
      return cat;
    }
  }

  return catTypes[0];
}

module.exports = client => {
  setInterval(async () => {
    const guilds =
      await Guild.find();

    for (const guild of guilds) {
      if (
        !guild.spawnChannels
          .length
      )
        continue;

      const randomChannelId =
        guild.spawnChannels[
          Math.floor(
            Math.random() *
              guild
                .spawnChannels
                .length
          )
        ];

      const channel =
        client.channels.cache.get(
          randomChannelId
        );

      if (!channel) continue;

      if (
        activeCats.has(
          channel.id
        )
      )
        continue;

      const cat =
        randomCat();

      const spawnTime =
        Date.now();

      const shiny =
        Math.random() <
        0.01;
      
    activeCats.set(
      channel.id,
      {
        cat,
        spawnTime,
        shiny
      }
    );

const {
  EmbedBuilder
} = require(
  "discord.js"
);

const isShiny =
  activeCats.get(
    channel.id
  ).shiny;

await channel.send({
  embeds: [
    {
      title:
        `${isShiny ? "✨ " : ""}${cat.emoji} A Wild Cat Appeared!`,
      description:
        `A **${isShiny ? "Shiny " : ""}${cat.name}** spawned!\nUse \`/catch\` quickly!`,
      image: {
        url:
          cat.image
      },
      fields: [
        {
          name:
            "Rarity",
          value:
            cat.rarity,
          inline:
            true
        },
        {
          name:
            "Reward",
          value:
            `${cat.reward} cats`,
          inline:
            true
        },
        {
          name:
            "Variant",
          value:
            isShiny
              ? "✨ Shiny"
              : "Normal",
          inline:
            true
        }
      ]
    }
  ]
});

setTimeout(async () => {
  if (
    activeCats.has(
      channel.id
    )
  ) {
    activeCats.delete(
      channel.id
    );

    await channel.send(
      "💨 The cat ran away..."
    );
  }
}, 60000);
    }
  }, Math.floor(
  Math.random() *
    180000
) + 120000);

  client.activeCats =
    activeCats;
};