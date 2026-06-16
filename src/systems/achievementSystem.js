module.exports =
  async user => {
    const rewards = [];

    if (
      user.totalCatsCaught >=
        1 &&
      !user.achievements.includes(
        "first_catch"
      )
    ) {
      user.achievements.push(
        "first_catch"
      );

      rewards.push(
        "🏆 First Catch"
      );
    }

    if (
      user.totalCatsCaught >=
        10 &&
      !user.achievements.includes(
        "10_cats"
      )
    ) {
      user.achievements.push(
        "10_cats"
      );

      rewards.push(
        "😼 Cat Hunter"
      );
    }

    if (
      user.totalCatsCaught >=
        100 &&
      !user.achievements.includes(
        "100_cats"
      )
    ) {
      user.achievements.push(
        "100_cats"
      );

      rewards.push(
        "👑 Cat Master"
      );
    }

    return rewards;
  };