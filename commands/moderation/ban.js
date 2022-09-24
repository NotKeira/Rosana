const { Client, Message, MessageEmbed, Discord, Guild, InviteGuild } = require("discord.js");
const chalk = require("chalk");
const main_json = require("../../botconfig/main.json");
var MongoClient = require("mongodb").MongoClient;
var url = main_json.MONGODBSRV;
var banem = main_json.banhammer;
var emoji = main_json.tickEmoji;
var privlog = main_json.logChannelPriv;
var enter = main_json.etID;
var pubLog = main_json.logChannelPub;
var inviteLink = main_json.invite;
module.exports = {
  name: "ban",
  aliases: [],
  cooldowns: 1000,
  description: "This Command Bans Someone.",
  usage: "<cmd>",
  toggleOff: false,
  creatorOnly: false,
  modOnly: true,
  userpermissions: ["SEND_MESSAGES", "BAN_MEMBERS", "KICK_MEMBERS"],
  botpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, Discord, guild) => {
    var target = message.mentions.members.first();
    const user = message.author.id;
    var reason = args.slice(1).join(" ");
    const pubChannel = client.channels.cache.get(pubLog);
    const privLog = client.channels.cache.get(privlog);
    const entranceChannel = client.channels.cache.get(enter);
    if (reason === " " || reason.length <= 1) {
      var reason = "NO REASON";
    }
    if (!target === " ") {
      var target = "No Target"
    }
    console.log(
      chalk.yellow(
        `BAN Target: ${target}, BAN Moderator: ${user}, BAN Reason: ${reason}, ${Date.now()}`
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
      .setTitle(`${emoji} | SUCCESS`)
      .setDescription(`${target} Has Been Beamed.`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const door_Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`:printer: | BAN`)
      .setDescription(`${target} Was Beamed`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const banned_Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(
        `${banem} | You Have Been Banned From ${Guild.name}`
      )
      .setURL(`${inviteLink}`)
      .setDescription(
        `Moderator: <@${user}>\nReason: ${reason}\nTime:${Date.now()}`
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    if (!target) return message.channel.send({ embeds: [noTarget_Embed] });
    if (!reason) return message.channel.send({ embeds: [noReason_Embed] });
    const privateAudit_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`:page_facing_up: | AUDIT LOGS`)
      .setDescription(`${target} Was Banned From The Server.`)
      .addFields(
        { name: "Moderator:", value: `<@${user}>` },
        { name: "Reason:", value: `${reason}` },
        { name: "Time:", value: `${Date.now()}` }
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

      const publicAudit_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`:page_facing_up: | AUDIT LOGS`)
      .setDescription(`${target} Was Banned From The Server.`)
      .addFields(
        { name: "Moderator:", value: `<@${user}>` },
        { name: "Reason:", value: `${reason}` },
        { name: "Time:", value: `${Date.now()}` }
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    if (target.id === "801384603704623115")
      return message.channel.send(`You're not banning my creator.`);
    if (target && reason) {
      await target.send({ embeds: [banned_Embed] }) ? console.log("I messaged the target.") : console.log("I couldn't message the target.");
      await target
        .ban({
          reason: reason,
        })
        .then(() => {
          message.channel.send({ embeds: [respond_Embed] });
          logChannelPriv.send({ embeds: [privateAudit_Embed] });
          await (
            logChannelPub.send({embeds: [publicAudit_Embed]}).react("🤣","💀","🤪")
          );
          entranceChannel.send({ embeds: [door_Embed] });
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
            dbo.collection("banLogs").insertOne(logs, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted into Ban Logs.");
            });
            var logs = {
              command: `BAN`,
              moderator: `${user}`,
              target: `${target}`,
              reason: `${reason}`,
              channel: `${message.channel.id}`,
            };
            dbo.collection("modLogs").insertOne(logs, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted into Mod Logs.");
              var logs = {
                command: `BAN`,
                moderator: `${user}`,
                target: `${target}`,
                reason: `${reason}`,
                channel: `${message.channel.id}`,
                isMod: `${moderators.includes(user.id)}`,
              };
              db.close();
            });
          });
        });
    }
  },
};
