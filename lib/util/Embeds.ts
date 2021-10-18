import { Playlist, Song } from "distube";
import { MessageEmbed } from "discord.js";
export const EMBED_COLOR = "BLUE";

export class Notification extends MessageEmbed {
    constructor(description: string) {
        super({
            description: `**${description}**`,
            color: EMBED_COLOR,
        });
    }
}

export class MusicEmbed extends MessageEmbed {
    constructor(music: Playlist | Song, nowplaying = false) {
        const description =
      music instanceof Song
          ? `${nowplaying ? "Now playing" : "Added"} **[${music.name}](${
              music.url
          })** by **[${music.uploader.name}](${music.uploader.url})**`
          : `Added **${music.songs.length}** tracks from **[${music.name}](${music.url})**`;

        super({
            description: `${description} | **[${music.formattedDuration}]**`,
            color: EMBED_COLOR,
            thumbnail: {
                url: music.thumbnail,
            },
            author: {
                name: music.user?.username,
                icon_url: music.user?.avatarURL() as string,
            },
        });
    }
}
