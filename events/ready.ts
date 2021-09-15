import chalk from "chalk";
import { Message } from "discord.js";
import BopClient from "../lib/Client";
import { Event } from "../lib/Modules";

export default class ReadyEvent extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "ready",
    });
  }

  public main() {
    console.log(chalk["green"]("ready!"));
  }
}
