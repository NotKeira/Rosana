const Discord = require("discord.js");
const { MessageEmbed, Guild } = require("discord.js");
//Import Packages

module.exports = {
  name: "doctrine",
  aliases: [],
  cooldowns: 1000,
  description: "This Command Sends The Moderation Doctrine.",
  usage: "<user>",
  toggleOff: false,
  creatorOnly: false,
  developersOnly: false,
  modOnly: true,

  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args, guild) => {
    const author = message.author;
    const sName = Guild.name;
    const lowSeverity_Embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Low Severity`)
      .setDescription(``)
      .setThumbnail("https://i.ytimg.com/vi/_VQq1Ufj4Ik/maxresdefault.jpg")
      .addFields(
        {
          name: "Out Of Bounds",
          value:
            "**Type:** GAME\n**Description:** Abusing glitches in the map in order to reach areas not accesible.\n**Punishment:** 1: Warning, 2: Kick",
          inline: true,
        },
        {
          name: "Interupting staff on duty",
          value:
            "**Type:** GAME\n**Description:** Messing with/trolling on-duty staff members.\n**Punishment:** **1: Warning, 2: Kick",
          inline: true,
        },
        {
          name: "Intimidation/Harassment",
          value:
            "**Type:** DISCORD\n**Description:** Intimidating or otherwise acting out against other members of the community.\n**Punishment:** 1: Warning, 2: Mute",
          inline: false,
        },
        {
          name: "Misuse Of Channels",
          value:
            "**Type:** DISCORD\n**Description:** Using channels for purposes other than their description\n**Punishment:** 1: Warning, 2: Mute",
            inline: true,
        },
      );

    (
      await message.channel.send(
        "https://www.thebluediamondgallery.com/handwriting/images/doctrine.jpg" && {
          embeds: [
            lowSeverity_Embed,
          ],
        }
      )
    ).react("<:green_check_mark_1:977940993527644241>");
    message.channel.send(`${author}`);
  },
};
