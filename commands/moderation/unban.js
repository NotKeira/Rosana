const { Client, Message, MessageEmbed, Discord, Guild } = require("discord.js");
const chalk = require("chalk");
const main_json = require("../../botconfig/main.json");
var MongoClient = require("mongodb").MongoClient;
var url = main_json.MONGODBSRV;
module.exports = {
  name: "unban",
  aliases: [],
  cooldowns: 1000,
  description: "This Command Unbans A User.",
  usage: "<user> <reason>",
  toggleOff: false,
  developersOnly: false,
  modOnly: true,
  userpermissions: ["SEND_MESSAGES", "BAN_MEMBERS", "KICK_MEMBERS"],
  botpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, Discord, guild) => {
    const target = message.mentions.members.first();
    const user = message.author.id;
    const reason = args.slice(1).join(" ");
    const logChannel = client.channels.cache.get("975159215981223946");
    const entranceChannel = client.channels.cache.get("975007195672502295");

    var today = new Date();
    console.log(today)
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    console.log(
      chalk.yellow(
        `UNBAN Target: ${target}, UNBAN Moderator: ${user}, UNBAN Reason: ${reason}, Date: ${today}`
      )
    );

    const noTarget_Embed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`:x: | ERROR`)
      .setDescription(`Insufficient Arguments\n (No Target Provided)`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });
    const noReason_Embed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`:x: | ERROR`)
      .setDescription(`Insufficient Arguments\n (No Reason Provided)`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const respond_Embed = new MessageEmbed()
      .setColor("DARK_GREEN")
      .setTitle(`<:green_check_mark_1:975361406704705546> | SUCCESS`)
      .setDescription(`${target} Has Been Unbanned.`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const door_Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`:printer: | BAN`)
      .setDescription(`${target} Was Unbanned`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const banned_Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(
        `<:ban_hammer:976573343081844756> | You Have Been Unbanned From ${Guild.name}`
      )
      .setURL(`https://discord.gg/NtSs9HN4uU`)
      .setDescription(
        `Moderator: <@${user}>\nReason: ${reason}\nTime:${Date.now()}`
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    if (!target) return message.channel.send({ embeds: [noTarget_Embed] });
    if (!reason) return message.channel.send({ embeds: [noReason_Embed] });
    const audit_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`:page_facing_up: | AUDIT LOGS`)
      .setDescription(`${target} Was Unbanned From The Server.`)
      .addFields(
        { name: "Moderator:", value: `<@${user}>` },
        { name: "Reason:", value: `${reason}` },
        { name: "Time:", value: `${date}` }
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    if (target && reason) {
      target.send({ embeds: [banned_Embed] });
      await target
        .unban({
          reason: reason,
        })
        .then(() => {
          message.channel.send({ embeds: [respond_Embed] });
          logChannel.send({ embeds: [audit_Embed] });
          entranceChannel.send({ embeds: [door_Embed] });
          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("data");
            var amountoflogs = 0;
            var logs = {
              type: "Removal",
              moderator: `${user}`,
              target: `${target}`,
              reason: `${reason}`,
              channel: `${message.channel.id}`,
            };
            dbo.collection("banLogs").insertOne(logs, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted into Ban Logs.");
            });
            var logs = {
              command: `UNBAN`,
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
    }
  },
};
