const { Discord, MessageEmbed, Client } = require("discord.js");
const main_json = require("../../botconfig/main.json");
var MongoClient = require("mongodb").MongoClient;
var url = main_json.MONGODBSRV;

module.exports = {
  name: "warnings",
  aliases: [],
  cooldowns: 10000,
  description: "This Command Checks A Users Warnings.",
  usage: "<user> <reason>",
  toggleOff: false,
  developersOnly: false,
  managerOnly: false,
  modOnly: true,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args, Discord, guild) => {
    const target = message.mentions.members.first();
    const reason = args.slice(1).join(" ");
    async function warnReceive() {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("data");
        var Amount_Of_Logs = 0;
        var query = { target: `<@${target}>` };

        dbo
          .collection("warnLogs")
          .find(query)
          .toArray(async function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
          });
      });
    }
    const noUser_Embed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`:x: | ERROR`)
      .setDescription(`No User provided.`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const logsGrab_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`<:green_check_mark_1:977940993527644241> | SUCCESS`)
      .setDescription(`Requested ${target}'s Logs`)
      .addField(warnReceive())
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    if (!target) return message.channel.send({ embeds: [noUser_Embed] });
    if (target) {
      message.channel.send({ embeds: [logsGrab_Embed] });
    } else {
      message.channel.send("Can't Find That Users Warnings!");
    }
  },
};
