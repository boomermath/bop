import { Playlist, Track } from "discord-player";
import { MessageEmbed } from "discord.js";
export const EMBED_COLOR = "BLUE";

export default class MusicEmbed extends MessageEmbed {
  constructor(music: Playlist | Track, nowplaying: boolean = false) {
    const author =
      music instanceof Playlist
        ? music.tracks[0].requestedBy
        : music.requestedBy;

    const description =
      music instanceof Track
        ? `${nowplaying ? "Now playing" : "Added"} **[${music.title}](${
            music.url
          })** by **${music.author}** | **[${music.duration}]**`
        : `Added **${music.tracks.length}** tracks from **[${music.title}](${music.url})** by **[${music.author.name}](${music.author.url})**`;

    super({
      description: description,
      color: EMBED_COLOR,
      thumbnail: {
        url: music.thumbnail,
      },
      author: {
        name: author.username,
        icon_url: author.avatarURL()!,
      },
    });
  }
}
