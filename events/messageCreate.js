// const chalk = require("chalk");
// const blacklist = require("../botconfig/blacklist.json");
// const match = blacklist.matching;
// module.exports = {
//   name: "messageCreate",
//   execute(message) {
//     client.on("messageCreate", async (message) => {
//       if (message.author.bot || !message.guild) return;
//       if (!message.member)
//         message.member = await message.guild.fetchMember(message);
//       const content = message.content.trim().split(" ");
//       if (message.content(match)) {
//         message.channel.send("Uhm.. Please don't say that");
//         if (message.deletable == true) {
//           message.delete;
//         }
//       }
//     });
//   },
// };
