import DiscordClient from "./DiscordClient";
import { Intents } from "discord.js";

import 'dotenv/config';

// @ts-ignore
import config from './config';

const discordClient = new DiscordClient({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]}, config.token);

discordClient.login();

