import {Command} from "../DiscordClient";

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config');

export const registerCommands = (commands: Map<string,Command>) => {
  const commandsToRegister = Array.from(commands.values()).map((command) => {
    return command.data?.toJSON();
  })
  const rest = new REST({ version: '9' }).setToken(token);

  rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commandsToRegister})
    .then(() => console.log('Successfully registered application commands'))
    .catch(console.error);
}
