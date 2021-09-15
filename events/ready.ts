import { Awaited } from "discord.js";
import BopClient from "../lib/Client";
import { Event } from "../lib/Modules";

export default class ReadyEvent extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "ready",
        });
    }

    public main() : Awaited<void> {
        this.client.console.log("Ready!");
    }
}
