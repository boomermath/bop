import { Interaction, Message } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";

export default class extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "interactionCreate",
            emitter: "client",
        });
    }

    public main(interaction: Interaction): void {
        if (!interaction.isButton()) return;
        interaction.deferUpdate();

        const command = this.client.commands.get(interaction.customId);
        const message = interaction.message as Message;
        
        if (!command) return;

        const inhibited = this.client.inhibitors.run(message, command);

        if (inhibited) return;

        try {
            command.main(message, []);
            this.client.console.log(`Command run by | ID: ${interaction.user.id} | Username: ${interaction.user.username}`);
        } catch (err) {
            this.client.console.error(err);
            interaction.reply(
                "The button went boom boom, ping boomermath :rolling_eyes:"
            );
        }
    }
}
