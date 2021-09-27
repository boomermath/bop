import { Queue, Track } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { MusicEmbed } from "../../../lib/util/Embeds";
import Util, { QueueMetadata } from "../../../lib/util/Util";

export default class TrackAddEvent extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "trackAdd",
            emitter: "player",
        });
    }

    public main(queue: Queue<QueueMetadata>, track: Track): void {
        if (queue.current === track) return;

        const newTrack = new MusicEmbed(track);

        return void queue.metadata?.channel.send({
            embeds: [newTrack],
            components: [Util.buildDefaultActionRow()],
        });
    }
}
