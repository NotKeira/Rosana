const chalk = require("chalk");
const { SlashCommandBuilder } = require("discord.js");
const main_json = require("../botconfig/main.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription("Make the bot dm someone")
    .addUserOption((option) =>
      option.setName("user").setDescription("the person you're dming")
    )
    .addStringOption((option) =>
      option.setName("text").setDescription("The text you're sending")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
      const text = interaction.options.getString("text");
      const auditLogs = interaction.guild.channels.cache.get(main_json.privLog);

      user.send(text);
      auditLogs.send(`\`${interaction.user.tag}\` sent this to \`${user.tag}\``);
      auditLogs.send(`text: ${text}`);
    interaction.reply(`Uhm.. Okay lol.`);
      
  },
};
