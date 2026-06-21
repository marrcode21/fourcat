const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const getUser =
  require("../../utils/getUser");

const achievements = {
  first_catch: {
    emoji: "🏆",
    name: "First Catch"
  },

  "10_cats": {
    emoji: "😼",
    name: "Cat Hunter"
  },

  "100_cats": {
    emoji: "👑",
    name: "Cat Master"
  },

  first_daily: {
    emoji: "📅",
    name: "Daily Enjoyer"
  },

  streak_7: {
    emoji: "🔥",
    name: "Week Warrior"
  },

  first_trade: {
    emoji: "🤝",
    name: "Trader"
  },

  first_pack: {
    emoji: "🎁",
    name: "Pack Opener"
  },

  casino_winner: {
    emoji: "🎰",
    name: "Lucky Cat"
  },

  jackpot: {
    emoji: "💎",
    name: "Jackpot!"
  }
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

    const lines =
      Object.entries(
        achievements
      ).map(
        ([id, ach]) => {

          const unlocked =
            user.achievements.includes(
              id
            );

          return `${unlocked ? "✅" : "❌"} ${ach.emoji} ${ach.name}`;
        }
      );

    const unlockedCount =
      user.achievements.length;

    const totalCount =
      Object.keys(
        achievements
      ).length;

    const embed =
      new EmbedBuilder()
        .setTitle(
          "🏆 Achievements"
        )
        .setDescription(
          lines.join("\n")
        )
        .addFields({
          name:
            "Progress",
          value:
            `${unlockedCount}/${totalCount}`
        });

    await interaction.reply({
      embeds: [embed]
    });
  }
};