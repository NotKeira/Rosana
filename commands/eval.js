const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const util = require("util");
const ins = util.inspect();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evalute given code!")
    .addStringOption((option) => option.setName("code").setDescription("Code ur evaluating")),
  async execute(interaction) {
    try {
      const code = interaction.options.getString("code");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = ins(evaled);

      let embed = new EmbedBuilder()
        .setAuthor("Eval", interaction.user.avatarURL())
        .addField("Input", `\`\`\`${code}\`\`\``)
        .addField("Output", `\`\`\`${evaled}\`\`\``)
        .setColor("BLUE");

      interaction.reply({ embeds: [embed] });
    } catch (err) {
      interaction.reply(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
    }
  },
};
