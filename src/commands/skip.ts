import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "skip",
            description: "Skip a song or two!",
            usage: ["songIndex"],
            aliases: ["j", "s", "jump"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!);

        if (!args.length) return void queue.skip();

        const index = parseInt(args[0]) - 1;

        if (index < 0 || index > queue.tracks.length) {
            return void message.channel.send({
                embeds: [new Notification("Invalid number to jump to!")],
            });
        }

        this.client.console.log(index);
        this.client.console.log(queue.tracks)

        queue.jump(index);
    }
}
