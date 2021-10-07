import { Queue } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { Notification } from "../../../lib/util/Embeds";
import { QueueMetadata } from "../../../lib/util/Util";

export default class BotDisconnectEvent extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "error",
      emitter: "player",
    });
  }

  public main(queue: Queue<QueueMetadata>, error: Error): void {
    this.client.console.error(error);

    if (error.message.includes("403")) return;
    
    this.client.player.deleteQueue(queue.guild);

    queue.metadata?.channel.send({
      embeds: [new Notification("An error occurred, disconnecting!")],
    });
  }
}
