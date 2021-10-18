import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { Notification } from "../../../lib/util/Embeds";

export default class extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "error",
            emitter: "player",
        });
    }

    public main(channel: TextChannel, error: Error): void {
        let err = "Error occurred!";
  
        if (error.stack?.includes("Sign in to confirm your age")) {
            err = "Age-restricted video!";
        }

        channel.send({ embeds: [new Notification(err)] });
        this.client.console.error("Player Error!");
        this.client.console.error(error);
    }
}
