const {
SlashCommandBuilder,
EmbedBuilder
} = require("discord.js");

const getUser =
require("../../utils/getUser");

module.exports = {
data:
new SlashCommandBuilder()
.setName("daily")
.setDescription(
"Claim daily reward"
),

async execute(
interaction
) {

const user =
  await getUser(
    interaction.user.id
  );

const now =
  Date.now();

const cooldown =
  24 * 60 * 60 * 1000;

if (
  user.lastDaily &&
  now - user.lastDaily <
    cooldown
) {

  const remaining =
    cooldown -
    (now -
      user.lastDaily);

  const hours =
    Math.floor(
      remaining /
      3600000
    );

  const minutes =
    Math.floor(
      (
        remaining %
        3600000
      ) / 60000
    );

  return interaction.reply({
    content:
      `⏳ You already claimed your daily reward.\nCome back in ${hours}h ${minutes}m.`,
    flags: 64
  });

}

let reward;
let tier;

const roll =
  Math.random() * 100;

if (roll < 0.1) {
  reward = 25000;
  tier = "👑 GOD TIER";
}
if (roll < 1) {
  reward = 5000;
  tier = "🌈 Jackpot";
}
else if (roll < 20) {
  reward = 1000;
  tier = "🟣 Epic"
}
else if (roll < 50) {
  reward = 750;
  tier = "🔵 Rare"
}
else {
  reward = 500;
  tier = "⚪ Common";
}

user.cats +=
  reward;

if (tier === "👑 GOD TIER") {

  await interaction.channel.send(
    `🚨 ${interaction.user} just hit the GOD TIER Daily Reward and won **25,000 Cats**!`
  );
}

user.lastDaily =
  new Date();

await user.save();

const embed =
  new EmbedBuilder()
    .setTitle(
      "🎁 Daily Reward"
    )
    .setDescription(
      `You opened today's reward!
      
      ${tier}
      
      💰 Reward: **${reward.toLocaleString()} Cats**`
    )
    .addFields(
    {
      name:
        "🎲 Reward Tier",
      value:
        tier,
      inline:
        true
    },
    {
      name:
        "💰 Balance",
      value:
        user.cats.toLocaleString(),
      inline:
        true
    }
    )

await interaction.reply({
  embeds: [embed]
});

}
};
