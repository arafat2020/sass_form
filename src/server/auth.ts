import { Hono } from "hono";
import db from "@/db";
import user from "@/db/schema/user";
import bcrypt from "bcrypt";
import { zValidator } from "@hono/zod-validator";
const authRouter = new Hono().basePath("/auth");
import { z } from "zod";

const auntValidator = zValidator("json", z.object({
  email: z.string().email(),
  password: z.string().min(8)
}));

authRouter.post("/signup", auntValidator, async (c) => {
  const { email, password } = await c.req.valid("json");
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.insert(user).values({ email, password: hashedPassword });
  return c.json({ 
    success: true,
    message: "User created successfully",
    user: newUser
   });
});


export default authRouter;