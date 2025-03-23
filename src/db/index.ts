import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
console.log(process.env.DATABASE_URL, process.env.DATABASE_AUTH_TOKEN);

const client = createClient({
  url: process.env.DATABASE_URL as string,
  authToken: process.env.DATABASE_AUTH_TOKEN as string,
});
const db = drizzle(client);

export default db;
