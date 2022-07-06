import {SlashCommandBuilder} from "@discordjs/builders";
import {BaseCommandInteraction, Client} from "discord.js";
import {SelectMenuComponent, Modal, showModal} from "discord-modals";
import ingredientsList from '../../ingredientList.json';
import {APISelectMenuOption} from "discord-api-types/v10";

interface IngredientListItem {
  item: string;
  type: string;
}

export default {
  data: new SlashCommandBuilder()
    .setName('drink')
    .setDescription('Get a random cocktail'),
  run: async (client: Client, interaction: BaseCommandInteraction) => {

    const options: APISelectMenuOption[] = ingredientsList.ingredients.map((ingredient: IngredientListItem) => {
      return {
        label: ingredient.item,
        value: ingredient.item,
      }
    })

    const modal = new Modal()
      .setCustomId('drink-modal')
      .setTitle('Random Cocktail')
      .addComponents(
        new SelectMenuComponent()
          .setPlaceholder('Select Alcohol base')
          .setCustomId('alcohol-base')
          // @ts-ignore
          .addOptions(options)
      )
    await showModal(modal, {
      client, interaction
    })
  }
}
