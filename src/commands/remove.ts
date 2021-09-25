import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "remove",
            description: "Remove a song!",
            usage: ["songIndex"],
            aliases: ["rm", "delete", "del"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!);
        const index = parseInt(args[0]);

        if (!index || index < 0 || index > queue.tracks.length) {
            message.channel.send({
                embeds: [new Notification("That's not a valid song to remove!")],
            });
        } else {
            const song = queue.remove(index - 1);

            message.channel.send({
                embeds: [new Notification(`Removed *[${song.title}](${song.url})*`)],
            });
        }
    }
}
