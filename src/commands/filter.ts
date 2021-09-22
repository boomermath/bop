import { AudioFilters } from "discord-player";
import { Message, MessageEmbedOptions } from "discord.js";
import BopClient from "../../lib/Client";
import { Command } from "../../lib/Modules";
import { EMBED_COLOR } from "../../lib/util/Embeds";
import Util from "../../lib/util/Util";

const filterAliases: Record<string, string> = {
  bb: "bassboost",
  nc: "nightcore",
  vw: "vaporwave",
  nm: "normalizer2",
}

export default class PlayCommand extends Command {
  public constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "filter",
      description: "Add filters.",
      aliases: ["f"],
      cooldown: 1,
    });
  }

  public async main(message: Message, args: string[]): Promise<void> {
    const queue = this.client.player.getQueue(message.guild!);
    const queueFiltersEnabled = queue.getFiltersEnabled();
    const queueFiltersDisabled = queue.getFiltersDisabled();
    const embed = { title: `Filters for ${message.guild?.name}`, color: EMBED_COLOR } as MessageEmbedOptions;
    
    if (!args.length) {
      const formattedQueueFilters = AudioFilters.names
        .map(f => `**${Util.toTitleCase(f)}**: ${queueFiltersEnabled.includes(f) ? "Enabled" : "Disabled"}`);

      embed.description = formattedQueueFilters.join("\n");
      embed.fields = [{ name: "Toggle Filters", value: `To toggle filters, do ${this.client.prefix}filter <...filters>` }];
    } else {
      let setFilterObj = {} as Record<string, boolean>;

      for (const arg of args) {
        const filter = filterAliases[arg] ?? AudioFilters.names.find(a => a.includes(arg));
        
        if (!filter) return void message.channel.send(`Filter ${arg} is not a valid filter!`);
        
        
      }
    }

    message.channel.send({ embeds: [embed] })
  }
}
