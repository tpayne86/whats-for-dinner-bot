export interface ProjectConfig {
  discordConfig: {
    token: string;
    clientId: string;
    guildId: string;
  };
  edamamApiConfig: {
    clientId: string;
    token: string;
  };
  theCocktailDbApiConfig: {
    token: string;
  }
}

const Config: ProjectConfig = {

  discordConfig: {
    token: process.env.DISCORD_TOKEN || '',
    clientId: process.env.DISCORD_CLIENT_ID || '',
    guildId: process.env.DISCORD_SERVER_ID || '',
  },
  edamamApiConfig: {
    clientId: process.env.RECIPE_API_ID || '',
    token: process.env.RECIPE_API_KEY || ''
  },
  theCocktailDbApiConfig: {
    token: process.env.COCKTAILDB_API_KEY || ''
  }
}

export default Config;
