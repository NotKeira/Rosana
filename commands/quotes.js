const chalk = require("chalk");
const {
  SlashCommandBuilder,
  ComponentType,
  ActionRowBuilder,
  SelectMenuBuilder,
} = require("discord.js");
const main_json = require("../botconfig/main.json");
const { encouragingQuotes } = require("../botconfig/massTexts.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Receive a Random Quote based on your request."),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("Quotes")
        .setPlaceholder("No Quote Selected")
        .addOptions(
          {
            label: "Reset Text",
            description: "Reset the replied text.",
            value: "empty",
          },
          {
            label: "Encouraging",
            description: "Display an Encouraging quote.",
            value: "encourager",
          }
        )
    );
    await interaction.reply({
      content: `**Choose the quote to view below**`,
      components: [row],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.SelectMenu,
      time: 15 * 60000,
    });

    collector.on("collect", async (i) => {
      if (i.values[0] === "encourager") {
        i.update({
          content: `\`\`\`${
            encouragingQuotes[
              Math.floor(Math.random() * encouragingQuotes.length)
            ]
                }\`\`\``,
            components: [row],
          ephemeral: false,
        });
      } else if (i.values[0] === "empty") {
        i.update({
            content: "**Choose quote from below**",
            ephemeral: false,
            components: [row]
        });
      }
    });

    collector.on("end", (collected) => {
      i.reply({
        content: `Data expired.`,
        components: [],
      });
      console.log(`Collected ${collected.size} interactions.`);
    });
  },
};
