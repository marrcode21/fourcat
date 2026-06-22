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
  },

  onde_mande_hunter: {
    emoji: "👑",
    name: "Onde Mande Hunter"
  },

  onde_mande_collector: {
    emoji: "🌟",
    name: "Onde Mande Collector"
  },

  onde_mande_master: {
    emoji: "🔥",
    name: "Onde Mande Master"
  },

  onde_mande_god: {
    emoji: "⚡",
    name: "Onde Mande God"
  },
  first_shiny: {
    emoji: "✨",
    name: "First Shiny"
  },

  shiny_hunter: {
    emoji: "🌟",
    name: "Shiny Hunter"
  },

  shiny_master: {
    emoji: "💎",
    name: "Shiny Master"
  },

  secret_finder: {
    emoji: "👑",
    name: "Secret Finder"
  },

  collector_bronze: {
    emoji: "🥉",
    name: "Collector"
  },

  collector_silver: {
    emoji: "🥈",
    name: "Senior Collector"
  },

  collector_gold: {
    emoji: "🥇",
    name: "Master Collector"
  },

  cat_god: {
    emoji: "🐈",
    name: "Cat God"
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