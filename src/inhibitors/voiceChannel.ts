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
        if (!message.guild?.me?.voice.channel) return false;
        if (!message.member?.voice.channel) return true;

        return (
            !["queue", "nowplaying", "help"].includes(command.name) &&
      message.member?.voice.channel?.id !== message.guild?.me?.voice.channel?.id
        );
    }

    main(message: Message): void {
        message.channel.send({
            embeds: [new Notification(`Join ${message.member?.voice.channel ? "my" : "a"} voice channel!`)],
        });
    }
}
