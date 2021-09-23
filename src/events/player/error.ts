import { Queue } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { EMBED_COLOR } from "../../../lib/util/Embeds";

export default class TrackAddEvent extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "error",
      emitter: "player",
    });
  }

  public main(err: Error): void {
    console.error(err)
  }
}
