const {
  ActivityType
} = require(
  "discord.js"
);

const User =
  require(
    "../models/User"
  );

module.exports = {
  name:
    "clientReady",

  once: true,

  async execute(
    client
  ) {
    console.log(
      `
━━━━━━━━━━━━━━
🐱 FourCat Online
🤖 Bot:
${client.user.tag}
🏠 Servers:
${client.guilds.cache.size}
━━━━━━━━━━━━━━
`
    );

    async function updatePresence() {
      try {
        const totalUsers =
          await User.countDocuments();

        const users =
          await User.find(
            {},
            {
              totalCatsCaught:
                1
            }
          );

        const totalCats =
          users.reduce(
            (
              total,
              user
            ) =>
              total +
              (
                user.totalCatsCaught ||
                0
              ),
            0
          );

        const presences =
          [
            {
              name:
                "🐱 FourCat v.1.1.0",
              type:
                ActivityType.Playing
            },

            {
              name:
                `${client.guilds.cache.size} servers`,
              type:
                ActivityType.Watching
            },

            {
              name:
                `${totalCats.toLocaleString()} cats caught`,
              type:
                ActivityType.Watching
            },

            {
              name:
                "Cat Economy",
              type:
                ActivityType.Competing
            },

            {
              name:
                "/catalogue",
              type:
                ActivityType.Listening
            },

            {
              name:
                `${totalUsers.toLocaleString()} users`,
              type:
                ActivityType.Watching
            }
          ];

        const randomPresence =
          presences[
            Math.floor(
              Math.random() *
              presences.length
            )
          ];

        client.user.setPresence(
          {
            activities:
              [
                randomPresence
              ],

            status:
              "online"
          }
        );
      } catch (
        error
      ) {
        console.error(
          "Presence Error:",
          error
        );
      }
    }

    // langsung set saat bot online
    await updatePresence();

    // update tiap 30 detik
    setInterval(
      updatePresence,
      30000
    );
  }
};