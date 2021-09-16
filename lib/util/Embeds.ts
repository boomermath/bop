import { MessageEmbed } from "discord.js";
const COLOR = "BLUE";

export class Notification extends MessageEmbed {
  constructor(description: string) {
    super({
      description: `**${description}**`,
      color: COLOR,
    });
  }
}


