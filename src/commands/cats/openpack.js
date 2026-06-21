const {
SlashCommandBuilder
} = require(
"discord.js"
);

const getUser =
require(
"../../utils/getUser"
);

const achievementSystem =
require(
"../../systems/achievementSystem"
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
    flags: 64
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

user.totalPacksOpened +=
  1;

const unlocked =
  await achievementSystem(
    user
  );

await user.save();

let message =
  `🎁 You opened a **${type} pack**!

You got:

${reward}`;

if (
  unlocked.length
) {
  message +=
    `

🏆 Achievement Unlocked:

${unlocked.join("\n")}`;
}

await interaction.reply(
  message
);

}
};