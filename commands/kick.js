const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");
const main_json = require("../botconfig/main.json");
const MongoClient = require("mongodb").MongoClient;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Who are you kicking")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Why are you kicking them?")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("dm")
        .setDescription("Should I DM the user?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.member;
    const target = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");
    const server = interaction.guild.name;

    const kicked_Embed = new EmbedBuilder()
      .setColor(Colors.Greyple)
      .setTitle(`Rosana Punishment Systen`)
      .setDescription(
        `You have been kicked from ${server} for:***${reason}***. `
      )
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });
    if (user) {
      target.send({ embeds: [kicked_Embed] });
      await target
        .kick({
          reason: reason,
        })
        .then(() => {
          interaction.reply({
            text: `**${target}** got kicked from the server`,
          });
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
