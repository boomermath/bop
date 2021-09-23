import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command, Inhibitor } from "../../lib/Modules";

export default class VoiceChannelInhibitor extends Inhibitor {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "voiceChannel",
        });
    }

    check(message: Message, command: Command): boolean {
        return ["queue"].includes(command.name) ? false : true;
    }

    main(message: Message): boolean {
        if (!message.member?.voice.channel) {
            message.channel.send(
                "You must be in a voice channel to use this command."
            );
            return true;
        }
        return false;
    }
}
