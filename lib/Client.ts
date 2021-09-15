import { Client, Intents } from "discord.js";
import { CommandStore, EventStore } from "./Stores";

export default class BopClient extends Client {
  public commands: CommandStore = new CommandStore(this, "../commands");
  public events: EventStore = new EventStore(this, "../events");

  public constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILDS,
      ],
    });
  }

  public async start(): Promise<void> {
    await this.commands.loadAll();
    await this.events.loadAll();

    await this.commands.init();
    await this.events.init();

    super.login(process.env.TOKEN);
  }
}
