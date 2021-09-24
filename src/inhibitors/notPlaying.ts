import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command, Inhibitor } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class NotPlayingInhibitor extends Inhibitor {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "notPlaying",
        });
    }

    check(message: Message, command: Command): boolean {
        const isPlaying = this.client.player.getQueue(message.guild!);
        return isPlaying || command.name === "play" ? false : true;
    }

    main(message: Message): void {
        message.channel.send({ embeds: [new Notification(":mute: I'm not playing anything right now!")] });
    }
}
