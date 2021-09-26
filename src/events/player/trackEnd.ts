import { Queue, Track } from "discord-player";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { QueueMetadata } from "../../../lib/util/Util";

export default class TrackEndEvent extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "trackEnd",
      emitter: "player",
    });
  }

  public main(queue: Queue<QueueMetadata>, track: Track): void {
    queue.skip();
  }
}
