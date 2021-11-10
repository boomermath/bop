import { Message } from "discord.js";
import { defaultFilters } from "distube";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { EMBED_COLOR, Notification } from "../../lib/util/Embeds";

const distubeDefaultFilters = Object.keys(defaultFilters);
const filterAliases: Record<string, string> = {
  bb: "bassboost",
  nc: "nightcore",
  vw: "vaporwave",
  fl: "flanger",
  ec: "echo",
  ha: "haas",
  rv: "reverse",
  mc: "mcompand",
  sr: "surround",
  ph: "phaser",
  tm: "tremolo",
  ew: "earwax",
  kk: "karaoke",
  "8d": "3d",
  "8D": "3d",
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

  public async main(message: Message, args: string[]): Promise<void> {
    const queue = this.client.player.getQueue(message.guild!.id)!;

    if (!args.length) {
      const filterEntries = distubeDefaultFilters.map(
        (f) =>
          `**${f[0].toUpperCase()}${f.slice(1)}**: *${
            queue.filters.includes(f) ? "Enabled" : "Disabled"
          }*`
      );

      return void message.channel.send({
        embeds: [
          {
            title: `Filters for ${message.guild?.name}`,
            description: filterEntries.join("\n"),
            color: EMBED_COLOR,
            fields: [
              {
                name: "Add Filters",
                value: `To add filters, use \`${this.client.prefix}filter <filterNames>\``,
              },
            ],
          },
        ],
      });
    }

    const filterArguments = args.map(
      (a) => filterAliases[a.toLowerCase()] || a.toLowerCase()
    );

    for (const filter of filterArguments) {
      if (!distubeDefaultFilters.includes(filter)) {
        return void message.channel.send({
          embeds: [new Notification(`"${filter}" is not a valid filter!`)],
        });
      }
    }

    queue.setFilter(filterArguments);

    message.channel.send({
      embeds: [new Notification(`Toggled ${filterArguments.join(", ")}!`)],
    });
  }
}
