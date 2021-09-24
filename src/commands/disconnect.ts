import { Message, MessageActionRow, MessageButton } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class LeaveCommand extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "disconnect",
            description: "Resume music.",
            aliases: ["dc", "leave", "die"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        this.client.player.emit(
            "queueEnd",
            this.client.player.getQueue(message.guild!)
        );
    }
}
