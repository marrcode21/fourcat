const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const commandInfo = {
  catch: {
    description:
      "Catch the currently spawned cat.",
    usage:
      "/catch",
    reward:
      "Cats currency, achievements, shiny chance"
  },

  inventory: {
    description:
      "View all cats you own.",
    usage:
      "/inventory"
  },

  daily: {
    description:
      "Claim your daily cats reward.",
    usage:
      "/daily"
  },

  stats: {
    description:
      "View advanced stats.",
    usage:
      "/stats"
  },

  catalogue: {
    description:
      "See all cat types.",
    usage:
      "/catalogue"
  },

  trade: {
    description:
      "Trade cats with another player.",
    usage:
      "/trade @user"
  },

  slots: {
    description:
      "Try your luck in slots.",
    usage:
      "/slots"
  },

  roulette: {
    description:
      "Risk your cats.",
    usage:
      "/roulette"
  },

  casino: {
    description:
      "Gamble cats in the casino.",
    usage:
      "/casino"
  },

  ping: {
    description:
      "Check bot latency.",
    usage:
      "/ping"
  },

  help: {
    description:
      "View bot commands.",
    usage:
      "/help"
  },

  achievements: {
  description:
    "View your unlocked achievements.",
  usage:
    "/achievements"
},

leaderboards: {
  description:
    "View top FourCat players.",
  usage:
    "/leaderboards"
},

store: {
  description:
    "View shop items.",
  usage:
    "/store"
},

buy: {
  description:
    "Buy packs from the store.",
  usage:
    "/buy <item>"
},

openpack: {
  description:
    "Open a cat pack.",
  usage:
    "/openpack <type>"
},

brew: {
  description:
    "Brew coffee for a catch reward boost.",
  usage:
    "/brew",
  reward:
    "+50% catch rewards for 30 minutes"
},

prism: {
  description:
    "Convert cats into prism energy.",
  usage:
    "/prism"
}
};

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("help")
      .setDescription(
        "View all FourCat commands"
      )
      .addStringOption(
        option =>
          option
            .setName(
              "command"
            )
            .setDescription(
              "Specific command"
            )
            .setRequired(
              false
            )
      ),

  async execute(
    interaction
  ) {
    const command =
      interaction.options.getString(
        "command"
      );

    // detailed help
    if (command) {
      const cmd =
        commandInfo[
          command.toLowerCase()
        ];

      if (!cmd) {
        return interaction.reply(
          {
            content:
              "❌ Command not found.",
            flags: 64
          }
        );
      }

      const embed =
        new EmbedBuilder()
          .setTitle(
            `📖 /${command}`
          )
          .addFields(
            {
              name:
                "Description",
              value:
                cmd.description
            },
            {
              name:
                "Usage",
              value:
                `\`${cmd.usage}\``
            },
            {
              name:
                "Reward",
              value:
                cmd.reward ||
                "None"
            }
          );

      return interaction.reply({
        embeds:
          [embed]
      });
    }

    // normal help
const embed =
  new EmbedBuilder()
    .setTitle(
      "🐱 FourCat Help"
    )
    .setDescription(
`Catch cats, hunt Secret Onde Mande, earn achievements, and become the richest collector!`
    )
    .addFields(
      {
        name:
          "🚀 Getting Started",
        value:
`/tutorial
/catch
/daily
/inventory
/stats`
      },

      {
        name:
          "🐱 Cat System",
        value:
`/catch
/catalogue
/inventory
/trade
/stats
/achievements`
      },

      {
        name:
          "💰 Economy",
        value:
`/daily
/store
/buy
/openpack
/brew
/prism`
      },

      {
        name:
          "🎰 Casino",
        value:
`/slots
/roulette
/casino`
      },

      {
        name:
          "🏆 Community",
        value:
`/leaderboards`
      },

      {
        name:
          "👑 Secret Cats",
        value:
`Catch rare Onde Mande variants worth up to 20,000 cats.`
      },

      {
        name:
          "🔎 Detailed Help",
        value:
"`/help command_name`"
      }
    )
    .setFooter({
      text:
        "FourCat v1.1.0 • Secret Onde Mande Update"
    });
  }
};