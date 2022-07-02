import {ClientWithCommands, ModalResponse} from "../../DiscordClient";
import {ModalSubmitInteraction} from 'discord-modals';

export default {
  name: 'modalSubmit',
  on: true,
  execute: (client: ClientWithCommands) => async (modal:ModalSubmitInteraction) => {
    console.log('modal');
    const processSubmit = client.modalResponses?.get(modal.customId);
    console.log(processSubmit)
    if(!processSubmit) return;

    try {
      await processSubmit.run(client, modal);
    }catch (e) {
      console.error(e);
      await modal.reply({content: "there was an error while executing this command"})
    }
  }
}
