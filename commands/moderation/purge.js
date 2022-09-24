const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const main_json = require("../../botconfig/main.json");
var MongoClient = require("mongodb").MongoClient;
var url = main_json.MONGODBSRV;
var emoji = main_json.tickEmoji;
//Import Packages

module.exports = {
  name: "purge",
  aliases: ["clear"],
  cooldowns: 1000,
  description: "This Command Purges messages.",
  usage: "<amount>",
  toggleOff: false,
  developersOnly: false,
  modOnly: true,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    var amount = parseInt(args[0]);
    var user = message.author.id;

    const noAmount_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`:x: | ERROR`)
      .setDescription(`Insufficent Amount.`)
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ Tech" });

    const tooMany_Emned = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`:x: | ERROR`)
      .setDescription(`Insufficient Amount. \n(Too Many)`)
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ Tech" });

    const age_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`:x: | ERROR`)
      .setDescription(`Messages Are Above Age. \n(14+ Days)`)
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ Tech" });

    const successPurge_Embed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`${emoji} | SUCCESS`)
      .setDescription(`Purged ${amount} Messages.`)
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ Tech" });

    if (!amount) return message.channel.send({ embeds: [noAmount_Embed] });
    if (amount > 99 || amount < 1)
      return message.channel.send({ embeds: [tooMany_Emned] });

    message.channel.bulkDelete(amount + 1).catch((err) => {
      message.channel.send({ embeds: [age_Embed] });
    });

    let msg = await message.channel.send({ embeds: [successPurge_Embed] });
    setTimeout(() => {
      msg.delete();
    }, 10000);
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("data");
      var logs = {
        Moderator: `${user}`,
        purged: `${amount}`,
        channel: `${message.channel.id}`,
      };
      dbo.collection("purgeLogs").insertOne(logs, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted.");
        db.close();
      });
    });
  },
};
