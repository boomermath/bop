import { Queue, Song } from "distube";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { MusicEmbed } from "../../../lib/util/Embeds";
import Util from "../../../lib/util/Util";

export default class extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "addSong",
            emitter: "player",
        });
    }

    public main(queue: Queue, song: Song): void {
        const songEmbed = new MusicEmbed(song);

        return void queue.textChannel?.send({
            embeds: [songEmbed],
            components: [Util.buildDefaultActionRow()],
        });
    }
}
