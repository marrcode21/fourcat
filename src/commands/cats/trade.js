const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require("discord.js");

const { v4: uuidv4 } =
  require("uuid");

const getUser =
  require("../../utils/getUser");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("trade")
      .setDescription(
        "Trade cats"
      )
      .addUserOption(
        option =>
          option
            .setName(
              "user"
            )
            .setDescription(
              "User"
            )
            .setRequired(
              true
            )
      ),

  async execute(
    interaction
  ) {
    const target =
      interaction.options.getUser(
        "user"
      );

    if (
      target.bot ||
      target.id ===
        interaction.user.id
    ) {
      return interaction.reply({
        content:
          "❌ Invalid target.",
        flags: 64
      });
    }

    const sender =
      await getUser(
        interaction.user.id
      );

    const receiver =
      await getUser(
        target.id
      );

    if (
      sender.inventory
        .length === 0
    ) {
      return interaction.reply({
        content:
          "❌ You have no cats.",
        flags: 64
      });
    }

    if (
      receiver.inventory
        .length === 0
    ) {
      return interaction.reply({
        content:
          "❌ Target has no cats.",
        flags: 64
      });
    }

    const tradeId =
      uuidv4();

    // Sender choose
    const senderMenu =
      new StringSelectMenuBuilder()
        .setCustomId(
          `sender_${tradeId}`
        )
        .setPlaceholder(
          "Choose your cat"
        )
        .addOptions(
          sender.inventory
            .slice(0, 25)
            .map(cat => ({
              label: cat,
              value: cat
            }))
        );

    const senderRow =
      new ActionRowBuilder()
        .addComponents(
          senderMenu
        );

    await interaction.reply({
      content:
        `${interaction.user}, choose a cat to trade.`,
      components: [
        senderRow
      ]
    });

    const msg =
      await interaction.fetchReply();

    const senderCollect =
      msg.createMessageComponentCollector({
        time: 60000
      });

    let senderCat;
    let receiverCat;

    senderCollect.on(
      "collect",
      async i => {
        if (
          i.user.id !==
          interaction.user.id
        ) {
          return i.reply({
            content:
              "❌ Not your trade.",
            flags: 64
          });
        }

        senderCat =
          i.values[0];

        await i.update({
          content:
            `✅ Selected: **${senderCat}**`,
          components:
            []
        });

        const receiverMenu =
          new StringSelectMenuBuilder()
            .setCustomId(
              `receiver_${tradeId}`
            )
            .setPlaceholder(
              "Choose your cat"
            )
            .addOptions(
              receiver.inventory
                .slice(
                  0,
                  25
                )
                .map(
                  cat => ({
                    label:
                      cat,
                    value:
                      cat
                  })
                )
            );

        const receiverRow =
          new ActionRowBuilder()
            .addComponents(
              receiverMenu
            );

        const tradeMsg =
          await interaction.followUp({
            content:
              `${target}, choose a cat to trade back.`,
            components:
              [
                receiverRow
              ]
          });

        const receiverCollector =
          tradeMsg.createMessageComponentCollector({
            time: 60000
          });

        receiverCollector.on(
          "collect",
          async j => {
            if (
              j.user.id !==
              target.id
            ) {
              return j.reply({
                content:
                  "❌ Not your trade.",
                flags: 64
              });
            }

            receiverCat =
              j.values[0];

            const confirmRow =
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId(
                      `accept_${tradeId}`
                    )
                    .setLabel(
                      "Confirm"
                    )
                    .setStyle(
                      ButtonStyle.Success
                    )
                );

            const embed =
              new EmbedBuilder()
                .setTitle(
                  "🤝 Trade Confirmation"
                )
                .setDescription(
`${interaction.user}
offers:
**${senderCat}**

${target}
offers:
**${receiverCat}**`
                );

            await j.update({
              embeds: [
                embed
              ],
              components:
                [
                  confirmRow
                ]
            });

            const confirmCollector =
              tradeMsg.createMessageComponentCollector({
                time: 60000
              });

            const confirmed =
              new Set();

            confirmCollector.on(
              "collect",
              async k => {
                if (
                  ![
                    interaction.user.id,
                    target.id
                  ].includes(
                    k.user.id
                  )
                ) {
                  return;
                }

                confirmed.add(
                  k.user.id
                );

                await k.reply({
                  content:
                    "✅ Confirmed",
                  flags: 64
                });

                if (
                  confirmed.size ===
                  2
                ) {
                  const sIndex =
                    sender.inventory.indexOf(
                      senderCat
                    );

                  const rIndex =
                    receiver.inventory.indexOf(
                      receiverCat
                    );

                  if (
                    sIndex ===
                      -1 ||
                    rIndex ===
                      -1
                  ) {
                    return tradeMsg.edit({
                      content:
                        "❌ Trade invalid.",
                      components:
                        []
                    });
                  }

                  sender.inventory.splice(
                    sIndex,
                    1
                  );

                  receiver.inventory.splice(
                    rIndex,
                    1
                  );

                  sender.inventory.push(
                    receiverCat
                  );

                  receiver.inventory.push(
                    senderCat
                  );

                  await sender.save();
                  await receiver.save();

                  confirmCollector.stop();

                  return tradeMsg.edit({
                    content:
                      "✅ Trade completed!",
                    embeds:
                      [],
                    components:
                      []
                  });
                }
              }
            );
          }
        );
      }
    );
  }
};