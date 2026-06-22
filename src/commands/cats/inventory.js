const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const getUser =
  require("../../utils/getUser");

const secretCats =
  require("../../data/secretCats")

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
              [...cats, ...secretCats]
                  .find(
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
            }${
              cat.secret
                ? "👑 "
                : ""
            }${
              cat.emoji
            } **${
              shiny
                ? "Shiny "
                : ""
            }${
              cat.name
            }**
            x ${amount}
            (${
              cat.secret
                ? "Secret"
                : cat.rarity
            })`;
          }
        )
        .filter(Boolean)
        .join("\n");

    const totalCats =
      user.inventory.length;

    const uniqueCats =
      new Set(
        user.inventory.map(
          c =>
            c.replace(
              "shiny_",
              ""
            )
        )
      ).size;

    const shinyCount =
      user.inventory.filter(
        c =>
          c.startsWith(
            "shiny_"
          )
      ).length;

    const secretCount =
      user.inventory.filter(
        c => {

          const clean =
            c.replace(
              "shiny_",
              ""
            );

          return secretCats.some(
            s =>
              s.id === clean
          );
        }
      ).length;

    const embed =
      new EmbedBuilder()
        .setTitle(
          `🎒 ${interaction.user.username}'s Inventory`
        )
        .setDescription(
        `📦 Total Cats: ${totalCats}
        📚 Unique Cats: ${uniqueCats}
        ✨ Shiny Cats: ${shinyCount}
        👑 Secret Cats: ${secretCount}

        ━━━━━━━━━━━━

        ${inventory || "No cats."}`
        );

    await interaction.reply({
      embeds: [embed]
    });
  }
};