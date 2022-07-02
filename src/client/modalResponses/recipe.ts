import {Client, MessageEmbed} from "discord.js";
import {Modal, ModalSubmitInteraction} from 'discord-modals';
import { setTimeout as wait } from 'node:timers/promises';
import axios from "axios";


export default {
  customId: 'recipe-modal',
  run: async (client: Client, modal: ModalSubmitInteraction) => {
    const meatResponse = modal.getSelectMenuValues('meat-select');

    const axiosResp = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${meatResponse}&app_id=29104c5e&app_key=482f2a9aa82337bc90c7643d9e0e13c3&random=true`)
    const randRecipe = axiosResp.data.hits[0].recipe;

    const recipeEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(randRecipe.label)
      .setURL(randRecipe.url)
      .setAuthor(randRecipe.source)
      .setImage(randRecipe.image)
      .setTimestamp()

    await modal.reply({embeds: [recipeEmbed]})
  }
}
