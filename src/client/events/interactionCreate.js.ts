import {Interaction} from "discord.js";
import {ClientWithCommands, Command} from "../../DiscordClient";
import isCommand from "../../interactions/commands/commandActions";

export default {
  name: 'interactionCreate',
  execute: (client: ClientWithCommands) => async (interaction: Interaction, ...args: Array<any>) => {
    await isCommand(client, interaction);
  }
}


