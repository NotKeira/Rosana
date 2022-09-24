const {
    Discord,
    Message,
    MessageEmbed,
    Client,
    Guild
} = require("discord.js");
module.exports = {
   name: "stream",
   aliases: ["live"],
   cooldowns: 3000,
   description: "Used When Keira Is Live.",
   usage: "<cmd>",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
    const streamChannel = guild.channels.cache.find(ch => ch.name === "community-notices");
       
    const stream_Embed = new MessageEmbed()
        .setColor('DARK_AQUA')
        .setTitle(`Keira Is Live! Come watch her. :)`)
        .setURL('https://twitch.tv/notk_ira')
        .setTimestamp()
    
    streamChannel.send({embeds: [stream_Embed]});
   },
};
