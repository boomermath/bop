import {sep} from "path";
import BopClient from "./Client";

interface baseOpts {
  name?: string;
  client?: BopClient;
  enabled?: boolean;
}

interface eventOpts extends baseOpts {
  once: boolean;
}

interface commandOpts extends baseOpts {
  aliases: string[];
  description: string;
  cooldown: number;
}

class Module {
  private client: BopClient;
  public name: string;
  public enabled: boolean;
  public directory: string;

  constructor(client: BopClient, directory: string, options: baseOpts = {}) {

    this.client = client;
    this.directory = directory;
    this.name = options.name ?? 
    this.enabled = options.enabled ?? true;
  }
}

class Command extends Module {
  public description: string;
  public aliases: string[];
  public cooldown: number;

  constructor(client: BopClient, directory: string, options: commandOpts) {
    super(client, directory, options);
    this.description = options.description;
    this.aliases = options.aliases;
    this.cooldown = options.cooldown;
  }

  public main(name: string): void {
    throw new Error("Not implemented");
  }
}

class Event extends Module {
  public once: boolean;

  constructor(client: BopClient, directory: string, options: eventOpts) {
    super(client, directory, options);
    this.once = options.once;
  }

  public main(name: string): void {
    throw new Error("Not implemented");
  }
}

export { Module, Command, Event };
