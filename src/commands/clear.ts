import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class extends Command {
  public constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "clear",
      description: "Leave the voice channel.",
      aliases: ["c", "clean", "clearqueue", "cq"],
      cooldown: 1,
    });
  }

  public async main(message: Message): Promise<void> {
    const queue = this.client.player.getQueue(message.guild!);
    queue.clear();
    message.channel.send({ embeds: [new Notification("Queue cleared!")] });
  }
}
