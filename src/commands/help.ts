import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { EMBED_COLOR, Notification } from "../../lib/util/Embeds";
import Util from "../../lib/util/Util";

const commands: string[] = [];

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "help",
            description: "If you're seeing this, you know what this does.",
            usage: ["command"],
            aliases: ["hp", "assistance"],
            cooldown: 1,
        });
    }

    public async init(): Promise<void> {
        commands.push(...this.client.commands.map((c) => `\`${c.name}\``));
    }

    public async main(message: Message, args: string[]): Promise<void> {
        if (!args.length) {
            message.channel.send({
                embeds: [
                    {
                        title: "Commands",
                        description: `> ${commands.join(", ")}`,
                        color: EMBED_COLOR,
                        fields: [
                            {
                                name: "Advanced Help",
                                value: `**For more info on a command: ${this.client.prefix}help <command>**`,
                            },
                        ],
                    },
                ],
            });
        } else {
            const command = this.client.commands.get(args[0]);

            if (!command) {
                return void message.channel.send({
                    embeds: [new Notification(`"${args[0]}" is not a valid command!`)],
                });
            }

            const usage = command.usage.length
                ? command.usage.map((u) => `<${u}>`).join(" ")
                : "N/A";

            message.channel.send({
                embeds: [
                    {
                        title: "Command",
                        color: EMBED_COLOR,
                        fields: [
                            { name: "Name", value: Util.toTitleCase(command.name) },
                            { name: "Description", value: command.description },
                            { name: "Usage", value: usage },
                            { name: "Aliases", value: command.aliases.sort().join(", ") },
                        ],
                    },
                ],
            });
        }
    }
}
