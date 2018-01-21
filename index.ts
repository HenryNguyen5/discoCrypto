import * as Discord from "discord.js";
import { DISCORD_CONFIG } from "./config";
import Database from "./db";

// Events
import * as Events from "./events";

const {
  DISCORD_TOKEN,
  DEFAULT_CHANNEL_NAME,
  DEFAULT_GUILD_NAME
} = DISCORD_CONFIG;

// New Client
const client = new Discord.Client();

if (!DISCORD_TOKEN) {
  console.log("No discord token found, exiting...");
  process.exit();
}

// Event handlers here
client.on("ready", message => Events.Ready(client));
client.on("message", async message => Events.Message(client, message));

client.login(DISCORD_TOKEN);
