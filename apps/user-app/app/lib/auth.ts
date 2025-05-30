 import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const credentialsSchema = z.object({
    phone: z
      .string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^\d{10}$/, "Phone number must contain only digits"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  });

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        try {
          const parsed = credentialsSchema.parse(credentials);

          const existingUser = await db.user.findFirst({
            where: { number: parsed.phone }
          });

          if (existingUser) {
            const isPasswordCorrect = await bcrypt.compare(parsed.password, existingUser.password);
            if (!isPasswordCorrect) {
                throw new Error("Invalid credentials");
            }
            if (!isPasswordCorrect) return null;

            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number
            };
          }

          // New user flow
          const hashedPassword = await bcrypt.hash(parsed.password, 10);

          const newUser = await db.user.create({
            data: {
              number: parsed.phone,
              password: hashedPassword,
              Balance: {
                create: { amount: 50000, locked: 0 }
              }
            }
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.number
          };

        } catch (error: any) {
          console.error("Auth error:", error.message);
          return null;
        }
      }
    })
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: { token: any; session: any }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};
