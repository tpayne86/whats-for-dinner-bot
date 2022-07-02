import { SlashCommandBuilder } from "@discordjs/builders";
import {BaseCommandInteraction, Client} from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
   run: async (client: Client, interaction: BaseCommandInteraction) => {
      console.log('Running Ping!')
    await interaction.reply('Pong!');
  }
}


