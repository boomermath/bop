import { EmbedField, Message } from "discord.js";
import { Song } from "distube";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { EMBED_COLOR } from "../../lib/util/Embeds";

const entry = (track: Song, index: number): EmbedField => {
    return {
        name: index === 0 ? "Queued" : "\u200b",
        value: `**${index === 0 ? "Now Playing:" : `${index + 1}.`} [${
            track.name
        }](${track.url})** by ***[${track.uploader.name}](${
            track.uploader.url
        })*** | \`${track.formattedDuration}\` | ${track.user}`,
        inline: false,
    };
};

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "queue",
            description: "See what music you have queued!",
            aliases: ["q"],
            cooldown: 1,
        });
    }

    public async main(message: Message): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!)!;
        const queueEntries = queue.songs.map(entry);

        if (queueEntries.length < 2) {
            queueEntries.push({
                name: "Nothing queued!",
                value: "Add some music!",
                inline: false,
            });
        }

        message.channel.send({
            embeds: [
                {
                    title: `Queue for ${message.guild?.name}`,
                    description: queueEntries.shift()?.value,
                    color: EMBED_COLOR,
                    fields: queueEntries,
                },
            ],
        });
    }
}
