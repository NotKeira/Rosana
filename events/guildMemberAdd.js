const chalk = require("chalk");
const {
  Client,
  GuildMember,
  Guild,
  GuildMemberManager,
} = require("discord.js");

const client = require("../index.js");

const main_json = require("../botconfig/main.json");

const mcsrv = main_json.mcsrv;

const MongoClient = require("mongodb").MongoClient;

var date = new Date();
var time = date.toLocaleString("en-UK");

module.exports = {
  name: "guildMemberAdd",
  execute(GuildMember) {
    // const oldMember = GuildMember.oldMember;
    // const newMember = GuildMember.newMember;
    // if (oldMember.pending && !newMember.pending) {
    //   oldMember.send("This server has Member Screening enabled. Please pass it before you can gain access to this server.")
    // }
    const server = GuildMember.guild;
    const memberRole = server.roles.cache.get("997823052521930822");
    const jLogs = server.channels.cache.get(main_json.etID);
    const jChannel = server.channels.cache.get("1020386776692572310");
    console.log(
      `${GuildMember},${GuildMember.user.username} joined the server.`
    );
    GuildMember.roles.add(memberRole, "New Member");
    jChannel.send(`Please welcome ${GuildMember.user.username} to our server.`);
    jLogs.send(`
    ${GuildMember} has joined the server.

    Information:

    User ID: ${GuildMember.id},
    User Tag: ${GuildMember.user.tag}
    Joined: ${time}
    `);
    GuildMember.send(
      `Welcome to ${server.name}!
      We hope you have fun and please report anything that happens to our moderation team!
      Use \`/pronouns pronountype\` to get a pronoun role, and \`/genders gender\` to get a gender role (replace pronountype and gender with what you want)!
      And enjoy our server!
    `
    );
  },
};
