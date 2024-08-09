import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { db, schema } from "@acme/db";
import { getUserById, validateCredentials } from "@acme/utils";
import { SignInWithUserTypeSchema } from "@acme/validators";

const { users, accounts, verificationTokens } = schema;

const adapter =  DrizzleAdapter(db, {
  usersTable: users,
  accountsTable: accounts,
  verificationTokensTable: verificationTokens,
});

export const adminAuthConfig = {
  adapter,
  session: { strategy: "jwt" },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;
        const parsedCredentials = SignInWithUserTypeSchema.parse(credentials);
        return validateCredentials(parsedCredentials);
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   console.log("SignIn callback - user:", user);
    //   console.log("SignIn callback - account:", account);
    //   console.log("SignIn callback - profile:", profile);
    // },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      console.log("JWT callback - token:", token);

      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - token:", token);
      if (session.user && token.sub) session.user.id = token.sub;
      if (token.role) session.user.role = token.role;
      console.log("Session callback - session:", session);
      return session;
    },
  },
} satisfies NextAuthConfig;
