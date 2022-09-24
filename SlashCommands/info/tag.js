const {
  Discord,
  MessageEmbed,
  Message,
  Client,
  CommandInteraction,
} = require("discord.js");
const main_json = require("../../../HLR_Bot/botconfig/main.json");
module.exports = {
  name: "tag",
  cooldowns: 1000,
  description: "Tags A User On A Subject",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    const user = interaction.author.id;
    const target = interaction.mentions.members.first();
    const collector = interaction.channel.createMessageCollector({
      time: 300000,
    });
    const tagsystem = new SlashCommandBuilder()
      .setName(`Tag System`)
      .setDescription(`Tags for Bozos!`)
      .addSubcommand((subcommand) => subcommand.setName("Restores"));
  },
};

/*module.exports = {
  name: "tag",
  aliases: [],
  cooldowns: 1000,
  description: "UNAVAILABLE FOR THE PUBLIC USE.",
  usage: "<user>",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {
    const sName = Guild.name;
    const selection = args.slice(1).join(" ");
    const target = message.mentions.members.first();

    const noArgs_Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`No Tag.`)
      .setDescription(`Provide a Tag Name`)
      .setTimestamp()
      .setFooter({ text: "Hosted With KiraHQ Tech" });

    const restore_Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`What Is..? ${selection}`)
      .setDescription(
        `Looking to transfer/restore your game data? Head forward to <#947990445949091924> and please wait for a restore event to be hosted for your needs.`
      )
      .addFields({
        name: "Extra Information",
        value: `IdNumber is equivalent to the channel id. It is done in a format to allow bots to mention a channel.`,
      })
      .setTimestamp()
      .setFooter({ text: "Credited to Muth_zen" });

    const suggest_Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`What Is..? ${selection}`)
      .setDescription(
        `Looking to contribute towards the future of the game? Check out existing suggestions at <#962938580257366077> and discuss them at <#962938717054570506>!\n Head forward to <#947597204061847572> and use the '/suggest' command in order to give your insight and ideas!`
      )
      .setTimestamp()
      .setFooter({ text: "Credited to Muth_zen" });

    const report_Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`What Is..? ${selection}`)
      .setDescription(
        `Found something unusual? You can report them in their respective channels! Exploits go here -> <#947586054054096976> Bugs go here -> <#947586066184011797> Abusers go here -> <#947586090292891688>`
      )
      .setTimestamp()
      .setFooter({ text: "Credited to Muth_zen" });

    const faction_Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`What Is..? ${selection}`)
      .setDescription(
        `Want to be a part of an exclusive community? Try your luck over at <#948234915558854726>. Joining a Faction and entering their group ID in-game will reward you with a bonus EXP multiplier!`
      )
      .addFields({
        name: "Extra Information",
        value: `(Do not be too hasty to join the first one you see)`,
      })
      .setTimestamp()
      .setFooter({ text: "Credited to Muth_zen" });

    const rules_Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`What Is..? ${selection}`)
      .setDescription(
        `Have you read the rules? YOU SHOULD! Read it here -> <#947584918991536178>.`
      )
      .setTimestamp()
      .setFooter({ text: "Credited to Muth_zen" });

    const update_Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`What Is..? ${selection}`)
      .setDescription(
        `Stay up to date with your favorite half life game on roblox here -> <#949029383694323773> and <#964642191026823250>!`
      )
      .setTimestamp()
      .setFooter({ text: "Credited to Muth_zen" });

    const events_Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`What Is..? ${selection}`)
      .setDescription(
        `Want to engage with our community? Random events occur over at <#947990445949091924>. Don't miss out!`
      )
      .setTimestamp()
      .setFooter({ text: "Credited to Muth_zen" });

    const custom_Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`What Is..? ${selection}`)
      .setDescription(
        `Want to know how to aquire a Custom Morph for yourself? Then <#967101231455674438> is for you! It costs a price of Robux, but its definitely worth the extra vanity!`
      )
      .setTimestamp()
      .setFooter({ text: "Credited to Muth_zen" });

    const boost_Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`What Is..? ${selection}`)
      .setDescription(
        `Want to show your support to the discod server? Want to gain some benefits or special permissions? <#947916892759277659> is for you! Check it out!`
      )
      .setTimestamp()
      .setFooter({ text: "Credited to Muth_zen" });

    if (!selection) return message.channel.send({ embeds: [noArgs_Embed] });
    if (selection === "restore" || selection === "restores")
      await message.channel.send({ embeds: [restore_Embed] });
  },
};
*/
