const {
  PermissionFlagsBits
} = require(
  "discord.js"
);

function checkAdmin(
  interaction
) {
  return interaction.member.permissions.has(
    PermissionFlagsBits.Administrator
  );
}

module.exports =
  checkAdmin;