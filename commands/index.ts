import * as Discord from "discord.js";
import { DISCORD_CONFIG } from "../config";
const { PREFIX } = DISCORD_CONFIG;

// Commands
import cmc from "./cmc";
import help from "./help";
import ngo from "./ngo";
import ping from "./ping";

// Add new command handlers here
const commands = new Discord.Collection();
commands.set("cmc", cmc);
commands.set("help", help);
commands.set("ngo", ngo);
commands.set("ping", ping);

export { commands };
