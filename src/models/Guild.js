const mongoose =
  require("mongoose");

const guildSchema =
  new mongoose.Schema({
    guildId: {
      type: String,
      required: true,
      unique: true
    },

    spawnChannels: {
      type: Array,
      default: []
    },

    lastSpawn: {
      type: Date,
      default: null
    }
  });

module.exports =
  mongoose.model(
    "Guild",
    guildSchema
  );