module.exports = {
  name:
    "interactionCreate",

  async execute(
    interaction
  ) {

    if (
      interaction.isAutocomplete()
    ) {
      const command =
        interaction.client.commands.get(
          interaction.commandName
        );

      if (
        command &&
        command.autocomplete
      ) {
        return command.autocomplete(
          interaction
        );
      }
    }

    if (
      !interaction.isChatInputCommand()
    )
      return;

    const command =
      interaction.client.commands.get(
        interaction.commandName
      );

    if (!command)
      return;

    try {
      await command.execute(
        interaction
      );
    } catch (
      error
    ) {
      console.error(
        error
      );

      try {
        if (
          interaction.replied ||
          interaction.deferred
        ) {
          await interaction.followUp(
            {
              content:
                "❌ Command error.",
              flags: 64
            }
          );
        } else {
          await interaction.reply(
            {
              content:
                "❌ Command error.",
              flags: 64
            }
          );
        }
      } catch {}
    }
  }
};