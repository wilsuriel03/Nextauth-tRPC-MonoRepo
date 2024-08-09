import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { db, schema } from "@acme/db";
import { validateCredentials } from "@acme/utils";
import { SignInWithUserTypeSchema } from "@acme/validators";

const { users, accounts, verificationTokens } = schema;

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    verificationTokensTable: verificationTokens,
  }),
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

    // },
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
