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
        const queue = this.client.player.getQueue(message.guild!)!;
        const index = parseInt(args[0]) - 1;

        if (!index || index < 1 || index > queue.songs.length) {
            message.channel.send({
                embeds: [new Notification("That's not a valid song to remove!")],
            });
        } else {
            const song = queue.songs.splice(index, 1)[0];

            message.channel.send({
                embeds: [new Notification(`Removed *[${song.name}](${song.url})*!`)],
            });
        }
    }
}
