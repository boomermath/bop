import { AudioFilters, Queue, Track } from "discord-player";
import { QueryResolver, QueryType } from "discord-player";
import { GuildChannelResolvable, Message } from "discord.js";
import { validateURL } from "ytdl-core";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";
import Util, { QueueMetadata } from "../../lib/util/Util";

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

    if (!args.length) {
      return void message.channel.send({
        embeds: [new Notification("Give me something to play!")],
      });
    }

    const input = args.join(" ");
    const queueExists = player.getQueue(message.guild!);
    const queueCast = queueExists
      ? queueExists
      : player.createQueue(message.guild!, {
          metadata: {
            channel: message.channel,
            filters: { ...Util.defaultFilters },
          },
          autoSelfDeaf: true,
          initialVolume: 75,
          leaveOnEmptyCooldown: 3000,
        });
    const queue = queueCast as Queue<QueueMetadata>;

    queue.metadata!.filters.normalizer2 = true;

    let searchEngine = QueryResolver.resolve(input);

    searchEngine =
      searchEngine === QueryType.YOUTUBE_VIDEO
        ? !validateURL(input)
          ? QueryType.YOUTUBE_SEARCH
          : QueryType.YOUTUBE_VIDEO
        : searchEngine;

    const song = await player.search(input, {
      requestedBy: message.author,
      searchEngine: searchEngine,
    });

    if (!(song.tracks[0] instanceof Track)) {
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
        this.client.player.deleteQueue(queue.guild);
        return void message.channel.send("Couldn't connect!");
      }
    }

    song.playlist
      ? queue.addTracks(song.tracks)
      : queue.addTrack(song.tracks[0]);

    if (!queueExists) {
      await queue.play(undefined, { filtersUpdate: true }).then(async () => {
        await queue.setFilters(queue.metadata?.filters);
      });
    }
  }
}
