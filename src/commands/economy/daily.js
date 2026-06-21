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
        "Get Daily cats"
      ),

  async execute(
    interaction
  ) {
    const user =
      await getUser(
        interaction.user.id
      );

    const now =
      new Date();

    if (
      user.dailyCooldown &&
      user.dailyCooldown > now
    ) {
      const timeLeft =
        Math.floor(
          (
            user.dailyCooldown -
            now
          ) /
            1000 /
            60
        );

      return interaction.reply({
        content:
          `⏳ You already claimed daily.\nCome back in **${timeLeft} minutes**.`,
        flags: 64
      });
    }

    const rewards = [
      500,
      750,
      1000,
      1250,
      1500,
      2000,
      3000
    ];

    // =====================
    // STREAK SYSTEM
    // =====================

    if (
      user.lastDaily
    ) {
      const diff =
        now -
        user.lastDaily;

      const oneDay =
        24 *
        60 *
        60 *
        1000;

      if (
        diff >= oneDay &&
        diff <
          oneDay * 2
      ) {
        user.dailyStreak++;
      }

      else if (
        diff >=
        oneDay * 2
      ) {
        user.dailyStreak = 1;
      }
    }

    else {
      user.dailyStreak = 1;
    }

    if (
      user.dailyStreak > 7
    ) {
      user.dailyStreak = 7;
    }

    const reward =
      rewards[
        user.dailyStreak -
          1
      ];

    user.cats += reward;

    // =====================
    // DAY 7 BONUS
    // =====================

    let bonusText =
      "None";

    if (
      user.dailyStreak ===
      7
    ) {

      if (
        !user.packs
      ) {
        user.packs = {};
      }

      user.packs.rare =
        (
          user.packs
            .rare || 0
        ) + 1;

      bonusText =
        "Rare Pack x1";
    }

    user.lastDaily =
      now;

    user.dailyCooldown =
      new Date(
        now.getTime() +
          24 *
            60 *
            60 *
            1000
      );

    const achievementSystem =
      require(
        "../../systems/achievementSystem"
      );

    const unlocked =
      await achievementSystem(
        user
      );

    await user.save();

    const embed =
      new EmbedBuilder()
        .setTitle(
          "📅 Daily Reward"
        )
        .setDescription(
          "Come back every day to build your streak!"
        )
        .addFields(
          {
            name:
              "🔥 Streak",
            value:
              `${user.dailyStreak}/7`,
            inline:
              true
          },
          {
            name:
              "🐱 Reward",
            value:
              `${reward.toLocaleString()} Cats`,
            inline:
              true
          },
          {
            name:
              "🎁 Bonus",
            value:
              bonusText,
            inline:
              true
          }
        );

    await interaction.reply({
      embeds: [embed]
    });
  }
};