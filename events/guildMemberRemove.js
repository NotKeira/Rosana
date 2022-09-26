const chalk = require("chalk");
const {
  Client,
  GuildMember,
  Guild,
  GuildMemberManager,
} = require("discord.js");

const main_json = require("../botconfig/main.json");

module.exports = {
  name: "guildMemberRemove",
  execute(GuildMember) {
    // const oldMember = GuildMember.oldMember;
    // const newMember = GuildMember.newMember;
    // if (oldMember.pending && !newMember.pending) {
    //   oldMember.send("This server has Member Screening enabled. Please pass it before you can gain access to this server.")
    // }
    const server = GuildMember.guild;
    const memberRole = server.roles.cache.get("932222339653984299");
    const jLogs = server.channels.cache.get("997824444204601414");
    const entranceChannel = server.channels.cache.get(entranceLogs);
    const lLogs = server.channels.cache.get("997827484290662442");
    console.log(`${GuildMember},${GuildMember.user.username} left the server.`);
    entranceChannel.send(
      `Well that's disappointing.. ${GuildMember.user.username} left the server :(.`
    );
    jLogs.send(`
    ${GuildMember} has left the server.

    Information:

    User ID: ${GuildMember.id},
    User Tag: ${GuildMember.user.tag}
    User Roles <->  ${GuildMember.roles.map((r) => r.join(","))}
    `);
  },
};
