const chalk = require("chalk");

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );
    interaction.guild.channels.cache.get("997827484290662442").send(`\`${interaction.user.tag}\` sent \`${interaction}\` in #${interaction.channel.name}`);

  },
};
