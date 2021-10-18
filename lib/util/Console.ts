import chalk from "chalk";
import { Console } from "console";
import { inspect } from "util";

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
        this.write(message, ["red", "underline"], "error");
    }

    public info(message: unknown): void {
        this.write(message, ["bgBlue", "dim"]);
    }

    private write(message: unknown, colors: string[], type?: string): void {
        const colorsTemplate = colors.join(".");
        super[type === "error" ? "error" : "log"](
            chalk`{${colorsTemplate} ${
                typeof message === "string" ? message : inspect(message)
            } | ${this.timestamp}}`
        );
    }
}
