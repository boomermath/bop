import { Message } from "discord.js";
import BopClient from "../lib/Client";
import { Event } from "../lib/Modules";

export default class MessageEvent extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "messageCreate",
    });
  }

  public main(message: Message) {
    if (message.author.bot || !message.guild) return;

    if (message.content.toLowerCase() === "ping") {
      message.channel.send("Pong!");
    }
  }
}
