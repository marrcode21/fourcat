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

    if (
      user.totalCatsCaught >= 500 &&
      !user.achievements.includes(
        "cat_god"
      )
    ) {
      user.achievements.push(
        "cat_god"
      );

      rewards.push(
        "🐈 Cat God"
      );
    }

    const uniqueCats =
      new Set(
        user.inventory.map(
          c =>
            c.replace(
              "shiny_",
              ""
            )
        )
      ).size;

    if (
  uniqueCats >= 2 &&
  !user.achievements.includes(
    "collector_bronze"
  )
) {
  user.achievements.push(
    "collector_bronze"
  );

  rewards.push(
    "🥉 Collector"
  );
}

if (
  uniqueCats >= 4 &&
  !user.achievements.includes(
    "collector_silver"
  )
) {
  user.achievements.push(
    "collector_silver"
  );

  rewards.push(
    "🥈 Senior Collector"
  );
}

if (
  uniqueCats >= 8 &&
  !user.achievements.includes(
    "collector_gold"
  )
) {
  user.achievements.push(
    "collector_gold"
  );

  rewards.push(
    "🥇 Master Collector"
  );
}

const shinyCount =
  user.inventory.filter(
    cat =>
      cat.startsWith(
        "shiny_"
      )
  ).length;

  if (
  shinyCount >= 1 &&
  !user.achievements.includes(
    "first_shiny"
  )
) {
  user.achievements.push(
    "first_shiny"
  );

  rewards.push(
    "✨ First Shiny"
  );
}

if (
  shinyCount >= 10 &&
  !user.achievements.includes(
    "shiny_hunter"
  )
) {
  user.achievements.push(
    "shiny_hunter"
  );

  rewards.push(
    "🌟 Shiny Hunter"
  );
}

if (
  shinyCount >= 50 &&
  !user.achievements.includes(
    "shiny_master"
  )
) {
  user.achievements.push(
    "shiny_master"
  );

  rewards.push(
    "💎 Shiny Master"
  );
}

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
    "secret_finder"
  )
) {
  user.achievements.push(
    "secret_finder"
  );

  rewards.push(
    "👑 Secret Finder"
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