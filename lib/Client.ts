import { Player } from "discord-player";
import { Client, Intents } from "discord.js";
import BopConsole from "./util/Console";
import { CommandStore, EventStore, InhibitorStore } from "./Stores";

export default class BopClient extends Client {
  public prefix: string = "bop!";
  public player: Player = new Player(this);
  public commands: CommandStore = new CommandStore(this, "../src/commands");
  public events: EventStore = new EventStore(this, "../src/events");
  public inhibitors: InhibitorStore = new InhibitorStore(this, "../src/inhibitors");
  public console: BopConsole = new BopConsole();

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
    this.events.setEmitters({ client: this, player: this.player });

    await this.commands.loadAll();
    await this.inhibitors.loadAll();
    await this.events.loadAll();

    await this.commands.init();
    await this.inhibitors.init();
    await this.events.init();

    super.login(process.env.TOKEN);
  }
}
