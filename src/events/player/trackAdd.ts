import { Queue, Track } from "discord-player";
import {
    TextChannel
} from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import MusicEmbed from "../../../lib/util/Embeds";
import Util from "../../../lib/util/Util";

export default class TrackAddEvent extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "trackAdd",
            emitter: "player",
        });
    }

    public main(queue: Queue, track: Track): void {
        const channel = queue.metadata as TextChannel;

        if (queue.current === track) return;

        const newTrack = new MusicEmbed(track);

        return void channel.send({
            embeds: [newTrack],
            components: [Util.buildDefaultActionRow()],
        });
    }
}
