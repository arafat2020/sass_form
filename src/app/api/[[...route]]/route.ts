import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const hello = new Hono().get("/",(c)=>{
  return c.json({ message: "Hello Next.js!" });
});

const routes = app.route("/hello",hello);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
