import { Queue } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { Notification } from "../../../lib/util/Embeds";
import { QueueMetadata } from "../../../lib/util/Util";

export default class TrackAddEvent extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "queueEnd",
            emitter: "player",
        });
    }

    public main(queue: Queue<QueueMetadata>): void {
        const channel = queue.metadata?.channel as TextChannel;

        channel.send({
            embeds: [new Notification("Disconnected!")],
        });

        this.client.player.deleteQueue(queue.guild);
    }
}
