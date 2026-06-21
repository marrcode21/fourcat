module.exports =
  async user => {

    const rewards = [];

    // =====================
    // CATCH ACHIEVEMENTS
    // =====================

    if (
      user.totalCatsCaught >= 1 &&
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
      user.totalCatsCaught >= 10 &&
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
  user.secretCatsCaught >= 1 &&
  !user.achievements.includes(
    "onde_mande_hunter"
  )
) {
  user.achievements.push(
    "onde_mande_hunter"
  );

  rewards.push(
    "👑 Onde Mande Hunter"
  );
}

if (
  user.secretCatsCaught >= 10 &&
  !user.achievements.includes(
    "onde_mande_collector"
  )
) {
  user.achievements.push(
    "onde_mande_collector"
  );

  rewards.push(
    "🌟 Onde Mande Collector"
  );
}

if (
  user.secretCatsCaught >= 50 &&
  !user.achievements.includes(
    "onde_mande_master"
  )
) {
  user.achievements.push(
    "onde_mande_master"
  );

  rewards.push(
    "🔥 Onde Mande Master"
  );
}

if (
  user.secretCatsCaught >= 100 &&
  !user.achievements.includes(
    "onde_mande_god"
  )
) {
  user.achievements.push(
    "onde_mande_god"
  );

  rewards.push(
    "⚡ Onde Mande God"
  );
}

    if (
      user.totalCatsCaught >= 100 &&
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

    // =====================
    // DAILY ACHIEVEMENTS
    // =====================

    if (
      user.lastDaily &&
      !user.achievements.includes(
        "first_daily"
      )
    ) {
      user.achievements.push(
        "first_daily"
      );

      rewards.push(
        "📅 Daily Enjoyer"
      );
    }

    if (
      user.dailyStreak >= 7 &&
      !user.achievements.includes(
        "streak_7"
      )
    ) {
      user.achievements.push(
        "streak_7"
      );

      rewards.push(
        "🔥 Week Warrior"
      );
    }

    // =====================
    // TRADE ACHIEVEMENTS
    // =====================

    if (
      user.totalTrades >= 1 &&
      !user.achievements.includes(
        "first_trade"
      )
    ) {
      user.achievements.push(
        "first_trade"
      );

      rewards.push(
        "🤝 Trader"
      );
    }

    // =====================
    // PACK ACHIEVEMENTS
    // =====================

    if (
      user.totalPacksOpened >= 1 &&
      !user.achievements.includes(
        "first_pack"
      )
    ) {
      user.achievements.push(
        "first_pack"
      );

      rewards.push(
        "🎁 Pack Opener"
      );
    }

    // =====================
    // CASINO ACHIEVEMENTS
    // =====================

    if (
      user.casinoWins >= 1 &&
      !user.achievements.includes(
        "casino_winner"
      )
    ) {
      user.achievements.push(
        "casino_winner"
      );

      rewards.push(
        "🎰 Lucky Cat"
      );
    }

    if (
      user.casinoJackpots >= 1 &&
      !user.achievements.includes(
        "jackpot"
      )
    ) {
      user.achievements.push(
        "jackpot"
      );

      rewards.push(
        "💎 Jackpot!"
      );
    }

    return rewards;
  };