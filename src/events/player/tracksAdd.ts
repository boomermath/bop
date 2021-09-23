import { Queue, Track } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import MusicEmbed from "../../../lib/util/Embeds";
import Util from "../../../lib/util/Util";

export default class TrackAddEvent extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "tracksAdd",
            emitter: "player",
        });
    }

    public main(queue: Queue, track: Array<Track>): void {
        const channel = queue.metadata as TextChannel;
        const playlistEmbed = new MusicEmbed(track[0].playlist!);
    
        return void channel.send({
            embeds: [playlistEmbed],
            components: [Util.buildDefaultActionRow()],
        });
    }
}
