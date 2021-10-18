import { Playlist, Queue } from "distube";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { MusicEmbed } from "../../../lib/util/Embeds";
import Util from "../../../lib/util/Util";

export default class extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "addList",
            emitter: "player",
        });
    }

    public main(queue: Queue, playlist: Playlist): void {
        const playlistEmbed = new MusicEmbed(playlist);

        return void queue.textChannel?.send({
            embeds: [playlistEmbed],
            components: [Util.buildDefaultActionRow()],
        });
    }
}
