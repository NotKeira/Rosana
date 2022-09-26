const { Colors,EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");
const {banhammer, auditLogs, shameLogs} = require("../botconfig/main.json");
var MongoClient = require("mongodb").MongoClient;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from Rosana.")
    .addUserOption((option) => 
      option
        .setName("user")
        .setDescription("Who is the user you are banning?"))
    .addStringOption((option) => 
      option
        .setName("reason")
        .setDescription("Why are you banning this user")),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");
    const moderator = interaction.user;

    console.log(
      chalk.yellow(
        `Ban Target: ${user}\nBan Moderator: ${user}\nBAN Reason: ${reason}\n ${Date.now()}`
      )
    );

    const respond_Embed = new EmbedBuilder()
      .setColor(Colors.DarkGreen)
      .setTitle(`${user} was banned`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const door_Embed = new EmbedBuilder()
      .setColor(Colors.Gold)
      .setTitle(`${user} was banned from the server, what an idipot amirite.`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const banned_Embed = new EmbedBuilder()
      .setColor(Colors.Blurple)
      .setTitle(
        `${banhammer} | You Have Been Banned From ${interaction.guild.name}`
      )
      .setURL(`https://discord.gg/QpbyRT3yQ4`)
      .setDescription(
        `Moderator: <@${moderator}>\nReason: ${reason}\nTime:${Date.now()}`
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    
    const privateAudit_Embed = new EmbedBuilder()
      .setColor(Colors.NotQuiteBlack)
      .setTitle(`:page_facing_up: | AUDIT LOGS`)
      .setDescription(`${user} Was Banned From The Server.`)
      .addFields(
        { name: "Moderator:", value: `<@${user}>` },
        { name: "Reason:", value: `${reason}` },
        { name: "Time:", value: `${Date.now()}` }
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

      const publicAudit_Embed = new EmbedBuilder()
      .setColor(Colors.Greyple)
      .setTitle(`:page_facing_up: | AUDIT LOGS`)
      .setDescription(`${user} Was Banned From The Server.`)
      .addFields(
        { name: "Moderator:", value: `<@${user}>` },
        { name: "Reason:", value: `${reason}` },
        { name: "Time:", value: `${Date.now()}` }
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    if (user.id === "801384603704623115")
      return interaction.reply(`You're not banning my creator.`);
    if (user && reason) {
      await user.send({ embeds: [banned_Embed] }) ? console.log("I messaged the user.") : console.log("I couldn't message the user.");
      await member
        .ban({
          reason: reason,
        })
        .then(() => {
          interaction.reply({ embeds: [respond_Embed] });
          auditLogs.send({ embeds: [privateAudit_Embed] });
          await (
            shameLogs.send({embeds: [publicAudit_Embed]})
          );
          entranceChannel.send({ embeds: [door_Embed] });
          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("data");
            var amountoflogs = 0;
            var logs = {
              type: "Addition",
              moderator: `${user}`,
              user: `${user}`,
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
              user: `${user}`,
              reason: `${reason}`,
              channel: `${message.channel.id}`,
            };
            dbo.collection("modLogs").insertOne(logs, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted into Mod Logs.");
              var logs = {
                command: `BAN`,
                moderator: `${user}`,
                user: `${user}`,
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
