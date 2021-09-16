import { Message, MessageEmbed } from "discord.js";
import BopClient from "../lib/Client";
import { Command } from "../lib/Modules";
import { Notification } from "../lib/util/Embeds";

export default class Test extends Command {
  public constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "test",
      description: "Test embeds.",
      cooldown: 1,
    });
  }

  public async main(message: Message, args: string[]): Promise<void> {
    const embed = new Notification("This is a test!");
    message.channel.send({ embeds: [embed] });
  }
}
