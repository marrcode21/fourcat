const {
  SlashCommandBuilder
} = require("discord.js");

const getUser =
  require("../../utils/getUser");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("prism")
      .setDescription(
        "Use a Cat Prism"
      ),

  async execute(
    interaction
  ) {
    const user =
      await getUser(
        interaction.user.id
      );

    if (
      user.prisms <= 0
    ) {
      return interaction.reply({
        content:
          "❌ You don't own any Cat Prisms.",
        flags: 64
      });
    }

    if (
      user.inventory
        .length === 0
    ) {
      return interaction.reply({
        content:
          "❌ You have no cats.",
        flags: 64
      });
    }

    const oldCat =
      user.inventory[
        Math.floor(
          Math.random() *
            user.inventory
              .length
        )
      ];

    const rewards = [
      "🐱 Common Cat",
      "😺 Rare Cat",
      "😹 Epic Cat",
      "🦁 Legendary Cat"
    ];

    const newCat =
      rewards[
        Math.floor(
          Math.random() *
            rewards.length
        )
      ];

    const index =
      user.inventory.indexOf(
        oldCat
      );

    user.inventory.splice(
      index,
      1
    );

    user.inventory.push(
      newCat
    );

    user.prisms--;

    await user.save();

    await interaction.reply(
      `🔮 Prism used!\n\n${oldCat} ➜ ${newCat}`
    );
  }
};