const chalk = require("chalk");
const { SlashCommandBuilder, UserPremiumType } = require("discord.js");
const main_json = require("../botconfig/main.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("notifications")
    .setDescription("Grab a Notification role")
    .addSubcommand((option) =>
      option
        .setName("stream")
        .setDescription("Get the Stream Notifications role")
    )
    .addSubcommand((option) =>
      option
        .setName("update")
        .setDescription("Get the Updates Notifications role")
    )
    .addSubcommand((option) =>
      option
        .setName("twitter")
        .setDescription("Get the Twitter Notifications role")
    )
    .addSubcommand((option) =>
      option.setName("admin").setDescription("Get the Admin Notifications")
    ),
  async execute(interaction) {
    const server = interaction.guild;
    const user = interaction.member;
    const streamRole = server.roles.cache.get("1020723450890948610");
    const updateRole = server.roles.cache.get("1020723811466874920");
    const twitterRole = server.roles.cache.get("1020723813643731045");
    const adminRole = server.roles.cache.get("1020723815719903242");

    if (interaction.options.getSubcommand() == "stream") {
      if (user.roles.cache.has("1020723450890948610")) {
        user.roles.remove(streamRole, "Removing their Notification Role");
        interaction.reply(`Removing the **Stream Notifications** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("1020723450890948610")) {
        user.roles.add(streamRole, "Adding their Notification Role");
        interaction.reply(`Gave you the **Stream Notifications** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
      }
    } else if (interaction.options.getSubcommand() == "update") {
      if (user.roles.cache.has("1020723811466874920")) {
        user.roles.remove(updateRole, "Removing their Notification Role");
        interaction.reply(`Removing the **Update Notifications** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("1020723811466874920")) {
        user.roles.add(updateRole, "Adding their Notification Role");
        interaction.reply(`Gave you the **Update Notifications** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
      }
    } else if (interaction.options.getSubcommand() == "twitter") {
      if (user.roles.cache.has("1020723813643731045")) {
        user.roles.remove(twitterRole, "Removing their Notification Role");
        interaction.reply(`Removing the **Twitter Notifications** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("1020723813643731045")) {
        user.roles.add(twitterRole, "Adding their Notification Role");
        interaction.reply(`Gave you the **Twitter Notifications** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
      }
    } else if (interaction.options.getSubcommand() == "admin") {
      if (user.roles.cache.has("1020723815719903242")) {
        user.roles.remove(adminRole, "Removing their Notification Role");
        interaction.reply(`Removing the **Admin Notifications** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("1020723815719903242")) {
        user.roles.add(adminRole, "Adding their Notification Role");
        interaction.reply(`Gave you the **Admin Notifications** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
      }
    }
  },
};
