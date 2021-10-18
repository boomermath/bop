import SpotifyPlugin from "@distube/spotify";
import SoundCloudPlugin from "@distube/soundcloud";
import DisTube from "distube";
import { Client, Intents } from "discord.js";
import { CommandStore, EventStore, InhibitorStore } from "./Stores";
import BopConsole from "./util/Console";

export default class BopClient extends Client {
  public prefix = "bop!";
  public player: DisTube = new DisTube(this, {
    searchSongs: 1,
    searchCooldown: 5,
    leaveOnEmpty: false,
    leaveOnFinish: true,
    leaveOnStop: true,
    nsfw: true,
    emitNewSongOnly: true,
    ytdlOptions: {
      filter: "audioonly",
    },
    plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
  });
  public commands: CommandStore = new CommandStore(this, "../src/commands");
  public events: EventStore = new EventStore(this, "../src/events");
  public inhibitors: InhibitorStore = new InhibitorStore(
    this,
    "../src/inhibitors"
  );
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

  public hasMention(message: string) {
    return (
      message.startsWith(`<@!${this.user?.id}>`) ||
      message.startsWith(`<@${this.user?.id}>`)
    );
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
