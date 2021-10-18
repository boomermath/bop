import { Queue } from "distube";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { Notification } from "../../../lib/util/Embeds";

export default class extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "deleteQueue",
            emitter: "player",
        });
    }

    public main(queue: Queue): void {
        return void queue.textChannel?.send({
            embeds: [new Notification("Disconnected!")],
        });
    }
}
