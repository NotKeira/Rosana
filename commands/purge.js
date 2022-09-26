const { EmbedBuilder, SlashCommandBuilder, Colors } = require("discord.js");
const { mcsrv } = require("../botconfig/main.json");
const MongoClient = require("mongodb").MongoClient;
//Import Packages

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purge some messages")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Choose a number between 1 and ")
        .setRequired(true)
    ),

  async execute(interaction) {
    var amount = interaction.options.getInteger("amount");
    var user = interaction.user.id;

    if (amount > 99 || amount < 1)
      return interaction.reply({
        text: `There were too many, please bump it down to 99 or less messages at a time. :)`,
      });

    interaction.channel.bulkDelete(amount).catch((err) => {
      interaction.reply({
        text: `The messages were too old, I deleted as many as I could!`,
      });
    });

    let msg = await interaction.reply({
      text: `Successfully purged ${amount} messages.`,
      fetchReply: true,
    });
    setTimeout(() => {
      msg.delete();
    }, 3000);
    MongoClient.connect(mcsrv, function (err, db) {
      if (err) throw err;
      var dbo = db.db("data");
      var logs = {
        Moderator: `${user}`,
        purged: `${amount}`,
        channel: `${interaction.channel.id}`,
      };
      dbo.collection("purgeLogs").insertOne(logs, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted.");
        db.close();
      });
    });
  },
};
