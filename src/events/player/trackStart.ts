import { Queue, Track } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { MusicEmbed } from "../../../lib/util/Embeds";
import Util, { QueueMetadata } from "../../../lib/util/Util";

export default class TrackAddEvent extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "trackStart",
            emitter: "player",
        });
    }

    public main(queue: Queue<QueueMetadata>, track: Track): void {
        const channel = queue.metadata?.channel as TextChannel;
        const nowPlayingEmbed = new MusicEmbed(track, true);

        return void channel.send({
            embeds: [nowPlayingEmbed],
            components: [Util.buildDefaultActionRow()],
        });
    }
}
