import { AudioFilters, Queue } from "discord-player";
import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { EMBED_COLOR, Notification } from "../../lib/util/Embeds";
import Util, { QueueMetadata } from "../../lib/util/Util";

const filterAliases: Record<string, string> = {
  bassboost: "bassboost",
  bb: "bassboost",
  nc: "nightcore",
  vw: "vaporwave",
  nm: "normalizer2",
  "8d": "8D",
  "8D": "8D",
};

export default class extends Command {
  public constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "filter",
      description: "Add filters to your music!",
      usage: ["filter"],
      aliases: ["f"],
      cooldown: 1,
    });
  }

  private formatFilter(arg: string): string {
    return arg
      .split("_")
      .map((e) => Util.toTitleCase(e))
      .join(" ");
  }

  public async main(message: Message, args: string[]): Promise<void> {
    const queue: Queue<QueueMetadata> = this.client.player.getQueue(
      message.guild!
    );
    const queueFiltersEnabled = queue.getFiltersEnabled();

    if (args.length > 3) {
      message.channel.send({
        embeds: [new Notification(":x: No more than three at a time!")],
      });
    } else if (!args.length) {
      const formattedQueueFilters = Object.entries(
        queue.metadata?.filters!
      ).map(
        (e) =>
          `**${this.formatFilter(e[0])}**: ${e[1] ? "Enabled" : "Disabled"}`
      );

      message.channel.send({
        embeds: [
          {
            title: `Filters for ${message.guild?.name}`,
            description: formattedQueueFilters.join("\n"),
            color: EMBED_COLOR,
            fields: [
              {
                name: "Toggle Filters",
                value: `To toggle filters, do ${this.client.prefix}filter <...filters>`,
              },
            ],
          },
        ],
      });
    } else {
      const filters = args.map(
        (arg) =>
          filterAliases[arg.toLowerCase()] ??
          AudioFilters.names.find((a) => a.includes(arg.toLowerCase())) ??
          `Invalid filter: ${arg}`
      );
      const invalidFilter = filters.find((f) => f.startsWith("Invalid"));

      if (invalidFilter) {
        return void message.channel.send({
          embeds: [new Notification(invalidFilter)],
        });
      }

      filters.map(
        (filter) =>
          (queue.metadata!.filters[filter] = !queue.metadata?.filters[filter])
      );

      queue.setPaused(true);
      await queue.setFilters(queue.metadata?.filters);
      
      message.channel.send({
        embeds: [
          new Notification(
            `Toggled ${filters.join(", ")} filter${
              filters.length > 1 ? "s" : ""
            }!`
          ),
        ],
      });
    }
  }
}
