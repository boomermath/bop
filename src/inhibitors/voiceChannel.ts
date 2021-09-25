import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command, Inhibitor } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class VoiceChannelInhibitor extends Inhibitor {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "voiceChannel",
        });
    }

    check(message: Message, command: Command): boolean {
        return ["queue", "nowplaying", "help"].includes(command.name) ||
      message?.member?.voice.channel
            ? false
            : true;
    }

    main(message: Message): void {
        message.channel.send({
            embeds: [new Notification(":speaker: Join my voice channel!")],
        });
    }
}
