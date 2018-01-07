import { DISCORD_CONFIG } from "../config";
const { PREFIX } = DISCORD_CONFIG;

import { commands } from "../commands";

export default (client, message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) {
    return;
  }

  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (commands.has(cmd)) {
    commands.get(cmd)(client, message, args);
  }
};
