import { Queue, Track } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { MusicEmbed } from "../../../lib/util/Embeds";
import Util, { QueueMetadata } from "../../../lib/util/Util";

export default class TrackAddEvent extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "tracksAdd",
            emitter: "player",
        });
    }

    public main(queue: Queue<QueueMetadata>, track: Array<Track>): void {
        const playlistEmbed = new MusicEmbed(track[0].playlist!);

        return void queue.metadata?.channel.send({
            embeds: [playlistEmbed],
            components: [Util.buildDefaultActionRow()],
        });
    }
}
