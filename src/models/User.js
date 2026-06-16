const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema({
    userId: {
      type: String,
      required: true,
      unique: true
    },

    cats: {
      type: Number,
      default: 0
    },

    totalCatsCaught: {
      type: Number,
      default: 0
    },

    fastestCatch: {
      type: Number,
      default: null
    },

    slowestCatch: {
      type: Number,
      default: null
    },

    inventory: {
      type: Array,
      default: []
    },

    achievements: {
      type: Array,
      default: []
    },

    dailyCooldown: {
      type: Date,
      default: null
    },

    tradeCooldown: {
      type: Date,
      default: null
    },

    packs: {
      normal: {
        type: Number,
        default: 0
    },
    
      rare: {
        type: Number,
        default: 0
    },

      epic: {
        type: Number,
        default: 0
    }
  },

    catEggs: {
      type: Number,
      default: 0
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  });

module.exports =
  mongoose.model(
    "User",
    userSchema
  );