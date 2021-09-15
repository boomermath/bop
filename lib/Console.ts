import chalk from "chalk";
import { Console } from "console";

export default class BopConsole extends Console {
  constructor() {
    super(process.stdout, process.stderr);
  }

  private write(message: any, colors: string[], type?: string): void {
    const flattened = this._flatten(message);
    const colorsTemplate = colors.join(".");
    console[type === "error" ? "error" : "log"](chalk`{${colorsTemplate} ${message}}`);
  }

  private _flatten(message: any): string {
    if (message instanceof Error) {
      return message.name;
    } else if (message instanceof Array) {
      return message.join(" ");
    } else if (typeof message === "object") {
      return message?.toString() ?? JSON.stringify(message);
    } else {
      return String(message);
    }
  }
}
