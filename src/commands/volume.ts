import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "volume",
            description: "Shuffle tracks.",
            usage: ["volume"],
            aliases: ["vol", "v"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!)!;
        const volume = parseInt(args[0]);

        if (!volume && volume !== 0) {
            message.channel.send({
                embeds: [new Notification(`Volume is ${queue.volume}`)],
            });
        } else if (volume < 0 || volume > 100) {
            message.channel.send({
                embeds: [new Notification("Volume can only be between 0-100!")],
            });
        } else {
            queue.setVolume(volume);

            message.channel.send({
                embeds: [new Notification(`Volume set to ${volume}`)],
            });
        }
    }
}
