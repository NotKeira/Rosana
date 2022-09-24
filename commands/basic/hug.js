const Discord = require("discord.js");
const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = {
  name: "hug",
  aliases: [""],
  cooldowns: 1000,
  description: "Hug a User",
  usage: "<cmd>",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    const user = message.author.id;
    const target = message.mentions.members.first();
    const hug1 = new MessageAttachment("../../")
    var hugs = ["https://tenor.com/view/hug-hugs-hugs-and-love-hug-romantic-pic-gif-23912005.gif","https://tenor.com/view/hug-love-hi-bye-cat-gif-15999080.gif","https://tenor.com/view/anime-hug-sweet-love-gif-14246498.gif","https://tenor.com/view/love-gif-24590409.gif","https://tenor.com/view/couple-cute-cuddle-wrapped-up-gif-24430631.gif"]
    const hug_Embed = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK")
        .setTitle(`${user} Hugged ${target}! How kind are they :)`)
        .setImage(`${
          hugs[
            Math.floor(Math.random() * hugs.length)
          ]
        }`)
        .setTimestamp()
        .setFooter({ text: "Hosted with KiraHQ" }); 
        
     (
           await message.channel.send( {
            embeds: [
                hug_Embed,
            ],
          }
        )
    ).react("<a:bear_hug1:993191813101920276>");
    }
}