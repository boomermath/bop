import { Message, MessageActionRow, MessageButton } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { Notification } from "../../lib/util/Embeds";

export default class  extends Command {
    public constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "pause",
            description: "Pause music!",
            aliases: ["ps"],
            cooldown: 1,
        });
    }

    public async main(message: Message): Promise<void> {
        const queue = this.client.player.getQueue(message.guild!)!;

        if (queue.paused) {
            return void message.channel.send({
                embeds: [new Notification("Music is already paused!")],
            });
        }

        queue.pause();

        const resumeButton = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("resume")
                .setLabel("Resume")
                .setStyle("PRIMARY")
        );

        message.channel.send({
            embeds: [new Notification("Music Paused!")],
            components: [resumeButton],
        });
    }
}
