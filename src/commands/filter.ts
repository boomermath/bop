import { AudioFilters } from "discord-player";
import { Message, MessageEmbedOptions } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { EMBED_COLOR } from "../../lib/util/Embeds";
import Util from "../../lib/util/Util";

const filterAliases: Record<string, string> = {
  bassboost: "bassboost",
  bb: "bassboost",
  nc: "nightcore",
  vw: "vaporwave",
  nm: "normalizer2",
  "8d": "8D",
  "8D": "8D"
};

export default class PlayCommand extends Command {
  public constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "filter",
      description: "Add filters.",
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
    const queue = this.client.player.getQueue(message.guild!);
    const queueFiltersEnabled = queue.getFiltersEnabled();
    const embed = {
      title: `Filters for ${message.guild?.name}`,
      color: EMBED_COLOR,
    } as MessageEmbedOptions;

    if (!args.length) {
      const formattedQueueFilters = AudioFilters.names.map(
        (f) =>
          `**${this.formatFilter(f)}**: ${queueFiltersEnabled.includes(f) ? "Enabled" : "Disabled"
          }`
      );

      embed.description = formattedQueueFilters.join("\n");
      embed.fields = [
        {
          name: "Toggle Filters",
          value: `To toggle filters, do ${this.client.prefix}filter <...filters>`,
        },
      ];
    } else {
      const setFilterObj = {} as Record<string, boolean>;
      const filters = args.map(
        (arg) =>
          filterAliases[arg.toLowerCase()] ??
          AudioFilters.names.find((a) => a.includes(arg.toLowerCase())) ??
          `Invalid filter: ${arg}`
      );
      const invalidFilter = filters.find((f) => f.startsWith("Invalid"));

      if (invalidFilter) {
        return void message.channel.send({
          embeds: [
            {
              description: invalidFilter,
              color: EMBED_COLOR,
            },
          ],
        });
      }

      queue.setPaused(true);
      message.channel.send({
        embeds: [
          {
            description: `:musical_note: **Applying filters...**`,
            color: EMBED_COLOR,
          },
        ],
      });

      for (const filter of AudioFilters.names) {
        const isEnabled = queueFiltersEnabled.includes(filter);
        setFilterObj[filter] = filters.includes(filter)
          ? !isEnabled
          : isEnabled;
      }

      embed.description = `Toggled ${filters.join(", ")} filters!`;

      queue.setFilters(setFilterObj).then(() => {
        message.channel.send({ embeds: [embed] });
      });
    }
  }
}
