import { QueueRepeatMode } from "discord-player";
import { Message } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

const options: Record<string, QueueRepeatMode> = {
    o: QueueRepeatMode.OFF,
    off: QueueRepeatMode.OFF,
    t: QueueRepeatMode.TRACK,
    track: QueueRepeatMode.TRACK,
    q: QueueRepeatMode.QUEUE,
    queue: QueueRepeatMode.QUEUE,
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

    private getModeName(mode: QueueRepeatMode): string {
        switch (mode) {
        case QueueRepeatMode.OFF:
            return "off";
        case QueueRepeatMode.TRACK:
            return "track";
        default:
            return "queue";
        }
    }

    public async main(message: Message, args: string[]): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!);

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
                    `${
                        args.length ? "Loop mode set to" : "Current loop mode is"
                    } *${this.getModeName(queue.repeatMode)}*`
                ),
            ],
        });
    }
}
