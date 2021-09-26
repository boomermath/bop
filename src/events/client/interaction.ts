import { Awaited, Interaction, Message } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";

export default class InteractionEvent extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "interactionCreate",
      emitter: "client",
    });
  }

  public main(interaction: Interaction): Awaited<void> {
    if (!interaction.isButton()) return;
    interaction.deferUpdate();

    const command = this.client.commands.get(interaction.customId);

    if (!command) return;

    const inhibited = this.client.inhibitors.run(
      interaction.message as Message,
      command
    );

    if (inhibited) return;

    try {
      command.main(interaction.message as Message, []);
    } catch (err) {
      this.client.console.error(err);
      interaction.reply(
        "The button went boom boom, ping boomermath :rolling_eyes:"
      );
    }
  }
}
