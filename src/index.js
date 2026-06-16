const {
  Client,
  GatewayIntentBits,
  Collection
} = require("discord.js");

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const catSpawner =
  require("./systems/catSpawner");

require("dotenv").config();

const requiredEnv =
  [
    "TOKEN",
    "CLIENT_ID",
    "MONGO_URI"
  ];

for (
  const key
  of requiredEnv
) {
  if (
    !process.env[
      key
    ]
  ) {
    console.error(
      `❌ Missing ${key} in .env`
    );

    process.exit(
      1
    );
  }

  console.log(
    `✅ ${key}`
  );
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

/*
=========================
COMMAND HANDLER
=========================
*/

const commandFolders = fs.readdirSync(
  path.join(__dirname, "commands")
);

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(
      path.join(
        __dirname,
        "commands",
        folder
      )
    )
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(
      `./commands/${folder}/${file}`
    );

    client.commands.set(
      command.data.name,
      command
    );
  }
}

/*
=========================
EVENT HANDLER
=========================
*/

const eventsPath =
  path.join(
    __dirname,
    "events"
  );

const eventFiles =
  fs
    .readdirSync(
      eventsPath
    )
    .filter(file =>
      file.endsWith(".js")
    );

for (
  const file
  of eventFiles
) {
  const filePath =
    path.join(
      eventsPath,
      file
    );

  const event =
    require(
      filePath
    );

  console.log(
    `📂 Loaded event: ${event.name}`
  );

  if (
    event.once
  ) {
    client.once(
      event.name,
      (...args) =>
        event.execute(
          ...args
        )
    );
  } else {
    client.on(
      event.name,
      (...args) =>
        event.execute(
          ...args
        )
    );
  }
}

/*
=========================
MONGODB CONNECT
=========================
*/

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log(
      "🍃 MongoDB connected"
    );
  })
  .catch(error => {
    console.error(
      "MongoDB Error:",
      error
    );
  });


catSpawner(client);
client.login(
  process.env.TOKEN
);

process.on(
  "unhandledRejection",
  error => {
    console.error(
      "UNHANDLED REJECTION:",
      error
    );
  }
);

process.on(
  "uncaughtException",
  error => {
    console.error(
      "UNCAUGHT EXCEPTION:",
      error
    );
  }
);