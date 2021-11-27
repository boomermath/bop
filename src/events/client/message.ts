import { Message } from "discord.js";
import BopClient from "../../../lib/Client";
import { Notification } from "../../../lib/util/Embeds";
import { Event } from "../../../lib/Modules";

export default class extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "messageCreate",
      emitter: "client",
    });
  }

  public main(message: Message): void {
    if (this.client.hasMention(message.content)) {
      return void message.channel.send({
        embeds: [
          new Notification(
            `Hi!\n I'm *Bop*, the very cool music bot!\nTo get started, type \`${this.client.prefix}help\``
          ),
        ],
      });
    }

    if (
      message.author.bot ||
      !message.guild ||
      !message.content.startsWith(this.client.prefix)
    )
      return;

    const [cmd, ...args] = message.content
      .slice(this.client.prefix.length)
      .trim()
      .split(/ +/);
    const command = this.client.commands.get(cmd.toLowerCase());

    if (!command) return;

    const isInhibited = this.client.inhibitors.run(message, command);

    if (isInhibited) return;

    try {
      command.main(message, args);
      this.client.console.log(`Command run by | ID: ${message.author.id} | Username: ${message.author.username}`);
    } catch (err) {
      this.client.console.error(err);
      message.channel.send(
        "There was an error, ping boomermath repeatedly to fix it."
      );
    }
  }
}
