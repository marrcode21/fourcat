const {
SlashCommandBuilder,
EmbedBuilder
} =
require(
"discord.js"
);

const cats =
require(
"../../data/cats"
);

module.exports = {
data:
new SlashCommandBuilder()
.setName(
"catalogue"
)
.setDescription(
"View all cat types"
),

async execute(
interaction
) {
const text =
cats
.map(
cat =>
`${cat.emoji}
**${cat.name}**
(${cat.rarity})
💰 ${cat.reward}`
)
.join("\n\n");

const embed =
new EmbedBuilder()
.setTitle(
"📚 FourCat Catalogue"
)
.setDescription(
text
);

await interaction.reply({
embeds:
[embed]
});
}
};