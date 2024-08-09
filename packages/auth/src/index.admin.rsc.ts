import { cache } from "react";
import NextAuth from "next-auth";

import { adminAuthConfig } from "./configs/auth.admin.config";

export type { Session } from "next-auth";

const {
  handlers: { GET, POST },
  auth: defaultAuthAdmin,
  signIn,
  signOut,
} = NextAuth(adminAuthConfig);

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
const auth = cache(defaultAuthAdmin);

export { GET, POST, auth, signIn, signOut };
