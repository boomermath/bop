import { Queue, Track } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import MusicEmbed, { EMBED_COLOR } from "../../../lib/util/Embeds";

export default class TrackAddEvent extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "queueEnd",
      emitter: "player",
    });
  }

  public main(queue: Queue): void {
    const channel = queue.metadata as TextChannel;

    return void channel.send({
      embeds: [{
        description: "Queue has ended!",
        color: EMBED_COLOR
      }]
    });
  }
}
