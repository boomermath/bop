import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "play",
            description: "Play music!",
            usage: ["query"],
            aliases: ["p"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        this.client.player.play(message, args.join(" "));
    }
}
