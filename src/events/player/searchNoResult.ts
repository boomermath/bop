import { Message } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { Notification } from "../../../lib/util/Embeds";

export default class extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "searchNoResult",
            emitter: "player",
        });
    }

    public main(message: Message, query: string): void {
        message.channel.send({
            embeds: [new Notification(`Couldn't find anything for "${query}"!`)]
        });
    }
}
