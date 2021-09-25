import { Queue } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { Notification } from "../../../lib/util/Embeds";

export default class TrackAddEvent extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "queueEnd",
            emitter: "player",
        });
    }

    public main(queue: Queue): void {
        const channel = queue.metadata as TextChannel;

        queue.destroy();

        return void channel.send({
            embeds: [new Notification("Disconnected!")],
        });
    }
}
