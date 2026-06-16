const {
  SlashCommandBuilder,
  PermissionFlagsBits
} = require("discord.js");

const checkAdmin =
  require(
    "../../utils/checkAdmin"
  );

const getGuild =
  require("../../utils/getGuild");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("setup")
      .setDescription(
        "Setup cat in current channel"
      )
      .setDefaultMemberPermissions(
        PermissionFlagsBits.Administrator
      ),

  async execute(
    interaction
  ) {

    if (
  !checkAdmin(
    interaction
  )
) {
  return interaction.reply(
    {
      content:
        "❌ You need Administrator permission.",
      flags: 64
    }
  );
}

    const guild =
      await getGuild(
        interaction.guild.id
      );

    const channelId =
      interaction.channel.id;

    if (
      guild.spawnChannels.includes(
        channelId
      )
    ) {
      return interaction.reply({
        content:
          "❌ Channel already setup.",
        ephemeral: true
      });
    }

    guild.spawnChannels.push(
      channelId
    );

    await guild.save();

    await interaction.reply(
      "✅ Cat spawn setup complete."
    );
  }
};