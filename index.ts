require("dotenv").config();
const BopClient = require("./lib/Client");
const client = new BopClient()

client.start();