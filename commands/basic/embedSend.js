const Discord = require("discord.js");
const { MessageEmbed, Guild } = require("discord.js");
//Import Packages

module.exports = {
  name: "send",
  aliases: [],
  cooldowns: 1000,
  description: "UNAVAILABLE FOR THE PUBLIC USE.",
  usage: "<user>",
  toggleOff: false,
  developersOnly: true,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    const sName = Guild.name;
    const rulesSecOneEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`Alliances & Divisions`)
      .setDescription(`Requirements for a Division/Alliance`)
      .setThumbnail("https://ichef.bbci.co.uk/images/ic/448xn/p085mwhc.png")
      .setTimestamp()
      .setFooter({ text: "Hosted with KiraHQ Tech" });

    message.channel.send({ embeds: [rulesSecOneEmbed] });
    message.channel.send("@everyone");
  },
};
