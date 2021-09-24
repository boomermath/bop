import { Track } from "discord-player";
import { EmbedField, Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { EMBED_COLOR } from "../../lib/util/Embeds";

export default class QueueCommand extends Command {
  public constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "queue",
      description: "Play music.",
      aliases: ["q"],
      cooldown: 1,
    });
  }

  private entry(track: Track, index: number): EmbedField {
    return {
      name: index === 0 ? "Queued" : "\u200b",
      value: `**${index < 0 ? "Now Playing:" : `${index + 1}.`} [${
        track.title
      }](${track.url})** by ***${track.author}*** | \`${
        track.duration
      }\` | **${track.views.toLocaleString()} views**`,
      inline: false,
    };
  }

  public async main(message: Message): Promise<void> {
    const queue = this.client.player.getQueue(message.guild!);
    const queueEntries = queue.tracks.map(this.entry);

    if (!queueEntries.length) {
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
          description: this.entry(queue.current, -1).value,
          color: EMBED_COLOR,
          fields: queueEntries,
        },
      ],
    });
  }
}
