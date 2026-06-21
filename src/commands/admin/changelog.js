const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const checkOwner =
  require("../../utils/checkOwner");

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName("changelog")
      .setDescription(
        "Send update changelog"
      ),

  async execute(
    interaction
  ) {

    const isOwner =
      await checkOwner(
        interaction.user.id
      );

    if (!isOwner) {
      return interaction.reply({
        content:
          "❌ Owner only.",
        flags: 64
      });
    }

    const embed =
      new EmbedBuilder()
        .setTitle(
          "🎉 FourCat v1.1.0"
        )
        .setDescription(
`🎉 FourCat v1.1.0 Update

Thank you for playing FourCat!

🚀 New Features
☕ Brew System

Use /brew to create coffee boosts that increase catch rewards.

🔮 Prism System

Use /prism to convert resources into valuable rewards.

🎰 Slots

Try your luck with /slots.

Match symbols to win Cats and unlock special achievements.

🎲 Roulette

Use /roulette to gamble your Cats.

Double your winnings or lose everything.

🎯 Casino

A brand-new casino experience has been added through /casino.

Multiple gambling options are now available for players who enjoy taking risks.

👑 Secret Cats

A new Secret rarity has arrived.

Onde Mande

Features:
• Extremely rare spawn chance
• 4 custom variants
• Unique artwork
• Rewards from 10,000 to 20,000 Cats

Catch one if you're lucky enough to see it.

🏆 Achievement Expansion

New achievement categories added:

Catching

• First Catch
• Cat Hunter
• Cat Master

Daily Rewards

• Daily Enjoyer
• Week Warrior

Trading

• Trader

Packs

• Pack Opener

Casino

• Lucky Cat
• Jackpot

Secret Cats

• Onde Mande Hunter
• Onde Mande Collector
• Onde Mande Master
• Onde Mande God

📚 Catalogue Update

• Secret Cats section added
• Rarity display improved
• Total cat count added
• Better visual formatting

📊 Stats Update

New statistics:
• Secret Cats Caught
• Total Trades
• Packs Opened
• Daily Streak Progress

🤝 Trade Improvements

• Better confirmation system
• Achievement integration
• Trade progression tracking

🎁 Pack Improvements

• Pack progression support
• Achievement support
• Better reward tracking

⚡ Coffee Boost System

Coffee now boosts cat-catching rewards for a limited time.

🛠️ Fixes & Improvements

• Fixed command registration issues
• Fixed duplicate command problems
• Fixed interaction response errors
• Fixed cooldown issues
• Improved database stability
• Improved command reliability
• Improved achievement tracking
• General performance improvements

📌 Available Commands

/achievements
/bal
/brew
/buy
/casino
/catalogue
/catch
/daily
/gift
/help
/inventory
/leaderboards
/openpack
/packs
/ping
/prism
/roulette
/setup
/slots
/stats
/store
/trade

Happy Hunting! 🐱`
        )
        .setFooter({
          text:
            "FourCat v1.1.0"
        })
        .setTimestamp();

    await interaction.channel.send({
      embeds: [embed]
    });

    await interaction.reply({
      content:
        "✅ Changelog sent.",
      flags: 64
    });
  }
};