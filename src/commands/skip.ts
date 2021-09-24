import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class ResumeCommand extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "skip",
            description: "Shuffle tracks.",
            aliases: ["j", "s", "jump"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!);
        
        if (!args.length) return void queue.skip();



    }
}
