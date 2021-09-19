import { Queue } from "discord-player";
import { Awaited, GuildTextChannelResolvable, TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";

export default class BotDisconnectEvent extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "botDisconnect",
      emitter: "player",
    });
  }

  public main(queue: Queue): void {
    queue.destroy();
  }
}
