const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "shy",
  aliases: [""],
  cooldowns: 1000,
  description: "Compliment the Puppy Shy <3",
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
        `Bro. Shy is a cute little puppy. (Go call her Keira's little puppy she'll love you <3), swear down. (P.S she's in love with <@801384603704623115>)\nANYWAYS. TELL HER I SAY HI <3`
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
    ).react("<:puppy:993164126069194822>");
      message.channel.send(`<@680742403862167604> You seeing this? Someone likes you.`) && message.channel.send(`<:puppy:993164126069194822>`);
    }
}