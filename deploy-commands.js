const {
  REST,
  Routes
} = require("discord.js");

const fs = require("fs");
const path = require("path");

require("dotenv").config();

const commands = [];

const folders =
  fs.readdirSync(
    "./src/commands"
  );

for (const folder of folders) {
  const commandFiles =
    fs
      .readdirSync(
        `./src/commands/${folder}`
      )
      .filter(file =>
        file.endsWith(".js")
      );

  for (const file of commandFiles) {
    const command =
      require(
        `./src/commands/${folder}/${file}`
      );

    commands.push(
      command.data.toJSON()
    );
  }
}

const rest = new REST({
  version: "10"
}).setToken(
  process.env.TOKEN
);

(async () => {
  try {
    console.log(
      "Deploying commands..."
    );

    await rest.put(
      Routes.applicationCommands(
        process.env.CLIENT_ID,
      ),
      {
        body: commands
      }
    );

    console.log(
      "✅ Commands deployed!"
    );
  } catch (err) {
    console.error(err);
  }
})();