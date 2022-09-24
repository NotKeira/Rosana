const { Client, Message, MessageEmbed, Discord, Guild } = require("discord.js");
const main_json = require("../../botconfig/main.json");
var MongoClient = require("mongodb").MongoClient;
var url = main_json.MONGODBSRV;
const emoji = main_json.tickEmoji;
const banemoji = main_json.banhammer;

module.exports = {
  name: "kick",
  aliases: [],
  cooldowns: 1000,
  description: "This Command Kicks a user.",
  usage: "<user> <reason>",
  toggleOff: false,
  developersOnly: false,
  managerOnly: false,
  modOnly: true,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, Discord) => {
    const user = message.author.id;
    const target = message.mentions.members.first();
    const reason = args.slice(1).join(" ");
    const server = Guild.name;

    const WaitKick_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`:x: | ERROR`)
      .setDescription(`Insufficient Args. `)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const successKick_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`${emoji} | SUCCESS`)
      .setDescription(`Kicked ${target} From The Server.`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const kicked_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`Kicked!`)
      .setDescription(
        `You have been kicked from ${server} for:***${reason}***. `
      )
      .setTimestamp()
      .setFooter({ texT: "Hosted With KiraHQ Tech" });
    if (!reason) return message.channel.send({ embeds: [WaitKick_Embed] });
    if (user) {
      target.send({ embeds: [kicked_Embed] });
      await target
        .kick({
          reason: reason,
        })
        .then(() => {
          message.channel.send({ embeds: [successKick_Embed] });
          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("data");
            var amountoflogs = 0;
            var logs = {
              type: "Addition",
              moderator: `${user}`,
              target: `${target}`,
              reason: `${reason}`,
              channel: `${message.channel.id}`,
            };
            dbo.collection("kickLogs").insertOne(logs, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted into Kick Logs.");
            });
            var logs = {
              command: `KICK`,
              moderator: `${user}`,
              target: `${target}`,
              reason: `${reason}`,
              channel: `${message.channel.id}`,
            };
            dbo.collection("modLogs").insertOne(logs, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted into Mod Logs.");
              db.close();
            });
          });
        });
    } else {
      message.channel.send("cant find the user!");
    }
  },
};
