import db from "@/db"
import user from "@/db/schema/user"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ password, email }) {
        const users = await db.select().from(user).where(eq(user.email, email as string))
        
        if (!users || users.length === 0) {
          return null
        }

        const foundUser = users[0]
        
        const passwordMatch = await bcrypt.compare(password as string, foundUser.password)
        
        if (!passwordMatch) {
          return null
        }

        return {
          id: foundUser.id.toString(),
          email: foundUser.email,
          name: foundUser.name
        }
      },
    }),
  ],
})