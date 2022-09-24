const {
  version: discordjsVersion,
  Client,
  MessageEmbed,
  Message,
} = require("discord.js");
const prefix = require("../../botconfig/main.json");
module.exports = {
  name: "status",
  aliases: ["", "", ""],
  cooldowns: 100000,
  description: "",
  usage: "",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    client.user.setActivity(
      `${prefix}help || ${client.guilds.cache.size} ${
        client.guilds.cache.size > 1 ? "Servers" : "Server"
      }`,
      { type: "WATCHING" }
    );
    message.channel.send(
      `Fixed the status for ya darling ${message.author}^-^`
    );
  },
};
