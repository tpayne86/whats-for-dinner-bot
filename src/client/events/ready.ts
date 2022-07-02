import {Client} from "discord.js";
import {Command} from "../../DiscordClient";

export default {
  name: 'ready',
  once: true,
  execute: (commands: Array<Command>) => async (client:Client) => {
    if(!client.user || !client.application) return;

    console.log(`Ready! Logged in as ${client?.user?.tag}`)
  }
}

