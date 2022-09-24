const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "holly",
  aliases: [""],
  cooldowns: 1000,
  description: "Compliment the queen Holly <3",
  usage: "<cmd>",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    const holly_Embed = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK")
        .setTitle(`Woah.`)
        .setDescription(
        `Bro. Holly is a goddess, swear down. (P.S she's in love with <@801384603704623115>)\nANYWAYS. TELL HER I SAY HI <3`
        )
        .setTimestamp()
        .setFooter({ text: "Hosted with KiraHQ" }); 
        
     (
           await message.channel.send( {
            embeds: [
                holly_Embed,
            ],
          }
        )
    ).react("💋");
      message.channel.send(`<@801496387681386517> You seeing this? Someone likes you.`);
    }
}