import { Queue } from "distube";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";

export default class extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "initQueue",
            emitter: "player",
        });
    }

    public main(queue: Queue): void {
        queue.setVolume(80);
    }
}
