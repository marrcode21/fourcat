const {
SlashCommandBuilder,
ActionRowBuilder,
StringSelectMenuBuilder,
ButtonBuilder,
ButtonStyle,
EmbedBuilder
} = require("discord.js");

const { v4: uuidv4 } =
require("uuid");

const getUser =
require("../../utils/getUser");

const achievementSystem =
require(
"../../systems/achievementSystem"
);

const cats =
require("../../data/cats");

const secretCats =
require("../../data/secretCats")

module.exports = {
data:
new SlashCommandBuilder()
.setName("trade")
.setDescription(
"Trade cats"
)
.addUserOption(
option =>
option
.setName(
"user"
)
.setDescription(
"User"
)
.setRequired(
true
)
),

async execute(
interaction
) {
const target =
interaction.options.getUser(
"user"
);


if (
  target.bot ||
  target.id ===
    interaction.user.id
) {
  return interaction.reply({
    content:
      "❌ Invalid target.",
    flags: 64
  });
}

const sender =
  await getUser(
    interaction.user.id
  );

const receiver =
  await getUser(
    target.id
  );

if (
  sender.inventory.length ===
  0
) {
  return interaction.reply({
    content:
      "❌ You have no cats.",
    flags: 64
  });
}

if (
  receiver.inventory.length ===
  0
) {
  return interaction.reply({
    content:
      "❌ Target has no cats.",
    flags: 64
  });
}

const tradeId =
  uuidv4();

const senderMenu =
  new StringSelectMenuBuilder()
    .setCustomId(
      `sender_${tradeId}`
    )
    .setPlaceholder(
      "Choose your cat"
    )
    .addOptions(
sender.inventory
  .slice(0, 25)
  .map((catId, index) => {

const cleanId =
  catId.startsWith(
    "shiny_"
  )
    ? catId.replace(
        "shiny_",
        ""
      )
    : catId;

const cat =
  [...cats, ...secretCats]
    .find(
      c => c.id === cleanId
    );

return {
  label:
    `${catId.startsWith("shiny_") ? "✨ " : ""}${cat?.emoji || ""} ${cat?.name || catId}`,

  description:
    catId.startsWith("shiny_")
      ? "✨ Shiny Cat"
      : cat?.secret
      ? "👑 Secret Cat"
      : cat?.rarity,

  value:
    String(index)
};
  })
    );

await interaction.reply({
  content:
    `${interaction.user}, choose a cat to trade.`,
  components: [
    new ActionRowBuilder().addComponents(
      senderMenu
    )
  ]
});

const msg =
  await interaction.fetchReply();

const senderCollector =
  msg.createMessageComponentCollector({
    time: 60000
  });

let senderIndex;
let receiverIndex;

senderCollector.on(
  "collect",
  async i => {
    if (
      i.user.id !==
      interaction.user.id
    ) {
      return i.reply({
        content:
          "❌ Not your trade.",
        flags: 64
      });
    }

if (
  !i.values?.length
) {
  return;
}

senderIndex =
  Number(i.values[0]);

const senderCat =
  sender.inventory[senderIndex];

if (!senderCat) {
  return i.reply({
    content:
      "❌ Cat no longer exists.",
    flags: 64
  });
}

const senderCatData =
  [...cats, ...secretCats]
    .find(
      c =>
        c.id ===
        senderCat.replace(
          "shiny_",
          ""
        )
    );

const senderCatName =
  senderCat.startsWith(
    "shiny_"
  )
    ? `✨ Shiny ${senderCatData.name}`
    : `${senderCat.startsWith("shiny_")
  ? "✨ "
  : ""
}${senderCatData.emoji} ${senderCatData.name}`;

    await i.update({
      content:
        `✅ Selected: **${senderCatName}**`,
      components: []
    });

    const receiverMenu =
      new StringSelectMenuBuilder()
        .setCustomId(
          `receiver_${tradeId}`
        )
        .setPlaceholder(
          "Choose your cat"
        )
        .addOptions(
receiver.inventory
  .slice(0, 25)
  .map((catId, index) => {

const cleanId =
  catId.startsWith(
    "shiny_"
  )
    ? catId.replace(
        "shiny_",
        ""
      )
    : catId;

const cat =
  [...cats, ...secretCats]
    .find(
      c => c.id === cleanId
    );

return {
  label:
    cat
      ? `${cat.emoji} ${cat.name}`
      : catId,

  description:
    cat
      ? (
          cat.secret
            ? "Secret Cat"
            : cat.rarity
        )
      : "Unknown",

  value:
    String(index)
};
  })
        );

    const tradeMsg =
      await interaction.followUp({
        content:
          `${target}, choose a cat to trade back.`,
        components: [
          new ActionRowBuilder().addComponents(
            receiverMenu
          )
        ]
      });

    const receiverCollector =
      tradeMsg.createMessageComponentCollector({
        time: 60000
      });

    receiverCollector.on(
      "collect",
      async j => {
        if (
          j.user.id !==
          target.id
        ) {
          return j.reply({
            content:
              "❌ Not your trade.",
            flags: 64
          });
        }
    
if (
  !j.values?.length
) {
  return;
}

receiverIndex =
  Number(j.values[0]);

const receiverCat =
  receiver.inventory[receiverIndex];

if (!senderCat) {
  return i.reply({
    content:
      "❌ Cat no longer exists.",
    flags: 64
  });
}

const senderBaseId =
  senderCat.startsWith(
    "shiny_"
  )
    ? senderCat.replace(
        "shiny_",
        ""
      )
    : senderCat;

const receiverBaseId =
  receiverCat.startsWith(
    "shiny_"
  )
    ? receiverCat.replace(
        "shiny_",
        ""
      )
    : receiverCat;

const senderCatData =
  [...cats, ...secretCats]
    .find(
      c =>
        c.id ===
        senderBaseId
    );

const receiverCatData =
  [...cats, ...secretCats]
    .find(
      c =>
        c.id ===
        receiverBaseId
    );

if (
  !senderCatData ||
  !receiverCatData
) {
  return j.reply({
    content:
      "❌ Cat data not found.",
    flags: 64
  });
}

console.log(
  "senderCat:",
  senderCat
);

console.log(
  "receiverCat:",
  receiverCat
);

console.log(
  "senderCatData:",
  senderCatData
);

console.log(
  "receiverCatData:",
  receiverCatData
);

const embed =
  new EmbedBuilder()
    .setTitle(
      "🤝 Trade Confirmation"
    )
    .setDescription(
`### ${interaction.user.username}

${senderCatData.emoji} **${senderCatData.name}**
${senderCatData.secret ? "👑 Secret Cat" : senderCatData.rarity}

⬇️ Trade For ⬇️

### ${target.username}

${receiverCatData.emoji} **${receiverCatData.name}**
${receiverCatData.secret ? "👑 Secret Cat" : receiverCatData.rarity}`
    );

const confirmRow =
  new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(
          `accept_${tradeId}`
        )
        .setLabel(
          "✅ Confirm"
        )
        .setStyle(
          ButtonStyle.Success
        ),

      new ButtonBuilder()
        .setCustomId(
          `cancel_${tradeId}`
        )
        .setLabel(
          "❌ Cancel"
        )
        .setStyle(
          ButtonStyle.Danger
        )
    );

        await j.update({
          embeds: [embed],
          components: [
            confirmRow
          ]
        });

        receiverCollector.stop();

        const confirmCollector =
          tradeMsg.createMessageComponentCollector({
            time: 60000
          });

        const confirmed =
          new Set();

confirmCollector.on(
  "collect",
  async k => {

    if (
      k.customId ===
      `cancel_${tradeId}`
    ) {
      confirmCollector.stop();

      return tradeMsg.edit({
        content:
          "❌ Trade cancelled.",
        embeds: [],
        components: []
      });
    }

    if (
      ![
        interaction.user.id,
        target.id
      ].includes(
        k.user.id
      )
    ) {
      return k.reply({
        content:
          "❌ Not your trade.",
        flags: 64
      });
    }

    if (
      confirmed.has(
        k.user.id
      )
    ) {
      return k.reply({
        content:
          "❌ You already confirmed.",
        flags: 64
      });
    }

    confirmed.add(
      k.user.id
    );

    await k.reply({
      content:
        "✅ Confirmation recorded.",
      flags: 64
    });

    if (
      confirmed.size < 2
    ) {
      return;
    }

    try {

      const freshSender =
        await getUser(
          interaction.user.id
        );

      const freshReceiver =
        await getUser(
          target.id
        );

      const senderCatNow =
        freshSender.inventory[
          senderIndex
        ];

      const receiverCatNow =
        freshReceiver.inventory[
          receiverIndex
        ];

      if (
        !senderCatNow ||
        !receiverCatNow
      ) {
        confirmCollector.stop();

        return tradeMsg.edit({
          content:
            "❌ Trade failed. One of the cats no longer exists.",
          embeds: [],
          components: []
        });
      }

      freshSender.inventory.splice(
        senderIndex,
        1
      );

      freshReceiver.inventory.splice(
        receiverIndex,
        1
      );

      freshSender.inventory.push(
        receiverCatNow
      );

      freshReceiver.inventory.push(
        senderCatNow
      );

      freshSender.totalTrades += 1;
      freshReceiver.totalTrades += 1;

      const senderUnlocked =
        await achievementSystem(
          freshSender
        );

      const receiverUnlocked =
        await achievementSystem(
          freshReceiver
        );

      await Promise.all([
      freshSender.save(),
      freshReceiver.save()
      ]);

      confirmCollector.stop();

      let message =
        "✅ Trade completed!";

      if (
        senderUnlocked.length ||
        receiverUnlocked.length
      ) {
        message +=
          "\n\n🏆 Achievements Unlocked:";
      }

      if (
        senderUnlocked.length
      ) {
        message +=
          `\n${interaction.user.username}: ${senderUnlocked.join(", ")}`;
      }

      if (
        receiverUnlocked.length
      ) {
        message +=
          `\n${target.username}: ${receiverUnlocked.join(", ")}`;
      }

      return tradeMsg.edit({
        content:
          message,
        embeds: [],
        components: []
      });

    } catch (err) {

      console.error(
        err
      );

      return tradeMsg.edit({
        content:
          "❌ Trade failed because data changed during the trade. Please try again.",
        embeds: [],
        components: []
      });
    }
});
        }
      );
    }
);

}
};