import { config } from "dotenv";
import BopClient from "./lib/Client";
config();

const client = new BopClient();
client.start();