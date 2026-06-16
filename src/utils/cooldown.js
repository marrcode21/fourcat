const cooldowns =
  new Map();

function checkCooldown(
  userId,
  commandName,
  seconds
) {
  const key =
    `${userId}_${commandName}`;

  const now =
    Date.now();

  const expires =
    cooldowns.get(key);

  if (
    expires &&
    now < expires
  ) {
    const remaining =
      (
        expires -
        now
      ) / 1000;

    return remaining;
  }

  cooldowns.set(
    key,
    now +
      seconds * 1000
  );

  return null;
}

module.exports =
  checkCooldown;