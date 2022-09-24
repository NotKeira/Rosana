const {
  Discord,
  MessageEmbed,
  Message,
  Client,
  CommandInteraction,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  name: "apply",
  cooldowns: 600000,
  description: "Sends Applications For Positions",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    const user = message.author.id;
    const collector = interaction.channel.createMessageCollector({
      time: 300000,
    });
    const application1 = new SlashCommandBuilder()
      .setName(`${Guild.name}'s Applications.`)
      .setDescription(`Applications!`)
      .addStringOption((option) =>
        option
          .setName("Application List")
          .setRequired(true)
          .addChoice("HR Application")
      );
  },
};
