const {
  SlashCommandBuilder
} = require("discord.js");

const checkCooldown =
  require(
    "../../utils/cooldown"
  );

const getUser =
  require("../../utils/getUser");

const achievementSystem =
  require(
    "../../systems/achievementSystem"
  );

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("catch")
      .setDescription(
        "Catch a cat"
      ),

  async execute(
    interaction
  ) {

    const cooldown =
  checkCooldown(
    interaction.user.id,
    "catch",
    3
  );

if (cooldown) {
  return interaction.reply(
    {
      content:
        `⏳ Wait ${cooldown.toFixed(1)}s before using this command again.`,
      flags: 64
    }
  );
}

    const activeCat =
      interaction.client.activeCats.get(
        interaction.channel.id
      );

    if (!activeCat) {
      return interaction.reply({
        content:
          "❌ No cat to catch.",
        flags: 64
      });
    }

    // Anti double catch
    if (
      activeCat.caught
    ) {
      return interaction.reply({
        content:
          "❌ Someone already caught this cat.",
        flags: 64
      });
    }

    activeCat.caught =
      true;

    const user =
      await getUser(
        interaction.user.id
      );

    const catchTime =
      (
        Date.now() -
        activeCat.spawnTime
      ) / 1000;

    user.cats +=
      activeCat.cat.reward;

    user.totalCatsCaught += 1;

    user.inventory.push(
      activeCat.shiny
        ? `shiny_${activeCat.cat.id}`
        : activeCat.cat.id
    );

    // Fastest catch
    if (
      !user.fastestCatch ||
      catchTime <
        user.fastestCatch
    ) {
      user.fastestCatch =
        catchTime;
    }

    // Slowest catch
    if (
      !user.slowestCatch ||
      catchTime >
        user.slowestCatch
    ) {
      user.slowestCatch =
        catchTime;
    }

    // Achievement check
    const unlocked =
      await achievementSystem(
        user
      );

    await user.save();

    interaction.client.activeCats.delete(
      interaction.channel.id
    );

    await interaction.reply({
      content:
        `🎉 ${interaction.user} caught a **${activeCat.cat.name}** in **${catchTime.toFixed(
          2
        )}s**!

💰 Reward: **${activeCat.cat.reward} cats**

${
  unlocked.length
    ? `🏆 Achievement unlocked:
${unlocked.join("\n")}`
    : ""
}`
    });
  }
};