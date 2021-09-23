import { MessageActionRow, MessageButton } from "discord.js";

export default class Util {
    public static toTitleCase(e: string): string {
        return `${e.charAt(0).toUpperCase()}${e.slice(1)}`;
    }

    public static buildDefaultActionRow(): MessageActionRow {
        return new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("resume")
                .setLabel("Resume")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("pause")
                .setLabel("Pause")
                .setStyle("DANGER"),
            new MessageButton()
                .setCustomId("nowplaying")
                .setLabel("Now Playing")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("queue")
                .setLabel("Queue")
                .setStyle("SECONDARY")
        );
    }
}
