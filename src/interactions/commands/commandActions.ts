import {ClientWithCommands} from "../../DiscordClient";
import {Interaction} from "discord.js";

export const isCommand = async (client: ClientWithCommands, interaction: Interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands?.get(interaction.commandName);

    if (!command) return;

    try {
      await command.run(client, interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({content: "there was an error while executing this command"})
    }
  }
}

export default isCommand;
