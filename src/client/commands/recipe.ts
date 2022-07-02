import {SlashCommandBuilder} from "@discordjs/builders";
import {
  BaseCommandInteraction,
  Client,
} from "discord.js";
import {Modal, SelectMenuComponent, showModal} from "discord-modals"

export default {
  data: new SlashCommandBuilder()
    .setName('recipe')
    .setDescription('Get a random recipe'),
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const modal = new Modal()
      .setCustomId('recipe-modal')
      .setTitle('Random Recipe')
      .addComponents(
        new SelectMenuComponent()
          .setPlaceholder('Select Meat Type')
          .setCustomId('meat-select')
          .addOptions(
            {
              label: 'Beef',
              description: "That delicious red meat",
              value: 'beef'
            },
            {
              label: 'Chicken',
              description: "That delicious white meat",
              value: 'chicken'
            },
            {
              label: 'Pork',
              description: "That other white meat",
              value: 'pork'
            },
            {
              label: 'Fish',
              description: "That meat from the sea",
              value: 'fish'
            }
          )
      )
    await showModal(modal, {
      client, interaction
    })
  }
}
