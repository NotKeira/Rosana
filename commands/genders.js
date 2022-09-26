const chalk = require("chalk");
const { SlashCommandBuilder, UserPremiumType } = require("discord.js");
const main_json = require("../botconfig/main.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("genders")
    .setDescription("Grab a Gender role")
    .addSubcommand((option) =>
      option.setName("transgender").setDescription("Get the transgender role (This is when you're switching your gender from male-female/female-male")
    )
    .addSubcommand((option) =>
      option.setName("cisgender").setDescription("Get the cisgender role (This is when you aren't changing your gender)")
    )
    .addSubcommand((option) =>
      option.setName("nonbinary").setDescription("Get the nonbinary/genderfluid role (This is when you aren't IYO, male or female)")
    ),
  async execute(interaction) {
    const server = interaction.guild;
    const user = interaction.member;
    const transgender = server.roles.cache.get("997822382171500635");
    const cisgender = server.roles.cache.get("997822260289220648");
    const nonbino = server.roles.cache.get("997822385346596944");

    if (interaction.options.getSubcommand() == "transgender") {
      if (user.roles.cache.has("997822382171500635")) {
        user.roles.remove(transgender, "Removing their Gender Role");
        interaction.reply(`Removing the **Transgender** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("997822382171500635")) {
        user.roles.add(transgender, "Adding their Gender Role");
        interaction.reply(`Gave you the **Transgender** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
      }
    } else if (interaction.options.getSubcommand() == "cisgender") {
      if (user.roles.cache.has("997822260289220648")) {
        user.roles.remove(cisgender, "Removing their Gender Role");
        interaction.reply(`Removing the **Cisgender** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("997822260289220648")) {
        user.roles.add(cisgender, "Adding their Gender Role");
        interaction.reply(`Gave you the **Cisgender** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
      }
    } else if (interaction.options.getSubcommand() == "nonbinary") {
      if (user.roles.cache.has("997822385346596944")) {
        user.roles.remove(nonbino, "Removing their Gender Role");
        interaction.reply(`Removing the **Genderfluid/Nonbinary** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("997822385346596944")) {
        user.roles.add(nonbino, "Adding their Gender Role");
        interaction.reply(`Gave you the **Genderfluid/Nonbinary** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
      }
    }
  },
};
