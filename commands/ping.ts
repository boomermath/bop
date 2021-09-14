import { Message } from "discord.js";
import BopClient from "../lib/Client";
import { Command } from "../lib/Modules";

export default class Ping extends Command {
  public constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "ping",
      description: "Sends ping.",
      cooldown: 1,
    });
  }

  public main(message: Message, args: string[]) {
    message.channel.send("Pong!");
  }
}
