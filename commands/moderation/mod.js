const { Client, Message, MessageEmbed, Discord, Guild } = require("discord.js");
const main_json = require("../../botconfig/main.json");
const tickEmoji = main_json.tickEmoji;
module.exports = {
  name: "mod",
  aliases: ["", "", ""],
  cooldowns: 3000,
  description: "",
  usage: "<user> <reason>",
  toggleOff: false,
  developersOnly: true,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args, guild) => {
    const logChannel = guild.channels.cache.get(auditLogs);
    const target = message.mentions.members.first();
    const user = message.author.id();

    const waitBanEmbed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`:x: | Error!`)
      .setDescription(`You need to provide a user to promote!`)
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ Tech" });
  },
};