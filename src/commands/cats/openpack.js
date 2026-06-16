const {
SlashCommandBuilder
} =
require(
"discord.js"
);

const getUser =
require(
"../../utils/getUser"
);

const rewards = {
normal: [
"🐱 Common Cat",
"🐱 Common Cat",
"😺 Rare Cat"
],

rare: [
"😺 Rare Cat",
"😹 Epic Cat"
],

epic: [
"😹 Epic Cat",
"🦁 Legendary Cat"
]
};

module.exports = {
data:
new SlashCommandBuilder()
.setName(
"openpack"
)
.setDescription(
"Open a pack"
)
.addStringOption(
option =>
option
.setName(
"type"
)
.setDescription(
"Pack Type"
)
.setRequired(
true
)
.addChoices(
{
name:
"Normal",
value:
"normal"
},
{
name:
"Rare",
value:
"rare"
},
{
name:
"Epic",
value:
"epic"
}
)
),

async execute(
interaction
) {
const user =
await getUser(
interaction.user.id
);

const type =
interaction.options.getString(
"type"
);

if (
user.packs[
type
] <= 0
) {
return interaction.reply({
content:
"❌ You do not own this pack.",
ephemeral:
true
});
}

user.packs[
type
] -= 1;

const pool =
rewards[
type
];

const reward =
pool[
Math.floor(
Math.random() *
pool.length
)
];

user.inventory.push(
reward
);

await user.save();

await interaction.reply(
`🎁 You opened a **${type} pack**!

You got:

${reward}`
);
}
};