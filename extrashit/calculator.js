const Discord = require("discord.js");

const rows = [
  new Discord.ActionRowBuilder(),
  new Discord.ActionRowBuilder(),
  new Discord.ActionRowBuilder(),
  new Discord.ActionRowBuilder(),
  new Discord.ActionRowBuilder(),
];
let j = 0;
let arr = [
  "ans",
  "(",
  ")",
  "AC",
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
];
for (const row of rows) {
  for (let i = 0; i < 4; i++) {
    row.components.push(
      new Discord.ButtonBuilder()
        .setStyle(getStyle(arr[j]))
        .setLabel(arr[j])
        .setCustomId(arr[j])
    );
    j++;
  }
}
//manual added for the time being
rows[0].components.push(
  new Discord.ButtonBuilder()
    .setStyle(getStyle("⬅"))
    .setLabel("⬅")
    .setCustomId("⬅")
);
rows[1].components.push(
  new Discord.ButtonBuilder()
    .setStyle(getStyle("^"))
    .setLabel("^")
    .setCustomId("^")
);

function getStyle(input) {
  if (["ans", "(", ")", "/", "*", "-", "+", "^"].includes(input)) {
    return "Primary";
  } else if (input === "=") {
    return "Success";
  } else if (["⬅", "AC"].includes(input)) {
    return "Danger";
  } else {
    return "Secondary";
  }
}

function calculate(id, str, ans) {
  str = str !== "0" ? str : "";
  ans = ans !== "0" ? ans : "";

  if (id === "AC") {
    return { str: "0", ans: "0" };
  } else if (id === "=") {
    try {
      ans = parse(str);
      str = parse(str);
    } catch (e) {
      return { str: "0", ans: "0" };
    }
    return { str: `${str}`, ans: `${ans}` };
  } else if (id === "ans") {
    return { str: `${(str += ans)}`, ans: `${ans}` };
  } else if (id === "⬅") {
    return { str: `${str.slice(0, -1)}`, ans: `${ans}` };
  } else {
    return { str: `${(str += id)}`, ans: `${ans}` };
  }
}

function parse(str) {
  str = str.replaceAll("^", "**");
  return Function(`'use strict'; return (${str})`)();
}

module.exports = { rows, calculate };
