const Discord = require("discord.js");
const { MessageEmbed, Guild } = require("discord.js");
//Import Packages
module.exports = {
  name: "activity-check",
  //Name Of The Command
  aliases: ["acheck"],
  //Aliases For Command.
  cooldowns: 1000, //1 second
  //Cooldown For The Command [Milliseconds]
  description: "This Command Sends An Activity Check Embed.",
  //Description Of The Command [The Purpose Etc...]
  usage: "<user>",
  //Usage For Command. [like ?nameOfTheCommand <user> <reason>]
  toggleOff: false,
  //Disable The Command If Emergency. [true = off | false = on]
  developersOnly: true,
  //If Command Is Only For Bot Owners. [true = yes | false = no]
  /*
    To Make Yourself Developer, Go Ahead to 
    botconfig/main.json, set the ids in it. 
*/
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  //Permissions Required For The Author To Use The CMD.
  botpermissions: ["ADMINISTRATOR"],
  //Permissions Required For The Bot To Run The CMD.

  run: async (client, message, args) => {
    const sName = Guild.name;
    const role = await message.guild.roles.fetch("967390873082003547");
    const filter = (reaction, user) => {
      return reaction.emoji.name === "👍" && user.id === message.author.id;
    };

    const collector = message.createReactionCollector({ filter, time: 15000 });
    const activitycheckEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Activity Check`)
      .setDescription(
        `React to verify your activity. You will be rewarded 500 cash.`
      )
      .setTimestamp()
      .setFooter({ text: "Hosted by KiraHQ" });

    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

      message.guild.members.fetch(user.id).then((member) => {
        member.roles.add(role);
      });
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
    });

    message.channel.send({ embeds: [activitycheckEmbed] }) &&
      message.react("👍");
  },
};
