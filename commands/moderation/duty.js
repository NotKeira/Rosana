const { Client, Message, MessageEmbed, Discord, Guild} = require("discord.js");
const chalk = require("chalk");
const main_json = require("../../botconfig/main.json");
const tickEmoji = main_json.tickEmoji;
const banham = main_json.ban_hammer;
const auditLogs = main_json.logChannel;
module.exports = {
  name: "duty",
  aliases: ["", "", ""],
  cooldowns: 3000,
  description: "",
  usage: "<user> <reason>",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args, guild) => {
    const logChannel = client.channels.cache.get(auditLogs);
    const user = message.author;
    var time = 0;
    console.log(chalk.red(guild));
    var dutyRole = guild.roles.cache.get("989618704574709771");

    const onDuty_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`${banham} | Success!`)
      .setDescription(`${user} is On Duty!\nAdded on the ${dutyRole} Role.`)
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ Tech" });

    logChannel.send({ embeds: [onDuty_Embed] });
  },
};
