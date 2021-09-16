import { Awaited, Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Event } from "../../lib/Modules";

export default class MessageEvent extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "messageCreate",
            emitter: "client"
        });
    }

    public main(message: Message): Awaited<void> {
        if (message.author.bot || !message.guild) return;

        const [cmd, ...args] = message.content
            .slice(this.client.prefix.length)
            .trim()
            .split(/ +/);
        const command = this.client.commands.get(cmd.toLowerCase());

        if (!command) return;

        const isInhibited = this.client.inhibitors.run(message, command);

        if (isInhibited) return;

        try {
            command.main(message, args);
        } catch (err) {
            this.client.console.error(err);
            message.channel.send(
                "There was an error, ping boomermath repeatedly to fix it."
            );
        }
    }
}
