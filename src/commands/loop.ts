import { Message } from "discord.js";
import { RepeatMode } from "distube";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

const options: Record<string, RepeatMode> = {
    o: RepeatMode.DISABLED,
    off: RepeatMode.DISABLED,
    t: RepeatMode.SONG,
    track: RepeatMode.SONG,
    s: RepeatMode.SONG,
    song: RepeatMode.SONG,
    q: RepeatMode.QUEUE,
    queue: RepeatMode.QUEUE,
};

const getModeName = (mode: RepeatMode): string => {
    switch (mode) {
    case RepeatMode.DISABLED:
        return "off";
    case RepeatMode.SONG:
        return "song";
    default:
        return "queue";
    }
};

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "loop",
            description: "Loop music!",
            usage: ["off|track|queue"],
            aliases: ["repeat", "rp", "lp"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!)!;


        if (args.length) {
            const loopMode = options[args[0].toLowerCase()];

            if (!loopMode) {
                return void message.channel.send({
                    embeds: [new Notification(`Invalid loop mode "${args[0]}"!`)],
                });
            }

            queue.setRepeatMode(loopMode);
        }

        message.channel.send({
            embeds: [
                new Notification(
                    `${args.length ? "Loop mode set to" : "Current loop mode is"
                    } *${getModeName(queue.repeatMode)}*`
                ),
            ],
        });
    }
}
