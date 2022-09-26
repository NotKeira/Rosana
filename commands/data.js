const {
  ActionRowBuilder,
  SelectMenuBuilder,
  SlashCommandBuilder,
  version: discordjsVersion,
} = require("discord.js");
const chalk = require("chalk");

// BOT INFORMATION

module.exports = {
  data: new SlashCommandBuilder()
    .setName("data")
    .setDescription("Replies with a selection of Data."),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("Data")
        .setPlaceholder("Nothing Selected")
        .addOptions(
          {
            label: "User Data",
            description: "Display your Data.",
            value: "first_option",
          },
          {
            label: "Bot Data",
            description: "Display the Bot's data.",
            value: "second_option",
          },
          {
            label: "Server Data",
            description: "Display the Server's data. ",
            value: "third_option",
          }
        ),
    );
    await interaction.reply({
      content: `**Choose the data to view below**`,
      components: [row],
    });

    const { ComponentType } = require("discord.js");

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.SelectMenu,
      time: 15 * 60000,
    });

    collector.on("collect", async (i) => {
      const owner = (await i.guild.fetchOwner()).user.tag;
      let staff = "Not Staff";
      let staffType = "Not Staff";
      if (
        i.member.roles.cache.hasAny(
          "997822261249716245",
          "1020800581054509096",
          "997821593273258044",
          "1020800578001051779",
          "997821593835278398",
          "1020800334853058732"
        )
      ) {
        staff = "Staff Member";
      }

      if (i.values[0] === "first_option") {
        i.reply({
          content: `
            Your tag: ${i.user.tag}\nYour id: ${i.user.id}\nYour Highest Role is: ${i.member.roles.highest}\n Your Staff Status is: **${staff}**\n Your Staff Rank is: **${staffType}**`,
          ephemeral: true,
        });
      } else if (i.values[0] === "second_option") {
        i.reply({
          content: `**Weird Al Data** \nDiscord.JS Version: **${discordjsVersion}**\nNode Version: **${
            process.version
          }\n**Platform: **${process.platform}**\nArch: **${
            process.arch
          }**\nMemory Reserved: **${(
            process.memoryUsage().rss /
            1024 /
            1024
          ).toFixed(2)}** MB RSS\nMemory Usage: **${(
            process.memoryUsage().heapUsed /
            1024 /
            1024
          ).toFixed(2)}** MB\nPing - ${i.client.ws.ping}ms`,
          ephemeral: true,
        });
      } else if (i.values[0] === "third_option") {
        i.reply({
          content: `
          **Server Information**

          Server name: ${i.guild.name}

          Server ID: ${i.guild.id}

          Server Owner: ${owner}

          Total members: ${i.guild.memberCount}

          Maximum Members: ${i.guild.maximumMembers}

          Server Created At: ${i.guild.createdAt}
          `,
          ephemeral: true,
        });
      }
    });

    collector.on("end", (collected) => {
      i.editReply({
        content: `Data expired.`,
        components: [],
      });
      console.log(`Collected ${collected.size} interactions.`);
    });
  },
};
