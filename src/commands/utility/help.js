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
`Catch cats, collect rare ones, trade with players, and become the best collector!`
        )
        .addFields(
          {
            name:
              "🚀 Start Here",
            value:
`/tutorial
/catch
/inventory
/daily
/stats`
          },

          {
            name:
              "🐱 Cat Commands",
            value:
`/catch
/catalogue
/inventory
/trade
/stats`
          },

          {
            name:
              "💰 Economy",
            value:
`/daily
/casino
/slots
/roulette
/store`
          },

          {
            name:
              "🎮 Fun",
            value:
`/8ball
/roll
/rps
/tictactoe`
          },

          {
            name:
              "🔎 More Help",
            value:
"`/help command:catch`"
          }
        )
        .setFooter({
          text:
            "FourCat • Catch them all 🐾"
        });

    await interaction.reply({
      embeds:
        [embed]
    });
  }
};