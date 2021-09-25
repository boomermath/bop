import { AudioFilters } from "discord-player";
import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { EMBED_COLOR, Notification } from "../../lib/util/Embeds";
import Util from "../../lib/util/Util";

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
        const queue = this.client.player.getQueue(message.guild!);
        const queueFiltersEnabled = queue.getFiltersEnabled();

        if (args.length > 3) {
            message.channel.send({
                embeds: [new Notification(":x: No more than three at a time!")],
            });
        } else if (!args.length) {
            const formattedQueueFilters = AudioFilters.names.map(
                (f) =>
                    `**${this.formatFilter(f)}**: ${
                        queueFiltersEnabled.includes(f) ? "Enabled" : "Disabled"
                    }`
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
                    embeds: [new Notification(invalidFilter)],
                });
            }

            for (const filter of AudioFilters.names) {
                const isEnabled = queueFiltersEnabled.includes(filter);
                setFilterObj[filter] = filters.includes(filter)
                    ? !isEnabled
                    : isEnabled;
            }

            queue.setPaused(true);
            queue.setFilters(setFilterObj).then(() => {
                message.channel.send({
                    embeds: [
                        new Notification(
                            `**:white_check_mark: Toggled ${filters.join(", ")} filter${
                                filters.length > 1 ? "s" : ""
                            }!**`
                        ),
                    ],
                });
            });
        }
    }
}
