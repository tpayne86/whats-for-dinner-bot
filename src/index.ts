import DiscordClient from "./DiscordClient";
import { Intents } from "discord.js";

import config from './config.json';

const discordClient = new DiscordClient({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]}, config.token);

discordClient.login();

