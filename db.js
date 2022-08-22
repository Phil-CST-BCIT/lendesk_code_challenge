import { createClient } from "redis";
import { Client } from "redis-om";

const url = process.env.REDIS_URL || "redis://localhost:6379";

const connection = createClient(url);

connection.on("error", console.error.bind(console, "Redis connection error: "));

connection.once("ready", function () {
  console.log("DB connected");
});

await connection.connect();

const db = await new Client().use(connection);

export default db;
