import * as Discord from "discord.js";
import { DB_CONFIG } from "./config";
import { DISCORD_CONFIG } from "./config";
import Database from "./db";

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
client.on("ready", async () => {
  console.log("I am ready!");

  const db = new Database(DB_CONFIG);
  await db.connect();
  await db.dropAllTables();
  await db.init();

  // client.users.map(user => {
  //   console.log(user);
  // });
});

console.log("Test");
client.login(DISCORD_TOKEN);
