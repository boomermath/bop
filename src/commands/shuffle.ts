import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class  extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "shuffle",
            description: "Shuffle songs in the queue!",
            aliases: ["shf", "sf", "mix"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!);
        queue.shuffle();
        message.channel.send({ embeds: [new Notification("Queue shuffled!")] });
    }
}
