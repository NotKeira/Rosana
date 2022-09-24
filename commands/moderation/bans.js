const { Client, Message, MessageEmbed, Discord, Guild } = require("discord.js");
const chalk = require("chalk");
const main_json = require("../../botconfig/main.json");
var MongoClient = require("mongodb").MongoClient;
var url = main_json.MONGODBSRV;
module.exports = {
  name: "banlist",
  aliases: [],
  cooldowns: 1000,
  description: "This Command Checks The Ban List.",
  usage: "<user> <reason>",
  toggleOff: false,
  creatorOnly: true,
  developersOnly: false,
  managerOnly: false,
  modOnly: false,
  userpermissions: ["SEND_MESSAGES", "BAN_MEMBERS", "KICK_MEMBERS"],
  botpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, Discord, guild) => {
    const user = message.author.id;
    const logChannel = client.channels.cache.get("976193726177214466");
    const emoji = main_json.tickEmoji;
    const banemoji = main_json.banhammer;
    const bans = await client.guilds.cache
      .get(main_json.ServerID)
      .bans.fetch();

    const respond_Embed = new MessageEmbed()
      .setColor("DARK_GREEN")
      .setTitle(`${emoji} | SUCCESS`)
      .setDescription(`${bans.map((ban) => ban.user.tag)}`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const audit_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`:page_facing_up: | AUDIT LOGS`)
      .setDescription(`<@${user}> Just Ran The Command 'bans'.`)
      .addFields({ name: "Moderator:", value: `<@${user}>` })
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    message.channel.send({ embeds: [respond_Embed] });
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("data");
      var amountoflogs = 0;
      var logs = {
        command: `BANS`,
        moderator: `${user}`,
        channel: `${message.channel.id}`,
      };
      dbo.collection("modLogs").insertOne(logs, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted into Mod Logs.");
        db.close();
      });
    });
  },
};
