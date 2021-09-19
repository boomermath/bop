import chalk from "chalk";
import { inspect } from "util";
import { Console } from "console";

export default class BopConsole extends Console {
  constructor() {
    super(process.stdout, process.stderr);
  }

  get timestamp(): string {
    return new Date().toLocaleTimeString();
  }

  public log(message: unknown): void {
    this.write(message, ["inverse"]);
  }

  public success(message: unknown): void {
    this.write(message, ["bgGreen", "bold"]);
  }

  public error(message: unknown): void {
    this.write(message, ["red", "underline"]);
  }

  public info(message: unknown): void {
    this.write(message, ["bgBlue", "dim"]);
  }

  private write(message: unknown, colors: string[], type?: string): void {
    const flattened = this._flatten(message);
    const colorsTemplate = colors.join(".");
    super[type === "error" ? "error" : "log"](
      chalk`{${colorsTemplate} ${flattened} | ${this.timestamp}}`
    );
  }

  private _flatten(message: unknown): string {
    if (message instanceof Error) {
      return message.stack ?? message.name;
    } else if (Array.isArray(message)) {
      if (message.every((entry) => typeof entry === "string"))
        return message.join("\n");
    } else if (typeof message === "object") {
      return inspect(message);
    }
    return String(message);
  }
}