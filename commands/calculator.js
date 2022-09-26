const { SlashCommandBuilder, ComponentType } = require("discord.js");
const Discord = require("discord.js");
let { rows, calculate } = require("../extrashit/calculator.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculator")
    .setDescription("This code is provided by Baltraz#4874"),
  async execute(interaction) {
    const message = await interaction.reply({
      content: `\`\`\`\n0\`\`\``,
      components: rows,
    });

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 3*60000,
    });

    let str = "0";
    let ans = "0";

    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id) return;
      await i.deferUpdate();
      const res = calculate(i.customId, str, ans);
      str = res.str !== "" ? res.str : "0";
      ans = res.ans !== "" ? res.ans : "0";

      await interaction.editReply({ content: `\`\`\`\n${str}\`\`\`` });
    });

    collector.on("end", async () => {
      await interaction.editReply({
        content: "Calculator expired",
        components: [],
      });
    });
  },
};
