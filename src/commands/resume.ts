import { Message, MessageActionRow, MessageButton } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "resume",
            description: "Resume music!",
            aliases: ["rs"],
            cooldown: 1,
        });
    }

    public async main(message: Message, args: string[]): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!);

        if (queue.playing) {
            return void message.channel.send({
                embeds: [new Notification("Music is already playing!")],
            });
        }

        queue.playing = true;
        queue.setPaused(false);

        const pauseButton = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("pause")
                .setLabel("Pause")
                .setStyle("DANGER")
        );

        message.channel.send({
            embeds: [new Notification("Music Resumed!")],
            components: [pauseButton],
        });
    }
}
