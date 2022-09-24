const { Client, Message, MessageEmbed, Discord, Guild } = require("discord.js");
const main_json = require("../../botconfig/main.json");
const chalk = require("chalk");
var MongoClient = require("mongodb").MongoClient;
var url = main_json.MONGODBSRV;
var emoji = main_json.tickEmoji;
var privlog = main_json.logChannelPriv;
var enter = main_json.etID;
var pubLog = main_json.logChannelPub;
module.exports = {
  name: "warn",
  aliases: [],
  cooldowns: 1000,
  description: "This Command Warns a user.",
  usage: "<user> <reason>",
  toggleOff: false,
  creatorOnly: false,
  modOnly: true,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, Discord, guild) => {
    const user = message.member;
    const target = message.mentions.members.first();
    const reason = args.slice(1).join(" ");
    const user2 = user.user;
    const target2 = target.user;
    const pubChannel = client.channels.cache.get(pubLog);
    const privChannel = client.channels.cache.get(privlog);
    const entranceChannel = client.channels.cache.get(enter);
    var staffStatus;
    if (user.roles.cache.has("997821592165957683")) {
        let staffStatus = "Owner";
      } else if (user.roles.cache.has("997821592740565063")) {
        var staffStatus = "Co-Owner";
      } else if (user.roles.cache.has("997821593273258044")) {
        var staffStatus = "Administrator";
      } else if (user.roles.cache.has("997821593835278398")) {
        var staffStatus = "Moderator";
      } else {
        var staffStauts = "Not a Staff Member";
      }
    var date = new Date();
    var time = date.toLocaleString('en-UK');
    console.log(date.toLocaleString('en-UK'));
    console.log(chalk.red("THIS IS A BREAK"));
    console.log(time)
    const noReason_Embed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`:x: | ERROR`)
      .setDescription(`No reason provided.`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const warn_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`✪ | SUCCESS`)
      .setDescription(
        `Punishment for ${target} has been submitted successfully.`
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const privateAudit_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`📄 | AUDIT LOGS`)
      .setDescription(`${user} has punished ${target}.`)
      .addFields(
        { name: "Type:", value: `WARN` },
        { name: "Moderator:", value: `${user}` },
        { name: "Reason:", value: `${reason}` },
        { name: "Time:", value: `${time}` }
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const publicAudit_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`📄 | AUDIT LOGS`)
      .setDescription(`${target} just got punished by a Staff Member.`)
      .addFields(
        { name: "Staff Status:", value: `${staffStatus}` },
        { name: "Type:", value: `WARN` },
        { name: "Moderator:", value: `${user}` },
        { name: "Reason:", value: `${reason}` },
        { name: "Time:", value: `${time}` }
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    var pubsend = await pubChannel.send({
      embeds: [publicAudit_Embed],
    });
    if (target.roles.highest.position >= user.roles.highest.position)
      return message.channel.send(
        "You can not warn someone with a higher or equal role to you, So stop."
      );
    if (!reason) return message.channel.send({ embeds: [noReason_Embed] });
    if (
      target &&
      reason &&
      user.roles.highest.position > target.roles.highest.position
    ) {
      message.channel.send({ embeds: [warn_Embed] });
      privChannel.send({ embeds: [privateAudit_Embed] });
      pubsend;
      pubsend.react("🤣");
      pubsend.react("💀");
      pubsend.react("🤪");

      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("data");
        var amountoflogs = 0;
        var target2 = target.user;
        var logs = {
          moderator: `${user}`,
          target: `${target}`,
          targetuser: `${target2}`,
          reason: `${reason}`,
          channel: `${message.channel.id}`,
        };
        dbo.collection("warnLogs").insertOne(logs, function (err, res) {
          if (err) throw err;
          console.log("1 document inserted into Warn Logs.");
        });
        var logs = {
          command: `WARN`,
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
    } else {
      message.channel.send("Can't Find That User!");
    }
  },
};
