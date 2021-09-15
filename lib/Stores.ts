import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import { Collection } from "discord.js";
import BopClient from "./Client";
import { Command, Event, Module } from "./Modules";

class Store<M extends Module> extends Collection<string, M> {
  protected client: BopClient;
  public directory: string;

  constructor(client: BopClient, directory: string) {
      super();
      this.client = client;
      this.directory = directory;
  }

  async loadAll(): Promise<M[]> {
      this.clear();
      return Promise.all(
          Store.getModules(join(__dirname, this.directory)).map((mod) =>
              this.load(mod)
          )
      );
  }

  async init(): Promise<void> {
      this.mapValues((m) => (m.enabled ? m.init() : this.delete(m)));
  }

  protected async load(dir: string): Promise<M> {
      const importedModule = await import(dir);
      const Module =
      "default" in importedModule ? importedModule.default : importedModule;

      const mod = new Module(this.client, dir);

      this.set(mod.name, mod);

      delete require.cache[dir];
      module.children.pop();

      return mod;
  }

  delete(name: string | M): boolean {
      return super.delete(typeof name === "string" ? name : name.name);
  }

  static getModules(dir: string): string[] {
      return readdirSync(dir)
          .map((file) => join(dir, file))
          .filter((file) => statSync(file).isFile() && extname(file) === ".js");
  }
}

export class CommandStore extends Store<Command> {
  private aliases: Collection<string, Command> = new Collection();

  constructor(client: BopClient, directory: string) {
      super(client, directory);
  }

  async load(dir: string): Promise<Command> {
      const command = await super.load(dir);
      for (const alias of command.aliases) this.aliases.set(alias, command);
      return command;
  }

  get(name: string): Command | undefined {
      return super.get(name) || this.aliases.get(name);
  }

  has(name: string): boolean {
      return super.has(name) || this.aliases.has(name);
  }

  clear(): void {
      super.clear();
      this.aliases.clear();
  }

  delete(name: string | Command): boolean {
      const command = typeof name === "string" ? this.get(name) : name;
      if (command) {
          for (const alias of command.aliases) this.aliases.delete(alias);
          return super.delete(command.name);
      }
      return false;
  }
}

export class EventStore extends Store<Event> {
    constructor(client: BopClient, directory: string) {
        super(client, directory);
    }

    async load(dir: string): Promise<Event> {
        const event = await super.load(dir);
        const eventFunction = event.main.bind(event);
        this.client[event.once ? "once" : "on"](event.name, eventFunction);
        return event;
    }
}
