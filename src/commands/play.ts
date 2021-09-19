import { QueryResolver, QueryType } from "discord-player";
import { GuildChannelResolvable, GuildResolvable, Message } from "discord.js";
import { validateURL } from "ytdl-core";
import BopClient from "../../../../lib/Client";
import { Command } from "../../../../lib/Modules";

export default class PlayCommand extends Command {
  public constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "play",
      description: "Play music.",
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

    const song = await player.search(input, {
      requestedBy: message.author,
      searchEngine: searchEngine,
    });

    if (!queueExists) {
      try {
        await queue.connect(
          message.member?.voice.channel as GuildChannelResolvable
        );
      } catch {
        message.channel.send("Couldn't connect!");
      }
    }

    song.playlist
      ? queue.addTracks(song.tracks)
      : queue.addTrack(song.tracks[0]);

    if (!queueExists) queue.play();
  }
}
