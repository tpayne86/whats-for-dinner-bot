import { config } from 'dotenv';
config()

import DiscordClient from "./DiscordClient";
import { Intents } from "discord.js";



import { default as ProjectConfig } from './config';

const discordClient = new DiscordClient({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]},
  ProjectConfig.discordConfig.token);

discordClient.login();

