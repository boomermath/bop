import { QueryResolver, QueryType } from "discord-player";
import { GuildChannelResolvable, Message } from "discord.js";
import { validateURL } from "ytdl-core";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "play",
            description: "Play music!",
            usage: ["query"],
            aliases: ["p"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        const player = this.client.player;
        const input = args.join(" ");

        const queueExists = player.getQueue(message.guild!);
        const queue = queueExists
            ? queueExists
            : player.createQueue(message.guild!, {
                metadata: message.channel,
            });

        let searchEngine = QueryResolver.resolve(input);

        searchEngine =
      searchEngine === QueryType.YOUTUBE_VIDEO
          ? !validateURL(input)
              ? QueryType.YOUTUBE_SEARCH
              : QueryType.YOUTUBE_VIDEO
          : searchEngine;

        let song;
        try {
            song = await player.search(input, {
                requestedBy: message.author,
                searchEngine: searchEngine,
            });
        } catch {
            return void message.channel.send({
                embeds: [new Notification("Couldn't find that song!")],
            });
        }

        if (!queueExists) {
            try {
                await queue.connect(
          message.member?.voice.channel as GuildChannelResolvable
                );
            } catch {
                queue.destroy();
                return void message.channel.send("Couldn't connect!");
            }
        }

        song.playlist
            ? queue.addTracks(song.tracks)
            : queue.addTrack(song.tracks[0]);

        if (!queueExists) {
            queue.play().then(() => {
                queue.setFilters({ normalizer2: true });
            });
        }
    }
}
