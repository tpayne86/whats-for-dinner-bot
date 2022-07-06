import {Command} from "../DiscordClient";

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import Config from '../config'

export const registerCommands = (commands: Map<string,Command>) => {
  const commandsToRegister = Array.from(commands.values()).map((command) => {
    return command.data?.toJSON();
  })
  const rest = new REST({ version: '9' }).setToken(Config.discordConfig.token);

  rest.put(Routes.applicationGuildCommands(Config.discordConfig.clientId, Config.discordConfig.guildId), {body: commandsToRegister})
    .then(() => console.log('Successfully registered application commands'))
    .catch(console.error);
}
