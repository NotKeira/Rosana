const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "about-user",
  aliases: ["whois"],
  cooldowns: 1000,
  description: "This Command Tells About You",
  usage: "<user>",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    const kirasembed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`Keira's Description`)
      .setDescription(
        "Kira is a really cool person, She is The Administrator.\nShe is incredibly good at her job."
      )
      .setTimestamp();

    const foxembed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`CC-1010 "Fox"'s Description`)
      .setDescription(
        'CC-1010, nicknamed "Fox", was a clone trooper officer.\nWho went on to serve as the Clone Commander of the Coruscant Guard during the Clone Wars.\nWhile the Grand Army of the Republic deployed across the galaxy under the command of Jedi Generals,\nCommander Fox and his clone shock troopers were stationed on Coruscant, the capital planet of the Galactic Republic. '
      )
      .setTimestamp();

    const wolfembed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`CC-3636 "Wolf"'s Description`)
      .setDescription(
        'CC-3636 otherwise known as "Wolffe",\nWas a clone commander during the Clone Wars who served as the 104th Commander unofficially known as "Wolfpack".'
      )
      .setTimestamp();

    const NILembed = new MessageEmbed()
      .setColor("#FC94AF")
      .setTitle(`CC-1010 "Fox"'s Description`)
      .setDescription(
        'CC-1010, nicknamed "Fox", was a clone trooper officer.\nWho went on to serve as the Clone Commander of the Coruscant Guard during the Clone Wars.\nWhile the Grand Army of the Republic deployed across the galaxy under the command of Jedi Generals,\nCommander Fox and his clone shock troopers were stationed on Coruscant, the capital planet of the Galactic Republic. '
      )
      .setTimestamp();

    if (!member) return message.reply("Provide Some User To Tell About...");
    else if (member == "801384603704623115")
      return message.channel.send({ embeds: [kirasembed] });
    else if (member == "407938499120070677")
      return message.channel.send({ embeds: [foxembed] });
    else if (member == "670834803989544992")
      return message.channel.send({ embeds: [wolfembed] });
    else if (member == "NIL")
      return message.reply(`${member}'s bio: \`NIL \` `);
    else if (member == "NIL")
      return message.reply(`${member}'s bio: \`NIL \` `);
    message.reply(`I haven't been given a bio for ${member} D:`);
  },
};
