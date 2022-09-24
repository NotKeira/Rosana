const { Discord, MessageEmbed, Client } = require("discord.js");
const chalk = require("chalk");
const main_json = require("../../botconfig/main.json");
var MongoClient = require("mongodb").MongoClient;
var url = main_json.MONGODBSRV;
var emoji = main_json.tickEmoji;

module.exports = {
  name: "modlogs",
  aliases: [],
  cooldowns: 10000,
  description: "This Command Checks Modlogs For A User.",
  usage: "<user> <reason>",
  toggleOff: true,
  developersOnly: false,
  modOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args, Discord, guild) => {
    const user = message.author.id;
    const target = message.mentions.members.first();
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("data");
        var model = dbo.collection("modLogs");
        console.log(results);
    });
    console.log(target)
    const noUser_Embed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`:x: | ERROR`)
      .setDescription(`No User provided.`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const logsGrab_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`${target}'s Moderation History`)
      .setDescription(`${results.size()}`)
      .addField(`${results.map((v) => `Result- ${v}`).join(",")}`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    if (target) {
      message.channel.send({ embeds: [logsGrab_Embed] });
    } else {
      message.channel.send({embeds: [noUser_Embed]});
    }
  },
};
