import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { EMBED_COLOR } from "../../lib/util/Embeds";

const toSeconds = (f: string): number =>
    f.split(":").reduce((acc, time) => 60 * acc + parseInt(time), 0);

const toFormatted = (s: number): string => {
    const formatted = new Date(s * 1000).toISOString().substr(11, 8);
    return formatted.startsWith("00:") ? formatted.slice(3) : formatted;
};

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "nowplaying",
            description: "See what's current playing!",
            aliases: ["np"],
            cooldown: 1,
        });
    }

    public async main(message: Message): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!)!;
        const current = queue.songs[0];
        const timeLeft =
      current.formattedDuration === "Live"
          ? "Live"
          : toFormatted(
              toSeconds(current.formattedDuration!) - queue.currentTime
          );

        message.channel.send({
            embeds: [
                {
                    title: "Now Playing",
                    description: `**[${current.name}](${current.url})** by ***[${current.uploader.name}](${current.uploader.url})***`,
                    color: EMBED_COLOR,
                    author: {
                        name: current.user?.username,
                        icon_url: current.user?.displayAvatarURL(),
                    },
                    thumbnail: {
                        url: current.thumbnail,
                    },
                    fields: [
                        {
                            name: "Time elapsed",
                            value: queue.formattedCurrentTime,
                            inline: true,
                        },
                        { name: "Time left", value: timeLeft, inline: true },
                        {
                            name: "Time total",
                            value: current.formattedDuration!,
                            inline: true,
                        },
                    ],
                },
            ],
        });
    }
}
