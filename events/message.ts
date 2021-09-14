import BopClient from "../lib/Client";
import { Event } from "../lib/Modules";

export default class Message extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "message",
    });
  }

  public main(message: Message) {
      
  }
}
