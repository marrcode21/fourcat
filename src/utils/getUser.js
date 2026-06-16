const User =
  require("../models/User");

module.exports =
  async userId => {
    let user =
      await User.findOne({
        userId
      });

    if (!user) {
      user =
        await User.create({
          userId,

          packs: {
            normal: 0,
            rare: 0,
            epic: 0
          }
        });
    }

    // Migration fix
    if (
      typeof user.packs !==
      "object"
    ) {
      user.packs = {
        normal: 0,
        rare: 0,
        epic: 0
      };
    }

    if (
      user.packs.normal ==
      null
    ) {
      user.packs.normal =
        0;
    }

    if (
      user.packs.rare ==
      null
    ) {
      user.packs.rare =
        0;
    }

    if (
      user.packs.epic ==
      null
    ) {
      user.packs.epic =
        0;
    }

    await user.save();

    return user;
  };