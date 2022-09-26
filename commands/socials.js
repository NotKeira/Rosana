const chalk = require("chalk");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("socials")
    .setDescription("Replies with all Social Links I'm aware of"),
  async execute(interaction) {
  
      await interaction.reply(
        `
      **Social Links**

      Discord Server Link: <https://discord.gg/QpbyRT3yQ4>

      Keira's YouTube: <https://www.youtube.com/channel/UCjLYx4gHN5ybLOrqRAXwnKA>

      Keira's Twitch: <https://www.twitch.tv/NotK_ira>
      
      Keira's Twitter: <https://www.twitter.com/KeiraHo51760263>
      
      Keira's Instagram: <https://www.instagram.com/keirah.xoxoxo/>
      
      
      `
      );
  },
};
