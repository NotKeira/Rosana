const { Client, Message, MessageEmbed, Discord, Guild } = require("discord.js");
const main_json = require("../../../botconfig/main.json");
module.exports = {
  name: "leave",
  aliases: [],
  cooldowns: 1000,
  description: "This Command Warns a user.",
  usage: "<user> <reason>",
  toggleOff: false,
  creatorOnly: true,
  developersOnly: false,
  managerOnly: false,
  modOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, Discord, guild) => {
    const logServer = client.guilds.cache.get("965098311843475467");
    const logChannel = logServer.channels.cache.get("977620310633353336");
    const serverLeave_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`:printer: | AUDIT LOG`)
      .setDescription(`I just got kicked/left ${guild}`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    Guild.leave()
      .then(
        (g) =>
          console.log(`Left the guild ${g}`) &&
          logChannel.send({ embeds: [serverLeave_Embed] })
      )
      .catch(console.error);
  },
};
