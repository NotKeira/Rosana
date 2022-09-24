const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { developerID } = require("../../botconfig/main.json");
const { adminList } = require("../../botconfig/main.json");
module.exports = {
  name: "rankcount",
  aliases: ["rcount", "rc", ""],
  cooldowns: 3000,
  description: "",
  usage: "<roleID>",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    let roleID = args[0];
    let membersWithRole = message.guild.roles.cache.get(roleID).members;
    let roleName = message.guild.roles.cache.get(roleID).name;
    const successRankCountEmbed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`Rank Count Results`)
      .setDescription(
        `There are ${membersWithRole.size} people in the role **${roleName}**`
      )
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ" });
    const failedCountEmbed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`:x: Failed!`)
      .setDescription(
        `Could not gather the amount of people in that role as it either does not exist, or is unavailable for me to check.`
      )
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ" });
    const noMemberEmbed = new MessageEmbed()
      .setColor("DARK_RED")
      .setTitle(`:grimacing: Failed!`)
      .setDescription(
        `Yikes! Looks like there's no-one in that role.. So the size of the role is 0...`
      )
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ" });
    const noPermsEmbed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`Insufficient Permissions!`)
      .setDescription(
        `You do not have permission to use that command right now.`
      )
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ" });

    console.log(`Logged ${membersWithRole.size} members with that role.`);
    if (!roleID) return message.channel.send({ embeds: [failedCountEmbed] });
    if (membersWithRole.size === 0)
      return message.channel.send({ embeds: [noMemberEmbed] });
    else if (membersWithRole.size >= 1)
      return message.channel.send({ embeds: [successRankCountEmbed] });
  },
};
