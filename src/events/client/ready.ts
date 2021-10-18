import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";

export default class extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "ready",
            once: true,
            emitter: "client",
        });
    }

    public main(): void {
        this.client.console.log("Ready!");

    this.client.user!.setPresence({
        activities: [{ name: `with ${this.client.prefix}` }],
        status: "idle",
    });
    }
}
