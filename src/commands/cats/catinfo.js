const {
SlashCommandBuilder,
EmbedBuilder
} = require("discord.js");

const cats =
require("../../data/cats");

const secretCats =
require("../../data/secretCats");

const getUser =
require("../../utils/getUser");

module.exports = {
data:
new SlashCommandBuilder()
.setName("catinfo")
.setDescription(
"View cat information"
)
.addStringOption(
option =>
option
.setName("id")
.setDescription(
"Select a cat"
)
.setRequired(true)
.setAutocomplete(true)
),

async autocomplete(
    interaction
) {
    const focused =
        interaction.options.getFocused();

    const allCats =
        [
            ...cats,
            ...secretCats
        ];

    const filtered =
        allCats
            .filter(
                cat =>
                    cat.name
                        .toLowerCase()
                        .includes(
                            focused.toLowerCase()
                        )
            )
            .slice(0, 25);

    await interaction.respond(
        filtered.map(
            cat => ({
                name:
                    `${cat.emoji ?? "👑"} ${cat.name}`,
                value:
                    cat.id
            })
        )
    );
},

async execute(
interaction
) {

const id =
  interaction.options.getString(
    "id"
  );

const user =
  await getUser(
    interaction.user.id
  );

const cat =
  [...cats, ...secretCats]
    .find(
      c =>
        c.id === id
    );

if (!cat) {
  return interaction.reply({
    content:
      "❌ Cat not found.",
    flags: 64
  });
}

const owned =
  user.inventory.some(
    c =>
      c.replace(
        "shiny_",
        ""
      ) === cat.id
  );

const shinyOwned =
  user.inventory.includes(
    `shiny_${cat.id}`
  );

const embed =
  new EmbedBuilder()
    .setTitle(
      `${cat.emoji ?? "👑"} ${cat.name}`
    )
    .addFields(
      {
        name: "🆔 ID",
        value: cat.id,
        inline: true
      },
      {
        name: "🏷 Type",
        value:
          cat.secret
            ? "Secret"
            : cat.rarity,
        inline: true
      },
      {
        name: "📦 Owned",
        value:
          owned
            ? "✅ Yes"
            : "❌ No",
        inline: true
      },
      {
        name: "✨ Shiny Owned",
        value:
          shinyOwned
            ? "✅ Yes"
            : "❌ No",
        inline: true
      }
    );

if (cat.secret) {

  embed.addFields({
    name: "💰 Reward",
    value:
      `${cat.rewardMin.toLocaleString()} - ${cat.rewardMax.toLocaleString()} Cats`,
    inline: true
  });

} else {

  embed.addFields(
    {
      name: "💰 Reward",
      value:
        `${cat.reward.toLocaleString()} Cats`,
      inline: true
    }
  );

}

await interaction.reply({
  embeds: [embed]
});

}
};
