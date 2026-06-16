const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const getUser =
  require("../../utils/getUser");

const cats =
  require("../../data/cats");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName(
        "inventory"
      )
      .setDescription(
        "View inventory"
      ),

  async execute(
    interaction
  ) {
    const user =
      await getUser(
        interaction.user.id
      );

    const counts =
      {};

    for (
      const catId
      of user.inventory
    ) {
      counts[
        catId
      ] =
        (counts[
          catId
        ] || 0) + 1;
    }

    const inventory =
      Object.entries(
        counts
      )
        .map(
          ([
            id,
            amount
          ]) => {
            // old inventory migration
            if (
              typeof id ===
                "string" &&
              id.includes(
                "Cat"
              )
            ) {
              return `❓ Legacy Cat × ${amount}`;
            }

            const shiny =
              id.startsWith(
                "shiny_"
              );

            const realId =
              shiny
                ? id.replace(
                    "shiny_",
                    ""
                  )
                : id;

            const cat =
              cats.find(
                c =>
                  c.id ===
                  realId
              );

            // prevent crash
            if (!cat) {
              return `❓ Unknown Cat (${id}) × ${amount}`;
            }

            return `${
              shiny
                ? "✨ "
                : ""
            }${cat.emoji} **${
              shiny
                ? "Shiny "
                : ""
            }${
              cat.name
            }**
× ${amount}
(${cat.rarity})`;
          }
        )
        .filter(Boolean)
        .join("\n");

    const embed =
      new EmbedBuilder()
        .setTitle(
          `🎒 ${interaction.user.username}'s Inventory`
        )
        .setDescription(
          inventory ||
            "No cats."
        );

    await interaction.reply({
      embeds: [embed]
    });
  }
};