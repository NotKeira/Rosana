const chalk = require("chalk");
const { SlashCommandBuilder, UserPremiumType } = require("discord.js");
const main_json = require("../botconfig/main.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pronouns")
    .setDescription("Grab a pronoun role")
    .addSubcommand((option) =>
      option.setName("shethey").setDescription("Gain She/They Pronoun role")
    )
    .addSubcommand((option) =>
      option.setName("hethey").setDescription("Gain He/They Pronoun role")
    )
    .addSubcommand((option) =>
      option.setName("theythem").setDescription("Gain They/Them Pronoun role")
    )
    .addSubcommand((option) =>
      option.setName("sheher").setDescription("Gain She/Her Pronoun role")
    )
    .addSubcommand((option) =>
      option.setName("hehim").setDescription("Gain He/Him Pronoun role")
    )
    .addSubcommand((option) =>
      option.setName("any").setDescription("Gain 'Any' Pronoun role")
    ),
  async execute(interaction) {
    const server = interaction.guild;
    const user = interaction.member;
    const SheThey = server.roles.cache.get("997822249748942898");
    const HeThey = server.roles.cache.get("997822257214799903");
    const TheyThem = server.roles.cache.get("997822259047710730");
    const SheHer = server.roles.cache.get("997822518138257408");
    const HeHim = server.roles.cache.get("997822386877501450");
    const Any = server.roles.cache.get("997822570286026812");

    if (interaction.options.getSubcommand() == "shethey") {
      if (user.roles.cache.has("997822249748942898")) {
        user.roles.remove(SheThey, "Removing their Pronoun Role");
        interaction.reply(`Removing the **She/They** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("997822249748942898")) {
        user.roles.add(SheThey, "Adding their Pronoun Role");
        interaction.reply(`Gave you the **She/They** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
      }
        
    
    } else if (interaction.options.getSubcommand() == "hethey") {
      if (user.roles.cache.has("997822257214799903")) {
        user.roles.remove(HeThey, "Removing their Pronoun Role");
        interaction.reply(`Removing the **He/They** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("997822257214799903")) {
        user.roles.add(HeThey, "Adding their Pronoun Role");
        interaction.reply(`Gave you the **He/They** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
        }
        

    } else if (interaction.options.getSubcommand() == "theythem") {
      if (user.roles.cache.has("997822259047710730")) {
        user.roles.remove(TheyThem,"Removing their Pronoun Role");
        interaction.reply(`Removing the **They/Them** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("997822259047710730")) {
        user.roles.add(TheyThem, "Adding their Pronoun Role");
        interaction.reply(`Gave you the **They/Them** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
        }
        

    } else if (interaction.options.getSubcommand() == "sheher") {
      if (user.roles.cache.has("997822518138257408")) {
        user.roles.remove(SheHer,"Removing their Pronoun Role");
        interaction.reply(`Removing the **She/Her** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("997822518138257408")) {
        user.roles.add(SheHer, "Adding their Pronoun Role");
        interaction.reply(`Gave you the **She/Her** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
        }
        

    } else if (interaction.options.getSubcommand() == "hehim") {
      if (user.roles.cache.has("997822386877501450")) {
        user.roles.remove(HeHim, "Removing their Pronoun Role");
        interaction.reply(`Removing the **He/Him** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("997822386877501450")) {
        user.roles.add(HeHim, "Adding their Pronoun Role");
        interaction.reply(`Gave you the **He/Him** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
      }
        

    } else if (interaction.options.getSubcommand() == "any") {
      if (user.roles.cache.has("997822570286026812")) {
        user.roles.remove(Any, "Removing their Pronoun Role");
        interaction.reply(`Removing the **Any Pronouns** Role.`);
        console.log(`Updated ${user}'s Roles. --`);
      }
      if (!user.roles.cache.has("997822570286026812")) {
        user.roles.add(Any, "Adding their Pronoun Role");
        interaction.reply(`Gave you the **Any Pronouns** Role.`);
        console.log(`Updated ${user}'s Roles. ++`);
      }
    }
  },
};
