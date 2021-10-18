import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "disconnect",
            description: "Leave the voice channel.",
            aliases: ["dc", "leave", "die"],
            cooldown: 1,
        });
    }

    public async main(message: Message): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!.id)!;

        queue.stop();        
    }
}