import NextAuth from "next-auth";

import { adminAuthConfig } from "./configs/auth.admin.config";

export type { Session } from "next-auth";
const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(adminAuthConfig);
export { GET, POST, auth, signIn, signOut };
