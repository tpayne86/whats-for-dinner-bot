import {Client, MessageEmbed} from "discord.js";
import {ModalSubmitInteraction} from 'discord-modals';
import axios from "axios";
import sleep from "../../utils/sleep";
import Config from "../../config";


export default {
  customId: 'drink-modal',
  run: async (client: Client, modal: ModalSubmitInteraction) => {
    const alcoholResponse = modal.getSelectMenuValues('alcohol-base');

    const drinkListResp = await axios.get(`https://www.thecocktaildb.com/api/json/v2/${Config.theCocktailDbApiConfig.token}/filter.php?i=${alcoholResponse}`)
    const drinksList = drinkListResp.data.drinks;
    const randomDrinkIndex = Math.floor(Math.random() * drinksList.length);
    await sleep(1000);

    const randomDrinkRecipe = await axios.get(`https://www.thecocktaildb.com/api/json/v2/${Config.theCocktailDbApiConfig.token}/lookup.php?i=${drinksList[randomDrinkIndex].idDrink}`)
    const drinkRecipe = randomDrinkRecipe.data.drinks[0];

    const recipeEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(drinkRecipe.strDrink)
      .addFields(await drinkIngredients(drinkRecipe))
      .setImage(drinkRecipe.strDrinkThumb)
      .setTimestamp()

    await modal.reply({embeds: [recipeEmbed]})
  }
}

const drinkIngredients = async (drinkRecipe: any) => {
  const accumulator = [];

  for (let i = 1; i < 11; i++ ) {
    if(drinkRecipe[`strIngredient${i}`]) {
      accumulator.push({
        name: `Ingredient ${i}`,
        value: `${drinkRecipe[`strMeasure${i}`]} - ${drinkRecipe[`strIngredient${i}`]}`
      })
    }
  }

  return accumulator;
}
