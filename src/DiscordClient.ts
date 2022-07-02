import {
  BaseCommandInteraction,
  Client,
  ClientOptions,
} from "discord.js";
import discordModals, {
  ModalSubmitInteraction } from 'discord-modals';
import * as path from "path";
import fs from "fs";
import {registerCommands} from "./client/registerCommands";
import {SlashCommandBuilder} from "@discordjs/builders";

export interface ModalResponse {
  customId: string;
  run: (client: Client, modal: ModalSubmitInteraction) => void;
}

export interface Command {
  data: SlashCommandBuilder;
  run: (client: Client, interaction: BaseCommandInteraction) => void;
}

export interface ClientWithCommands extends Client {
  commands?: Map<string,Command>;
  modalResponses?: Map<string,ModalResponse>
}

export default class DiscordClient {
  private client: ClientWithCommands;
  private token: string;


  constructor(config: ClientOptions, token: string) {
    this.client = new Client(config);
    this.token = token;
    discordModals(this.client);
    this.initCommands();
    this.initModalResponses();
    this.initEvents();
  }

  private initEvents() {
    const eventsPath = path.join(__dirname, 'client/events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      import(filePath).then(({default: event}) => {
        console.log('Initializing Event: ', event.name);
        if(event.once) {
          this.client.once(event.name, (...args) => event.execute(this.client.commands)(...args));
        } else {
          this.client.on(event.name, (...args) => {
            console.log(`Firing ${event.name} event`);
            event.execute(this.client)(...args)
          });
        }
      });
    }
  }

  private async initCommands() {
    this.client.commands = new Map<string, Command>();
    const commandsPath = path.join(__dirname, 'client/commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

    for await (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      import(filePath).then(({default: command}) => {
        this.client.commands?.set(command.data.name, command);
      })
    }
    registerCommands(this.client.commands);
  }

  private async initModalResponses() {
    this.client.modalResponses = new Map<string, ModalResponse>();
    const modalResponsesPath = path.join(__dirname, 'client/modalResponses');
    const modalResponseFiles = fs.readdirSync(modalResponsesPath).filter(file => file.endsWith('.ts'));

    for await ( const file of modalResponseFiles) {
      const filePath = path.join(modalResponsesPath, file);
      import(filePath).then(({default: modalResponse}) => {
        this.client.modalResponses?.set(modalResponse.customId, modalResponse);
      })
    }
  }

  public login() {
    this.client.login(this.token).then((resp) => {
      console.log('Login Resp: ', resp)
    }).catch(err => console.error);
  }
}
