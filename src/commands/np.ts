import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { EMBED_COLOR } from "../../lib/util/Embeds";

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "nowplaying",
            description: "See what's current playing!",
            aliases: ["np"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!);

        message.channel.send({
            embeds: [
                {
                    title: "Now Playing",
                    description: `**[${queue.current.title}](${queue.current.url})** by ***${queue.current.author}***`,
                    color: EMBED_COLOR,
                    author: {
                        name: queue.current.requestedBy.username,
                        icon_url: queue.current.requestedBy.displayAvatarURL(),
                    },
                    thumbnail: {
                        url: queue.current.thumbnail,
                    },
                    fields: [{ name: "\u200b", value: queue.createProgressBar() }],
                },
            ],
        });
    }
}
