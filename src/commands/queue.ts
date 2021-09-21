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

  private entry(track: Track, index: string | number): EmbedField {
    return {
      name: "\u200b",
      value: `**${typeof index === "number" ? index + 1 : index}. [${
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

    message.channel.send({
      embeds: [
        {
          title: `Queue for ${message.guild?.name}`,
          color: EMBED_COLOR,
          description: this.entry(queue.current, "Now Playing").value,
          fields: queueEntries,
        },
      ],
    });
  }
}
