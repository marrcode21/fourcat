const Guild =
  require("../models/Guild");

module.exports =
  async guildId => {
    let guild =
      await Guild.findOne({
        guildId
      });

    if (!guild) {
      guild =
        await Guild.create({
          guildId
        });
    }

    return guild;
  };