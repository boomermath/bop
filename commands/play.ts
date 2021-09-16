import { QueryType } from "discord-player";
import { GuildChannelResolvable, GuildResolvable, Message } from "discord.js";
import BopClient from "../lib/Client";
import { Command } from "../lib/Modules";

export default class PlayCommand extends Command {
  public constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "play",
      description: "Play music.",
      cooldown: 1,
    });
  }

  public async main(message: Message, args: string[]): Promise<void> {
    message.channel.send("Playing...");
    const player = this.client.player;

    const queue = player.createQueue(message.guild as GuildResolvable, {
        metadata: message.channel
    });

    const song = await player.search(args.join(" "), {
      requestedBy: message.author,
      searchEngine: QueryType.YOUTUBE_SEARCH,
    });

    try {
      await queue.connect(
        message.member?.voice.channel as GuildChannelResolvable
      );
    } catch {
      message.channel.send("Couldn't connect.");
    }

    queue.addTrack(song.tracks[0]);
    queue.play();
  }
}
